$(document).ready(function() {	

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCQ7y8_gXx5FRmrqEbbYqYXhNCRW4R_h8g",
    authDomain: "train-scheduler-6a241.firebaseapp.com",
    databaseURL: "https://train-scheduler-6a241.firebaseio.com",
    projectId: "train-scheduler-6a241",
    storageBucket: "train-scheduler-6a241.appspot.com",
    messagingSenderId: "58043364008"
  }
  firebase.initializeApp(config)

  var database = firebase.database();

  //  Button for adding train

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
 
 	var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  // Not sure about this code either
  // var firstTrainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  
var addTrain = {
    name: trainName,
    destination: trainDest,
    start: firstTrainTime,
    rate: frequency
  };

  // Uploads train data to the database
  
database.ref().push(addTrain);

  // Logs everything to console
  
	console.log(addTrain.name);
  console.log(addTrain.destination);
  console.log(addTrain.start);
  console.log(addTrain.rate);

  // Alert
  
alert("Train successfully added");

  // Clears all of the text-boxes
  
	$("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");

});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  
	var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().start;
  var frequency = childSnapshot.val().rate;

  // train Info
  
	console.log(trainName);
  console.log(trainDest);
  console.log(firstTrainTime);
  console.log(frequency);

  // Prettify the train start but not sure if this code is good
  
var firstTrainTimePretty = moment.unix(firstTrainTime).format("HH:mm");

  // Assuming:
    // The first train of the day comes in at 3:00 AM.
    // The train runs every 17 minutes
    // The current time is 7:12 PM.
    // There have been no delays and will be no delays.
    // Question:
    // How many minutes away is the next train?
  
// Assume the following situations.
    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away
    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away
    // ==========================================================
    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18
    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21
    // Assumptions
    var tFrequency = 3;
    // Time is 3:30 AM
    var firstTime = "03:30";
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Add each train's data into the table
  
$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  frequency + "</td><td>" + firstTrainTimePretty + "</td><td>" + frequency + "</td><td>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case



})