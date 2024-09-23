document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        body.classList.add(savedTheme);
        themeToggle.textContent = savedTheme === 'dark-theme' ? 'Light' : 'Dark';
    }

    function toggleTheme() {
        body.classList.toggle('dark-theme');

        // Update button text
        if (body.classList.contains('dark-theme')) {
            themeToggle.textContent = 'Light';
            localStorage.setItem('theme', 'dark-theme'); // Save preference
        } else {
            themeToggle.textContent = 'Dark';
            localStorage.setItem('theme', ''); // Clear theme preference
        }
    }

    themeToggle.addEventListener('click', toggleTheme);
});
