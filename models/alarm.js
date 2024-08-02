const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const bikeSchema = new Schema({
    // id:
    // {
    //     type:String,
    //     required:true
    // },
time: {
    hours:{
       type: Number,
       required:true
    },
    minutes:{
        type: Number,
        required:true
     },
},
message: {
type: String,
required: false
},
active: {
type: Boolean,
required: true
},
oneOff: {
    type: Boolean,
    required: true
    },
date: {
    type: Date,
    required: false
    },
daysOfWeek: {
    type: [Boolean],
    required: false
    },
}, { timestamps: true });



const Alarm = mongoose.model("alarm", bikeSchema);


module.exports = Alarm;