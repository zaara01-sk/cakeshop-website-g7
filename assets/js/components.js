// Component-like functions and interactive features
$(document).ready(function() {
    
    // Shopping Cart functionality
    let cart = [];
    
    // Wedding Cake data (for wedding.html)
    const weddingCakes = [
        {
            id: 1,
            name: "Chocolate Dream Cake",
            price: 1200,
            image: "cakeimg/choco-dream.jpg",
            description: "Rich chocolate 1-tier cake with ganache frosting"
        },
        {
            id: 2,
            name: "Vanilla Cupcakes (12 pack)",
            price: 600,
            image: "cakeimg/cupcake.jpg",
            description: "Classic vanilla cupcakes with buttercream"
        },
        {
            id: 3,
            name: "Wedding Cake (3-tier)",
            price: 4000,
            image: "cakeimg/wedding.jpg",
            description: "Elegant 3-tier vanilla wedding cake with flowers"
        }
    ];
    
    // Regular Cake data (for booking.html)
    const regularCakes = [
        {
            id: 1,
            name: "Black Forest",
            price: 599,
            image: "cakeimg/black_forest.jpg",
            description: "Layers of chocolate, whipped cream, and cherries—classic indulgence with a touch of nostalgia."
        },
        {
            id: 2,
            name: "White Forest",
            price: 649,
            image: "cakeimg/wforest.jpg",
            description: "Delicate white chocolate layers with fresh cream and cherries—elegant sweetness."
        },
        {
            id: 3,
            name: "Vanilla",
            price: 449,
            image: "cakeimg/vanillack.jpg",
            description: "Classic vanilla sponge with smooth vanilla buttercream—timeless perfection."
        },
        {
            id: 4,
            name: "Pineapple",
            price: 499,
            image: "cakeimg/pineapple.jpg",
            description: "Tropical pineapple chunks with light sponge—refreshing tropical delight."
        },
        {
            id: 5,
            name: "Chocolate",
            price: 549,
            image: "cakeimg/chocolate.jpg",
            description: "Rich chocolate sponge with chocolate frosting—pure chocolate heaven."
        },
        {
            id: 6,
            name: "Chocolate Ganache",
            price: 699,
            image: "cakeimg/chocolate_ganache.jpg",
            description: "Rich, smooth, and luxuriously chocolatey—pure bliss in every bite."
        },
        {
            id: 7,
            name: "Red Velvet",
            price: 749,
            image: "cakeimg/Red_velvet.jpg",
            description: "Soft, velvety layers with a hint of cocoa—love at first slice."
        },
        {
            id: 8,
            name: "Rasmalai",
            price: 799,
            image: "cakeimg/rasmalai.jpg",
            description: "Traditional rasmalai flavor in cake form—authentic Indian sweetness."
        },
        {
            id: 9,
            name: "Paan",
            price: 849,
            image: "cakeimg/paan.jpg",
            description: "Unique paan flavored cake with traditional Indian taste—bold and refreshing."
        },
        {
            id: 10,
            name: "Doll Cakes",
            price: 1299,
            image: "cakeimg/doll_cake.jpg",
            description: "Beautiful doll-shaped cakes perfect for birthdays—magical and delicious."
        },
        {
            id: 11,
            name: "Truffle",
            price: 899,
            image: "cakeimg/truffle.jpg",
            description: "Decadent chocolate truffle layers—ultimate chocolate indulgence."
        },
        {
            id: 12,
            name: "White Chocolate",
            price: 749,
            image: "cakeimg/white-chocolate.jpg",
            description: "Smooth white chocolate layers with creamy texture—elegant sweetness."
        },
        {
            id: 13,
            name: "Blackcurrant",
            price: 699,
            image: "cakeimg/blackcurrant.jpg",
            description: "Tangy blackcurrant flavor with fresh berry taste—fruity perfection."
        },
        {
            id: 14,
            name: "Blueberry",
            price: 749,
            image: "cakeimg/blueberry.jpg",
            description: "Fresh blueberry burst with light sponge—antioxidant-rich delight."
        }
    ];
    
    // Determine which cakes to use based on current page
let cakes = [];
const currentPage = window.location.pathname;
const pageTitle = document.title;

// More reliable detection using multiple methods
if (currentPage.includes('wedding.html') || 
    document.querySelector('h1')?.textContent?.includes('Wedding Cakes') ||
    document.querySelector('.hero-subtitle')?.textContent?.includes('Crowning Your Love')) {
    cakes = weddingCakes;
    console.log('Loading wedding cakes');
} else {
    cakes = regularCakes;
    console.log('Loading regular cakes');
}
     // Function to format price in rupees
    function formatPriceINR(price) {
        return '₹' + price.toLocaleString('en-IN');
    }

    // Load cakes on orders page
    function loadCakes() {
        if ($('#cakeGrid').length > 0) {
            const cakeGrid = $('#cakeGrid');
            
            cakes.forEach(cake => {
                const cakeHtml = `
                    <div class="col-md-6 mb-4">
                        <div class="cake-item">
                            <div class="cake-image">
                                <img src="${cake.image}" alt="${cake.name}" class="img-fluid">
                            </div>
                            <h5>${cake.name}</h5>
                            <p class="text-muted">${cake.description}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="cake-price">${formatPriceINR(cake.price)}</span>
                                <button class="btn btn-primary btn-sm add-to-cart" data-cake-id="${cake.id}">
                                    <i class="fas fa-plus"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                cakeGrid.append(cakeHtml);
            });
        }
    }
    
    // Add to cart functionality
    function addToCart(cakeId) {
        const cake = cakes.find(c => c.id === cakeId);
        const existingItem = cart.find(item => item.id === cakeId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...cake,
                quantity: 1
            });
        }
        
        updateCartDisplay();
        showToast('Added to cart!', 'success');
    }
    
    // Update cart display
    function updateCartDisplay() {
        const cartItems = $('#cartItems');
        const cartCount = $('#cartCount');
        const cartTotal = $('#cartTotal');
        
        cartCount.text(cart.reduce((sum, item) => sum + item.quantity, 0));
        
        if (cart.length === 0) {
            cartItems.html(`
                <div class="empty-cart text-center py-4">
                    <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                    <p class="text-muted">Your cart is empty</p>
                    <p class="small">Add some delicious cakes to get started!</p>
                </div>
            `);
            cartTotal.hide();
        } else {
            let cartHtml = '';
            let subtotal = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                
                cartHtml += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">${formatPriceINR(itemTotal)}</div>
                            <div class="quantity-controls">
                                <button class="quantity-btn decrease-qty" data-cake-id="${item.id}">-</button>
                                <span class="mx-2">${item.quantity}</span>
                                <button class="quantity-btn increase-qty" data-cake-id="${item.id}">+</button>
                                <button class="btn btn-sm btn-outline-danger ms-2 remove-item" data-cake-id="${item.id}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            cartItems.html(cartHtml);
            
            const tax = subtotal * 0.085;
            const total = subtotal + tax;
            
            $('#subtotal').text(formatPriceINR(subtotal));
            $('#tax').text(formatPriceINR(tax));
            $('#finalTotal').text(formatPriceINR(total));
            $('#modalTotal').text(formatPriceINR(total));
            
            cartTotal.show();
        }
    }
    
    // Cart event handlers
    $(document).on('click', '.add-to-cart', function() {
        const cakeId = parseInt($(this).data('cake-id'));
        addToCart(cakeId);
    });
    
    $(document).on('click', '.increase-qty', function() {
        const cakeId = parseInt($(this).data('cake-id'));
        addToCart(cakeId);
    });
    
    $(document).on('click', '.decrease-qty', function() {
        const cakeId = parseInt($(this).data('cake-id'));
        const item = cart.find(item => item.id === cakeId);
        
        if (item && item.quantity > 1) {
            item.quantity -= 1;
            updateCartDisplay();
        }
    });
    
    $(document).on('click', '.remove-item', function() {
        const cakeId = parseInt($(this).data('cake-id'));
        cart = cart.filter(item => item.id !== cakeId);
        updateCartDisplay();
        showToast('Item removed from cart', 'info');
    });
    
    // Checkout functionality
    $('#checkoutBtn').on('click', function() {
        if (cart.length > 0) {
            $('#checkoutModal').modal('show');
        }
    });
    
    // Order type change handler
    $('#orderType').on('change', function() {
        if ($(this).val() === 'delivery') {
            $('#deliveryAddress').show();
            $('#deliveryAddress input').attr('required', true);
        } else {
            $('#deliveryAddress').hide();
            $('#deliveryAddress input').attr('required', false);
        }
    });
    
    // Submit order
    $('#submitOrder').on('click', function() {
        const form = $('#checkoutForm')[0];
        
        if (form.checkValidity()) {
            // Simulate order submission
            showToast('Order placed successfully!', 'success');
            $('#checkoutModal').modal('hide');
            cart = [];
            updateCartDisplay();
            
            // Reset form
            form.reset();
            $('#deliveryAddress').hide();
        } else {
            form.reportValidity();
        }
    });
    
    // Class enrollment functionality
    $(document).on('click', '.enroll-btn', function() {
        const className = $(this).data('class');
        $('#selectedClass').val(className);
        $('#enrollmentModal').modal('show');
    });
    
    $('#submitEnrollment').on('click', function() {
        const form = $('#enrollmentForm')[0];
        
        if (form.checkValidity()) {
            showToast('Enrollment submitted successfully!', 'success');
            $('#enrollmentModal').modal('hide');
            form.reset();
        } else {
            form.reportValidity();
        }
    });
    
    // Toast notification function
    function showToast(message, type = 'info') {
        const toastHtml = `
            <div class="toast-notification toast-${type}">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'info' ? 'info-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        $('body').append(toastHtml);
        
        const toast = $('.toast-notification').last();
        toast.fadeIn(300);
        
        setTimeout(() => {
            toast.fadeOut(300, function() {
                $(this).remove();
            });
        }, 3000);
    }
    
    // Add toast styles
    $('<style>').prop('type', 'text/css').html(`
        .toast-notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            border-left: 4px solid var(--primary-pink);
            display: none;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        }
        
        .toast-success {
            border-left-color: #28a745;
        }
        
        .toast-info {
            border-left-color: var(--primary-pink);
        }
        
        .toast-notification i {
            margin-right: 0.5rem;
            color: var(--primary-pink);
        }
        
        .toast-success i {
            color: #28a745;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `).appendTo('head');
    
    // Contact Form Functionality - jQuery Function 3
    function initContactForm() {
        $('#contactForm').on('submit', function(e) {
            e.preventDefault();
            
            const form = this;
            const formData = {
                name: $('#contactName').val().trim(),
                email: $('#contactEmail').val().trim(),
                phone: $('#contactPhone').val().trim(),
                subject: $('#contactSubject').val(),
                message: $('#contactMessage').val().trim(),
                consent: $('#contactConsent').is(':checked')
            };
            
            // Custom validation
            let isValid = true;
            
            // Validate name (at least 2 characters)
            if (formData.name.length < 2) {
                $('#contactName').addClass('is-invalid');
                isValid = false;
            } else {
                $('#contactName').removeClass('is-invalid').addClass('is-valid');
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                $('#contactEmail').addClass('is-invalid');
                isValid = false;
            } else {
                $('#contactEmail').removeClass('is-invalid').addClass('is-valid');
            }
            
            // Validate subject selection
            if (!formData.subject) {
                $('#contactSubject').addClass('is-invalid');
                isValid = false;
            } else {
                $('#contactSubject').removeClass('is-invalid').addClass('is-valid');
            }
            
            // Validate message (at least 10 characters)
            if (formData.message.length < 10) {
                $('#contactMessage').addClass('is-invalid');
                isValid = false;
            } else {
                $('#contactMessage').removeClass('is-invalid').addClass('is-valid');
            }
            
            // Validate consent checkbox
            if (!formData.consent) {
                $('#contactConsent').addClass('is-invalid');
                isValid = false;
            } else {
                $('#contactConsent').removeClass('is-invalid').addClass('is-valid');
            }
            
            if (isValid) {
                // Simulate form submission with animation
                const submitBtn = $(this).find('button[type="submit"]');
                const originalText = submitBtn.html();
                
                submitBtn.prop('disabled', true)
                        .html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...')
                        .addClass('btn-secondary')
                        .removeClass('btn-primary');
                
                // Simulate API call delay
                setTimeout(() => {
                    // Show success modal instead of toast
                    $('#successModal').modal('show');
                    
                    // Reset form with animation
                    $(form).fadeOut(300, function() {
                        form.reset();
                        $('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
                        $(this).fadeIn(300);
                    });
                    
                    // Reset button
                    submitBtn.prop('disabled', false)
                            .html(originalText)
                            .removeClass('btn-secondary')
                            .addClass('btn-primary');
                            
                }, 2000);
            } else {
                showToast('Please fill in all required fields correctly.', 'error');
            }
        });
        
        // Real-time validation - jQuery Function 4
        $('#contactName, #contactEmail, #contactMessage').on('blur', function() {
            const field = $(this);
            const value = field.val().trim();
            
            if (field.attr('id') === 'contactName' && value.length >= 2) {
                field.removeClass('is-invalid').addClass('is-valid');
            } else if (field.attr('id') === 'contactEmail' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                field.removeClass('is-invalid').addClass('is-valid');
            } else if (field.attr('id') === 'contactMessage' && value.length >= 10) {
                field.removeClass('is-invalid').addClass('is-valid');
            }
        });
        
        // Subject selection validation
        $('#contactSubject').on('change', function() {
            if ($(this).val()) {
                $(this).removeClass('is-invalid').addClass('is-valid');
            }
        });
        
        // Checkbox validation
        $('#contactConsent').on('change', function() {
            if ($(this).is(':checked')) {
                $(this).removeClass('is-invalid').addClass('is-valid');
            }
        });
    }
    
    // Initialize page-specific functionality
    loadCakes();
    initContactForm();
    
    // Set minimum date for order form
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    $('#preferredDate').attr('min', tomorrow.toISOString().split('T')[0]);

}); // js file
