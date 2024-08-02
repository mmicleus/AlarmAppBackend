const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const bookingSchema = new Schema({
bookings: [{
            cost:Number,
            date:String,
            model:String,
            price:Number,
            quantity:Number,
            time:String}],
userDetails:{
    email:String,
    firstName:String,
    phone:String,
    surname:String
}
});



const Booking = mongoose.model("booking", bookingSchema);


module.exports = Booking;