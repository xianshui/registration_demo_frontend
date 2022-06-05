import axios from 'axios'
import {API_POINT} from '../Constants'
//import Qs from 'qs'

class HttpUtil {
  async register(appointment_time: string, name: string, email: string, password: string, address: string, photo: string, phone_number: string) {
		return axios.post(`${API_POINT}/register`, JSON.stringify({appointment_time, name, email, password, address, photo, phone_number}) , {transformRequest: []})
  }

  async makeAppointment(email: string, password: string, time: string) {
		return axios.post(`${API_POINT}/appoint`, JSON.stringify({time, email, password}))
  }

  async signIn(email: string, password: string) {
		return axios.post(`${API_POINT}/signin`, JSON.stringify({email, password}))
  }

  async signOut() {
	  try {
			const res = await axios.post(`${API_POINT}/signout`, {name: 'jack', age: 20})
			console.log(res)
	  } catch (err) {
			console.log(err)
	  }
  }

  async getPatients() {
			return axios.get(`${API_POINT}/patients/`)
  }
}

const httpUtil = new HttpUtil()
export default httpUtil