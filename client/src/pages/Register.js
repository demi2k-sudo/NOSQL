import React from 'react'
import {Checkbox,Form,Input,Radio,message,Cascader,DatePicker} from 'antd'
import "../styles/RegisterStyles.css";
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'

import {showLoading,hideLoading} from '../redux/features/alertSlice'
import  {useDispatch}  from 'react-redux';


const onChange = (date, dateString) => {
  console.log(date, dateString, typeof date, typeof dateString);
};

const options = [
  {
    value: 'Tamil Nadu',
    label: 'Tamil Nadu'
  },
  {
    value: 'Kerala',
    label: 'Kerala'
  },
  {
    value: 'Andhra Pradesh',
    label: 'Andhra Pradesh'
  },
  {
    value: 'Karnataka',
    label: 'Karnataka'
  },
  {
    value: 'Pondicherry',
    label: 'Pondicherry'
  },
  {
    value: 'Other',
    label: 'Other'
  }
]

const blood = [
  {
    value: 'B+',
    label: 'B+'
  },
  {
    value: 'A+',
    label: 'A+'
  },
  {
    value: 'A-',
    label: 'A-'
  },
  {
    value: 'AB+',
    label: 'AB+'
  },
  {
    value: 'A1B+',
    label: 'A1B+'
  },
  {
    value: 'B-',
    label: 'B-'
  },
  {
    value: 'O+',
    label: 'O+'
  },
  {
    value: 'O-',
    label: 'O-'
  },
  {
    value: 'Other',
    label: 'Other'
  }
]

const myStyle={
  backgroundImage:
"bg.jpg",
  height:'100vh',
  marginTop:'-70px',
  fontSize:'50px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const onfinishHandler = async(values) => {
    try{
      dispatch(showLoading())
      const res = await axios.post('/api/v1/users/register', values);
      
      dispatch(hideLoading())
      if(res.data.success){
        message.success('Registered Successfully!')
        navigate('/')
      }
      else{
        message.error(res.data.message)
      }

    } catch(error){
      dispatch(hideLoading())
      console.log(error)
      message.error('Something went Wrong')
    }
  };
  return (
    <>
      <div className='register-form-container'>
        <Form layout='vertical' onFinish={onfinishHandler} className='Register-form'>
          <h1 className='text-center'>Register </h1>
          <Form.Item label = 'Name' name = 'name'>
            <Input type = 'text' required/>
          </Form.Item>          
          <Form.Item label = 'Password' name = 'password'>
            <Input type = 'password' required/>
          </Form.Item>
          <Form.Item label = 'Email' name = 'email'>
            <Input type = 'email' required/>
          </Form.Item>
          <Form.Item label='State' name='state'>
          <Cascader  options={options}  placeholder="Please select" />
          </Form.Item>
          <Form.Item label='DOB' name='DOB'>
         
            <DatePicker onChange={onChange} />
         
          </Form.Item>
          <Form.Item label = 'Height' name = 'height'>
            <Input type = 'text' required/>
          </Form.Item>
          <Form.Item label = 'Weight' name = 'weight'>
            <Input type = 'text' required/>
          </Form.Item>
          <Form.Item label='Blood group' name='blood'>
          <Cascader  options={blood}  placeholder="Please select" />
          </Form.Item>

          <Form.Item label = 'Gender' name='gender'>
          <Radio.Group>
          <Radio value='Male'>Male</Radio>
          <Radio value='Female'>Female</Radio>
          </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Checkbox>
              I agree to all the terms and Conditions
            </Checkbox>
          </Form.Item>
          <button  className='btn btn-danger'>Register</button>
          <br></br>
          <Link to='/login' className='register-color'>Already an user? Login here</Link>
        </Form>
      </div>
    </>
  )
}

export default Register