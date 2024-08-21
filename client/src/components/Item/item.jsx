import React from 'react'

export default function item(props) {
  return (
    <div className='flax'>
        <img src={props.image} alt={props.name} className='w-48 h-48 lg:size-64'/>
        <p className='m-[6px] w-48'>{props.name}</p>
        <div className='flex gap-x-5'></div>
        <p className='text-md font-semibold text-[#374151]'>{props.new_price}</p>
        <p className='text-md font-thin line-through text-[#8c8c8c]'>{props.old_price}</p>
    </div>
  )
}
