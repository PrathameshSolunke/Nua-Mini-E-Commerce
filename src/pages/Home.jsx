import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadProducts, loadCategories } from '../store/productsSlice'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'

export default function Home(){
  const dispatch = useDispatch()
  const { list, status, error, categories } = useSelector(s => s.products)
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('all')

  useEffect(()=>{
    if(status === 'idle') dispatch(loadProducts())
    if(categories.length === 0) dispatch(loadCategories())
  },[])

  const filtered = useMemo(()=>{
    let arr = list
    if(cat !== 'all') arr = arr.filter(p => p.category === cat)
    if(query.trim()) arr = arr.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
    return arr
  }, [list, cat, query])

  if(status === 'loading') return <Loading />
  if(status === 'failed') return <div className="text-center text-red-600 py-10">Error: {error}</div>

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className="input"
          placeholder="Search by title..."
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
        />
        <select className="select" value={cat} onChange={(e)=>setCat(e.target.value)}>
          <option value="all">All categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  )
}
