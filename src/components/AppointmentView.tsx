import React, {useState, useEffect} from 'react';
import { Form, Input, Modal, Select, Row, Col, Checkbox, Button, AutoComplete, Upload, Typography, DatePicker, TimePicker } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import {API_POINT} from '../Constants'
import httpUtil from '../utils/HttpUtil'

const { Option } = Select
const {Text, Title} = Typography


const uploadEvent = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export const AppointmentView = () => {
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
	  try {
      const res = await httpUtil.makeAppointment(values.email, values.password, values.appointmentTime.format())
			console.log(res.data)

      if (res.data.code === 1) {
        Modal.success({title: 'Congratulations', content: `Appointment on ${values.appointmentTime.format('YYYY-MM-DD h:mm:ss')} successful!`, afterClose: () => {
          //form.resetFields()
        }})
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

  return (
    <Form
      style={{width: '70%', alignContent: 'flex-start'}}
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
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
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" style={{marginTop: 20}}>
          Make appointment
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AppointmentView;
