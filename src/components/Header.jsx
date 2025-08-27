import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header(){
  const location = useLocation()
  const count = useSelector(s => s.cart.items.reduce((a,b)=> a + b.qty, 0))
  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-40 border-b border-gray-100">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-xl font-semibold text-indigo-700">Nua Mini Shop</Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className={`px-3 py-1 rounded-lg ${location.pathname==='/'?'bg-indigo-50 text-indigo-700':'text-gray-700 hover:text-indigo-700'}`}>Products</Link>
          <Link to="/cart" className="relative text-gray-700 hover:text-indigo-700 px-3 py-1 rounded-lg">
            Cart
            <span className="ml-2 badge">{count}</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
