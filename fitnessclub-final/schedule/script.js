document.querySelectorAll('.day').forEach(day => {
    day.addEventListener('click', function() {
        document.querySelectorAll('.day').forEach(d => {
            d.classList.remove('active');
            d.classList.add('inactive');
        });
        day.classList.remove('inactive');
        day.classList.add('active');
        showExercises(day.id);
    });
});

function showExercises(dayId) {
    const exercisesDiv = document.getElementById('exercises');
    exercisesDiv.style.display = 'block';

    const exercises = {
        monday: [
            { name: 'Body Combat', time: '11:00-12:00', advantage: 'Builds strength and stamina', level: 'Intermediate' },
            { name: 'Yoga', time: '12:00-13:00', advantage: 'Improves flexibility', level: 'Beginner' },
            { name: 'HIIT', time: '13:00-14:00', advantage: 'Boosts cardio fitness', level: 'Advanced' },
        ],
        // Add similar content for other days
    };

    exercisesDiv.innerHTML = exercises[dayId].map(exercise => `
        <div class="exercise-item">
            <div class="exercise-details">
                <h3>${exercise.name}</h3>
                <p><span class="time-icon">⏰</span> ${exercise.time}</p>
                <p>${exercise.level}</p>
                <p>Benefit: ${exercise.advantage}</p>
            </div>
        </div>
    `).join('');
}
document.querySelectorAll('.day').forEach(day => {
    day.addEventListener('click', function() {
        const selectedDayId = this.getAttribute('data-day');

        // Hide all exercise days
        document.querySelectorAll('.exercise-day').forEach(exerciseDay => {
            exerciseDay.style.display = 'none';
        });

        // Show the selected day's exercises
        document.getElementById(selectedDayId + '-videos').style.display = 'block';
    });
});
document.querySelectorAll('.day').forEach(day => {
    day.addEventListener('click', function() {
        const selectedDayId = this.getAttribute('data-day');

        // Hide all exercise days
        document.querySelectorAll('.exercise-day').forEach(exerciseDay => {
            exerciseDay.style.display = 'none';
        });

        // Show the selected day's exercises
        document.getElementById(selectedDayId + '-videos').style.display = 'block';
    });
});

// Show Monday videos by default when the page loads
document.getElementById('monday-videos').style.display = 'block';
