document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());

        formStatus.classList.remove('hidden');
        formStatus.textContent = 'Sending...';

        try {
            const response = await fetch('/routes/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject),
            });

            const result = await response.json();

            if (response.ok) {
                formStatus.textContent = result.message || 'Thank you! Your message has been sent successfully.';
                formStatus.classList.add('success');
                formStatus.classList.remove('error', 'hidden');
                form.reset();
            } else {
                throw new Error(result.error || 'Failed to send the message. Please try again later.');
            }
        } catch (error) {
            console.error('Error sending the message:', error);
            formStatus.textContent = error.message || 'An unexpected error occurred.';
            formStatus.classList.add('error');
            formStatus.classList.remove('success', 'hidden');
        }
    });
});