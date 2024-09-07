import { HomeFilled, ShoppingCartOutlined } from '@ant-design/icons'
import { Badge, Button, Checkbox, Drawer, Form, Input, InputNumber, Menu, message, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../App.css"
import { getCart } from './api/Api'

function AppHeader() {
    const navigate=useNavigate()

    const onMenuClick=(item)=>{
        navigate(`/${item.key}`);
    }
  return (
    <div className='Appheader'>
        
        <Menu
        onClick={onMenuClick}
        mode="horizontal"
        items={[
            {
                label:<HomeFilled/>,
                key:""
            },
            {
                label:"Men",
                key:"men",
                children:[
                    {
                        label:"Men's Shirts",
                        key:" mens-Shirts"
                    },
                    {
                        label:"Men's Shoes",
                        key:" mens-shoes"
                    },
                    {
                        label:"Men's Watches",
                        key:"mens-watches"
                    },

                ]
            },
            {
                label:"Women",
                key:"women",
                children:[
                    {
                        label:"Women's Dresses",
                        key:"womens-dresses"
                    },
                    {
                        label:"Women's Shoes",
                        key:"womens-shoes"
                    },
                    {
                        label:"Women's Watches",
                        key:"womens-watches"
                    },

                ]
            },
            {
                label:"Fragrances",
                key:"fragrances"
            }
        ]}
         
        
        />
            <Typography.Title>Sabrin store</Typography.Title>
            <AppCart/>
        
        
        
        
        </div>
  )
}

function AppCart(){
    const [cartDrawerOpen,setCartDrawerOpne]=useState(false)
    const [chekcoutDrawerOpen,setchekcoutDrawerOpne]=useState(false)
    const [cartItem,setCartItem]=useState([])
    

    useEffect(() => {
        getCart().then((res) => {
            if (Array.isArray(res)) {
                setCartItem(res);  // If the response is an array itself
            } else if (res.products) {
                setCartItem(res.products);  // If products are wrapped in a 'products' key
            } else {
                console.error("Unexpected response format:", res);
                setCartItem([]);  // Set an empty array to handle errors gracefully
            }
        });
    }, []);

    const onConfirmOrder=(values)=>{
        console.log({values})
        setCartDrawerOpne(false)
        setchekcoutDrawerOpne(false)
        message.success(" your order has been placed successfuly ")

    }
    
return(
    <div>
        
        <Badge onClick={()=>{
            setCartDrawerOpne(true)
        }} count={1}>
            <ShoppingCartOutlined className='shopingCartIcon'/>

            </Badge>
            <Drawer open={cartDrawerOpen} onClose={()=>{
                setCartDrawerOpne(false)
            }}
            title="Your cart"
            contentWrapperStyle={{width:500}}
            
            >
                <Table 
                pagination={false}
                
                columns={[
                 {

                    title:"Title",
                    dataIndex:"title"
                },
                {

                    title:"Price",
                    dataIndex:"price",
                    render:(value)=>{
                        return <span>${value}</span>
                    }

                },
                {   

                    title:"Quantity",
                    dataIndex:"quantity",
                    render:(value,record)=>{
                        return (<InputNumber
                         min={0} defaultValue={value}
                         onChange={(value)=>{
                            setCartItem((pre)=>
                                pre.map((cart)=>{
                                    if(record.id===cart.id){
                                        cart.total=cart.price * value;
                                    }
                                    return cart;
                                })
                            )
                         }}
                         
                         
                         
                         >

                        </InputNumber>
                        )
                    }
                },
                {

                    title:"Total",
                    dataIndex:"total",
                    render:(value)=>{
                        return <span>${value}</span>
                    }
                }
            
            
            ]}
            dataSource={cartItem}
            summary={(data)=>{
                const total=data.reduce((pre,current)=>{
                    return pre+current.total
                },0)
                return <span>Total : {total}</span>
            }}
                
                />
                <Button onClick={()=>setchekcoutDrawerOpne(true)} type='primary'>Checkout Your Cart</Button>
            </Drawer>
            <Drawer 
    open={chekcoutDrawerOpen}
    onClose={()=>{
        setchekcoutDrawerOpne(false)
    }}
    title="Confirm Order"
>
    <Form onFinish={onConfirmOrder}>
        <Form.Item
            name="full-name"
            label="Full name"
            rules={[{
                required: true,
                message: 'Please enter your full name',
            }]}
        >
            <Input placeholder='Enter your name..' />
        </Form.Item>

        <Form.Item
            name="email"
            label="Email"
            rules={[{
                required: true,
                type: 'email',
                message: 'Please enter your full email',
            }]}
        >
            <Input placeholder='Enter your email..' />
        </Form.Item>

        <Form.Item
            name="address"
            label="Address"
            rules={[{
                required: true,
                message: 'Please enter your full address',
            }]}
        >
            <Input placeholder='Enter your address..' />
        </Form.Item>

        <Form.Item>
            <Checkbox defaultChecked disabled>Cash on Delivery</Checkbox>
        </Form.Item>

        <Typography.Paragraph type='secondary'>
            More methods coming soon
        </Typography.Paragraph>

        <Button className='btn-order' type='primary' htmlType='submit'>
            Confirm Order
        </Button>
    </Form>
</Drawer>


    </div>
)
}

export default AppHeader