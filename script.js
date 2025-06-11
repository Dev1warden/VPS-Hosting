// Open Tawk.to Chat Widget on Button Click
document.getElementById('chat-support').addEventListener('click', function () {
    if (typeof Tawk_API !== 'undefined' && Tawk_API.maximize) {
        Tawk_API.maximize(); // Opens the Tawk.to chat widget
    } else {
        alert('Chat widget is not yet loaded. Please try again.');
    }
});
