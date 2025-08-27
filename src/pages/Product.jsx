import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadProductDetail } from '../store/productsSlice'
import { addToCart } from '../store/cartSlice'
import Loading from '../components/Loading'

export default function Product(){
  const { id } = useParams()
  const dispatch = useDispatch()
  const product = useSelector(s => s.products.byId[id])
  const [qty, setQty] = useState(1)

  useEffect(()=>{
    if(!product) dispatch(loadProductDetail(id))
  }, [id])

  if(!product) return <Loading />

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card p-6">
        <div className="aspect-square w-full grid place-items-center bg-white rounded-xl">
          <img src={product.image} alt={product.title} className="max-h-96 object-contain" />
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-indigo-700">${product.price}</span>
          {product.rating?.rate !== undefined && <span className="badge">⭐ {product.rating.rate}</span>}
        </div>
        <p className="text-gray-700">{product.description}</p>

        <div className="flex items-center gap-3">
          <label className="label">Qty</label>
          <select className="select" value={qty} onChange={(e)=>setQty(Number(e.target.value))}>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <button className="btn btn-primary" onClick={()=>dispatch(addToCart({ product, qty }))}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
