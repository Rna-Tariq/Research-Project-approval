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

    const inviteForm = document.getElementById('inviteForm');
    inviteForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        // Implement the logic to send the invitation email here.
        alert(`Invitation sent to ${email}`);
        inviteForm.reset();
    });

    assignDueDates();
});

function assignDueDates() {
    const cards = document.querySelectorAll('.card');
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
    
    cards.forEach((card, index) => {
        const priority = card.getAttribute('data-priority');
        const dependencies = card.getAttribute('data-dependencies').split(',');
        
        let dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + (priority * 2)); // Assign due date based on priority
        
        // Adjust due date if there are dependencies
        dependencies.forEach(dependency => {
            const dependentCard = Array.from(cards).find(c => c.querySelector('h3').textContent.trim() === dependency.trim());
            if (dependentCard) {
                const dependentDueDate = new Date(dependentCard.querySelector('.due-date').textContent);
                if (dueDate <= dependentDueDate) {
                    dueDate = new Date(dependentDueDate);
                    dueDate.setDate(dueDate.getDate() + 2); // Add buffer time after dependency
                }
            }
        });
        
        card.querySelector('.due-date').textContent = dueDate.toDateString();
    });
}
