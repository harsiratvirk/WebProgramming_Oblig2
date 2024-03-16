
// Ready function, runs the js code when the page loads
$(function () {
    saveMovies();
});

// Fetch movies dropdown list from the server
function saveMovies() {
    $.get("/saveMovies", function (movies) {
        formatMovies(movies);
    });
}

// Format movies dropdown list
function formatMovies(movies) {
    let defaultValue = "Choose movie here";
    let out = "<select id='selectedMovie'>";
    out += "<option value='default'>" + defaultValue + "</option>";

    for (const movie of movies) {
        out += "<option>" + movie.movies + "</option>";
    }
    out += "</select>";
    $("#movies").html(out);
}

// Function to handle the purchase of tickets
function buyTicket() {
    // Prevents the rest of the code from running if validation returns false
    if (!checkValidation()) {
        return;
    }

    // Creates a ticket object and sends it to the server
    const ticket = {
        movies: $("#selectedMovie").val(),
        number: $("#number").val(),
        fname: $("#fname").val(),
        sname: $("#sname").val(),
        tel: $("#tel").val(),
        email: $("#email").val(),
    };
    $.post("/saveTickets", ticket, function (tickets) {
        getTickets(tickets);
    });
    // Resets input fields after sending the ticket
    $("#selectedMovie").val("");
    $("#number").val("");
    $("#fname").val("");
    $("#sname").val("");
    $("#tel").val("");
    $("#email").val("");
}

// Fetch tickets from server
function getTickets() {
    $.get("/getTickets", function (tickets) {
        formatTickets(tickets);
    });
}

// Function to format tickets and display them
function formatTickets(tickets) {

    let out = "<table class='table table-striped'>" +
        "<tr><th>Movies</th><th>Number of tickets</th>" +
        "<th>Name</th><th>Surname</th><th>Phone number</th><th>Email</th></tr>";

    for (let pers of tickets) {
        out += "<tr>" +
            "<td>" + pers.movies + "</td>" +
            "<td>" + pers.number + "</td>" +
            "<td>" + pers.fname + "</td>" +
            "<td>" + pers.sname + "</td>" +
            "<td>" + pers.tel + "</td>" +
            "<td>" + pers.email + "</td>" +
            "</tr>";
    }
    $("#allTickets").html(out);
}

// Input validation and check for empty fields
function validateMovies() {
    const movies = $("#selectedMovie").val();
    const moviesErr = $("#moviesErr");

    if (movies === "" || movies === "default") {
        moviesErr.text("Movie is required");
    } else {
        moviesErr.text(""); // Resets field
    }
}

function validateNumber() {
    const number = $("#number").val();
    const numberErr = $("#numberErr");

    if (number === "") {
        numberErr.text("Quantity is required");
    } else if (isNaN(number) || number < 1) {
        numberErr.text("Enter numbers");
    } else {
        numberErr.text("");
    }
}

function validateFname() {
    const fname = $("#fname").val();
    const fnameErr = $("#fnameErr");

    if (fname === "") {
        fnameErr.text("Name is required");
    } else {
        fnameErr.text("");
    }
}

function validateSname() {
    const sname = $("#sname").val();
    const snameErr = $("#snameErr");

    if (sname === "") {
        snameErr.text("Surname is required");
    } else {
        snameErr.text("");
    }
}

function validateTel() {
    const tel = $("#tel").val();
    const telErr = $("#telErr");
    const telRegex = /^[0-9]{8}$/;

    if (tel === "") {
        telErr.text("Phone number is required");
    } else if (!telRegex.test(tel)) {
        telErr.text("Enter a valid phone number");
    } else {
        telErr.text("");
    }
}

function validateEmail() {
    const email = $("#email").val();
    const emailErr = $("#emailErr");
    const emailRegex = /^[a-zA-Z0-9._%&+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email === "") {
        emailErr.text("Email address is required");
    } else if (!emailRegex.test(email)) {
        emailErr.text("Enter a valid email address");
    } else {
        emailErr.text("");
    }
}

// Function to check if all validations pass
function checkValidation() {
    validateMovies()
    validateNumber();
    validateFname();
    validateSname();
    validateTel();
    validateEmail();

    // Returns true if no validation error, false otherwise
    const validationError =
        $("#moviesErr").text() ||
        $("#numberErr").text() ||
        $("#fnameErr").text() ||
        $("#snameErr").text() ||
        $("#telErr").text() ||
        $("#emailErr").text();
    return !validationError;
}


// Deletes all tickets
function deleteTickets() {
    $.get("/deleteTickets", function () {
        getTickets();
    });
}