//jshint esversion:6
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
//** it is written to use ejs module ,1st install  ejs ,write node install ejs in hyperterminal
app.set("view engine", "ejs");

//**it is written to use public folder where css files are present it may also contain css folder javascript folder and images file
app.use(express.static("public"));

var items = [];
var workItems = []; //** for storing the items in workfield

app.get("/", function(req, res) {
  // res.send("hello");
  //** method that gives today's Date
  //** todat.getDay() --> gives today's day as a number,0 -sunday, 1- monday
  //** we can do some processing before sending something to browser
  var today = new Date();
  //** when the server sees the res.send() method ,it sees it as final sending line
  //** we can alse send html line
  //** we can send only one html lines using send()
  //** to send mutliple lines use write()
  //** what if we want to send a html file

  //** with ejs what we can do is that we can create a template and pass some parameters each time
  //** and based on that condition html page is displayed
  // var day = "";
  //**
  //if(currentDay.getDate() == 6 || currentDay.getDate()==0)
  //{
  //  day="Weekend";
  // res.send("<h1>it is weekend</h1>");
  //}
  //else
  //{
  //day="Weekday"
  //**we can send html file based on condition
  // res.sendFile(__dirname + "/index.html");
  // res.send("<h1>it is week day</h1>");
  //}

  //** this line wrt ejs means that render the file list.css in views folder
  //** send a key:value pair
  //** the value is the data that we send from here and key is the variable that has to be changed in ejs (i.e css file)
  // var currentDay = today.getDay();
  // console.log(currentDay);
  //** kindOfDay will be replaced with value of day in ejs file
  // switch (currentDay) {
  //   case 0:
  //     day = "Sunday";
  //     break;
  //   case 1:
  //     day = "Monday";
  //     break;
  //   case 2:
  //     day = "Tuesday";
  //     break;
  //   case 3:
  //     day = "Wednesday";
  //     break;
  //   case 4:
  //     day = "Thursday";
  //     break;
  //   case 5:
  //     day = "Friday";
  //     break;
  //   case 6:
  //     day = "Saturday";
  //     break;
  //   default:
  //     day = "Error";
  // }


  //using javascript to get date and day
  //creating a javascript object named options
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day = today.toLocaleDateString("en-US", options);
  res.render("list", {
    listTitle: day,
    newListItem: items
  });

});
//** to process the data sent by the form's text field ,we need to have app.post method
//** the browser is posting something,we need to have a method to process that
app.post("/", function(req, res) {

  // console.log(req.body);
  let item = req.body.newItem;
  //**before adding work page
  // var item=req.body.newItem;//** newItem is the name given to text field and is also the new item that has to be added
  // //** so we need to send this item to the list.ejs
  // // console.log(item);
  // items.push(item);
  // res.redirect("/");

  //**now afeter adding work page
  //**we need to check if the button was submitted from normal page or work page
  if (req.body.button === "Work") {
    // console.log("in work");
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

//** for adding items in the work page
//**when we type localhost:3000/work ,the server makes request to access work page
//**so we
app.get("/work", function(req, res) {
  res.render("list", { //** by using this line it means whenever /work is requested ,send response list ejs file
    listTitle: "Work List", //**title as work list
    newListItem: workItems //**array to be sent is workItems
  });
});
//**ejs file has a form and the details filled in that form is sent in req field
app.post("/work", function(req, res) {
  let item = req.body.newItem; //** taking the data filled in form
  workItems.push(item); //** pushing the new item added to workItems array

  res.redirect("/work"); //** redirected to app.get(/work ....) to display ejs i.e html file with updated item
});
app.listen(3000, function() {
  console.log("Server running on port 3000");
});
