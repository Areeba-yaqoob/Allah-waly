// Dish data
const dishes = [
    {
        id: 1,
        name: "Hyderabadi Biryani",
        description: "Fragrant basmati rice cooked with tender meat, aromatic spices, and saffron.",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1488&q=80"
    },
    {
        id: 2,
        name: "Chicken Korma",
        description: "Creamy and mild curry with tender chicken pieces in a rich, nutty sauce.",
        price: 10.99,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
        id: 3,
        name: "Pepperoni Pizza",
        description: "Classic pizza with tomato sauce, mozzarella cheese, and spicy pepperoni.",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
        id: 4,
        name: "Gourmet Burger",
        description: "Juicy beef patty with cheese, lettuce, tomato, and our special sauce.",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1598&q=80"
    },
    {
        id: 5,
        name: "Butter Chicken",
        description: "Tandoori chicken in a creamy tomato and butter sauce with aromatic spices.",
        price: 11.99,
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
        id: 6,
        name: "Vegetable Pasta",
        description: "Fresh vegetables tossed with pasta in a light garlic and olive oil sauce.",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
];

// Initialize dishes carousel
function initDishesCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    const itemsPerSlide = 4;
    const totalSlides = Math.ceil(dishes.length / itemsPerSlide);
    
    // Clear existing items
    carouselInner.innerHTML = '';
    
    // Create carousel items
    for (let i = 0; i < totalSlides; i++) {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${i === 0 ? 'active' : ''}`;
        
        const row = document.createElement('div');
        row.className = 'row';
        
        // Add dishes to this slide
        for (let j = 0; j < itemsPerSlide; j++) {
            const dishIndex = (i * itemsPerSlide + j) % dishes.length;
            const dish = dishes[dishIndex];
            
            if (dish) {
                const col = document.createElement('div');
                col.className = 'col-lg-3 col-md-6';
                
                col.innerHTML = `
                    <div class="dish-card">
                        <div class="dish-img">
                            <img src="${dish.image}" alt="${dish.name}">
                        </div>
                        <div class="dish-info">
                            <h3>${dish.name}</h3>
                            <p>${dish.description}</p>
                            <span class="price">$${dish.price.toFixed(2)}</span>
                            <button class="add-to-cart" data-id="${dish.id}">Add to Order</button>
                        </div>
                    </div>
                `;
                
                row.appendChild(col);
            }
        }
        
        carouselItem.appendChild(row);
        carouselInner.appendChild(carouselItem);
    }
}

// Order management
let orderItems = [];

function addToCart(dishId) {
    const dish = dishes.find(d => d.id === dishId);
    if (!dish) return;
    
    // Check if dish already exists in order
    const existingItem = orderItems.find(item => item.id === dishId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        orderItems.push({...dish, quantity: 1});
    }
    
    updateOrderDisplay();
}

function updateOrderItem(dishId, change) {
    const itemIndex = orderItems.findIndex(item => item.id === dishId);
    if (itemIndex === -1) return;
    
    orderItems[itemIndex].quantity += change;
    
    // Remove item if quantity reaches 0
    if (orderItems[itemIndex].quantity <= 0) {
        orderItems.splice(itemIndex, 1);
    }
    
    updateOrderDisplay();
}

function updateOrderDisplay() {
    const platesContainer = document.getElementById('platesContainer');
    const orderItemsContainer = document.getElementById('orderItemsContainer');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    
    if (orderItems.length === 0) {
        orderItemsContainer.innerHTML = '';
        if (!emptyCartMessage) {
            const message = document.createElement('div');
            message.className = 'text-center py-4';
            message.id = 'emptyCartMessage';
            message.innerHTML = '<p>Your cart is empty. Add some delicious dishes from above!</p>';
            platesContainer.appendChild(message);
        }
        return;
    }
    
    if (emptyCartMessage) {
        emptyCartMessage.remove();
    }
    
    orderItemsContainer.innerHTML = '';
    
    orderItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <span class="item-name">${item.name}</span>
            <div class="item-quantity">
                <button class="quantity-btn minus" data-dish="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-dish="${item.id}">+</button>
            </div>
            <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
            <span class="remove-item" data-dish="${item.id}">×</span>
        `;
        orderItemsContainer.appendChild(itemElement);
    });
    
    // Calculate total
    const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const totalElement = document.createElement('div');
    totalElement.className = 'order-total';
    totalElement.innerHTML = `Total: $${total.toFixed(2)}`;
    orderItemsContainer.appendChild(totalElement);
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const dishId = parseInt(this.getAttribute('data-dish'));
            const change = this.classList.contains('plus') ? 1 : -1;
            updateOrderItem(dishId, change);
        });
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const dishId = parseInt(this.getAttribute('data-dish'));
            const itemIndex = orderItems.findIndex(item => item.id === dishId);
            if (itemIndex !== -1) {
                orderItems.splice(itemIndex, 1);
                updateOrderDisplay();
            }
        });
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initDishesCarousel();
    
    // Add event listeners to "Add to Order" buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const dishId = parseInt(e.target.getAttribute('data-id'));
            addToCart(dishId);
        }
    });
    
    // Initialize Bootstrap carousel with infinite loop
    const myCarousel = document.getElementById('dishesCarousel');
    const carousel = new bootstrap.Carousel(myCarousel, {
        interval: 3000,
        wrap: true
    });
    
    // Reload page when home icon is clicked
    document.querySelector('.nav-link[href="#"]').addEventListener('click', function(e) {
        if (e.target.closest('.nav-link').getAttribute('href') === '#') {
            window.location.reload();
        }
    });
});
