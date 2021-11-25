'use strict'

//mobile menu
const body = document.querySelector('body');
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.header-inner');

let mobileActivate = () => {
    menu.classList.toggle('mobile');
    body.classList.toggle('stop-scroll');
}

let mobileDeactivate = () => {
    menu.classList.remove('mobile');
    body.classList.remove('stop-scroll');
}

menuBtn.addEventListener('click', mobileActivate);
window.addEventListener('resize', mobileDeactivate);

// slider + thumbnail
const productImage = document.querySelector('.product-image');
const productThumbs = document.querySelectorAll('.product-thumb');
const arrowPrev = document.querySelector('.slider-btn-prev');
const arrowNext = document.querySelector('.slider-btn-next');
let currentIndex;

function getCurrentIndex() {
    for (let i = 0; i < productThumbs.length; i++) {
        if (productThumbs[i].classList.contains('active')) {
            currentIndex = i;
        }
    }
    return currentIndex;
}

function setFullImage() {
    productImage.style.backgroundImage = productThumbs[currentIndex].style.backgroundImage;
}

getCurrentIndex();
setFullImage();

let changeSlide = () => {
    for (let i = 0; i < productThumbs.length; i++) {
        productThumbs[i].classList.remove('active');
    };
    
    if (currentIndex >= productThumbs.length) {
        currentIndex = 0;
    };

    if (currentIndex < 0) {
        currentIndex = productThumbs.length - 1;
    };

    productThumbs[currentIndex].classList.add('active');
    setFullImage();
}

let nextSlide = () => {
    currentIndex += 1;
    changeSlide();
}

let prevSlide = () => {
    currentIndex -= 1;
    changeSlide();
}

let currentSlide = (e) => {
    for (let i = 0; i < productThumbs.length; i++) {
        productThumbs[i].classList.remove('active');
    };

    let target = e.target;
    target.classList.add('active');
    currentIndex = [...productThumbs].indexOf(target);
    setFullImage();
}

productThumbs.forEach(productThumb => productThumb.addEventListener('click', currentSlide));
arrowNext.addEventListener('click', nextSlide);
arrowPrev.addEventListener('click', prevSlide);

// lightbox
const lightbox = document.querySelector('.product-images');
const closeBtn = document.querySelector('.close-btn');

let openLightbox = () => {
    lightbox.classList.add('lightbox');
    body.classList.add('stop-scroll');
}

let closeLightbox = (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
        lightbox.classList.remove('lightbox');
    }
    lightbox.classList.remove('lightbox');
    body.classList.remove('stop-scroll');
}

productImage.addEventListener('click', openLightbox);
closeBtn.addEventListener('click', closeLightbox);
document.addEventListener('keydown', closeLightbox);

// change product quantity
const productQty = document.querySelector('.product-qty');
const minusQty = document.querySelector('.product-qty-btn.minus');
const plusQty = document.querySelector('.product-qty-btn.plus');
let totalQty = 0;

let addQty = () => {    
    totalQty++;
    productQty.innerHTML = totalQty;
}

let reduceQty = () => {    
    totalQty--;
    if (totalQty <= 0 ) {
        totalQty = 0;
    }
    productQty.innerHTML = totalQty;
}

plusQty.addEventListener('click', addQty);
minusQty.addEventListener('click', reduceQty);

// add product to cart
const cartInner = document.querySelector('.cart-inner');
const cartIcon = document.querySelector('.cart-icon');
const cartCounter = document.querySelector('.cart-counter');
const cartEmpty = document.querySelector('.cart-empty');
const cartFull = document.querySelector('.cart-product.cart-full');
const addToCartBtn = document.querySelector('.button-cart');
const cartDeleteBtn = document.querySelector('.cart-product-delete');

let showCart = () => {
    cartInner.classList.toggle('active');
};

let fillCart = () => {
    let cartProductPrice = document.querySelector('.cart-product-price');
    let cartProductQty = document.querySelector('.cart-product-qty');
    let cartProductTotal = document.querySelector('.cart-product-total');

    let totalSum = totalQty * Number(cartProductPrice.innerHTML.substring(1));
    cartProductTotal.innerHTML = '$' + totalSum.toFixed(2);
    cartProductQty.innerHTML = 'x ' + totalQty;
};

let addToCart = () => {
    cartCounter.innerHTML = totalQty;

    if (totalQty > 0) {
        cartEmpty.classList.remove('active');
        cartFull.classList.add('active');
        cartCounter.classList.add('active');
        fillCart();
    };
};

let deleteFromCart = () => {
    cartEmpty.classList.add('active');
    cartFull.classList.remove('active');
    cartCounter.classList.remove('active');
};

document.addEventListener('click', (e) => {
    if (cartIcon.contains(e.target)) {
        showCart();
    };

    if (addToCartBtn.contains(e.target)) {
        addToCart();
    };

    if (cartDeleteBtn.contains(e.target)) {
        e.preventDefault();
        deleteFromCart();
    };

    if (!cartInner.contains(e.target) && !cartIcon.contains(e.target)) {
        cartInner.classList.remove('active');
    };
});