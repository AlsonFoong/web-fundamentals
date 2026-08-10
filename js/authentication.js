// Waits until HTML file has loaded beforee running everything in here
document.addEventListener('DOMContentLoaded', () => {
    // Creates variables for relevant stuff using the ID from HTML file
    const loginForm = document.getElementById('login-form');
    const loginPanel = document.getElementById('login-box');
    const showLoginLink = document.getElementById('show-login');
    const signupForm = document.getElementById('signup-form');
    const signupPanel = document.getElementById('signup-box');
    const showSignupLink = document.getElementById('show-signup');
    const authSection = document.getElementById('auth-section');
    const welPanel = document.getElementById('welcome-box');
    const welName = document.getElementById('welcome-name');
    const steps = document.querySelectorAll('.form-step');
    const dots = document.querySelectorAll('.progress-dot');


    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginPanel.hidden = true;
        signupPanel.hidden = false;
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupPanel.hidden = true;
        loginPanel.hidden = false;
    });

//Prevents enter from submitting the form and makes it go to the next step instead
    signupForm.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const currentStep = document.querySelector('.form-step:not([hidden])');
            const nextButton = currentStep.querySelector('.next-step');
            const submitButton = currentStep.querySelector('button[type="submit"]');


            if (nextButton) {
                nextButton.click();
            } else if (submitButton) {
                submitButton.click();
            }
        }
    });

// Switches which step is shown and keeps the progress dots in sync
    function showStep(stepNum) {
        steps.forEach(step => {
            step.hidden = step.dataset.step !== String(stepNum);
        });
        dots.forEach(dot => {
            const dotStep = dot.id.split('-').pop();
            dot.classList.toggle('active', dotStep === String(stepNum));
            if (dotStep === String(stepNum)) {
                dot.setAttribute('aria-current', 'step');
            } else {
                dot.removeAttribute('aria-current');
            }
        });
    }

    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = button.closest('.form-step');
            if (!validateStep(currentStep)) return;

            const nextStepNumber = button.dataset.next;

            // In step 3, copies and displays the name and email from step 1
            if (nextStepNumber === '3') {
                document.getElementById('review-name').textContent = document.getElementById('signup-name').value;
                document.getElementById('review-email').textContent = document.getElementById('signup-email').value;
            }

            showStep(nextStepNumber);
        });
    });


    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', () => {
            showStep(button.dataset.prev);
        });
    });

    // Makes sure each entry is valid when trying to move to the next step
    function validateStep(currentStep) {
        let isValid = true;
        const stepNum = currentStep.dataset.step;


        if (stepNum === '1') {
            const name = document.getElementById('signup-name');
            const email = document.getElementById('signup-email');
            const nameError = document.getElementById('signup-name-error');
            const emailError = document.getElementById('signup-email-error');

            nameError.textContent = '';
            emailError.textContent = '';

            // Error if no name is provided
            if (name.value.trim() === '') {
                nameError.textContent = 'Name is required.';
                isValid = false;
            }

            // Error if @ and . are not provided, in that respective order
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                emailError.textContent = 'Enter a valid email.';
                isValid = false;
            } else {
                // only checks for email already used if the format is valid
                const users = JSON.parse(localStorage.getItem('vividlyUsers')) || [];
                if (users.some(u => u.email === email.value.trim())) {
                    emailError.textContent = 'An account with this email already exists.';
                    isValid = false;
                }
            }
        }

        if (stepNum === '2') {
            const password = document.getElementById('signup-password');
            const confirmPassword = document.getElementById('signup-confirm-password');
            const passwordError = document.getElementById('signup-password-error');
            const confirmError = document.getElementById('signup-confirm-password-error');

            passwordError.textContent = '';
            confirmError.textContent = '';

            if (password.value.length < 8) {
                passwordError.textContent = 'Password must be at least 8 characters.';
                isValid = false;
            }

            if (confirmPassword.value !== password.value) {
                confirmError.textContent = 'Passwords do not match.';
                isValid = false;
            }
        }

        return isValid;
    }


// Final signup submit uses .stringify() since localStorage only stores strings
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const terms = document.getElementById('signup-terms');
        const termsError = document.getElementById('signup-terms-error');
        termsError.textContent = '';


        if (!terms.checked) {
            termsError.textContent = 'You must agree to the terms.';
            return;
        }

        const newUser = {
            name: document.getElementById('signup-name').value,
            email: document.getElementById('signup-email').value,
            password: document.getElementById('signup-password').value
        };

        const users = JSON.parse(localStorage.getItem('vividlyUsers')) || [];
        users.push(newUser);
        localStorage.setItem('vividlyUsers', JSON.stringify(users));

        localStorage.setItem('vividlyCurrentUser', JSON.stringify(newUser));
        window.location.href = './index.html';
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const generalError = document.getElementById('login-general-error');
        generalError.textContent = '';

        const users = JSON.parse(localStorage.getItem('vividlyUsers')) || [];
        const matchedUser = users.find(u => u.email === email && u.password === password);


        if (!matchedUser) {
            generalError.textContent = 'Invalid email or password.';
            return;
        }

        localStorage.setItem('vividlyCurrentUser', JSON.stringify(matchedUser));

    // swap the login section to welcome section when login is successful.
        authSection.hidden = true;
        welName.textContent = matchedUser.name;
        welPanel.hidden = false;

        // Change header login text to logout immediately after login
        const loginLink = document.getElementById('login');
        const currentUser = JSON.parse(localStorage.getItem('vividlyCurrentUser'));
        loginLink.textContent = `${currentUser.name} - Logout`;
        loginLink.href = '#';

        // Implement functionality for logout text
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('vividlyCurrentUser');
            window.location.href = './index.html';
        });
    });
});