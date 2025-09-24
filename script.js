        // Menu data
        const menuItems = [
            {
                id: 1,
                name: "Truffle Pasta",
                description: "Handmade pasta with black truffle sauce and parmesan",
                price: 2800.00,
                image: "https://images.unsplash.com/photo-1601556123240-462c758a50db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                id: 2,
                name: "Grilled Salmon",
                description: "Atlantic salmon with lemon butter sauce and seasonal vegetables",
                price: 3000.00,
                image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
            },
            {
                id: 3,
                name: "Artisan Burger",
                description: "Wagyu beef patty with aged cheddar and truffle aioli",
                price: 1040.00,
                image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
            },
            {
                id: 4,
                name: "Craft Cocktail",
                description: "Signature mix of premium spirits and fresh ingredients",
                price: 1380.00,
                image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
            },
            {
                id: 5,
                name: "Chocolate Fondant",
                description: "Decadent molten chocolate cake with vanilla ice cream",
                price: 1200.00,
                image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
            },
            {
                id: 6,
                name: "Wine Selection",
                description: "Curated wines from renowned vineyards around the world",
                price: 900.00,
                image: "https://images.unsplash.com/photo-1627260101457-21635a409ef3?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        ];

        // DOM Elements
        const header = document.getElementById('header');
        const menuGrid = document.getElementById('menuGrid');
        const itemModal = document.getElementById('itemModal');
        const modalBody = document.getElementById('modalBody');
        const closeModal = document.getElementById('closeModal');
        const contactForm = document.getElementById('contactForm');

        // Global variables
        let scrollTimeout;

        // Function to generate menu items
        function generateMenuItems() {
            menuItems.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.className = 'menu-item';
                menuItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-content">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <div class="price">Ksh. ${item.price.toFixed(2)}</div>
                    </div>
                `;
                
                // Add click event to open modal
                menuItem.addEventListener('click', () => openItemModal(item));
                
                menuGrid.appendChild(menuItem);
            });
        }

        // Function to open modal with item details
        function openItemModal(item) {
            modalBody.innerHTML = `
                <h2>${item.name}</h2>
                <img src="${item.image}" alt="${item.name}" style="width:100%; height:200px; object-fit:cover; border-radius:5px; margin:1rem 0;">
                <p>${item.description}</p>
                <div class="price" style="font-size:1.5rem; margin:1rem 0;">$${item.price.toFixed(2)}</div>
                <button class="cta-button" style="margin-top:1rem;">Add to Order</button>
            `;
            
            itemModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Function to close modal
        function closeItemModal() {
            itemModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Function to handle scroll events
        function handleScroll() {
            // Header scroll effect
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
            
            // Menu item animation on scroll
            const menuItems = document.querySelectorAll('.menu-item');
            const triggerBottom = window.innerHeight * 0.8;
            
            menuItems.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                
                if (itemTop < triggerBottom) {
                    item.classList.add('visible');
                }
            });
        }

        // Function to handle form submission
        function handleFormSubmit(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show a success message
            alert(`Thank you, ${name}! Your message has been sent. We'll get back to you at ${email} soon.`);
            
            // Reset form
            contactForm.reset();
        }

        // Function to initialize event listeners
        function initEventListeners() {
            window.addEventListener('scroll', handleScroll);
            closeModal.addEventListener('click', closeItemModal);
            contactForm.addEventListener('submit', handleFormSubmit);
            
            // Close modal when clicking outside
            itemModal.addEventListener('click', (e) => {
                if (e.target === itemModal) {
                    closeItemModal();
                }
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // Calculate the position to scroll to
                        const headerHeight = document.getElementById('header').offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        // Function to initialize the application
        function initApp() {
            generateMenuItems();
            initEventListeners();
            
            // Trigger initial scroll check
            handleScroll();
        }

        // Initialize the app when DOM is loaded
        document.addEventListener('DOMContentLoaded', initApp);