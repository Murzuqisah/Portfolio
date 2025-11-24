// pdf-render.js
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const requestedFile = params.get("file");

    if (!requestedFile) {
        document.getElementById("pdf-viewer").innerHTML =
            "<p>No file specified. Please go back and choose a document.</p>";
        return;
    }

    // Security check: allow only .pdf and only files inside /public
    if (!requestedFile.endsWith(".pdf")) {
        document.getElementById("pdf-viewer").innerHTML =
            "<p>Invalid file type. Only PDFs are allowed.</p>";
        return;
    }

    // Build the safe file path
    const pdfPath = `./pdf/${requestedFile}`;

    // Render inside iframe
    const iframe = document.createElement("iframe");
    iframe.src = pdfPath;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.style.border = "none";

    document.getElementById("pdf-viewer").appendChild(iframe);
});
