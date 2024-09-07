import { Badge, Button, Card, Image, List, message, Rate, Spin, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { addToCart, getAllProducts, getProductsByCategory } from './api/Api'
function Products() {
  const [items,setItems]=useState([])
  const[loading,setLoading]=useState(false)
const Param=useParams()

// useEffect(()=>{
//   getProductsByCategory(Param.categoryId)
//    .then((res)=>{
//     setItems(res.products)
//   })
// },[Param])


useEffect(() => {
  setLoading(true);

  const fetchProducts = Param?.categoryId 
      ? getProductsByCategory(Param.categoryId)
      : getAllProducts();

  fetchProducts
      .then(products => {
          // Assuming the response contains an array of products directly
          if (products && Array.isArray(products)) {
              setItems(products);
          } else {
              console.error('No products found or invalid format:', products);
              setItems([]); // Safeguard: set an empty array to avoid render errors
          }
      })
      .catch(error => {
          console.error('Error fetching products:', error);
          setItems([]); // Handle errors gracefully
      })
      .finally(() => {
          setLoading(false);
      });
}, [Param]); // React to changes in Param



if(loading){
  return <Spin spinning/>
}





  return <div>
    <List 
    grid={{column:3}}
    renderItem={(product,index)=>{
      return<Badge.Ribbon className='itemCardBadge'
      text={product.discountPercentage}
      color="pink"
      > 

     
      
      <Card 
      className='item-card'
      title={product.title} 
      key={index} 
      cover={<Image className='item-image-card' src={product.thumbnail} />}
      actions={[<Rate allowHalf  disabled value={product.rating}/>,
         <AddToCartButton item={product}/>
        
        ]}
      >
        <Card.Meta 
        title={
        <Typography.Paragraph>
          price:${product.price}{"   "}
          <Typography.Text delete type="danger">
            ${
              parseFloat(
                product.price+  (product.price * product.discountPercentage)
              ).toFixed(2)
            }


          </Typography.Text>
        </Typography.Paragraph>

          }
          description={<Typography.Paragraph ellipsis={{rows:2,expandable:true, symbol:"more"}} >{product.description} </Typography.Paragraph>     
              }
        ></Card.Meta>


      </Card>
      </Badge.Ribbon>
    }} dataSource={items}>
      
    </List>
    
    
  </div>
  
}

function AddToCartButton({item}){
  const [loading,setLoading]=useState(false)
  const addProdutToCart=()=>{
    setLoading(true)
    addToCart(item.id).then(res=>{
      message.success(`${item.title} has been added  to cart`)
      setLoading(false)
    })
  }
  return <Button type='link' onClick={()=>{
    addProdutToCart()
  }}
  loading={loading}
  
  >add to cart</Button>;


}

export default Products