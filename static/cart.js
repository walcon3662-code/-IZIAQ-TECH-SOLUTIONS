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

        // Cart functionality
        class CartCheckoutManager {
            constructor() {
                this.cart = {
                    items: [
                        { id: 1, name: 'ASUS ROG Strix Gaming Laptop', price: 1299, quantity: 1 },
                        { id: 2, name: 'NVIDIA GeForce RTX 4080', price: 1199, quantity: 1 },
                        { id: 3, name: 'Gaming Mechanical Keyboard', price: 149, quantity: 1 }
                    ],
                    discount: 0,
                    shipping: 0,
                    taxRate: 0.085
                };
                this.currentStep = 1;
                this.init();
            }

            init() {
                this.setupQuantityControls();
                this.setupRemoveButtons();
                this.setupDiscountCode();
                this.setupCheckoutFlow();
                this.setupPaymentMethods();
                this.updateTotals();
            }

            setupQuantityControls() {
                document.querySelectorAll('.qty-minus').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const cartItem = e.target.closest('.cart-item');
                        const input = cartItem.querySelector('.quantity-input');
                        const currentValue = parseInt(input.value);
                        if (currentValue > 1) {
                            input.value = currentValue - 1;
                            this.updateItemQuantity(cartItem, currentValue - 1);
                        }
                    });
                });

                document.querySelectorAll('.qty-plus').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const cartItem = e.target.closest('.cart-item');
                        const input = cartItem.querySelector('.quantity-input');
                        const currentValue = parseInt(input.value);
                        if (currentValue < 10) {
                            input.value = currentValue + 1;
                            this.updateItemQuantity(cartItem, currentValue + 1);
                        }
                    });
                });

                document.querySelectorAll('.quantity-input').forEach(input => {
                    input.addEventListener('change', (e) => {
                        const cartItem = e.target.closest('.cart-item');
                        const quantity = Math.max(1, Math.min(10, parseInt(e.target.value) || 1));
                        e.target.value = quantity;
                        this.updateItemQuantity(cartItem, quantity);
                    });
                });
            }

            setupRemoveButtons() {
                document.querySelectorAll('.remove-item').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        this.showConfirmModal('Are you sure you want to remove this item from your cart?', () => {
                            const cartItem = e.target.closest('.cart-item');
                            const itemId = parseInt(cartItem.dataset.id);
                            this.removeItem(itemId);
                            cartItem.remove();
                            this.updateTotals();
                        });
                    });
                });
            }

            setupDiscountCode() {
                const applyBtn = document.getElementById('apply-discount');
                const codeInput = document.getElementById('discount-code');

                applyBtn.addEventListener('click', () => {
                    const code = codeInput.value.trim().toUpperCase();
                    this.applyDiscountCode(code);
                });

                codeInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        const code = codeInput.value.trim().toUpperCase();
                        this.applyDiscountCode(code);
                    }
                });
            }

            setupCheckoutFlow() {
                document.getElementById('proceed-checkout').addEventListener('click', () => {
                    this.goToCheckout();
                });

                document.getElementById('back-to-cart').addEventListener('click', () => {
                    this.goToCart();
                });

                document.getElementById('checkout-form').addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.processOrder();
                });

                document.getElementById('clear-cart').addEventListener('click', () => {
                    this.showConfirmModal('Are you sure you want to clear your entire cart?', () => {
                        this.clearCart();
                    });
                });
            }

            setupPaymentMethods() {
                document.querySelectorAll('.payment-method input').forEach(radio => {
                    radio.addEventListener('change', (e) => {
                        // Update payment method visual selection
                        document.querySelectorAll('.payment-method').forEach(method => {
                            method.classList.remove('border-primary', 'bg-accent');
                            method.classList.add('border-gray-300', 'dark:border-gray-600');
                        });

                        e.target.closest('.payment-method').classList.remove('border-gray-300', 'dark:border-gray-600');
                        e.target.closest('.payment-method').classList.add('border-primary', 'bg-accent');

                        // Show/hide payment forms
                        const cardForm = document.getElementById('card-form');
                        const paypalForm = document.getElementById('paypal-form');

                        if (e.target.value === 'card') {
                            cardForm.classList.remove('hidden');
                            paypalForm.classList.add('hidden');
                        } else {
                            cardForm.classList.add('hidden');
                            paypalForm.classList.remove('hidden');
                        }
                    });
                });
            }

            updateItemQuantity(cartItem, quantity) {
                const itemId = parseInt(cartItem.dataset.id);
                const item = this.cart.items.find(item => item.id === itemId);
                if (item) {
                    item.quantity = quantity;
                    this.updateTotals();
                }
            }

            removeItem(itemId) {
                this.cart.items = this.cart.items.filter(item => item.id !== itemId);
            }

            applyDiscountCode(code) {
                const discountCodes = {
                    'SAVE10': 0.10,
                    'FIRSTTIME20': 0.20,
                    'STUDENT15': 0.15
                };

                if (discountCodes[code]) {
                    this.cart.discount = discountCodes[code];
                    this.updateTotals();
                    this.showSuccessModal(`Discount code "${code}" applied successfully! You saved ${(discountCodes[code] * 100)}%`);
                    document.getElementById('discount-code').value = '';
                } else {
                    this.showErrorModal('Invalid discount code. Please try again.');
                }
            }

            updateTotals() {
                const subtotal = this.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                const discountAmount = subtotal * this.cart.discount;
                const discountedSubtotal = subtotal - discountAmount;
                const tax = discountedSubtotal * this.cart.taxRate;
                const total = discountedSubtotal + tax + this.cart.shipping;

                document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString()}`;
                document.getElementById('discount').textContent = `-$${discountAmount.toFixed(0)}`;
                document.getElementById('tax').textContent = `$${tax.toFixed(0)}`;
                document.getElementById('total').textContent = `$${total.toFixed(0)}`;

                // Update cart count
                const itemCount = this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
                document.querySelector('.bg-accent.text-primary').textContent = itemCount;
            }

            goToCheckout() {
                this.currentStep = 2;
                document.getElementById('cart-section').classList.add('hidden');
                document.getElementById('checkout-section').classList.remove('hidden');
                this.updateProgressSteps();
                window.scrollTo(0, 0);
            }

            goToCart() {
                this.currentStep = 1;
                document.getElementById('checkout-section').classList.add('hidden');
                document.getElementById('cart-section').classList.remove('hidden');
                this.updateProgressSteps();
                window.scrollTo(0, 0);
            }

            processOrder() {
                // Validate form
                const form = document.getElementById('checkout-form');
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
                    this.currentStep = 3;
                    document.getElementById('checkout-section').classList.add('hidden');
                    document.getElementById('confirmation-section').classList.remove('hidden');
                    this.updateProgressSteps();
                    window.scrollTo(0, 0);
                } else {
                    this.showErrorModal('Please fill in all required fields.');
                }
            }

            clearCart() {
                this.cart.items = [];
                document.getElementById('cart-items').innerHTML = '<div class="p-8 text-center text-gray-500 dark:text-gray-400">Your cart is empty</div>';
                this.updateTotals();
            }

            updateProgressSteps() {
                // Reset all steps
                for (let i = 1; i <= 3; i++) {
                    const step = document.getElementById(`step-${i}`);
                    const stepText = document.getElementById(`step-${i}-text`);
                    
                    if (i <= this.currentStep) {
                        step.classList.remove('bg-gray-300', 'dark:bg-gray-600', 'text-gray-600', 'dark:text-gray-400');
                        step.classList.add('bg-primary', 'text-white');
                        if (stepText) {
                            stepText.classList.remove('text-gray-600', 'dark:text-gray-400');
                            stepText.classList.add('text-primary', 'font-semibold');
                        }
                    } else {
                        step.classList.remove('bg-primary', 'text-white');
                        step.classList.add('bg-gray-300', 'dark:bg-gray-600', 'text-gray-600', 'dark:text-gray-400');
                        if (stepText) {
                            stepText.classList.remove('text-primary', 'font-semibold');
                            stepText.classList.add('text-gray-600', 'dark:text-gray-400');
                        }
                    }
                }
            }

            showConfirmModal(message, onConfirm) {
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
                modal.innerHTML = `
                    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                        <p class="text-gray-700 dark:text-gray-300 mb-4">${message}</p>
                        <div class="flex justify-end space-x-3">
                            <button class="cancel-btn px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">Cancel</button>
                            <button class="confirm-btn px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded transition-colors">Confirm</button>
                        </div>
                    </div>
                `;

                modal.querySelector('.cancel-btn').addEventListener('click', () => modal.remove());
                modal.querySelector('.confirm-btn').addEventListener('click', () => {
                    modal.remove();
                    onConfirm();
                });

                document.body.appendChild(modal);
            }

            showSuccessModal(message) {
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
                modal.innerHTML = `
                    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 text-center">
                        <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-check text-white"></i>
                        </div>
                        <p class="text-gray-700 dark:text-gray-300 mb-4">${message}</p>
                        <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 bg-primary text-white hover:bg-purple-700 rounded transition-colors">OK</button>
                    </div>
                `;
                document.body.appendChild(modal);
            }

            showErrorModal(message) {
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
                modal.innerHTML = `
                    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 text-center">
                        <div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-exclamation-triangle text-white"></i>
                        </div>
                        <p class="text-gray-700 dark:text-gray-300 mb-4">${message}</p>
                        <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 bg-primary text-white hover:bg-purple-700 rounded transition-colors">OK</button>
                    </div>
                `;
                document.body.appendChild(modal);
            }
        }

        // Initialize cart and checkout functionality
        const cartManager = new CartCheckoutManager();

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    mobileMenu.classList.add('hidden');
                }
            });
        });