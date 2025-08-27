import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

export default function App(){
  return (
    <div>
      <Header />
      <main className="container py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <footer className="py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Nua Mini Shop
      </footer>
    </div>
  )
}
