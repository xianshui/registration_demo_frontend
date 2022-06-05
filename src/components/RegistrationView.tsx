import {useState, useRef} from 'react';
import { Form, Input, Select, Button, AutoComplete, Upload, DatePicker, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {API_POINT} from '../Constants'
import httpUtil from '../utils/HttpUtil'

const { Option } = Select

const RegistrationView = () => {
  const [form] = Form.useForm();
  const uploadedFileUrl = useRef<string>('')

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const uploadEvent = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = async (values: any) => {
    //console.log('Received values of form: ', values, values.appointmentTime.format());

	  try {
      const res = await httpUtil.register(values.appointmentTime.format(), values.name, values.email, values.password, values.address, uploadedFileUrl.current, values.phone)
			console.log(res.data)

      if (res.data.code === 1) {
        Modal.success({title: 'Congratulations', content: `Appointment on ${values.appointmentTime.format('YYYY-MM-DD h:mm:ss')} successful!`, afterClose: () => {
          form.resetFields()
        }})
      } else {
        Modal.error({title: 'Opps', content: `User already exist!`, afterClose: () => {
          form.resetFields()
        }})
      }
	  } catch (err) {
			console.log(err)
	  }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="1">+1</Option>
        <Option value="2">+2</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map(website => ({
    label: website,
    value: website,
  }));

  return (
    <Form
      style={{width: '70%', alignContent: 'flex-start'}}
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '1',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="appointmentTime"
        label="Appointment Time"
        rules={[
          {
            type: 'date',
            message: 'The input is not valid date',
          },
          {
            required: true,
            message: 'Please input your appointment time',
          },
        ]}
      >
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" onChange={(date, dateStr) => {
          console.log(date, dateStr)
        }} placeholder={'Select date and time'} style={{width: '100%'}} />
      </Form.Item>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>


      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: 'Please input address!' }]}
      >
        <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="Input address">
          <Input />
        </AutoComplete>
      </Form.Item>


      <Form.Item
        rules={[{ required: true, message: 'Please upload a life photo!' }]}
        name="upload"
        label="Upload photo"
        valuePropName="fileList"
        getValueFromEvent={uploadEvent}
      >
        <Upload name="file" action={`${API_POINT}/upload`} listType="picture" maxCount={1}
        onChange={(info) => {
          if (info.file.status === 'done') {
            console.log('response>>', info, info.file.response?.path)
            uploadedFileUrl.current = info.file.response?.path
          }
        }}
        >
          <Button style={{width: '100%', }} icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" style={{marginTop: 20}}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationView;
