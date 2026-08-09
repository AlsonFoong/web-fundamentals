// Waiting for the whole page to load before doing anything
document.addEventListener('DOMContentLoaded', function() {
    
    // Grabbing all the HTML elements by their ID's
    const formElement = document.getElementById('feedback-form');
    const textAreaElement = document.getElementById('feedback-text');
    const errorText = document.getElementById('feedback-error');
    const successText = document.getElementById('feedback-success');
    const reviewsContainer = document.getElementById('reviews-container');
    
    // Getting all the star spans from the page
    const allStars = document.querySelectorAll('.star');
    
    let currentStarRating = 0; // Start with 0 stars
    
    // Looping through every star and add a click event listener
    for (let i = 0; i < allStars.length; i++) {
        allStars[i].addEventListener('click', function(event) {
            // Get the value of the star that was clicked
            currentStarRating = parseInt(event.target.getAttribute('data-value'));
            
            console.log("User clicked a star. Current rating is now: " + currentStarRating); // Debugging
            
            // Calling helper function to update the colors
            changeStarColors(currentStarRating);
        });
    }

    // Helper function to color the stars yellow or gray
    function changeStarColors(ratingNumber) {
        allStars.forEach(function(singleStar) {
            let starValue = parseInt(singleStar.getAttribute('data-value'));
            
            if (starValue <= ratingNumber) {
                singleStar.classList.add('active'); // Turn yellow
            } else {
                singleStar.classList.remove('active'); // Turn back to normal
            }
        });
    }

    // Render reviews from localStorage into the DOM
    function renderReviews() {
        if (!reviewsContainer) return;
        
        const feedbacksString = localStorage.getItem('vividlyFeedback');
        let feedbackArray = [];
        
        if (feedbacksString) {
            feedbackArray = JSON.parse(feedbacksString);
        }
        
        reviewsContainer.innerHTML = '';
        
        if (feedbackArray.length === 0) {
            reviewsContainer.innerHTML = '<p style="text-align:center; color:var(--text-color);">No feedback yet. Be the first!</p>';
            return;
        }
        
        feedbackArray.forEach(function(feedback) {
            const card = document.createElement('div');
            card.className = 'review-card';
            
            const starsDisplay = '★'.repeat(feedback.starsGiven) + '☆'.repeat(5 - feedback.starsGiven);
            
            card.innerHTML = `
                <div class="review-card-header">
                    <span class="review-author">${feedback.authorName}</span>
                    <span class="review-stars-display">${starsDisplay}</span>
                    <span class="review-date">${new Date(feedback.dateSubmitted).toLocaleDateString()}</span>
                </div>
                <p>${feedback.comment}</p>
            `;
            
            reviewsContainer.appendChild(card);
        });
    }

    // Handliung what happens when they click the submit button
    if (formElement) {
        formElement.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop the page from refreshing

            // Clearing any old messages on the screen
            errorText.innerText = '';
            successText.innerText = '';

            let typedFeedback = textAreaElement.value.trim();

            // First Validation: Checkin if they actually clicked a star
            if (currentStarRating === 0) {
                errorText.innerText = 'Error: You need to select a star rating first!';
                return;
            }

            // Second Validation: Checking if the text box is empty
            if (typedFeedback === '') {
                errorText.innerText = 'Error: Feedback text cannot be empty.';
                return;
            }

            // Getting the current logged-in user from LocalStorage
            let savedUserString = localStorage.getItem('vividlyCurrentUser');
            let activeUser = null;

            if (savedUserString) {
                activeUser = JSON.parse(savedUserString);
            } else {
                // If nobody is logged in, making a fake anonymous user
                activeUser = { 
                    name: 'Anonymous', 
                    email: 'No email provided' 
                };
            }

            // Making a new object to hold this specific feedback submission
            let newFeedbackObject = {
                authorName: activeUser.name,
                authorEmail: activeUser.email,
                starsGiven: currentStarRating,
                comment: typedFeedback,
                dateSubmitted: new Date().toString() // Save the exact time
            };

            // Getying the old feedbacks from LocalStorage so we don't delete them
            let oldFeedbacksString = localStorage.getItem('vividlyFeedback');
            let feedbackArray = []; // Empty array to start
            
            if (oldFeedbacksString) {
                feedbackArray = JSON.parse(oldFeedbacksString); // Turn string back into array
            }

            // Adding the new feedback to the end of the array
            feedbackArray.push(newFeedbackObject);
            
            // Saving the updated array back into LocalStorage as a string
            localStorage.setItem('vividlyFeedback', JSON.stringify(feedbackArray));
            
            successText.innerText = 'Thanks for submitting your feedback!';
            
            // Cleaning up the form for the next person
            formElement.reset();
            currentStarRating = 0;
            changeStarColors(0);
            
            // Re-render the reviews section with the new feedback
            renderReviews();
        });
    }
    
    // Render reviews when the page loads
    renderReviews();
});