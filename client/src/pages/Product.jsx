import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom'

export default function Product() {
  const {all_product} = useContext(ShopContext)
  const product_id = useParams().id
  const product = all_product.find((product) => product.id == product_id)
  return (
    <div>Product</div>
  )
}
