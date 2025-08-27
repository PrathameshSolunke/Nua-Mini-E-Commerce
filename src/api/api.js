import axios from 'axios'
const BASE = 'https://fakestoreapi.com'

export async function fetchProducts(){
  const res = await axios.get(BASE + '/products')
  return res.data
}
export async function fetchCategories(){
  const res = await axios.get(BASE + '/products/categories')
  return res.data
}
export async function fetchProductById(id){
  const res = await axios.get(BASE + '/products/' + id)
  return res.data
}
