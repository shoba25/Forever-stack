import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cheerio = require('cheerio');
import fetch from 'node-fetch';



 // function for add product
const addProduct = async (req,res) => {
     try {

        const {name,description,price,category,subCategory,sizes,bestseller} = req.body

        const image1 = req.files.image1 && req.files.image1 [0]
        const image2 = req.files.image2 && req.files.image2 [0]
        const image3 = req.files.image3 && req.files.image3 [0]
        const image4 = req.files.image4 && req.files.image4 [0]

        const images = [image1,image2,image3,image4].filter((item)=> item !== undefined)
       
        

          let imagesUrl = await Promise.all(
                images.map(async (item) => {
                   let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                   return result.secure_url
     })
    )
         
        const productData = {
          name,
          description,
          category,
          price: Number(price),
          subCategory,
          bestseller: bestseller === "true" ? true : false,
          sizes: JSON.parse(sizes),
          image: imagesUrl,
          date: Date.now()
  
         }
  
         console.log(productData);
  
         const product = new productModel(productData);
         await product.save()
       
        res.json({success: true, message: "Product Added"})
} catch (error) {
        console.log(error)
        res.json({success: false, message:error.message})
}    
     }
    
//function for list product
const listProducts = async (req,res) => { 
    try {
      const products = await productModel.find({});
      res.json({success:true,products})
    } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
      
    }


}

//function for remove product
const removeProduct = async (req,res) => {
   try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({success: true, message:"Product Removed"})
   } catch (error) {
    console.log(error)
      res.json({success:false,message:error.message})
   }
}

//function for single product
const singleProduct = async (req,res) => {
  try {
   const  { productId } = req.body
   const product = await productModel.findById(productId)
   res.json({success: true,product})
  } catch (error) {
    console.log(error)
      res.json({success:false,message:error.message})
  }
}

const compareProduct = async (req, res) => {
  const { query } = req.query;
  const url = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
  const scraperUrl = `http://api.scraperapi.com?api_key=48ac6bbf0dcaa5fd8e52dd64e6f736a4&url=${encodeURIComponent(url)}`;

  try {
    const response = await fetch(scraperUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    const $ = cheerio.load(data);
    const firstProduct = $('._75nlfW').first();

    const name = firstProduct.find('.wjcEIp').first().text();
    const price = firstProduct.find('.Nx9bqj').first().text();

    res.json({ name, price });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err,error: 'Failed to scrape Flipkart' });
  }
};


export {listProducts , addProduct , singleProduct , removeProduct, compareProduct}


