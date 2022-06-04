import React, {useState, useEffect} from 'react';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Upload, Typography, DatePicker, Modal } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import {API_POINT} from '../Constants'
import HttpUtil from '../utils/HttpUtil'
import httpUtil from '../utils/HttpUtil';

const { Option } = Select
const {Text, Title} = Typography

export const SignInView = (props: {onSignedIn: () => void}) => {
  const [form] = Form.useForm();

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

  const onFinish = async (values: any) => {
    //console.log('Received values of form: ', values);
	  try {
			const res = await httpUtil.signIn(values.email, values.password)
			console.log(res)

      if (res.data.code === 1) {
        props.onSignedIn()
      } else {
        Modal.error({title: 'Opps', content: res.data.msg, afterClose: () => {
          //form.resetFields()
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
        <Option value="86">+86</Option>
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
      }}
      scrollToFirstError
    >
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
        <Input placeholder={'Administrator account email'} />
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
        <Input.Password placeholder={'password'} />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" style={{marginTop: 20}}>
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignInView;
