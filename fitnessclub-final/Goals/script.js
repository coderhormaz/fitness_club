// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('goal-form');
    const goalsList = document.getElementById('goals');
    const notificationsList = document.getElementById('notifications-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const goal = document.getElementById('goal').value;
        const deadline = document.getElementById('deadline').value;
        const reminderTime = document.getElementById('reminder-time').value;

        const goalItem = document.createElement('li');
        goalItem.textContent = `${goal} - Deadline: ${deadline}`;
        goalsList.appendChild(goalItem);

        const reminderDate = new Date(`${deadline}T${reminderTime}`);
        const now = new Date();
        const timeToReminder = reminderDate.getTime() - now.getTime();

        if (timeToReminder > 0) {
            setTimeout(() => {
                alert(`Reminder: Time to work on your goal: ${goal}`);
                const notification = document.createElement('li');
                notification.textContent = `Reminder: ${goal}`;
                notificationsList.appendChild(notification);
            }, timeToReminder);
        }
    });
});
