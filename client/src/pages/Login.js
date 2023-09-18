import React from 'react'
import {Form,Input,message} from 'antd'
import "../styles/LoginStyles.css";
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'

import {useDispatch} from 'react-redux'
import {showLoading,hideLoading} from '../redux/features/alertSlice';


const Login  = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onfinishHandler = async(values) => {
    console.log(values);
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/users/login',values)
      dispatch(hideLoading())

      if(res.data.success){
        localStorage.setItem("token",res.data.token)
        message.success('Login Successful')
        navigate('/')
      } else{
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error('Something went wrong')
      
    }
  };

  return (
    <div className='form-container'>
        <Form layout='vertical' onFinish={onfinishHandler} className='Login-form'>
          <h1 className='text-center'>Login </h1>
          <Form.Item label = 'Email' name = 'email'>
            <Input type = 'email' required/>
          </Form.Item>
          <Form.Item label = 'Password' name = 'password'>
            <Input type = 'password' required/>
          </Form.Item>

          <button className='btn btn-danger' type='submit'>Login</button>
          <br></br>

          <Link to='/register' class='Signup' ><p>Don't have an account? Sign up here</p></Link>
        </Form>
      </div>
  )
}

export default Login 