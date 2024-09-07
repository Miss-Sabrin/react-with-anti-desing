import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Category from '../../pages/Category'
function IndexRoute() {
  return <Routes>
    <Route path='/'element={<Category/>}/>
    <Route path='/:categoryId'element={<Category/>}/>
  </Routes>
   
  
}

export default IndexRoute