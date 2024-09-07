import { PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import './App.css';
function Test() {
    const [loading ,setLoding]=useState(false)
    const fruits=["mango","banana","orang","cherry"]
      const onButtonClick=(e)=>{
        console.log("button clicked")
        setLoding(true)
        setTimeout(()=>{
          setLoding(false)
        },[2000])
    
      }
      const onFinish=(e)=>{
        console.log(e)
      }
  return (
    <div>
   <header>
   <Button type="primary" 
   block onClick={onButtonClick}
   loading={loading}
   icon={<PoweroffOutlined/>}
   >Button</Button>   
   <Input 
   placeholder='name'
   prefix={<UserOutlined/>}

   allowClear
   ></Input>
   
   <p>which is your fofrites fruites</p>

   <Select mode='multiple' 
   maxTagCount={2}
   placeholder ="select fruit" style={{width:"50%"}}>
    {fruits.map((fruit,index)=>{
      return <Select.Option key={index} value={fruit}/>

    })}


   </Select>
   <Form onFinish={onFinish}>
    <Form.Item label="user name" name="username">
      <Input placeholder='user name' required></Input>

    </Form.Item>
    <Form.Item label="password" name="password">
      <Input.Password placeholder='password' required></Input.Password>

    </Form.Item>
    <Form.Item>
      <Button block type='primary' htmlType='submit'>Logi in</Button>

    </Form.Item>

   </Form>
   </header>

   

    </div>
  )
}

export default Test