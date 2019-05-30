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



    var test = $('.test');
    test.html(moment().format());





    // 2. Button for adding trains
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        // Grabs user input
        var trainName = $("#train-name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var trainFrequency = $("#frequency-input").val().trim();
        // var trainStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");

        // Creates local "temporary" object for holding train data
        var newTrain = {
            name: trainName,
            destination: trainDestination,
            frequency: trainFrequency
            // start: trainStart,
        };

        // Uploads train data to the database
        database.ref().push(newTrain);

        // Logs everything to console
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.frequency);
        // console.log(newTrain.start);

        alert("Train successfully added");

        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-time-input").val("");
        $("#frequency-input").val("");
    });

    // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainFrequency = childSnapshot.val().frequency;
        // var trainStart = childSnapshot.val().start;

        // train Info
        console.log(trainName);
        console.log(trainDestination);
        console.log(trainFrequency);
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
            $("<td>").text(trainFrequency),
            $("<td>").text('Next arrival'),
            $("<td>").text('Minutes away')
            // $("<td>").text(trainStartPretty),
            // $("<td>").text(empMonths),
            // $("<td>").text(empBilled)
        );

        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
    });


//     <table class="table table-sm table-hover" id='train-table'>
//     <thead>
//         <tr>
//             <th scope="col">Train Name</th>
//             <th scope="col">Destination</th>
//             <th scope="col">Frequency (min)</th>
//             <th scope="col">Next Arrival</th>
//             <th scope="col">Minutes Away</th>
//         </tr>
//     </thead>
//     <tbody>
//     </tbody>
// </table>











    // Example Time Math
    // -----------------------------------------------------------------------------
    // Assume train start date of January 1, 2015
    // Assume current date is March 1, 2016

    // We know that this is 15 months.
    // Now we will create code in moment.js to confirm that any attempt we use meets this test case




















});