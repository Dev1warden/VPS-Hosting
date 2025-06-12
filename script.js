// Google Apps Script to handle form submission and send emails
function doPost(e) {
  try {
    // Parse the incoming JSON request
    const data = JSON.parse(e.postData.contents);

    // Extract form details
    const name = data.name;
    const email = data.email;
    const message = data.message;

    // Your Gmail address
    const recipient = "linuxfun.report@gmail.com";

    // Email subject and body
    const subject = `New Contact Form Submission from ${name}`;
    const body = `
      You have received a new message from the contact form:
      
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `;

    // Send email
    GmailApp.sendEmail(recipient, subject, body);

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Handle errors
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Select the contact form
const contactForm = document.getElementById('contactForm');

// Add event listener for form submission
contactForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        // Send the form data to the Google Apps Script backend
        const response = await fetch('https://script.google.com/macros/s/YOUR_WEB_APP_URL/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const result = await response.json();
            if (result.success) {
                // Show success message
                alert('Thank you for contacting us! Your message has been sent.');
                contactForm.reset(); // Clear the form
            } else {
                // Handle server-side errors
                alert('Oops! Something went wrong. Please try again later.');
            }
        } else {
            // Handle HTTP errors
            alert('Oops! Something went wrong. Please try again later.');
        }
    } catch (error) {
        // Handle network or other errors
        console.error('Error:', error);
        alert('An error occurred. Please check your internet connection and try again.');
    }
});

// Open Tawk.to Chat Widget on Button Click
document.getElementById('chat-support').addEventListener('click', function () {
    if (typeof Tawk_API !== 'undefined' && Tawk_API.maximize) {
        Tawk_API.maximize(); // Opens the Tawk.to chat widget
    } else {
        alert('Chat widget is not yet loaded. Please try again.');
    }
});
