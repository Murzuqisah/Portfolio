// Live reload for development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    let lastModified = null;
    
    setInterval(() => {
        fetch(window.location.href, { method: 'HEAD' })
            .then(response => {
                const modified = response.headers.get('Last-Modified');
                if (lastModified && modified !== lastModified) {
                    window.location.reload();
                }
                lastModified = modified;
            })
            .catch(() => {});
    }, 1000);
}
