import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from "./routes/showRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import adminRouter from "./routes/adminRouter.js";
import userRouter from "./routes/userRouter.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";


const port=3000
const app=express()
await connectDB();


app.use("/api/stripe",express.raw({type:"application/json"}), stripeWebhooks)



app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())


app.get("/",(req,res)=>{
    res.send("Server is Live!")
})
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/show",showRouter);
app.use("/api/booking",bookingRouter)
app.use("/api/admin",adminRouter)

app.use("/api/user",userRouter)


app.listen(port,()=>{
    console.log(`Server is runnning at port ${port} `)
})