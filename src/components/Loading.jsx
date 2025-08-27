import React from 'react'
export default function Loading({ text='Loading...' }){
  return (
    <div className="py-16 text-center text-gray-600">{text}</div>
  )
}
