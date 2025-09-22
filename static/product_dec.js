     // Dark mode detection
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Image thumbnail switching
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.getElementById('main-image');

        const imageMap = {
            laptop: { icon: 'fas fa-laptop', gradient: 'from-primary to-purple-700' },
            keyboard: { icon: 'fas fa-keyboard', gradient: 'from-secondary to-gray-400' },
            ports: { icon: 'fas fa-plug', gradient: 'from-accent to-purple-300' },
            screen: { icon: 'fas fa-tv', gradient: 'from-primary to-purple-800' }
        };

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // Remove active state from all thumbnails
                thumbnails.forEach(t => {
                    t.classList.remove('border-primary');
                    t.classList.add('border-transparent');
                });
                
                // Add active state to clicked thumbnail
                thumb.classList.add('border-primary');
                thumb.classList.remove('border-transparent');
                
                // Update main image
                const imageType = thumb.dataset.image;
                const imageData = imageMap[imageType];
                mainImage.className = `h-96 bg-gradient-to-br ${imageData.gradient} rounded-lg flex items-center justify-center cursor-zoom-in relative overflow-hidden`;
                mainImage.innerHTML = `
                    <i class="${imageData.icon} text-8xl text-white transition-transform duration-300 hover:scale-110"></i>
                    <div class="absolute top-4 right-4 bg-accent text-primary px-3 py-1 rounded-full text-sm font-semibold">
                        <i class="fas fa-search-plus mr-1"></i>Zoom
                    </div>
                `;
            });
        });

        // Configuration options
        const configOptions = document.querySelectorAll('.config-option');
        let basePrice = 1299;
        let additionalCost = 0;

        configOptions.forEach(option => {
            option.addEventListener('click', () => {
                const group = option.parentElement;
                const groupOptions = group.querySelectorAll('.config-option');
                
                // Remove active state from group
                groupOptions.forEach(opt => {
                    opt.classList.remove('border-primary', 'bg-primary', 'text-white');
                    opt.classList.add('border-gray-300', 'dark:border-gray-600');
                });
                
                // Add active state to clicked option
                option.classList.add('border-primary', 'bg-primary', 'text-white');
                option.classList.remove('border-gray-300', 'dark:border-gray-600');
                
                // Update price (simplified logic)
                updatePrice();
            });
        });

        function updatePrice() {
            const selectedOptions = document.querySelectorAll('.config-option.bg-primary');
            let totalAdditional = 0;
            
            selectedOptions.forEach(option => {
                totalAdditional += parseInt(option.dataset.price || 0);
            });
            
            const finalPrice = basePrice + totalAdditional;
            document.querySelector('.text-3xl.font-bold.text-primary').textContent = `$${finalPrice.toLocaleString()}`;
        }

        // Quantity controls
        const qtyMinus = document.getElementById('qty-minus');
        const qtyPlus = document.getElementById('qty-plus');
        const quantityInput = document.getElementById('quantity');

        qtyMinus.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        qtyPlus.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
        });

        // Add to cart functionality
        const addToCartBtn = document.getElementById('add-to-cart');
        addToCartBtn.addEventListener('click', () => {
            const originalText = addToCartBtn.innerHTML;
            addToCartBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Added to Cart!';
            addToCartBtn.classList.add('bg-green-600');
            addToCartBtn.classList.remove('bg-primary', 'hover:bg-purple-700');
            
            setTimeout(() => {
                addToCartBtn.innerHTML = originalText;
                addToCartBtn.classList.remove('bg-green-600');
                addToCartBtn.classList.add('bg-primary', 'hover:bg-purple-700');
            }, 3000);
        });

        // Tab functionality
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                
                // Remove active state from all tabs
                tabBtns.forEach(b => {
                    b.classList.remove('active', 'text-primary', 'bg-accent', 'dark:bg-gray-700', 'border-b-2', 'border-primary');
                    b.classList.add('text-gray-600', 'dark:text-gray-400');
                });
                
                // Add active state to clicked tab
                btn.classList.add('active', 'text-primary', 'bg-accent', 'dark:bg-gray-700', 'border-b-2', 'border-primary');
                btn.classList.remove('text-gray-600', 'dark:text-gray-400');
                
                // Hide all tab contents
                tabContents.forEach(content => {
                    content.classList.add('hidden');
                });
                
                // Show selected tab content
                document.getElementById(`${tabId}-tab`).classList.remove('hidden');
            });
        });