import React, {useState, useEffect} from 'react';
import { Image, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Upload, Typography, Table, } from 'antd';
import {API_POINT} from '../Constants'
import httpUtil from '../utils/HttpUtil'

const { Option } = Select
const {Text, Title} = Typography

export const ManageUserView = (props: {onSignedOut: () => void}) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
	  try {
			const res = await httpUtil.getPatients()

      if (res.status === 200 && res.data) {
        setUsers(res.data.map((v: any) => ({...v, key: v.email})))
      }
	  } catch (err) {
			console.log(err)
	  }
  }
  
  const columns = [
    {
      title: 'Appointment Time',
      dataIndex: 'appointment_time',
      key: 'appointment_time',
      render: (time: string) => {
        return (new Date(time)).toUTCString()
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render: (photo: string) => {
        const src = `${API_POINT.substring(0, API_POINT.length - 4)}${photo}`
        return photo ? <Image src={src} height={72} /> : null
      }
    },
  ];

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white'}}>
      <Text style={{width: '100%', textAlign: 'left'}}>Registered patients:</Text>
      <Table style={{width: '100%', marginTop: 10, }} dataSource={users} columns={columns} pagination={false} size={'large'} />

        <Button type="primary" htmlType="submit" style={{marginTop: 20}} onClick={() => props.onSignedOut()}>
          Sign out
        </Button>
    </div>
  );
};

export default ManageUserView;
