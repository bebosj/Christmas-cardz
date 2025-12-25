// Letter data
const letters = {
    leya: {
        recipient: "Dear Leya,",
        content: `Merry Christmas 🎄<br><br>
        I hope this season treats you as softly and beautifully as you deserve.<br><br>
        I won't overdo it, but I had to say this: you have a way of standing out without even trying. Your energy, your vibe, the way you exist so effortlessly. It sticks with people. It definitely stuck with me.<br><br>
        I hope the new year brings you moments that make your heart feel full, late-night laughs, and surprises that make you pause and smile. If I'm being honest, I hope I get to be part of at least a few of those moments.<br><br>
        Enjoy every bit of this Christmas. Stay warm, stay glowing, and don't forget how special you are.<br><br>
        Goodbye 👋🏻<br><br>
        <span class="text-rose-600 font-semibold">Baraa</span>`,
        color: "rose"
    },
    fouad: {
        recipient: "Dear Fouad,",
        content: `Merry Christmas 🎄<br><br>
        I wish that I can describe how funny are you bro you're goated fr<br><br>
        Btw try learning how to play lobster by rj pasin and chat more bro pls 😭🙏🏻 i wish that your having fun and idk bro I'm not writing a paragraph for you i donno u so much but keep it up<br><br>
        Happy new year<br><br>
        <span class="text-blue-600 font-semibold">Baraa</span>`,
        color: "blue"
    },
    lynn: {
        recipient: "Dear Lynn,",
        content: `I want robux for Christmas pls 😞 and merry Christmas you are so much talkative and I wish I was there in y'all country to meet up with y'all and definitely I love bikes I will make a website for designing motorcycles for you<br><br>
        I wish that your having a fun time with your family, friends, cousins, Aunts, all the people around cus your special<br><br>
        Happy Christmas for you<br><br>
        <span class="text-emerald-600 font-semibold">Baraa</span>`,
        color: "emerald"
    }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to letter cards
    document.querySelectorAll('.letter-card').forEach(card => {
        card.addEventListener('click', function() {
            const letterType = this.getAttribute('data-letter');
            openLetter(letterType);
        });
    });

    // Close letter button
    document.getElementById('close-letter').addEventListener('click', closeLetter);

    // Add snowflakes for Christmas effect
    createSnowflakes();

    // Add hover effects to envelopes
    initEnvelopeEffects();
});

function openLetter(letterType) {
    const letter = letters[letterType];
    const contentDiv = document.getElementById('letter-content');
    const recipientDiv = document.getElementById('letter-recipient');
    const textDiv = document.getElementById('letter-text');
    const emptyState = document.getElementById('empty-state');

    // Update content
    recipientDiv.textContent = letter.recipient;
    recipientDiv.className = `text-3xl font-bold text-${letter.color}-700`;
    textDiv.innerHTML = letter.content;

    // Show letter, hide empty state
    contentDiv.classList.remove('hidden');
    emptyState.classList.add('hidden');

    // Add opening animation
    contentDiv.style.animation = 'none';
    setTimeout(() => {
        contentDiv.style.animation = 'fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }, 10);

    // Update feather icons
    feather.replace();

    // Scroll to letter
    contentDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Play sound effect (optional)
    playLetterSound();
}

function closeLetter() {
    const contentDiv = document.getElementById('letter-content');
    const emptyState = document.getElementById('empty-state');

    contentDiv.classList.add('hidden');
    emptyState.classList.remove('hidden');
}

function createSnowflakes() {
    const snowflakeContainer = document.createElement('div');
    snowflakeContainer.className = 'snowflake-container';
    document.body.appendChild(snowflakeContainer);

    for (let i = 0; i < 30; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = '❄';
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        snowflake.style.opacity = Math.random() * 0.5 + 0.3;
        snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
        snowflakeContainer.appendChild(snowflake);
    }
}

function initEnvelopeEffects() {
    const envelopes = document.querySelectorAll('.envelope');
    
    envelopes.forEach(envelope => {
        envelope.addEventListener('mouseenter', function() {
            this.style.transform = 'rotateY(10deg) rotateX(5deg)';
        });
        
        envelope.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    });
}

function playLetterSound() {
    // Create a subtle paper rustle sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        // Fallback for browsers that don't support Web Audio API
        console.log('Audio not supported');
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLetter();
    }
    
    // Number keys 1-3 to open letters
    if (e.key === '1') openLetter('leya');
    if (e.key === '2') openLetter('fouad');
    if (e.key === '3') openLetter('lynn');
});

// Add service worker for offline capability (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('Service Worker registration failed:', error);
        });
    });
}
