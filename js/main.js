// Pip-Boy 3000 effects
document.addEventListener('DOMContentLoaded', function() {
    // Add boot sequence
    playBootSequence();
    
    // Add hover effect to Pip-Boy cards
    const cards = document.querySelectorAll('.pip-boy-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            playPipBoySound('select');
        });
    });
    
    // Add click effect to links
    const links = document.querySelectorAll('.pip-boy-link, nav a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            playPipBoySound('click');
            
            // Only add delay for internal links
            if (this.getAttribute('href').startsWith('#') || 
                this.getAttribute('href').includes('.html')) {
                e.preventDefault();
                const href = this.getAttribute('href');
                setTimeout(function() {
                    window.location.href = href;
                }, 300);
            }
        });
    });
    
    // Initialize Pip-Boy screen effect
    initializeScreen();
});

// Initialize Pip-Boy screen effect with scanlines and glow
function initializeScreen() {
    // Add random static noise occasionally
    setInterval(() => {
        if (Math.random() > 0.97) {
            addScreenGlitch();
        }
    }, 2000);
    
    // Add slight CRT flicker effect
    setInterval(() => {
        const brightness = 0.9 + (Math.random() * 0.2); // Value between 0.9 and 1.1
        document.documentElement.style.filter = `brightness(${brightness})`;
    }, 100);
}

// Add screen glitch effect
function addScreenGlitch() {
    const glitch = document.createElement('div');
    glitch.className = 'screen-glitch';
    glitch.style.position = 'fixed';
    glitch.style.top = `${Math.random() * 100}%`;
    glitch.style.left = '0';
    glitch.style.width = '100%';
    glitch.style.height = `${2 + Math.random() * 5}px`;
    glitch.style.backgroundColor = 'rgba(17, 255, 0, 0.5)';
    glitch.style.zIndex = '1000';
    glitch.style.pointerEvents = 'none';
    
    document.body.appendChild(glitch);
    
    setTimeout(() => {
        document.body.removeChild(glitch);
    }, 100 + Math.random() * 150);
}

// Pip-Boy boot sequence
function playBootSequence() {
    const container = document.querySelector('.container');
    
    // Create boot overlay
    const bootOverlay = document.createElement('div');
    bootOverlay.className = 'boot-overlay';
    bootOverlay.style.position = 'fixed';
    bootOverlay.style.top = '0';
    bootOverlay.style.left = '0';
    bootOverlay.style.width = '100%';
    bootOverlay.style.height = '100%';
    bootOverlay.style.backgroundColor = '#000';
    bootOverlay.style.color = '#11ff00';
    bootOverlay.style.fontFamily = 'monospace';
    bootOverlay.style.padding = '50px';
    bootOverlay.style.boxSizing = 'border-box';
    bootOverlay.style.zIndex = '1000';
    bootOverlay.style.overflow = 'hidden';
    
    document.body.appendChild(bootOverlay);
    
    let bootText = '';
    const lines = [
        'ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM',
        'COPYRIGHT 2075-2077 ROBCO INDUSTRIES',
        '- SERVER 1 -',
        '',
        '> Initializing System...',
        '> Reading Boot Configuration...',
        '> Loading OS...',
        '> Mounting File System...',
        '> Detecting Hardware...',
        '> Initializing Pip-Boy 3000...',
        '',
        '> Loading Personal Data...',
        '> Loading Portfolio Information...',
        '> Connecting to Network...',
        '',
        '*** WELCOME TO YOUR PIP-BOY 3000 ***',
        '',
        'Press Any Key to Continue'
    ];
    
    let lineIndex = 0;
    let charIndex = 0;
    
    function typeWriter() {
        if (lineIndex < lines.length) {
            if (charIndex < lines[lineIndex].length) {
                bootText += lines[lineIndex].charAt(charIndex);
                bootOverlay.innerHTML = bootText + '<span class="blink">_</span>';
                charIndex++;
                setTimeout(typeWriter, 30);
            } else {
                bootText += '<br>';
                lineIndex++;
                charIndex = 0;
                setTimeout(typeWriter, lineIndex === lines.length - 1 ? 500 : 100);
            }
        } else {
            // Add event listener to remove overlay on key press
            document.addEventListener('keydown', removeBootOverlay, {once: true});
            document.addEventListener('click', removeBootOverlay, {once: true});
            
            // Auto-remove after delay
            setTimeout(removeBootOverlay, 2000);
        }
    }
    
    function removeBootOverlay() {
        bootOverlay.style.transition = 'opacity 1s';
        bootOverlay.style.opacity = '0';
        
        setTimeout(() => {
            document.body.removeChild(bootOverlay);
        }, 1000);
    }
    
    setTimeout(typeWriter, 500);
}

// Play Pip-Boy sound effects
function playPipBoySound(type) {
    let sound;
    
    switch(type) {
        case 'boot':
            // Pip-Boy boot up sound
            sound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//NAwAAAAAAAAAAAAFhpbmcAAAAPAAAAAwAAA3YAlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaW8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw////////////////////////////////////////////AAAAAExhdmM1OC4xMwAAAAAAAAAAAAAAACQCkgAAAAAAAAN2UtK9KQAAAAAAAAAAAAAAAAAA//MUZAAAAAGkAAAAAAAAA0gAAAAATEFNRTUuMAAA//NUZAsFF3QBUdQAAAgWoClc4AgAAVqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
            break;
        case 'click':
            // Pip-Boy menu click sound
            sound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//NAwAAAAAAAAAAAAFhpbmcAAAAPAAAAAgAAAccAlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaW8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw////////////////////////////////////////////AAAAAExhdmM1OC4xMwAAAAAAAAAAAAAAACQDkgAAAAAAAAHHS/ruoQAAAAAAAAAAAAAAAAAA//MUZAAAAAGkAAAAAAAAA0gAAAAATEFNRTUuMAAA//NUZAkGmgE19dAAAg+IA2PsIAkAqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
            break;
        case 'select':
            // Pip-Boy selection hover sound
            sound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//NAwAAAAAAAAAAAAFhpbmcAAAAPAAAAAgAAAcAAlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaW8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw////////////////////////////////////////////AAAAAExhdmM1OC4xMwAAAAAAAAAAAAAAACQDkgAAAAAAAAHAfBKSMgAAAAAAAAAAAAAAAAAA//MUZAAAAAGkAAAAAAAAA0gAAAAATEFNRTUuMAAA//NUZAkF8QFV9UEAAgfoA2u8IAMAqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
            break;
    }
    
    if (sound) {
        sound.volume = 0.2;
        sound.play();
    }
}

// Add typing effect for titles
const titles = document.querySelectorAll('.pip-boy-text');
titles.forEach(title => {
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    function typeText() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeText, 50);
        }
    }
    
    typeText();
});