document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        formStatus.textContent = 'Sending...';
        formStatus.classList.remove('hidden', 'text-red-500', 'text-green-500');
        formStatus.classList.add('text-blue-500');

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.classList.remove('text-blue-500');
                formStatus.classList.add('text-green-500');
                form.reset();
            } else {
                throw new Error(result.error || 'Something went wrong');
            }
        } catch (error) {
            formStatus.textContent = error.message;
            formStatus.classList.remove('text-blue-500');
            formStatus.classList.add('text-red-500');
        }
    });
});