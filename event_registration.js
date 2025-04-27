/*
		Your Name: <Andrea Buckler>
		Last Modified Date: <05/07/2024>
		File: event_registration.js
		File Description: <The purpose of this file is to start a timer of 10 minutes. The user must choose the amount of 
        tickets to purchase within 10 minutes. If the timer expires the user's page will refresh back to the start to have 
        the user choose the amount of tickets they want again. If the amount of tickets is correct the user will be asked
        for a name and email to purchase the tickets. If any of the fields are not filled in correctly the user will receive an error.
        Once the form is filled out correctly, the user will recieve an alert confirming the purchase and providing a total cost of
        the tickets.>
*/

// Set the minimum and maximum number of tickets able to be purchased
var minTickets = 1;
var maxTickets = 3;
// Set variables for the ticket cost
var costPerTicket = 5.00;
var ticketSurcharge = 0.50;

/*** YOUR CODE STARTS BELOW HERE ***/
// Timer function that updates the timer every second.  Once timer reaches "0" an alert with a click of "ok" resets the form
function myTimer(duration, display) {
    var startTime = Date.now();

    function updateTimer() {
        var elapsed = Date.now() - startTime;
        var remaining = duration - elapsed;

        if (remaining <= 0) {
            clearInterval(timerInterval);
            alert("Time has expired! Once you click OK you will be redirected back to the beginning!");
            window.location.href = "https://cmst388-abuckler4.azurewebsites.net/project3/event_registration.html";
        } else {
            var minutes = Math.floor(remaining / (1000 * 60));
            var seconds = Math.floor((remaining % (1000 * 60)) / 1000);
            display.textContent = 'Time Remaining: ' + pad(minutes) + ':' + pad(seconds);
        }
    }

    function pad(value) {
        return value < 10 ? '0' + value : value;
    }

    updateTimer(); // Displays timer immediately

    var timerInterval = setInterval(updateTimer, 1000); // Update timer display every second
}

// The timer will start when you open the web page with an onload function
window.onload = function() {
    var timerDisplay = document.getElementById('timer');
    myTimer(10 * 60 * 1000, timerDisplay); // Start timer for 10 minutes and counts down per second
};

// Function to calculate total cost based on the number of tickets + fee per ticket
function calculateTotal() {
    var numTicketsInput = document.getElementById('numTickets');
    var totalCostInput = document.getElementById('totalCost');
    var contactInfoDiv = document.getElementById('contactInformation');
    var numTickets = parseInt(numTicketsInput.value);
    
    if (isNaN(numTickets) || numTickets < minTickets || numTickets > maxTickets) {// This uses the var minTickets and maxTickets preset by the teacher
        document.getElementById('msgTickets').textContent = 'Please enter a valid number between 1 and 3.';
        numTicketsInput.style.backgroundColor = 'yellow';// This will set the color to yellow if more then 3 tickets are put into the field
        contactInfoDiv.style.display = 'none';// This will not allow the contact info to display if an error occurs in the ticket field
        totalCostInput.value = '$0.00';// This shows the cost of the tickets as zero if too many tickets are put into ticket field
    } else {
        document.getElementById('msgTickets').textContent = '';
        numTicketsInput.style.backgroundColor = '';//This will reset the background color back to blank if an error occured with too many tickets
        const ticketPrice = 5.00;
        const processingFee = 0.50;
        const totalCost = (ticketPrice * numTickets) + processingFee; // This adds the ticket price * the number of tickets and adds the processing fee for each ticket
        totalCostInput.value = '$' + totalCost.toFixed(2);//This will add the dollar sign to the total cost of the tickets.

        // If there are no errors this will display the contact info section
        contactInfoDiv.style.display = 'block';
    }
}

// Function to validate form and complete purchase
function completePurchase() {
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var msgName = document.getElementById('msgname');
    var msgEmail = document.getElementById('msgemail');
    var numTicketsInput = document.getElementById('numTickets');
    var msgTickets = document.getElementById('msgTickets');
    var totalCostInput = document.getElementById('totalCost');

    // Resets error messages
    msgName.textContent = '';
    msgEmail.textContent = '';
    msgTickets.textContent = '';

    var errors = false;

    // This will validate name
    if (nameInput.value === '') {
        msgName.textContent = 'Please enter your name.';
        errors = true;
    }

    // This will validate email
    if (emailInput.value === '') {
        msgEmail.textContent = 'Please enter your email.';
        errors = true;
    }

    // This will validate number of tickets.  If the number of tickets are > 3 an alert will show informing customer to correct the amount of tickets selected
    var numTickets = parseInt(numTicketsInput.value);
    if (isNaN(numTickets) || numTickets < 1 || numTickets > 3) {
        msgTickets.textContent = 'Please enter a valid number between 1 and 3.';
        errors = true;
    }

    if (!errors) {// This if statement says if there are no errors continue with purchase
        // This is the alert that confirms the purchase of tickets and displays the total amount as long as no errors are present.
        alert('Thank you for your purchase! Total cost: ' + totalCostInput.value);
        document.getElementById('contact').reset(); // Resets form, clearing all fields
    }
}