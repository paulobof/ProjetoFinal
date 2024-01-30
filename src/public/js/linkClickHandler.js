async function handleLinkClick(event, endpoint, method) {
    event.preventDefault();

    await fetch(endpoint, {
        method: method,
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {            
            window.location.href = endpoint;
        } else {
            return response.text();
        }
    })    
    .catch(error => {
        console.error('Request error:', error);
    });
}

async function handleLogout() {
    await fetch('/logout', { method: 'POST' })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .then(data => {
            if (data && data.success) {
                window.location.href = '/';
            } else {
                console.error('Logout failed:', data);
            }
        })
        .catch(error => {
            console.error('Logout error:', error);
        });
}

