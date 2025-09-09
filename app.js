
const itemRow = document.querySelector('.item-row');
const cartItems = document.querySelector('.cart-itm');

const count = document.querySelector('#count');
const totalAmount = document.querySelector('.total');

const cartItm = document.querySelector('.cart-itms');
const cartContainer = document.querySelector('.tal-cart-content');
const closeBTN = document.querySelector('.close-BTN');



const products = [
    {id: 1, name: 'T-shirt 1', price: 5, stock: 10, imgSrc: './image/1.jpg'},
    {id: 2, name: 'T-shirt 2', price: 30, stock: 5, imgSrc: './image/2.jpg'},
    {id: 3, name: 'T-shirt 3', price: 25, stock: 5, imgSrc: './image/5.jpg'},
    {id: 4, name: 'T-shirt 4', price: 15, stock: 15, imgSrc: './image/4.jpg'},
    {id: 5, name: 'T-shirt 5', price: 7, stock: 20, imgSrc: './image/5.jpg'},
    {id: 6, name: 'T-shirt 6', price: 10, stock: 3, imgSrc: './image/2.jpg'},
    {id: 7, name: 'T-shirt 7', price: 3, stock: 10, imgSrc: './image/4.jpg'},
    {id: 8, name: 'T-shirt 8', price: 5, stock: 2, imgSrc: './image/3.jpg'},
    {id: 10, name: 'T-shirt 9', price: 20,stock: 4, imgSrc: './image/1.jpg'}   
];

//Products showing;
function renderElement() {
    products.forEach((item) => {      
        itemRow.innerHTML += `
            <div class="col-md-3 col-sm-4">
                <div class="card shadow my-2">
                    <div class="card-header"><h2>${item.name}</h2></div>
                    <div class="card-body"><img src="${item.imgSrc}" alt="${item.name}"> </div>
                    <div class="card-footer d-flex justify-content-between">
                    Price: ${item.price} <button onclick="addToCart(${item.id})">Add to cart</button>
                    </div>
                </div>
            </div>
        `;
    });
}
renderElement();

//CART ARRAY
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD To CART;
function addToCart(productId){
    if(cart.some(check => check.id == productId)){
        changeQty("plus", productId);
        //alert("Already in cart !");
        //return;
    }else{
        const item = products.find(product => product.id === productId);
        cart.push({...item, quantity: 1});
    }
    updateCart()
}


//Update Cart;
function updateCart(){
    renderCartItems();
    renderSubtotal();

    localStorage.setItem("CART", JSON.stringify(cart))
}

//Calculate and render Subtoatl
function renderSubtotal(){
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((item) =>{
        totalPrice += item.price * item.quantity
        totalItems += item.quantity;
    });

    totalAmount.innerHTML = `Total : ${ totalPrice.toFixed(2) } [Quantity: ${ totalItems }]`;
    count.innerHTML = `Cart ${ totalItems }`;
}

function renderCartItems(){
    cartItems.innerHTML = '';
    cart.forEach((item) => {
        cartItems.innerHTML += `
            <tr>
                <th><img src="${item.imgSrc}" alt="${item.name}"></th>
                <th>${item.name}</th>
                <th>${item.price}</th>
                <th>
                    <button class='bg-transparent' onclick="changeQty('minus',${item.id})">-</button> 
                    ${item.quantity} 
                    <button class='bg-transparent' onclick="changeQty('plus',${item.id})">+</button>
                </th>
                <th>
                    <button onclick='removeCartItems(${item.id})' class='h6'>&times;</button>
                </th>
            </tr>
        `;
    })
}

//Remove cart Items;
function removeCartItems(productId){
    cart = cart.filter((item) => item.id !== productId);
    updateCart();
}

//Change products quantity
function changeQty(action, productId){
    cart = cart.map((item) => { 

        let quantity = item.quantity;
        if(item.id === productId){
            if(action === "minus" && quantity > 1){
                quantity--;
            }else if (action === "plus" && quantity < item.stock){
                quantity++;
            }
        }
        return {...item, quantity};
    });
   
    updateCart();
}


//Cart sidebar show/hide;
function cartDetails(action){
    if(action == 'cartShow'){
        cartContainer.style.opacity = '1';
        cartContainer.style.visibility = 'visible';
        cartItm.style.display = 'none';
    }else if(action == 'cartHide'){
        cartContainer.style.opacity = '0';
        cartContainer.style.visibility = 'hidden'
        cartItm.style.display = 'block';
    }
}
