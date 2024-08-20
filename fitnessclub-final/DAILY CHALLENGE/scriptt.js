document.addEventListener('DOMContentLoaded', () => {
    const challengeCards = document.querySelectorAll('.challenge-card');
    const rewardList = document.getElementById('reward-list');
    const restartButton = document.getElementById('restart-challenges');
    const completedChallenges = new Set(); // To track completed challenges

    challengeCards.forEach(card => {
        card.addEventListener('click', () => {
            const challengeId = card.id;
            if (completedChallenges.has(challengeId)) {
                undoChallenge(card);
            } else if (canCompleteChallenge(challengeId)) {
                completeChallenge(card);
            } else {
                alert("Please complete all previous challenges first!");
            }
        });
    });

    // Load completed challenges from localStorage
    loadCompletedChallenges();

    restartButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to restart the challenges?')) {
            restartChallenges();
        }
    });

    function canCompleteChallenge(currentId) {
        const currentDay = parseInt(currentId.replace(/\D/g, '')); // Extract day number from ID
        for (let i = 1; i < currentDay; i++) {
            if (!completedChallenges.has(`day${i}`)) {
                return false; // Previous challenge is not completed
            }
        }
        return true; // All previous challenges are completed
    }

    function completeChallenge(card) {
        // Add animations for completing the challenge
        card.classList.add('completed');
        card.style.backgroundColor = '#4CAF50'; // Green background for completed challenges
        card.style.color = '#fff';
        card.textContent += ' - Completed!';
        card.style.transition = 'all 0.5s ease';

        // Add reward
        addReward(card.id);
        completedChallenges.add(card.id); // Add to completed set
        saveCompletedChallenges();
    }

    function undoChallenge(card) {
        // Remove animations and styles for undoing the challenge
        card.classList.remove('completed');
        card.style.backgroundColor = '#2b2b2b'; // Reset background color
        card.style.color = '#e0e0e0'; // Reset text color
        card.textContent = card.textContent.replace(' - Completed!', '');

        // Remove reward
        removeReward(card.id);
        completedChallenges.delete(card.id); // Remove from completed set
        saveCompletedChallenges();
    }

    function addReward(challengeId) {
        const rewardItem = document.createElement('div');
        rewardItem.className = 'reward-item completed'; // Add 'completed' class for animation
        rewardItem.dataset.challengeId = challengeId; // Store challenge ID in data attribute
        rewardList.appendChild(rewardItem);

        // Reward animation is handled by CSS
    }

    function removeReward(challengeId) {
        const rewardItems = document.querySelectorAll('.reward-item');
        rewardItems.forEach(item => {
            if (item.dataset.challengeId === challengeId) {
                rewardList.removeChild(item);
            }
        });
    }

    function saveCompletedChallenges() {
        localStorage.setItem('completedChallenges', JSON.stringify(Array.from(completedChallenges)));
    }

    function loadCompletedChallenges() {
        const storedChallenges = JSON.parse(localStorage.getItem('completedChallenges'));
        if (storedChallenges) {
            storedChallenges.forEach(id => {
                const card = document.getElementById(id);
                if (card) {
                    completeChallenge(card);
                    completedChallenges.add(id);
                }
            });
        }
    }

    function restartChallenges() {
        // Remove all completed challenge styles and reset completed challenges
        challengeCards.forEach(card => {
            card.classList.remove('completed');
            card.style.backgroundColor = '#2b2b2b'; // Reset background color
            card.style.color = '#e0e0e0'; // Reset text color
            card.textContent = card.textContent.replace(' - Completed!', '');
        });

        rewardList.innerHTML = ''; // Clear all rewards
        completedChallenges.clear(); // Clear the set of completed challenges
        localStorage.removeItem('completedChallenges'); // Remove from localStorage
    }
});
