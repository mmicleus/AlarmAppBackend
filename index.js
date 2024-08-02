const dbURI = "mongodb+srv://miclemarian5:Nokia5230@wad.xrv0fe7.mongodb.net/AlarmApp?retryWrites=true&w=majority&appName=wad";
//const MY_EMAIL = 'bikerental98@gmail.com'
const mongoose = require("mongoose");
const express = require("express");
var cors = require('cors')
//const nodemailer = require('nodemailer');


// ---------------- body parser --------------
const bodyParser = require('body-parser');
// ---------------- body parser --------------



const Alarm = require("./models/alarm");
//const Bike = require("./models/alarm");

const app = express();

app.use(bodyParser.json());

// var corsOptions = {
//     origin: "https://mmicleus.github.io",
//     optionSuccessStatus:200
// }



app.use(cors())


//connecting to database
mongoose.connect(dbURI)
.then((result) => {
    // App listening on the below port
    app.listen(3000, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", 3000);
 });
    console.log("connected successfully!");

  //createAlarm();
});


function createAlarm(){

    const alarm = new Alarm({

        time: {
            hours:22,
            minutes:25
        },
        message:"Go To Sleep",
        active: false,
        oneOff:false,
        date:new Date(Date.UTC(2024,7,1)),
        daysOfWeek: [true,false,true,true,false,false,false],
        });


        alarm.save()
        .then((result) => console.log(result))
        .catch((error) => console.log(error));

}





//routing



    app.get("/alarms", (request, response) => {
        Alarm.find()
        .then((result) => {
            console.log(result)
            //console.log(result[0]._id.toString())
            response.send(result)
        })
        .catch((error) => console.log(error));
    });


    app.post("/alarms", (request, response) => {

        console.log(request.body);

        const alarm = new Alarm({

            time:{
                    hours:request.body.hour,
                    minutes:request.body.minute
                },
            message:request.body.name,
            active:request.body.enabled,
            oneOff:request.body.date == null ? false : true,
            date:request.body.date == null ? null : new Date(request.body.date),
            daysOfWeek:request.body.days_of_week
        });

            alarm.save()
            .then((result) => {
                
                console.log(result);
               // sendEmail(request.body.userDetails.email,request.body.bookings)
              //  response.statusCode=200;
            response.send(result);
            }
        )
            .catch((error) => console.log(error));
        })
        // Bike.find()
        // .then((result) => response.send(result))
        // .catch((error) => console.log(error));


    app.delete("/alarms", (request, response) => {
        console.log("id of deleted:")
        const id = request.body.id;


        Alarm.findByIdAndDelete(id)
        .then((result) => response.send("ok"))
            .catch((error) => console.log(error));


    });
    

    app.put("/alarms", (request, response) => {


        console.log(request.body)


       const alarm =  new Alarm({

            time:{
                    hours:request.body.hour,
                    minutes:request.body.minute
                },
            message:request.body.name,
            active:request.body.enabled,
            oneOff:request.body.date == null ? false : true,
            date:request.body.date == null ? null : new Date(request.body.date),
            daysOfWeek:request.body.days_of_week
        });

        const newAlarmData = {

            time:{
                hours:alarm.time.hours,
                minutes:alarm.time.minutes
            },

            message:alarm.message,
            active:alarm.active,
            oneOff:alarm.oneOff,
            date:alarm.date,
            daysOfWeek:alarm.daysOfWeek
        }


    
        //parse it into two separate objects: the blog new details and the ID
        // const newAlarmData = { 
        //                         time:{
        //                             hours:alarm.time.hours,
        //                             minutes:
        //                         },
        //                     message:request.body.name,
        //                     active:request.body.enabled,
        //                     oneOff:request.body.date == null ? false : true,
        //                     date:request.body.date == null ? null : new Date(request.body.date),
        //                     daysOfWeek:request.body.days_of_week
        //                      }
        const id = { _id: request.body.id };
        Alarm.findOneAndUpdate(id, newAlarmData)
        .then((result) => {
        Alarm.findById(id)
        .then(result => response.send("ok"))
        })
        .catch((error) => console.log(error));
     
    });


    


