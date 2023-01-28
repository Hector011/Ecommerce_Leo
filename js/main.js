

const iconClose = document.querySelector(".bx-x");
const iconOpen = document.querySelector(".bx-grid-alt");
const home = document.querySelector(".casa");
const product = document.querySelector(".product");
const menu = document.querySelector(".menu");
{
const iconCart = document.querySelector(".bx-cart"); 
const contentCar = document.querySelector(".contentCar");  

iconCart.addEventListener("click", function () {
    contentCar.classList.toggle("contentCar__show")
})
}

[iconClose, iconOpen, home, product].forEach((icon) => {
    icon.addEventListener("click", () => menu.classList.toggle('menu__show'));
});

const headerNavbar = document.querySelector(".header__navbar");


window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        headerNavbar.classList.add("header__navbar-animation")
    } else {
        headerNavbar.classList.remove("header__navbar-animation")

    }
});

const data = [
    {
        id: 1,
        name: "Buzo rojo",
        price: 14,
        stock: 10,
        classFilter: "red",
        img: "./img/featured1.png"
    },
    {
        id: 2,
        name: "Buzo negro",
        price: 24,
        stock: 15,
        classFilter: "black",
        img: "./img/featured2.png"
    },
    {
        id: 3,
        name: "Buzo blanco",
        price: 24,
        stock: 20,
        classFilter: "white",
        img: "./img/featured3.png"
    }
];

let objCart = {};

const ecommerceProducts = document.querySelector(".ecommerce__products");



function printProducts(elementHTML, array) {
    let html = "";

 array.forEach(({classFilter, id, name, price, stock, img}) => {
        html += `
        <div class="product ${classFilter}">
         <div class="products__img">
           <img src="${img}" alt="${name}">
         </div>
        <div class="product__info">
           <div class="cart__add" id="${id}">
             <button class="btn btn__add"/>+</button>
           </div>
           <p>$${price}.00 <small>|Stock: ${stock}</small></p>
           <p>${name}</p>
        </div>
       </div>
       `
 });

 ecommerceProducts.innerHTML= html;

}

ecommerceProducts.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn__add")) {
        // id
        const id = e.target.parentElement.id;
        // objeto del id
        let findProduct = data.find(function(dato) {
            return dato.id === id;
        });
        // logica
        if (objCart[id]) {
            objCart[id].amount++;
        } else {
            objCart[id] = {
                ...findProduct,
                amount: 1,
            };
        }
    console.log(findProduct);
    }
});

printProducts(ecommerceProducts, data);

mixitup(".ecommerce__products", {
    selectors: {
        target: '.product'
    },
    animation: {
        duration: 300
    }
});

