import React from 'react'

function DiscountProduct({img, title, discountCode}) {
  return (
    <div onClick={()=> alert(`Discosunt code for ${title} is ${discountCode}`)} className='flex flex-col items-center mx-1 my-3' >
        <img className='shadow-lg shadow-gray-400 w-[114px] h-[114px]	' src={img} alt="discount_logo" />
        <h5 className='text-[#652666] text-[16px] font-[400] ' >{title}</h5>
    </div>
  )
}

export default DiscountProduct