import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../store/cartSlice'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Checkout(){
  const items = useSelector(s => s.cart.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const total = items.reduce((a,b)=> a + b.product.price * b.qty, 0).toFixed(2)

  const [form, setForm] = useState({ name:'', email:'', address:'' })
  const [touched, setTouched] = useState({})

  if(items.length === 0){
    return <div className="py-16">Cart empty. <Link to="/" className="text-indigo-700 underline">Go back</Link></div>
  }

  const errors = {
    name: !form.name.trim() ? 'Name is required' : '',
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? 'Valid email is required' : '',
    address: !form.address.trim() ? 'Address is required' : ''
  }
  const isValid = !errors.name && !errors.email && !errors.address

  const onPlace = () => {
    if(!isValid){
      toast.error('Please fix the highlighted fields')
      setTouched({ name:true, email:true, address:true })
      return
    }
    dispatch(clearCart())
    toast.success('Order placed! Redirecting...')
    setTimeout(()=> navigate('/'), 1400)
  }

  const fieldClass = (key) => `input ${touched[key] && errors[key] ? 'ring-2 ring-red-500 border-red-500' : ''}`

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 card p-5 space-y-3">
        <h3 className="text-lg font-semibold">Shipping details</h3>

        <div className="grid gap-3">
          <div>
            <label className="label">Full name</label>
            <input
              className={fieldClass('name')}
              value={form.name}
              onChange={(e)=>setForm({...form, name:e.target.value})}
              onBlur={()=>setTouched({...touched, name:true})}
              placeholder="Jane Doe"
            />
            {touched.name && errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="label">Email</label>
            <input
              className={fieldClass('email')}
              value={form.email}
              onChange={(e)=>setForm({...form, email:e.target.value})}
              onBlur={()=>setTouched({...touched, email:true})}
              placeholder="jane@example.com"
            />
            {touched.email && errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="label">Address</label>
            <textarea
              className={fieldClass('address') + ' min-h-[120px]'}
              value={form.address}
              onChange={(e)=>setForm({...form, address:e.target.value})}
              onBlur={()=>setTouched({...touched, address:true})}
              placeholder="Full address"
            />
            {touched.address && errors.address && <p className="text-sm text-red-600 mt-1">{errors.address}</p>}
          </div>

          <button className="btn btn-primary" onClick={onPlace}>Place Order (${total})</button>
        </div>
      </div>

      <div className="card p-5 space-y-2">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <div className="divide-y">
          {items.map(i => (
            <div key={i.product.id} className="py-2 flex items-center justify-between gap-3">
              <div className="text-sm">{i.product.title} x {i.qty}</div>
              <div className="font-medium">${(i.product.price * i.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="pt-2 flex items-center justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">${total}</span>
        </div>
      </div>
    </div>
  )
}
