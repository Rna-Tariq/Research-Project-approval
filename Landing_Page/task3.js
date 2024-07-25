document.addEventListener('DOMContentLoaded', () => {
    const showDetailsButtons = document.querySelectorAll('.show-details');
    
    showDetailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const extraDetails = button.nextElementSibling;
            if (extraDetails.style.display === 'none' || extraDetails.style.display === '') {
                extraDetails.style.display = 'block';
                button.textContent = 'Hide Details';
            } else {
                extraDetails.style.display = 'none';
                button.textContent = 'Show Details';
            }
        });
    });
});
