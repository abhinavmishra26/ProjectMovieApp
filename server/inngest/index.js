import { Inngest } from "inngest";
import User from "../model/User.js";
import Booking from "../model/Booking.js"
import Show from "../model/Show.js"
import dotenv from "dotenv"
import { model } from "mongoose";
import sendEmail from "../config/nodemailer.js";
dotenv.config();
export const inngest = new Inngest({
  id: "movie-reservation-app",
  eventKey: process.env.INNGEST_EVENT_KEY, // 👈 required
});


const syncUserCreation=inngest.createFunction(
    {id:'sync-user-from-client'},
    {event:'clerk/user.created'},
    async({event})=>{
        const {id, first_name, last_name , email_addresses , image_url}=event.data;
        const userData={
            _id:id,
            email:email_addresses[0].email_address,
            name: first_name + ' ' +last_name,
            image:image_url
        }
        await User.create(userData);
    }
)

const  syncUserDeletion=inngest.createFunction(
    {id:'delete-user-with-clerk'},
    {event:'clerk/user.deleted'},
    async({event})=>{
        const {id}=event.data
        await User.findOneAndDelete({ _id: id });
    }
)

const syncUserUpdation=inngest.createFunction(
    {id:'update-user-from-clerk'},
    {event:'clerk/user.updated'},
    async({event})=>{
        const {id, first_name, last_name , email_addresses , image_url}=event.data;
        const userData={
            _id:id,
            email:email_addresses[0].email_address,
            name: first_name + ' ' +last_name,
            image:image_url
        }
        await User.findByIdAndUpdate(id, userData)

    }
)
const releaseSeatsAndDeleteBooking=inngest.createFunction(
    {id:"release-seats-delte-booking"},
    {event:"app/checkpayment"},
    async({event,step})=>{
        const tenMinutesLater=new Date(Date.now()+10*60*1000);
        await step.sleepUntil("wait-for-10-mintues",tenMinutesLater);

        await step.run("check-payment-status",async()=>{
            const bookingId=event.data.bookingId;
            const booking=await Booking.findById(bookingId)

            if(!booking.isPaid){
                const show=await Show.findById(booking.show);
                booking.bookedSeats.forEach((seat)=>{
                    delete show.occupiedSeats[seat]
                });
                show.markModified('occupiedSeats')
                await show.save()
                await Booking.findByIdAndDelete(booking._id)
            }
        })
    }
)


const sendBookingConfigurationEmai=inngest.createFunction(
    {id:"send-booking-confirmation-email"},
    {event:"app/show.booked"},
    async({event,step})=>{
        const {bookingId}=event.data;
        const booking=await Booking.findById(bookingId).populate({
            path:"show",
            populate:{path:"movie" ,model:"Movie"}
        }).populate("user");

await sendEmail({
    to:booking.user.email,
    subject:`Payment confirmation: "${booking.show.movie.title}" booked`,
     body: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
              <h2>Hey, ${booking.user.name}</h2>
              <p>Your booking for <strong style="color: #F84565;">"${
                booking.show.movie.title
              }"</strong> is confirmed.</p>
              <p>
                <strong>Date : </strong> ${new Date(
                  booking.show.showDateTime
                ).toLocaleDateString("en-US", {
                  timeZone: "Asia/Kolkata",
                })}<br/>
                <strong>Time : </strong> ${new Date(
                  booking.show.showDateTime
                ).toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" })}
              </p>
              <p>
                <strong>Seats : </strong> ${booking.bookedSeats.join(", ")}<br/>
                <strong>Total Tickets : </strong> ${
                  booking.bookedSeats.length
                }<br/>
                <strong>Total Amount : </strong> $${booking.amount}
              </p>
              <p>Enjoy the show! 🍿🥤</p>
              <p>Thanks for booking with us!<br/> - RJP's QuickShow Team</p>
            </div>`,

})
   }
)


// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation, syncUserDeletion,syncUserUpdation,releaseSeatsAndDeleteBooking,sendBookingConfigurationEmai];