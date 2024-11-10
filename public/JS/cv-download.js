document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('download-cv-btn');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', handleDownload);
    }

    async function handleDownload(event) {
        const button = event.currentTarget;
        button.disabled = true;
        const originalContent = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';

        try {
            const response = await fetch('../public/images/Joel_Adero_CV.pdf');
            if (!response.ok) throw new Error('Failed to fetch CV');

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'Joel_Amos_CV.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading CV:', error);
            alert('Failed to download CV. Please try again later.');
        } finally {
            button.disabled = false;
            button.innerHTML = originalContent;
        }
    }
});