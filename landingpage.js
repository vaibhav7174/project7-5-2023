const logout = document.querySelector('.logout');
const profile = document.querySelector('.profile');
const home = document.querySelector('.home');
const myCart = document.querySelector('.myCart');


home.addEventListener("click", () => {
    window.location.href = './landingpage.html';
})

logout.addEventListener("click", () => {
    localStorage.removeItem('currentUser');
    window.location.href = "../Login/login.html";
})

profile.addEventListener("click", () => {
    window.location.href = "../Profile/profile.html";
})

myCart.addEventListener('click', () => {
    window.location.href = '../Mycart/mycart.html';
})

const search = document.querySelector('#search');

const menCardWrapper = document.querySelector('.men-card-wrapper');
const womenCardWrapper = document.querySelector('.women-card-wrapper');
const jewelleryCardWrapper = document.querySelector('.jewellery-card-wrapper');
const electronicsCardWrapper = document.querySelector('.electronics-card-wrapper');
const myRating = document.querySelector('#myRange');
let myValue = myRating.value;

let addCart = [];
let addCartArr = [];
const myData = [];  // this array will give the list of purchased products in cart page
localStorage.getItem('myCart') ? addCartArr = JSON.parse(localStorage.getItem('myCart')) : [];
fetch('https://fakestoreapi.com/products')
    .then(resolve => resolve.json())
    .then(data => {
        data.map(product => {
            myData.push(product.title);
            if (product.category === "men's clothing") {
                menCardWrapper.innerHTML += `
                <div class="card">
                    <img class="image-top" src=${product.image} alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">&#36;<span class="card-price">${product.price}</span></p>
                        <p class="card-stock">Hurry up only ${product.rating.count} items left!!!</p>
                        <p class="card-rating">${Math.round(product.rating.rate)} &#9733;</p>   
                    </div>
                    <button class='addCart'>Add to cart</button>
                </div>`;
            }
            if (product.category === "women's clothing") {
                womenCardWrapper.innerHTML += `
                <div class="card">
                    <img class="image-top" src=${product.image} alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">&#36;<span class="card-price">${product.price}</span></p>
                        <p class="card-stock">Hurry up only ${product.rating.count} items left!!!</p>
                        <p class="card-rating">${Math.round(product.rating.rate)} &#9733;</p>   
                    </div>
                    <button class='addCart'>Add to cart</button>
                </div>`;
            }
            if (product.category === "jewelery") {
                jewelleryCardWrapper.innerHTML += `
                <div class="card">
                    <img class="image-top" src=${product.image} alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">&#36;<span class="card-price">${product.price}</span></p>
                        <p class="card-stock">Hurry up only ${product.rating.count} items left!!!</p>
                        <p class="card-rating">${Math.round(product.rating.rate)} &#9733;</p>   
                    </div>
                    <button class='addCart'>Add to cart</button>
                </div>`;
            }
            if (product.category === "electronics") {
                electronicsCardWrapper.innerHTML += `
                <div class="card">
                    <img class="image-top" src=${product.image} alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">&#36;<span class="card-price">${product.price}</span></p>
                        <p class="card-stock">Hurry up only ${product.rating.count} items left!!!</p>
                        <p class="card-rating">${Math.round(product.rating.rate)} &#9733;</p>   
                    </div>
                    <button class='addCart'>Add to cart</button>
                </div>`;
            }
        })
        // filtering based on rating
        myRating.oninput = function () {  // slider input: when slider is changed to change the rating for filtering out
            myValue = this.value;
            let userCard;
            document.querySelectorAll('.card') ? userCard = document.querySelectorAll('.card') : userCard = "";
            userCard.forEach(function (elem) {
                let cardElemRating = parseInt(elem.querySelector('.card-rating').innerText);
                elem.classList.add('hide');
                if (cardElemRating == myValue) {
                    elem.classList.remove('hide');
                }
                if (myValue == 0) {  // zero is default means filter based on rating will not be applied there
                    elem.classList.remove('hide');
                }
            })
        }
        // filtering based on cost
        const zero = document.querySelector('#checkbox0');
        const twentyfive = document.querySelector('#checkbox25');
        const fifty = document.querySelector('#checkbox50');
        const hundred = document.querySelector('#checkbox100');
        // zero.checked = false;
        zero.addEventListener('click', () => {
            if (zero.checked == false) {
                zero.checked = false;
                let userCard;
                document.querySelectorAll('.card') ? userCard = document.querySelectorAll('.card') : userCard = "";
                userCard.forEach(function (elem) {
                    let cardElem = parseInt(elem.querySelector('.card-price').innerText);
                    elem.classList.remove('hide');
                })
            }
            else {
                zero.checked = true;
                twentyfive.checked = false;
                fifty.checked = false;
                hundred.checked = false;
                let userCard = "";
                document.querySelectorAll('.card') ? userCard = document.querySelectorAll('.card') : userCard = "";
                userCard.forEach(function (elem) {
                    let cardElemPrice = parseInt(elem.querySelector('.card-price').innerText);
                    elem.classList.add('hide');
                    if (cardElemPrice >= 0 && cardElemPrice <= 25) {
                        elem.classList.remove('hide');
                    }
                })
            }

        })
        twentyfive.addEventListener('click', () => {
            if (twentyfive.checked == false) {
                twentyfive.checked = false;
                let userCard = "";
                document.querySelectorAll('.card') ? userCard = document.querySelectorAll('.card') : userCard = "";
                userCard.forEach(function (elem) {
                    let cardElem = parseInt(elem.querySelector('.card-price').innerText);
                    elem.classList.remove('hide');
                })
            }
            else {
                zero.checked = false;
                twentyfive.checked = true;
                fifty.checked = false;
                hundred.checked = false;
                let userCard = "";
                document.querySelectorAll('.card') ? userCard = document.querySelectorAll('.card') : userCard = "";
                userCard.forEach(function (elem) {
                    let cardElemPrice = parseInt(elem.querySelector('.card-price').innerText);
                    elem.classList.add('hide');
                    if (cardElemPrice >= 25 && cardElemPrice <= 50) {
                        elem.classList.remove('hide');
                    }
                })
            }

        })
        fifty.addEventListener('click', () => {
            if (fifty.checked == false) {
                fifty.checked = false;
                let userCard = "";
                document.querySelectorAll('.card') ? userCard = document.querySelectorAll('.card') : userCard = "";
                userCard.forEach(function (elem) {
                    let cardElem = parseInt(elem.querySelector('.card-price').innerText);
                    elem.classList.remove('hide');
                })
            }
            else {
                zero.checked = false;
                twentyfive.checked = false;
                fifty.checked = true;
                hundred.checked = false;
                let userCard = "";
                document.querySelectorAll('.card') ? userCard = document.querySelectorAll('.card') : userCard = "";
                userCard.forEach(function (elem) {
                    let cardElemPrice = parseInt(elem.querySelector('.card-price').innerText);
                    elem.classList.add('hide');
                    if (cardElemPrice >= 50 && cardElemPrice <= 100) {
                        elem.classList.remove('hide');
                    }
                })
            }

        })
        hundred.addEventListener('click', () => {
            if (hundred.checked == false) {
                hundred.checked = false;
                let userCard = "";
                document.querySelectorAll('.card') ? userCard = document.querySelectorAll('.card') : userCard = "";
                userCard.forEach(function (elem) {
                    let cardElem = parseInt(elem.querySelector('.card-price').innerText);
                    elem.classList.remove('hide');
                })
            }
            else {
                zero.checked = false;
                twentyfive.checked = false;
                fifty.checked = false;
                hundred.checked = true;
                let userCard = "";
                document.querySelectorAll('.card') ? userCard = document.querySelectorAll('.card') : userCard = "";
                userCard.forEach(function (elem) {
                    let cardElemPrice = parseInt(elem.querySelector('.card-price').innerText);
                    elem.classList.add('hide');
                    if (cardElemPrice >= 100) {
                        elem.classList.remove('hide');
                    }
                })
            }
        })

        // Filter based on string typed in search box
        const search = document.querySelector('.input-search');
        const searchButton = document.querySelector('.btn-search');

        search.addEventListener('input', (e) => {

            const inputSearch = search.value.toLowerCase();
            let userCard = "";
            document.querySelectorAll('.card') ? userCard = document.querySelectorAll('.card') : userCard = "";
            userCard.forEach(function (elem) {
                elem.classList.add('hide');
                let cardElemTitle = elem.querySelector('.card-title').innerText.toLowerCase();
                if (cardElemTitle.includes(inputSearch)) {
                    elem.classList.remove('hide');
                }
            })
        })


        addCart = document.querySelectorAll('.addCart');
        let count = 0;
        let idCount = 0;
        addCart.forEach((elem) => {

            elem.setAttribute('id', count++);
            elem.addEventListener("click", function () {
                let x = document.getElementById("snackbar");
                x.className = "show";
                setTimeout(function () { x.className = x.className.replace("show", ""); }, 1500);
                const myProd = {
                    id: idCount++,
                    img: data[elem.id].image,
                    title: data[elem.id].title,
                    price: data[elem.id].price,
                }
                addCartArr.push(myProd);
                localStorage.setItem('myCart', JSON.stringify(addCartArr))
            });
        });

        const allProd = document.getElementById('all');
        const menProd = document.getElementById('mens');
        const womenProd = document.getElementById('womens');
        const jewelleryProd = document.getElementById('jewellery');
        const electronicsProd = document.getElementById('electronics');
        const menCard = document.querySelector('.mens-clothing');
        const womenCard = document.querySelector('.womens-clothing');
        const jewelleryCard = document.querySelector('.jewellery');
        const electronicsCard = document.querySelector('.electronics');
        const categories = document.querySelectorAll('.selectCategories');
        const clothings = document.querySelectorAll('.clothings');

        allProd.addEventListener('click', () => {
            categories.forEach(function (elem) {
                elem.style.color = '#162938';
                elem.style.backgroundColor = '#f0e6e6';
            })
            clothings.forEach(function (elem) {
                elem.classList.remove('hide');
            })
            allProd.style.color = '#fff';
            allProd.style.backgroundColor = '#000';
        })

        menProd.addEventListener('click', () => {
            categories.forEach(function (elem) {
                elem.style.color = '#162938';
                elem.style.backgroundColor = '#f0e6e6';
            })
            clothings.forEach(function (elem) {
                elem.classList.add('hide');
            })
            menCard.classList.remove('hide');
            menProd.style.color = '#fff';
            menProd.style.backgroundColor = '#000';
        })

        womenProd.addEventListener('click', () => {
            categories.forEach(function (elem) {
                elem.style.color = '#162938';
                elem.style.backgroundColor = '#f0e6e6';
            })
            clothings.forEach(function (elem) {
                elem.classList.add('hide')
            })
            womenCard.classList.remove('hide');
            womenProd.style.color = '#fff';
            womenProd.style.backgroundColor = '#000';
        })

        jewelleryProd.addEventListener('click', () => {
            categories.forEach(function (elem) {
                elem.style.color = '#162938';
                elem.style.backgroundColor = '#f0e6e6';
            })
            clothings.forEach(function (elem) {
                elem.classList.add('hide')
            })
            jewelleryCard.classList.remove('hide');
            jewelleryProd.style.color = '#fff';
            jewelleryProd.style.backgroundColor = '#000';
        })

        electronicsProd.addEventListener('click', () => {
            categories.forEach(function (elem) {
                elem.style.color = '#162938';
                elem.style.backgroundColor = '#f0e6e6';
            })
            clothings.forEach(function (elem) {
                elem.classList.add('hide')
            })
            electronicsCard.classList.remove('hide');
            electronicsProd.style.color = '#fff';
            electronicsProd.style.backgroundColor = '#000';
        })
    })
