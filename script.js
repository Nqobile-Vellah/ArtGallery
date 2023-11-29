document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const overlay = document.querySelector('.overlay');
    const userIcon = document.querySelector('.user-icon');
    const userDropdown = document.querySelector('.user-dropdown');
    const searchInput = document.querySelector('.search-bar input');


    searchInput.addEventListener('input', function () {
        limitCharacters(this, 30); 
    });

    function limitCharacters(input, limit) {
        const currentInput = input.value;
        if (currentInput.length > limit) {
            const truncatedInput = currentInput.slice(0, limit);
            input.value = truncatedInput;
        }
    }

    let isOpen = false;

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isOpen) {
            navLinks.classList.add('active');
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            isOpen = true;
            body.classList.add('nav-open');
            overlay.style.display = 'block';
            toggleBodyScroll(); // Add this line
            document.addEventListener('click', closeSidebar);
        } else {
            closeSidebar();
        }
    });

    function closeSidebar() {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        isOpen = false;
        body.classList.remove('nav-open');
        overlay.style.display = 'none';
        toggleBodyScroll(); // Add this line
        document.removeEventListener('click', closeSidebar);
    }

    let screenWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        const newWidth = window.innerWidth;
        if (newWidth > 768 && isOpen) {
            closeSidebar();
        }
        screenWidth = newWidth;
    });

    const cartIcon = document.querySelector('.cart-icon');
    const cartMenu = document.querySelector('.cart-menu');
    const cartClose = document.querySelector('.cart-close');

    cartIcon.addEventListener('click', () => {
        cartMenu.classList.toggle('active');
        overlay.style.display = 'block';
        toggleBodyScroll(); // Add this line
    });

    cartClose.addEventListener('click', () => {
        cartMenu.classList.remove('active');
        overlay.style.display = 'none';
    });

    const searchIcon = document.querySelector('.search-icon');
    const searchMenu = document.querySelector('.search-menu');
    const searchClose = document.querySelector('.search-close');

    searchIcon.addEventListener('click', () => {
        searchMenu.style.right = '0';
        overlay.style.display = 'block';
        toggleBodyScroll(); // Add this line
    });

    searchClose.addEventListener('click', () => {
        searchMenu.style.right = '-100%';
        overlay.style.display = 'none';
        toggleBodyScroll(); // Add this line
    });

    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('nav-fixed');
        } else {
            nav.classList.remove('nav-fixed');
        }

        const navIcons = document.querySelectorAll('.nav-icons > div');

        navIcons.forEach((navIcon) => {
            navIcon.addEventListener('click', () => {
                overlay.style.display = 'block';
            });
        });

        overlay.addEventListener('click', () => {
            overlay.style.display = 'none';
        });
    });

    userIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('show');
    });

    window.addEventListener('click', (event) => {
        if (!event.target.matches('.user-icon')) {
            if (userDropdown.classList.contains('show')) {
                userDropdown.classList.remove('show');
            }
        }
    });

    // Add an event listener to the remove buttons
    const removeButtons = document.querySelectorAll('.cart-item .remove-item');
    removeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Get the parent cart item element
            const cartItem = button.closest('.cart-item');
            // Get the container element that holds all the cart items
            const cartItemsContainer = document.querySelector('.cart-items');
            // Remove the cart item from the DOM
            cartItemsContainer.removeChild(cartItem);
            // Call the updateCartTotal function to recalculate the total price
            updateCartTotal();
        });
    });

    function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;

    const cartMenu = document.querySelector('.cart-menu');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const totalContainer = document.querySelector('.cart-total-container');

    if (cartItems.length === 0) {
        emptyCartMessage.classList.add('show');
        totalContainer.style.display = 'none';

        document.getElementById('cart-total').textContent = '$0.00';

    } else {
        emptyCartMessage.classList.remove('show');
        totalContainer.style.display = 'block';
        document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
    }

    cartItems.forEach((cartItem) => {
        const priceElement = cartItem.querySelector('.cart-item-price');
        const quantityInput = cartItem.querySelector('.item-quantity');

        const price = parseFloat(priceElement.textContent.replace('$', ''));
        const quantity = parseInt(quantityInput.value);

        total += price * quantity;
    });

    // Round total to two decimal places
    total = Math.round(total * 100) / 100;

    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
}

    document.querySelectorAll('.item-quantity').forEach((quantityInput) => {
        quantityInput.addEventListener('input', updateCartTotal);
    });

    updateCartTotal();

    
        // Get the help button, help form container, and close button
        var helpButton = document.getElementById("help-button");
        var helpFormContainer = document.getElementById("help-form-container");
        var helpForm = document.getElementById("help-form");

        // Function to toggle the help form and change the button icon
        function toggleHelpForm() {
            // Toggle active class to change the button's appearance
            helpButton.classList.toggle("active");

            // Toggle the close icon and question mark icon
            var icon = helpButton.querySelector("i");
            if (icon.classList.contains("fa-question")) {
                icon.classList.remove("fa-question");
                icon.classList.add("fa-times");
                helpButton.querySelector(".tooltip-text").textContent = "Close"; // Change tooltip text to "Close"
            } else {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-question");
                helpButton.querySelector(".tooltip-text").textContent = "Help"; // Change tooltip text to "Help"
            }

            // Toggle the form's visibility with fade-in/fade-out effect
            if (helpFormContainer.style.display === "flex") {
                // Hide the form with fade-out effect
                helpFormContainer.style.opacity = 0;
                setTimeout(function () {
                    helpFormContainer.style.display = "none";
                }, 300); // Delay for the same duration as the opacity transition
            } else {
                // Show the form with fade-in effect
                helpFormContainer.style.display = "flex";
                setTimeout(function () {
                    helpFormContainer.style.opacity = 1;
                    helpForm.classList.add("show");
                }, 10); // Delay for smoother animation
            }
        }

        // Add click event listener to the help button to toggle the form
        helpButton.addEventListener("click", toggleHelpForm);

        // Close the help form when clicking outside of it
        window.addEventListener("click", function (event) {
            if (event.target === helpFormContainer) {
                toggleHelpForm();
            }
        });

        // Prevent the form from closing when clicking inside it
        helpForm.addEventListener("click", function (event) {
            event.stopPropagation();
        });


        const images = document.querySelectorAll('.hero img');
        const dots = document.querySelectorAll('.dot');
        const heroContent = document.querySelector('.hero-content');

        let currentImageIndex = 0;

        function rotateDots() {
            dots[currentImageIndex].classList.remove('active');
            images[currentImageIndex].classList.remove('active');
            heroContent.style.opacity = 0;

            currentImageIndex = (currentImageIndex + 1) % images.length;

            dots[currentImageIndex].classList.add('active');
            images[currentImageIndex].classList.add('active');

            const text = images[currentImageIndex].getAttribute('data-text');
            heroContent.querySelector('h1').textContent = text;

            void heroContent.offsetWidth;
            heroContent.style.opacity = 1;
        }

        function goToSlide(index) {
            if (index !== currentImageIndex) {
                dots[currentImageIndex].classList.remove('active');
                images[currentImageIndex].classList.remove('active');
                heroContent.style.opacity = 0;

                currentImageIndex = index;

                dots[currentImageIndex].classList.add('active');
                images[currentImageIndex].classList.add('active');

                const text = images[currentImageIndex].getAttribute('data-text');
                heroContent.querySelector('h1').textContent = text;

                void heroContent.offsetWidth;
                heroContent.style.opacity = 1;
            }
        }

        setInterval(rotateDots, 5000);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });

        const impressionismImages = document.querySelectorAll('.today .image-container img');

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function fadeInOnScroll() {
  impressionismImages.forEach((image) => {
    if (isInViewport(image)) {
      image.classList.add('fade-in');
    }
  });
}

// Initial check on load
fadeInOnScroll();

// Listen for scroll events
window.addEventListener('scroll', fadeInOnScroll);
});
