$(document).ready(function () {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyC94u4nCRzLVGZW0mgfA-OnjEB_qkU3nb4",
        authDomain: "allison-project-d6fe7.firebaseapp.com",
        databaseURL: "https://allison-project-d6fe7.firebaseio.com",
        projectId: "allison-project-d6fe7",
        storageBucket: "allison-project-d6fe7.appspot.com",
        messagingSenderId: "968944378898",
        appId: "1:968944378898:web:59758a920920f828"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Create a variable to reference the database
    var database = firebase.database();
    var trains = database.ref("trains");
    // var trains = firebase.database().trains;

    // Clock function
    var intervalId;
    function update() {
        $('#clock').html("Current Time: " + moment().format('hh:mm:ss a'));
        clearInterval(intervalId);
        intervalId = setInterval(update, 1000);
    };
    update();


    // 2. Button for adding trains
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        // Grabs user input
        var trainName = $("#train-name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var trainStart = $("#first-train-time-input").val().trim();
        var trainFrequency = $("#frequency-input").val().trim();

        // Creates local "temporary" object for holding train data
        var newTrain = {
            name: trainName,
            destination: trainDestination,
            start: trainStart,
            frequency: trainFrequency
        };
        // Uploads train data to the database
        trains.push(newTrain);
        alert("Train successfully added");

        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-time-input").val("");
        $("#frequency-input").val("");
    });
    

    // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
    trains.on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainStart = childSnapshot.val().start;
        var trainFrequency = childSnapshot.val().frequency;

        // train Info
        // console.log(trainName);
        // console.log(trainDestination);
        // console.log(trainFrequency);
        // console.log(trainStart);

        // Prettify the train start
        // var trainStartPretty = moment.unix(trainStart).format("MM/DD/YYYY");

        // Calculate the months worked using hardcore math
        // To calculate the months worked
        // var empMonths = moment().diff(moment(trainStart, "X"), "months");
        // console.log(empMonths);

        // Calculate the total billed frequency
        // var empBilled = empMonths * trainFrequency;
        // console.log(empBilled);

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(trainStart),
            $("<td>").text(trainFrequency),
            $("<td>").text('Next arrival'),
            $("<td>").text('Minutes away')
        );

        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
    });


    //// Calculation
    var test = $('#testid');
    var currentTime = moment();

    // GET THE CHILD KEY!!
    var query = firebase.database().ref("trains").orderByKey();
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key; // GET THE CHILD KEY!!
                var childKey = childSnapshot.key;
                console.log("key: ", key);
                console.log("childKey: ", childKey); // GET THE CHILD KEY!!!!!!!!!!!!!!!
                console.log("value????????????", childSnapshot.val().name);
                test.html(childSnapshot.val().name);
                // Cancel enumeration
                // return true; // TRUE WILL STOP AFTER THE FIRST, OTHERWISE LOOPS THROUGH
            });
        });













});