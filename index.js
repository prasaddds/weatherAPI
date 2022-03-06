const express = require("express");
const https = require("https");
const bodyParser=require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function (req, res) {
    res.sendFile(__dirname+"/1.html")
})
app.post("/",function(req,res){

    const query=req.body.cityName
    const apikey="e0c0ed570ac0d82f9f9c3edd1565d1f5"
    const units="metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apikey + "&units="+units;
    https.get(url, function (response) {
        console.log(response)
        console.log(response.statusCode)
        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            console.log(temp);
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>Temperature in "+query + temp + " degrees celcius</h1>");
            res.write("<p>The temperature in " + query+ weatherDescription + "</p>")
            res.write("<img src=" + imgURL + ">")
            res.send()
        })
    })

})
app.listen(3000, function () {
    console.log("SErver is running on port 3000");
})