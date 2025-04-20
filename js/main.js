document.addEventListener('DOMContentLoaded', function() {
    // Calculate love duration
    function updateLoveTime() {
        // Set your anniversary date (YYYY, MM-1, DD)
        const anniversary = new Date(2025, 1, 26); // June 15, 2022 (example)
        const today = new Date();
        
        let years = today.getFullYear() - anniversary.getFullYear();
        let months = today.getMonth() - anniversary.getMonth();
        let days = today.getDate() - anniversary.getDate();
        
        // Adjust for negative months/days
        if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        
        if (months < 0) {
            years--;
            months += 12;
        }
        
        document.getElementById('years').textContent = years;
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = days;
    }
    
    // Initial call
    updateLoveTime();
    
    // Update every day
    setInterval(updateLoveTime, 86400000);
    
    // Create floating hearts
    function createHearts() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '-20px';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        heart.style.color = `hsl(${Math.random() * 30 + 330}, 100%, 70%)`;
        
        document.querySelector('.hearts-background').appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
    
    // Add CSS for falling animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fall {
            to {
                transform: translateY(100vh);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create hearts periodically
    setInterval(createHearts, 300);
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Gallery Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Heart Reaction
    const heartReacts = document.querySelectorAll('.heart-react');
    
    heartReacts.forEach(heart => {
        heart.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
    
    // Lightbox
    const lightbox = document.querySelector('.memory-lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('memory-title');
    const lightboxDate = document.getElementById('memory-date');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.getElementById('prev-memory');
    const nextBtn = document.getElementById('next-memory');
    
    let currentIndex = 0;
    const galleryImages = Array.from(document.querySelectorAll('.gallery-item'));
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            updateLightbox();
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    function updateLightbox() {
        const activeItem = galleryImages[currentIndex];
        const imgSrc = activeItem.querySelector('img').src;
        const title = activeItem.querySelector('h3').textContent;
        const date = activeItem.querySelector('p').textContent;
        
        lightboxImg.src = imgSrc;
        lightboxTitle.textContent = title;
        lightboxDate.textContent = date;
    }
    
    closeLightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightbox();
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        updateLightbox();
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Image Upload (simulated)
    const uploadForm = document.getElementById('upload-form');
    
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Memories saved to our love archive! ❤');
        this.reset();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.letter-container');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Letter Modal
    const letterModal = document.querySelector('.letter-modal');
    const modalTitle = document.getElementById('modal-letter-title');
    const modalDate = document.querySelector('.modal-letter-date');
    const modalContent = document.querySelector('.modal-letter-content');
    const closeModal = document.querySelector('.close-modal');
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const letterCard = this.closest('.letter-card');
            const title = letterCard.querySelector('.letter-title').textContent;
            const date = letterCard.querySelector('.letter-date').textContent;
            const content = letterCard.querySelector('.letter-content').innerHTML;
            
            modalTitle.textContent = title;
            modalDate.textContent = date;
            modalContent.innerHTML = content;
            
            letterModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', function() {
        letterModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    letterModal.addEventListener('click', function(e) {
        if (e.target === letterModal) {
            letterModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Print Letter
    const printButton = document.querySelector('.print-letter');
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    // Add Romantic Quote
    const romanticQuotes = [
        "Your love is all I need to feel complete.",
        "In your arms is where I belong.",
        "Every moment with you is a treasure I hold dear.",
        "Your smile is my favorite thing in the world.",
        "I fall in love with you more every day."
    ];
    
    const addQuoteBtn = document.querySelector('.btn-pink');
    const letterContent = document.getElementById('letter-content');
    
    addQuoteBtn.addEventListener('click', function() {
        const randomQuote = romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)];
        letterContent.value += '\n\n' + randomQuote;
    });
    
    // Save New Letter
    const letterForm = document.querySelector('.new-letter-form');
    
    letterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('letter-title').value;
        const content = document.getElementById('letter-content').value;
        
        if (title && content) {
            alert('Your love letter has been saved in Nyianda\'s heart forever! ❤');
            this.reset();
        } else {
            alert('Please write something sweet for Nyianda!');
        }
    });
});