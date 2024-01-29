function handleLinkClick(event, endpoint, method) {
    event.preventDefault();

    fetch(endpoint, {
        method: method,
        credentials: 'include',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })    
    .catch(error => {
        console.error('Request error:', error);
    });
}

function handleLogout() {
    fetch('/logout', { method: 'POST' })
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

