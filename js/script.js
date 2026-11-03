const steps = document.querySelectorAll('.step');
const progress = document.querySelector('#progress');
const previousButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
const status = document.querySelector('#status');

let currentStep = 1;

function updateProgress() {
    // Remember focus before disabling a control, which can otherwise blur it.
    const focusedControl = document.activeElement;
    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.toggle('active', stepNumber <= currentStep);
        if (stepNumber === currentStep) {
            step.setAttribute('aria-current', 'step');
        } else {
            step.removeAttribute('aria-current');
        }
    });

    const percentage = ((currentStep - 1) / (steps.length - 1)) * 100;
    progress.style.width = percentage + '%';
    previousButton.disabled = currentStep === 1;
    nextButton.disabled = currentStep === steps.length;

    if (focusedControl === nextButton && nextButton.disabled) {
        previousButton.focus();
    } else if (focusedControl === previousButton && previousButton.disabled) {
        nextButton.focus();
    }

    const label = steps[currentStep - 1].querySelector('.step-label').textContent;
    status.textContent = 'Step ' + currentStep + ' of ' + steps.length + ': ' + label;
}

previousButton.addEventListener('click', () => {
    currentStep = Math.max(1, currentStep - 1);
    updateProgress();
});

nextButton.addEventListener('click', () => {
    currentStep = Math.min(steps.length, currentStep + 1);
    updateProgress();
});

updateProgress();
