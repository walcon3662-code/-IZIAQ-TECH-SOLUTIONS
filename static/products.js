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
        
/*
        // Sample products data
        const products = [
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

        // Icon mapping for product categories
        const iconMap = {
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

        let filteredProducts = [...products];
        let currentSort = 'featured';

        // Function to create product card HTML
        function createProductCard(product) {
            const stars = Array(5).fill(0).map((_, i) => 
                i < Math.floor(product.rating) ? 
                '<i class="fas fa-star text-yellow-400"></i>' : 
                '<i class="far fa-star text-yellow-400"></i>'
            ).join('');

            const icon = iconMap[product.image] || 'fas fa-cube';

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

        // Function to render products
        function renderProducts() {
            const grid = document.getElementById('products-grid');
            const resultsCount = document.getElementById('results-count');
            
            if (filteredProducts.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <i class="fas fa-search text-6xl text-gray-400 mb-4"></i>
                        <p class="text-xl text-gray-500 dark:text-gray-400">No products found matching your criteria.</p>
                    </div>
                `;
                resultsCount.textContent = 'No products found';
                return;
            }

            grid.innerHTML = filteredProducts.map(createProductCard).join('');
            resultsCount.textContent = `Showing ${filteredProducts.length} of ${products.length} products`;
        }

        // Function to filter products
        function filterProducts() {
            const searchTerm = document.getElementById('search-input').value.toLowerCase();
            const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(cb => cb.value);
            const selectedBrands = Array.from(document.querySelectorAll('.brand-filter:checked')).map(cb => cb.value);
            const selectedPrice = document.querySelector('input[name="price"]:checked').value;

            filteredProducts = products.filter(product => {
                // Search filter
                const matchesSearch = product.name.toLowerCase().includes(searchTerm);
                
                // Category filter
                const matchesCategory = selectedCategories.includes('all') || selectedCategories.length === 0 || selectedCategories.includes(product.category);
                
                // Brand filter
                const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
                
                // Price filter
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

            // Apply sorting
            sortProducts();
            renderProducts();
        }

        // Function to sort products
        function sortProducts() {
            const sortBy = document.getElementById('sort-select').value;
            
            filteredProducts.sort((a, b) => {
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

        // Event listeners
        document.getElementById('search-input').addEventListener('input', filterProducts);
        document.getElementById('sort-select').addEventListener('change', filterProducts);
        
        document.querySelectorAll('.category-filter, .brand-filter').forEach(checkbox => {
            checkbox.addEventListener('change', filterProducts);
        });
        
        document.querySelectorAll('input[name="price"]').forEach(radio => {
            radio.addEventListener('change', filterProducts);
        });

        document.getElementById('clear-filters').addEventListener('click', () => {
            document.getElementById('search-input').value = '';
            document.querySelectorAll('.category-filter').forEach(cb => cb.checked = cb.value === 'all');
            document.querySelectorAll('.brand-filter').forEach(cb => cb.checked = false);
            document.querySelector('input[value="all"][name="price"]').checked = true;
            filterProducts();
        });

        // Initial render
        renderProducts();

        // Add to cart functionality
        document.addEventListener('click', (e) => {
            if (e.target.closest('button') && e.target.closest('button').textContent.includes('Add to Cart')) {
                e.preventDefault();
                // Simple cart animation
                const button = e.target.closest('button');
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
        });*/