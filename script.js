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
        // Send the form data to the backend server
        const response = await fetch('https://your-backend-endpoint.com/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Show success message
            alert('Thank you for contacting us! Your message has been sent.');
            contactForm.reset(); // Clear the form
        } else {
            // Handle errors
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
