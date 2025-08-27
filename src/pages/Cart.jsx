import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateQty, removeFromCart } from '../store/cartSlice'
import { Link, useNavigate } from 'react-router-dom'

export default function Cart(){
  const items = useSelector(s => s.cart.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const total = items.reduce((a,b)=> a + b.product.price * b.qty, 0).toFixed(2)

  if(items.length === 0){
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">Your cart is empty.</p>
        <Link to="/" className="btn btn-primary mt-4">Go shopping</Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Shopping Cart</h2>
      <div className="space-y-3">
        {items.map(i => (
          <div key={i.product.id} className="card p-3 flex items-center gap-3">
            <img src={i.product.image} className="w-16 h-16 object-contain" alt="" />
            <div className="flex-1">
              <div className="font-medium line-clamp-1">{i.product.title}</div>
              <div className="text-sm text-gray-600">${i.product.price} each</div>
            </div>
            <select
              className="select"
              value={i.qty}
              onChange={(e)=>dispatch(updateQty({ id: i.product.id, qty: Number(e.target.value) }))}
            >
              {Array.from({length:10}, (_,k)=>k+1).map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <div className="w-24 text-right font-semibold">${(i.product.price * i.qty).toFixed(2)}</div>
            <button className="btn btn-outline" onClick={()=>dispatch(removeFromCart(i.product.id))}>Remove</button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">Grand total: ${total}</div>
        <button className="btn btn-primary" onClick={()=>navigate('/checkout')}>Proceed to Checkout</button>
      </div>
    </div>
  )
}
