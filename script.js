const sentences = [
    "Newton's laws of motion describe the relationship between a body and the forces acting on it.",
    "The chemical formula for water is H2O.",
    "Electromagnetic waves travel at the speed of light in a vacuum.",
    "The acceleration due to gravity on Earth is approximately 9.8 m/s².",
    "Photosynthesis is the process by which green plants make their food.",
    // Add more sentences as needed
];

function getRandomSentence() {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
}

function startTyping() {
    const referenceText = document.getElementById('reference-text');
    const typingText = document.getElementById('typing-text');
    referenceText.innerText = getRandomSentence();
    typingText.value = '';
    typingText.focus();
}

document.getElementById('generate-btn').addEventListener('click', startTyping);

document.getElementById('typing-text').addEventListener('input', function() {
    const referenceText = document.getElementById('reference-text').innerText;
    const userInput = this.value;
    const wpmElement = document.getElementById('wpm');
    
    const timeElapsed = (Date.now() - startTime) / 60000; // in minutes
    const wordCount = userInput.split(/\s+/).length;
    const wpm = Math.round(wordCount / timeElapsed);
    wpmElement.innerText = `WPM: ${wpm}`;
    
    let referenceTextStyle = referenceText.split('').map((char, index) => {
        if (index < userInput.length) {
            return userInput[index] === char ? char : `<span style="color: red;">${char}</span>`;
        }
        return `<span style="opacity: 0.5;">${char}</span>`;
    }).join('');
    
    document.getElementById('reference-text').innerHTML = referenceTextStyle;
});

let startTime;
document.getElementById('typing-text').addEventListener('focus', function() {
    if (!startTime) {
        startTime = Date.now();
    }
});

// Handle splash screen
document.getElementById('begin-btn').addEventListener('click', function() {
    document.getElementById('splash-screen').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
    }, 500); // Match this with the transition duration in CSS
});

// Show splash screen on page load
window.addEventListener('load', function() {
    document.querySelector('.container').style.display = 'none';
});
