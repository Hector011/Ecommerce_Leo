

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

let data = [
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

const cartProducts = document.querySelector(".carProducts");

function printProductsInCart() {
    let html = "";

    const arrayCart = Object.values(objCart);

    arrayCart.forEach(({classFilter, id, name, price, img, amount}) => {
        html += `
        <div class="product1 ${classFilter}">
         <div class="products__img">
           <img src="${img}" alt="${name}">
         </div>
        <div class="product__info1">
           <div class="cart__add1" id="${id}">
                <i class='bx bx-minus'></i>
                <i class='bx bx-plus'></i>
                <i class='bx bxs-trash'></i>
           </div>
           <p>$${price}.00 <small>|Cant: ${amount}</small></p>
           <p>${name}</p>
        </div>
       </div>
       `
 })
    // for

    cartProducts.innerHTML = html;
};



const ecommerceProducts = document.querySelector(".ecommerce__products");
const carTotal = document.querySelector(".carTotal");
const amounCart = document.querySelector(".amounCart");

function printAmountCart() {
    let sum = 0;

    const arrayCart = Object.values(objCart);

    arrayCart.forEach(function ({amount}) {
        sum += amount;
    });

    amounCart.textContent = sum;

}

function printTotalCart() {
    const arrayCart = Object.values(objCart);

    if(!arrayCart.length) {
            carTotal.innerHTML = `
                <h3> :'C </h3
            `;

            return;
    }

    let sum = 0;

    arrayCart.forEach(function({amount, price}) {
        sum += amount * price
    });

    carTotal.innerHTML = `
    <h3>Total: $${sum} </h3>
    <button class="btn btn__buy">Comprar</button>
`;
}

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
            return dato.id == id;
        });
        // logica
        if (objCart[id]) {

            let findProduct = data.find(function(dato) {
                return dato.id == id;
            });
    
            if(findProduct.stock === objCart[id].amount){
                alert("Limite del stock disponible")
            } else {
                objCart[id].amount++;
            }
        } else {
            objCart[id] = {
                ...findProduct,
                amount: 1,
            };
        }
       
    }
    printProductsInCart();
    printTotalCart();
    printAmountCart();
});

cartProducts.addEventListener("click", function(e) {
    if (e.target.classList.contains("bx-minus")) {
        const id = e.target.parentElement.id;

        if(objCart[id].amount === 1){
            delete objCart[id];
        } else {
            objCart[id].amount--;
        }
        
    }
    if (e.target.classList.contains("bx-plus")) {
        const id = e.target.parentElement.id;

        let findProduct = data.find(function(dato) {
            return dato.id == id;
        });

        if(findProduct.stock === objCart[id].amount){
            alert("Limite del stock disponible")
        } else {
            objCart[id].amount++;
        }
    }
    if (e.target.classList.contains("bxs-trash")) {
        const id = e.target.parentElement.id;

        const res = confirm("Seguro que quieres elimar este producto");
        if (res) delete objCart[id];
    }

    printProductsInCart();
    printTotalCart();
    printAmountCart();
})

carTotal.addEventListener("click", function(e) {
    if(e.target.classList.contains("btn__buy")) {
        const res = confirm("Confirmar compra")

        if (!res) return;

        let newArray = [];

        data.forEach(function(data) {
             if(data.id === objCart[data.id]?.id) {
                newArray.push({
                    ...data,
                    stock: data.stock - objCart[data.id].amount
                })
             } else {
                newArray.push(data);
             }
        });

        data = newArray;
        objCart = {};


        printProducts(ecommerceProducts, data);
        printProductsInCart(); 
        printTotalCart();
        printAmountCart();
        
    }
});

printProducts(ecommerceProducts, data);
printTotalCart();

mixitup(".ecommerce__products", {
    selectors: {
        target: '.product'
    },
    animation: {
        duration: 300
    }
});

