import ProductItem from "../components/ProductItem";
import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const BestSeller = () => {

    const { products } = useContext(ShopContext);
    const [BestSellers,setBestSellers] = useState([]);

    useEffect(() =>{
         const BestProduct = products.filter((item) => (item.BestSellers));
         setBestSellers(products.slice(0,5))
    },[products]) 



  return (
    <div className='my-10'>
        <div className= 'text-center text-3xl py-8'>
            <Title text1= {'BEST'} text2= {'SELLERS'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the.

            </p>

        </div>

             {/* Rendering Products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            BestSellers.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />

            ))
          }
        </div>

      
    </div>
  )
}

export default BestSeller
