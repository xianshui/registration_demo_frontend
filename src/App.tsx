import React, {useState, useEffect} from 'react';
import './App.css';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Upload, Typography, DatePicker, TimePicker } from 'antd';
import RegistrationView from './components/RegistrationView'
import AppointmentView from './components/AppointmentView'
import SignInView from './components/SignInView'
import ManageUserView from './components/ManageUserView';

const { Option } = Select
const {Text, Title} = Typography

enum Stage {register, admin, signIn, appoint, manageUser}


function App() {
  const [stage, setStage] = useState(Stage.register)
  const [token, setToken] = useState('')

  useEffect(() => {
    loadToken()
  }, [])

  const loadToken = async () => {
    const token = localStorage.getItem('doctor_appointment_demo_token')

    if (token) {
      setToken(token)
      setStage(Stage.admin)
    }
  }

  const switchStage = (stage: Stage) => {
    setStage(stage)
  }

  return (
    <div className="App">
      <div style={{padding: 20, display: 'flex', justifyContent: 'center', background: 'white', flexDirection: 'column'}}>
        <Title style={{marginBottom: 25}}>Patient registration system</Title>
        {stage === Stage.signIn?
        <Button style={{position: 'absolute', top: 30, right: 30}} onClick={() => switchStage(Stage.register)}>Common user</Button>
        : stage === Stage.manageUser ?
        null
        :
        <Button style={{position: 'absolute', top: 30, right: 30}} onClick={() => switchStage(Stage.signIn)}>Admin</Button>
        }
        {stage === Stage.register ?
        <>
          <RegistrationView />
        </>
        :
        stage === Stage.appoint ? 
        <>
          <AppointmentView />
        </>
        :
        stage === Stage.signIn ?
        <SignInView onSignedIn={() => setStage(Stage.manageUser)} />
        : 
        <ManageUserView onSignedOut={() => setStage(Stage.register)} />
        }
      </div>
      {
      }
    </div>
  );
}

export default App;
