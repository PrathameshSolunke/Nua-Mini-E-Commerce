import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ p }){
  return (
    <Link to={`/product/${p.id}`} className="card p-4 hover:shadow-md transition-shadow group">
      <div className="aspect-square w-full bg-white grid place-items-center overflow-hidden rounded-xl border border-gray-50">
        <img src={p.image} alt={p.title} className="h-40 object-contain group-hover:scale-105 transition-transform" />
      </div>
      <div className="mt-3">
        <h4 className="line-clamp-2 min-h-[3rem] text-sm font-medium text-gray-800">{p.title}</h4>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-indigo-700 font-semibold">${p.price}</div>
          {p.rating?.rate !== undefined && <div className="text-xs text-gray-600">⭐ {p.rating.rate}</div>}
        </div>
      </div>
    </Link>
  )
}
