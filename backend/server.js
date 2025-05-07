import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/mongodb.js";
import cors from "cors";
import express from "express";
import orderRouter from "./routes/orderRoute.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";

// App Config
const app = express()
const port = process.env.PORT || 4000 
connectDB()
connectCloudinary()


// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


app.get('/',(req,res)=>{
res.send("API Working")
})

app.listen(port, ()=> console.log('Server started on PORT : '+ port))