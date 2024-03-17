
// Ready function, runs the js code when the page loads
$(function () {
    saveMovies();
});

// Fetch movies dropdown list from server
function saveMovies() {
    $.get("/saveMovies", function (movies) {
        formatMovies(movies);
    });
}

// Format movies dropdown list
function formatMovies(movies) {
    let defaultValue = "Choose movie here";
    let out = "<select id='selectedMovie' onchange='validateMovies()'>";
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
    $("#selectedMovie").val("default");
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

// Deletes all tickets
function deleteTickets() {
    $.get("/deleteTickets", function () {
        getTickets();
    });
}

// Input validation and check for empty fields
function validateMovies() {
    const movies = $("#selectedMovie").val();
    const moviesErrBorder = $("#selectedMovie");
    const moviesErr = $("#moviesErr");

    if (movies === "" || movies === "default") {
        moviesErr.text("Movie is required");
        moviesErrBorder.css("border-color", "red");
    } else {
        moviesErr.text(""); // Empty field
        moviesErrBorder.css("border-color", "");
    }
}

function validateNumber() {
    const number = $("#number").val();
    const numberErrBorder = $("#number");
    const numberErr = $("#numberErr");

    if (number === "") {
        numberErr.text("Quantity is required");
        numberErrBorder.css("border-color", "red");
    } else if (isNaN(number) || number < 1) {
        numberErr.text("Enter numbers");
        numberErrBorder.css("border-color", "red");
    } else {
        numberErr.text("");
        numberErrBorder.css("border-color", "");
    }
}

function validateFname() {
    const fname = $("#fname").val();
    const fnameErrBorder = $("#fname");
    const fnameErr = $("#fnameErr");

    if (fname === "") {
        fnameErr.text("Name is required");
        fnameErrBorder.css("border-color", "red");
    } else {
        fnameErr.text("");
        fnameErrBorder.css("border-color", "");
    }
}

function validateSname() {
    const sname = $("#sname").val();
    const snameErrBorder = $("#sname");
    const snameErr = $("#snameErr");

    if (sname === "") {
        snameErr.text("Surname is required");
        snameErrBorder.css("border-color", "red");
    } else {
        snameErr.text("");
        snameErrBorder.css("border-color", "");
    }
}

function validateTel() {
    const telRegex = /^[0-9]{8}$/;

    const tel = $("#tel").val();
    const telErrBorder = $("#tel");
    const telErr = $("#telErr");

    if (tel === "") {
        telErr.text("Phone number is required");
        telErrBorder.css("border-color", "red");
    } else if (!telRegex.test(tel)) {
        telErr.text("Enter a valid phone number");
        telErrBorder.css("border-color", "red");
    } else {
        telErr.text("");
        telErrBorder.css("border-color", "");
    }
}

function validateEmail() {
    const emailRegex = /^[a-zA-Z0-9._%&+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const email = $("#email").val();
    const emailErrBorder = $("#email");
    const emailErr = $("#emailErr");

    if (email === "") {
        emailErr.text("Email address is required");
        emailErrBorder.css("border-color", "red");
    } else if (!emailRegex.test(email)) {
        emailErr.text("Enter a valid email address");
        emailErrBorder.css("border-color", "red");
    } else {
        emailErr.text("");
        emailErrBorder.css("border-color", "");
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