// ============================================================================
// IZIAQ-TECH - Complete JavaScript Library
// ============================================================================

// ============================================================================
// CORE FUNCTIONALITY
// ============================================================================

// Dark Mode Management
class DarkModeManager {
    constructor() {
        this.init();
    }

    init() {
        // Initial dark mode detection
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }

        // Listen for changes in color scheme preference
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });
    }
}

// Mobile Menu Management
class MobileMenuManager {
    constructor() {
        this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.init();
    }

    init() {
        if (this.mobileMenuBtn && this.mobileMenu) {
            this.mobileMenuBtn.addEventListener('click', () => {
                this.toggleMenu();
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.mobileMenuBtn.contains(e.target) && !this.mobileMenu.contains(e.target)) {
                    this.closeMenu();
                }
            });
        }
    }

    toggleMenu() {
        this.mobileMenu.classList.toggle('hidden');
    }

    closeMenu() {
        this.mobileMenu.classList.add('hidden');
    }
}

// Smooth Scrolling Manager
class SmoothScrollManager {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            });
        });
    }
}

// Scroll Animations Manager
class ScrollAnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);

        // Observe sections for animation
        document.querySelectorAll('section > div').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// ============================================================================
// PRODUCTS PAGE FUNCTIONALITY
// ============================================================================

class ProductsManager {
    constructor() {
        this.products = [
            { id: 1, name: "ASUS ROG Strix Gaming Laptop", price: 1299, category: "laptops", brand: "asus", image: "laptop", rating: 4.8, featured: true },
            { id: 2, name: "MSI Gaming Desktop PC", price: 1899, category: "desktops", brand: "msi", image: "desktop", rating: 4.7, featured: true },
            { id: 3, name: "Intel Core i9 Processor", price: 499, category: "components", brand: "intel", image: "cpu", rating: 4.9, featured: false },
            { id: 4, name: "NVIDIA GeForce RTX 4080", price: 1199, category: "components", brand: "nvidia", image: "gpu", rating: 4.8, featured: true },
            { id: 5, name: "Gaming Mechanical Keyboard", price: 149, category: "peripherals", brand: "asus", image: "keyboard", rating: 4.6, featured: false },
            { id: 6, name: "4K Gaming Monitor", price: 599, category: "peripherals", brand: "asus", image: "monitor", rating: 4.7, featured: true },
            { id: 7, name: "AMD Ryzen 9 Processor", price: 449, category: "components", brand: "amd", image: "cpu", rating: 4.8, featured: false },
            { id: 8, name: "MSI Gaming Laptop", price: 1599, category: "laptops", brand: "msi", image: "laptop", rating: 4.6, featured: false },
            { id: 9, name: "Wireless Gaming Mouse", price: 79, category: "peripherals", brand: "asus", image: "mouse", rating: 4.5, featured: false },
            { id: 10, name: "32GB DDR5 RAM Kit", price: 299, category: "components", brand: "intel", image: "ram", rating: 4.7, featured: false },
            { id: 11, name: "1TB NVMe SSD", price: 149, category: "components", brand: "intel", image: "ssd", rating: 4.8, featured: false },
            { id: 12, name: "Gaming Headset", price: 199, category: "accessories", brand: "asus", image: "headset", rating: 4.6, featured: false },
            { id: 13, name: "Custom Gaming PC Build", price: 2499, category: "desktops", brand: "msi", image: "desktop", rating: 4.9, featured: true },
            { id: 14, name: "ASUS Business Laptop", price: 899, category: "laptops", brand: "asus", image: "laptop", rating: 4.5, featured: false },
            { id: 15, name: "Ultra-Wide Gaming Monitor", price: 799, category: "peripherals", brand: "msi", image: "monitor", rating: 4.7, featured: false },
            { id: 16, name: "Gaming Chair", price: 349, category: "accessories", brand: "msi", image: "chair", rating: 4.4, featured: false },
            { id: 17, name: "External Graphics Card", price: 899, category: "components", brand: "nvidia", image: "gpu", rating: 4.6, featured: false },
            { id: 18, name: "Laptop Cooling Pad", price: 49, category: "accessories", brand: "asus", image: "cooler", rating: 4.3, featured: false },
            { id: 19, name: "Webcam 4K", price: 129, category: "peripherals", brand: "intel", image: "webcam", rating: 4.5, featured: false },
            { id: 20, name: "Portable SSD 2TB", price: 249, category: "accessories", brand: "intel", image: "ssd", rating: 4.7, featured: false },
            { id: 21, name: "Gaming Mousepad", price: 29, category: "accessories", brand: "asus", image: "mousepad", rating: 4.4, featured: false },
            { id: 22, name: "AMD Gaming Desktop", price: 1699, category: "desktops", brand: "amd", image: "desktop", rating: 4.6, featured: false },
            { id: 23, name: "USB-C Hub", price: 79, category: "accessories", brand: "intel", image: "hub", rating: 4.5, featured: false },
            { id: 24, name: "Gaming Speakers", price: 199, category: "peripherals", brand: "msi", image: "speakers", rating: 4.6, featured: false }
        ];

        this.iconMap = {
            laptop: 'fas fa-laptop',
            desktop: 'fas fa-desktop',
            cpu: 'fas fa-microchip',
            gpu: 'fas fa-memory',
            keyboard: 'fas fa-keyboard',
            monitor: 'fas fa-tv',
            mouse: 'fas fa-mouse',
            ram: 'fas fa-memory',
            ssd: 'fas fa-hdd',
            headset: 'fas fa-headphones',
            chair: 'fas fa-chair',
            cooler: 'fas fa-fan',
            webcam: 'fas fa-video',
            mousepad: 'fas fa-square',
            hub: 'fas fa-plug',
            speakers: 'fas fa-volume-up'
        };

        this.filteredProducts = [...this.products];
        this.currentSort = 'featured';
        this.init();
    }

    init() {
        if (document.getElementById('products-grid')) {
            this.setupEventListeners();
            this.renderProducts();
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterProducts());
        }

        // Sort functionality
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', () => this.filterProducts());
        }

        // Filter checkboxes
        document.querySelectorAll('.category-filter, .brand-filter').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.filterProducts());
        });

        document.querySelectorAll('input[name="price"]').forEach(radio => {
            radio.addEventListener('change', () => this.filterProducts());
        });

        // Clear filters button
        const clearFiltersBtn = document.getElementById('clear-filters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => this.clearFilters());
        }

        // Add to cart functionality
        document.addEventListener('click', (e) => {
            if (e.target.closest('button') && e.target.closest('button').textContent.includes('Add to Cart')) {
                e.preventDefault();
                this.addToCart(e.target.closest('button'));
            }
        });
    }

    createProductCard(product) {
        const stars = Array(5).fill(0).map((_, i) => 
            i < Math.floor(product.rating) ? 
            '<i class="fas fa-star text-yellow-400"></i>' : 
            '<i class="far fa-star text-yellow-400"></i>'
        ).join('');

        const icon = this.iconMap[product.image] || 'fas fa-cube';

        return `
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div class="h-48 bg-gradient-to-br from-primary to-purple-700 flex items-center justify-center relative">
                    <i class="${icon} text-6xl text-white"></i>
                    ${product.featured ? '<span class="absolute top-2 right-2 bg-accent text-primary px-2 py-1 rounded text-xs font-semibold">Featured</span>' : ''}
                </div>
                <div class="p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">${product.name}</h3>
                    <div class="flex items-center mb-3">
                        <div class="flex space-x-1 mr-2">
                            ${stars}
                        </div>
                        <span class="text-sm text-gray-500 dark:text-gray-400">(${product.rating})</span>
                    </div>
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-2xl font-bold text-primary dark:text-white">$${product.price.toLocaleString()}</span>
                        <span class="text-sm text-green-600 dark:text-green-400 font-medium">In Stock</span>
                    </div>
                    <button class="w-full bg-primary hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center">
                        <i class="fas fa-cart-plus mr-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        `;
    }

    renderProducts() {
        const grid = document.getElementById('products-grid');
        const resultsCount = document.getElementById('results-count');
        
        if (!grid) return;

        if (this.filteredProducts.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-search text-6xl text-gray-400 mb-4"></i>
                    <p class="text-xl text-gray-500 dark:text-gray-400">No products found matching your criteria.</p>
                </div>
            `;
            if (resultsCount) resultsCount.textContent = 'No products found';
            return;
        }

        grid.innerHTML = this.filteredProducts.map(product => this.createProductCard(product)).join('');
        if (resultsCount) {
            resultsCount.textContent = `Showing ${this.filteredProducts.length} of ${this.products.length} products`;
        }
    }

    filterProducts() {
        const searchInput = document.getElementById('search-input');
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        
        const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(cb => cb.value);
        const selectedBrands = Array.from(document.querySelectorAll('.brand-filter:checked')).map(cb => cb.value);
        
        const priceRadio = document.querySelector('input[name="price"]:checked');
        const selectedPrice = priceRadio ? priceRadio.value : 'all';

        this.filteredProducts = this.products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategories.includes('all') || selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
            
            let matchesPrice = true;
            if (selectedPrice !== 'all') {
                const price = product.price;
                switch (selectedPrice) {
                    case '0-500':
                        matchesPrice = price <= 500;
                        break;
                    case '500-1000':
                        matchesPrice = price > 500 && price <= 1000;
                        break;
                    case '1000-2000':
                        matchesPrice = price > 1000 && price <= 2000;
                        break;
                    case '2000+':
                        matchesPrice = price > 2000;
                        break;
                }
            }

            return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
        });

        this.sortProducts();
        this.renderProducts();
    }

    sortProducts() {
        const sortSelect = document.getElementById('sort-select');
        const sortBy = sortSelect ? sortSelect.value : 'featured';
        
        this.filteredProducts.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'newest':
                    return b.id - a.id;
                case 'rating':
                    return b.rating - a.rating;
                case 'featured':
                default:
                    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
            }
        });
    }

    clearFilters() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.value = '';
        
        document.querySelectorAll('.category-filter').forEach(cb => cb.checked = cb.value === 'all');
        document.querySelectorAll('.brand-filter').forEach(cb => cb.checked = false);
        
        const allPriceRadio = document.querySelector('input[value="all"][name="price"]');
        if (allPriceRadio) allPriceRadio.checked = true;
        
        this.filterProducts();
    }

    addToCart(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check mr-2"></i>Added!';
        button.classList.add('bg-green-600');
        button.classList.remove('bg-primary', 'hover:bg-purple-700');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('bg-green-600');
            button.classList.add('bg-primary', 'hover:bg-purple-700');
        }, 2000);
    }
}

// ============================================================================
// PRODUCT DETAIL PAGE FUNCTIONALITY
// ============================================================================

class ProductDetailManager {
    constructor() {
        this.basePrice = 1299;
        this.additionalCost = 0;
        this.init();
    }

    init() {
        if (document.getElementById('main-image')) {
            this.setupImageGallery();
            this.setupConfigurationOptions();
            this.setupQuantityControls();
            this.setupAddToCart();
            this.setupTabs();
        }
    }

    setupImageGallery() {
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
                thumbnails.forEach(t => {
                    t.classList.remove('border-primary');
                    t.classList.add('border-transparent');
                });
                
                thumb.classList.add('border-primary');
                thumb.classList.remove('border-transparent');
                
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
    }

    setupConfigurationOptions() {
        const configOptions = document.querySelectorAll('.config-option');

        configOptions.forEach(option => {
            option.addEventListener('click', () => {
                const group = option.parentElement;
                const groupOptions = group.querySelectorAll('.config-option');
                
                groupOptions.forEach(opt => {
                    opt.classList.remove('border-primary', 'bg-primary', 'text-white');
                    opt.classList.add('border-gray-300', 'dark:border-gray-600');
                });
                
                option.classList.add('border-primary', 'bg-primary', 'text-white');
                option.classList.remove('border-gray-300', 'dark:border-gray-600');
                
                this.updatePrice();
            });
        });
    }

    updatePrice() {
        const selectedOptions = document.querySelectorAll('.config-option.bg-primary');
        let totalAdditional = 0;
        
        selectedOptions.forEach(option => {
            totalAdditional += parseInt(option.dataset.price || 0);
        });
        
        const finalPrice = this.basePrice + totalAdditional;
        const priceElement = document.querySelector('.text-3xl.font-bold.text-primary');
        if (priceElement) {
            priceElement.textContent = `$${finalPrice.toLocaleString()}`;
        }
    }

    setupQuantityControls() {
        const qtyMinus = document.getElementById('qty-minus');
        const qtyPlus = document.getElementById('qty-plus');
        const quantityInput = document.getElementById('quantity');

        if (qtyMinus && qtyPlus && quantityInput) {
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
        }
    }

    setupAddToCart() {
        const addToCartBtn = document.getElementById('add-to-cart');
        if (addToCartBtn) {
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
        }
    }

    setupTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                
                tabBtns.forEach(b => {
                    b.classList.remove('active', 'text-primary', 'bg-accent', 'dark:bg-gray-700', 'border-b-2', 'border-primary');
                    b.classList.add('text-gray-600', 'dark:text-gray-400');
                });
                
                btn.classList.add('active', 'text-primary', 'bg-accent', 'dark:bg-gray-700', 'border-b-2', 'border-primary');
                btn.classList.remove('text-gray-600', 'dark:text-gray-400');
                
                tabContents.forEach(content => {
                    content.classList.add('hidden');
                });
                
                const targetTab = document.getElementById(`${tabId}-tab`);
                if (targetTab) {
                    targetTab.classList.remove('hidden');
                }
            });
        });
    }
}

// ============================================================================
// SERVICES PAGE FUNCTIONALITY
// ============================================================================

class ServicesManager {
    constructor() {
        this.init();
    }

    init() {
        if (document.getElementById('service-form')) {
            this.setupServiceForm();
        }
    }

    setupServiceForm() {
        const serviceForm = document.getElementById('service-form');
        if (serviceForm) {
            serviceForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(serviceForm);
            });
        }
    }

    handleFormSubmission(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('border-red-500');
            } else {
                field.classList.remove('border-red-500');
            }
        });
        
        if (isValid) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Request Submitted!';
            submitBtn.classList.add('bg-green-600');
            submitBtn.classList.remove('bg-primary', 'hover:bg-purple-700');
            submitBtn.disabled = true;
            
            this.showSuccessModal();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('bg-green-600');
                submitBtn.classList.add('bg-primary', 'hover:bg-purple-700');
                submitBtn.disabled = false;
                form.reset();
            }, 5000);
        }
    }

    showSuccessModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 text-center">
                <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-check text-2xl text-white"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Request Submitted!</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">Thank you for your service request. We'll contact you within 24 hours to discuss your needs and provide a quote.</p>
                <button onclick="this.closest('.fixed').remove()" class="bg-primary hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                    Close
                </button>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

// ============================================================================
// ABOUT US PAGE FUNCTIONALITY
// ============================================================================

class AboutUsManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupCounterAnimations();
    }

    setupCounterAnimations() {
        const statsSection = document.querySelector('.grid.grid-cols-2.gap-6');
        if (statsSection) {
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counters = entry.target.querySelectorAll('.text-4xl.font-bold');
                        const values = [6, 15, 50, 98];
                        counters.forEach((counter, index) => {
                            this.animateCounter(counter, values[index]);
                        });
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            statsObserver.observe(statsSection);
        }
    }

    animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + (target >= 1000 ? 'K+' : '+');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target >= 1000 ? Math.floor(target/1000) + 'K+' : target + '+';
            }
        };
        updateCounter();
    }
}

// ============================================================================
// MODAL UTILITIES
// ============================================================================

class ModalManager {
    static showAlert(message, type = 'info') {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        
        const iconClass = {
            success: 'fas fa-check-circle text-green-500',
            error: 'fas fa-exclamation-circle text-red-500',
            warning: 'fas fa-exclamation-triangle text-yellow-500',
            info: 'fas fa-info-circle text-blue-500'
        }[type];

        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                <div class="flex items-center mb-4">
                    <i class="${iconClass} text-2xl mr-3"></i>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Alert</h3>
                </div>
                <p class="text-gray-700 dark:text-gray-300 mb-4">${message}</p>
                <div class="flex justify-end">
                    <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 bg-primary text-white hover:bg-purple-700 rounded transition-colors">
                        OK
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    static showConfirm(message, onConfirm, onCancel = null) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                <p class="text-gray-700 dark:text-gray-300 mb-4">${message}</p>
                <div class="flex justify-end space-x-3">
                    <button class="cancel-btn px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                        Cancel
                    </button>
                    <button class="confirm-btn px-4 py-2 bg-primary text-white hover:bg-purple-700 rounded transition-colors">
                        Confirm
                    </button>
                </div>
            </div>
        `;

        const cancelBtn = modal.querySelector('.cancel-btn');
        const confirmBtn = modal.querySelector('.confirm-btn');

        cancelBtn.addEventListener('click', () => {
            modal.remove();
            if (onCancel) onCancel();
        });

        confirmBtn.addEventListener('click', () => {
            modal.remove();
            onConfirm();
        });

        document.body.appendChild(modal);
    }

    static showPrompt(message, defaultValue = '', onSubmit, onCancel = null) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                <p class="text-gray-700 dark:text-gray-300 mb-4">${message}</p>
                <input type="text" class="prompt-input w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base mb-4" value="${defaultValue}">
                <div class="flex justify-end space-x-3">
                    <button class="cancel-btn px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                        Cancel
                    </button>
                    <button class="submit-btn px-4 py-2 bg-primary text-white hover:bg-purple-700 rounded transition-colors">
                        Submit
                    </button>
                </div>
            </div>
        `;

        const input = modal.querySelector('.prompt-input');
        const cancelBtn = modal.querySelector('.cancel-btn');
        const submitBtn = modal.querySelector('.submit-btn');

        input.focus();
        input.select();

        const handleSubmit = () => {
            const value = input.value.trim();
            modal.remove();
            onSubmit(value);
        };

        cancelBtn.addEventListener('click', () => {
            modal.remove();
            if (onCancel) onCancel();
        });

        submitBtn.addEventListener('click', handleSubmit);

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSubmit();
            }
        });

        document.body.appendChild(modal);
    }
}

// ============================================================================
// CART MANAGEMENT
// ============================================================================

class CartManager {
    constructor() {
        this.items = [];
        this.init();
    }

    init() {
        this.loadCart();
        this.updateCartDisplay();
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                ...product,
                quantity: quantity
            });
        }
        
        this.saveCart();
        this.updateCartDisplay();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity === 0) {
                this.removeItem(productId);
            } else {
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    saveCart() {
        // Since localStorage is not available in the iframe, we'll store in memory
        // In a real implementation, this would use localStorage or send to server
    }

    loadCart() {
        // Since localStorage is not available, we'll start with empty cart
        // In a real implementation, this would load from localStorage or server
    }

    updateCartDisplay() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const itemCount = this.getItemCount();
        
        cartCountElements.forEach(element => {
            element.textContent = itemCount;
            element.style.display = itemCount > 0 ? 'flex' : 'none';
        });
    }

    clear() {
        this.items = [];
        this.saveCart();
        this.updateCartDisplay();
    }
}

// ============================================================================
// SEARCH FUNCTIONALITY
// ============================================================================

class SearchManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupGlobalSearch();
    }

    setupGlobalSearch() {
        // Global search functionality that works across all pages
        const searchInputs = document.querySelectorAll('input[type="search"], #search-input');
        
        searchInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(input.value.trim());
                }
            });
        });
    }

    performSearch(query) {
        if (!query) return;
        
        // In a real implementation, this would navigate to search results
        console.log(`Searching for: ${query}`);
        ModalManager.showAlert(`Search functionality would look for: "${query}"`);
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

class IziaqTechApp {
    constructor() {
        this.modules = {};
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeModules());
        } else {
            this.initializeModules();
        }
    }

    initializeModules() {
        // Initialize core modules (always available)
        this.modules.darkMode = new DarkModeManager();
        this.modules.mobileMenu = new MobileMenuManager();
        this.modules.smoothScroll = new SmoothScrollManager();
        this.modules.scrollAnimation = new ScrollAnimationManager();
        this.modules.cart = new CartManager();
        this.modules.search = new SearchManager();

        // Initialize page-specific modules based on current page
        this.initializePageSpecificModules();
    }

    initializePageSpecificModules() {
        // Products page
        if (document.getElementById('products-grid')) {
            this.modules.products = new ProductsManager();
        }

        // Product detail page
        if (document.getElementById('main-image')) {
            this.modules.productDetail = new ProductDetailManager();
        }

        // Services page
        if (document.getElementById('service-form')) {
            this.modules.services = new ServicesManager();
        }

        // About us page (check for stats section)
        if (document.querySelector('.grid.grid-cols-2.gap-6')) {
            this.modules.aboutUs = new AboutUsManager();
        }
    }

    getModule(name) {
        return this.modules[name];
    }
}

// ============================================================================
// GLOBAL INITIALIZATION
// ============================================================================

// Initialize the app when script loads
window.IziaqTech = new IziaqTechApp();

// Make utilities globally available
window.IziaqTechUtils = {
    Modal: ModalManager,
    Cart: window.IziaqTech.getModule('cart'),
    Search: window.IziaqTech.getModule('search')
};

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IziaqTechApp;
}