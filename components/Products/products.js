d//module.import { CATALOG } from './constants/catalog.js';
//import {LocalStorageUtil} from ".utilits/localStorageUtils";

//------------CATALOG---------------
const CATALOG = [
    {
        id:"pr01",
        productName: "Lira Earings",
        img: "img/pictures/01.png",
        price: 25.00,
        description:"",
    },
    {
        id:"pr02",
        productName: "Hal Earings",
        img: "img/pictures/02.png",
        price: 25.00,
        description:"",
    },
    {
        id:"pr03",
        productName: "Hair Pin Set of 4",
        img: "img/pictures/03.png",
        price: 40.00,
        description:"",
    },
    {
        id:"pr04",
        productName: "Kaede Hair Pin Set of 3",
        img: "img/pictures/04.png",
        price: 30.00,
        description:"",
    },
    {
        id:"pr05",
        productName: "Plaine Necklace",
        img: "img/pictures/05.png",
        price: 19.00,
        description:"",
    },
    {
        id:"pr06",
        productName: "Yuki Hair Pin Set of 3",
        img: "img/pictures/06.png",
        price: 29.00,
        description:"",
    }
];

//-------------LocalStorage--------------
class LocalStorageUtil{
    constructor(){
        this.keyName = 'products';
    }

    getProducts(){
        const productsLocalStorage = localStorage.getItem(this.keyName);
        if (productsLocalStorage !== null){
            return JSON.parse(productsLocalStorage);
        } else  {
            return [];
        }
    }

    putPtoducts(id){
       let products = this.getProducts();
       let pushProduct = false;
       const index = products.indexOf(id);
       if (index === -1){
        products.push(id);
        pushProduct = true;
       } else {
        products.splice(index, 1);
       }
       localStorage.setItem(this.keyName, JSON.stringify(products));
       return {pushProduct, products}
    }
}
//создаем экз класса
const localStorageUtil = new LocalStorageUtil();
//проверить метов getProducts
//console.log(localStorageUtil.getProducts());

 //-------------Products--------------
class Products{
    constructor(){
        this.classNameActive = "products_element__btn_active";
        this.labelAdd = "Add to Cart";
        this.labelRemove = "Remove from Cart";
    }

    //метод отоброжает данные на страничке в виде HTML
    render(){
        const productsStore = localStorageUtil.getProducts();

        let htmlCatalog = "";

        //переменная доступна в константах        
        //+деструктуризация 
        CATALOG.forEach(({ id, productName, img, price, description})=>{
            let activeClass = "";
            let activeText = "";

            if (productsStore.indexOf(id) === -1){
                activeText = this.labelAdd;
            } else {
                activeClass = this.classNameActive;
                activeText = this.labelRemove;
            }

            htmlCatalog += 
            `<li class="products_element">
                <img src="${img}" class="products_element__img"/>
                <span class="products_element__name">${productName}</span>
                <span class="products_element__price">${price.toLocaleString()}EUR</span>
                <button id = "productBtn_${id}" class="products_element__btn ${activeClass}">
                    ${activeText}
                </button>
            </li>`  
        });
    
        const html = 
        `<ul class="products_container">
            ${htmlCatalog}
        </ul>`
        
        const ROOT_PRODUCTS = document.getElementById("products");
        ROOT_PRODUCTS.innerHTML = html;
    
        // обрабатываем событие на кнопке
        CATALOG.forEach(({ id }) => {
            //console.log(id)
            const btn = document.getElementById(`productBtn_${id}`);
            //console.log(btn)
            
            btn.addEventListener("click", ()=> {
                const { pushProduct, products } = localStorageUtil.putPtoducts(id);
                if (!pushProduct) {
                    btn.classList.remove(productsPage.classNameActive);
                    btn.innerHTML = productsPage.labelAdd;
                } else {
                    btn.classList.add(productsPage.classNameActive);
                    btn.innerHTML = productsPage.labelRemove;
                }
                //для отображения в счетчике при нажатии на кнопку
                headerPage.render(products.length);
            });
        });
    }  
}     
const productsPage = new Products();
productsPage.render();

//----------Header----------------
class Header{
    openShoppingCart(){
        shoppingPage.render();
    }

    render(count){
        const html = `
            <div class="header_container">
                <div class="header_title">     
                    <span>S</span>HOPPE
                </div>   
                <div class="header_flexbox_icons">     
                    <img src="img/icons/search.png" class="header__icons"/>
                    <div class="header_cart" onclick="headerPage.openShoppingCart();">
                        <img src="img/icons/cart.png" class="header__icons"/> 
                        <div class="header_counter">${count}</div>    
                    </div>  
                    <img src="img/icons/user.png" class="header__icons"/>  
                </div>    
            </div>`
    
        const ROOT_HEADER = document.getElementById("header");
        ROOT_HEADER.innerHTML = html;
    } 
}    
const headerPage = new Header();
const productsStore = localStorageUtil.getProducts();
headerPage.render(productsStore.length);

//------------Shopping------------------
class Shopping{
    render(){
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = "";
        let sumCatalog = 0;

        CATALOG.forEach(({ id, productName, img, price})=>{
            if(productsStore.indexOf(id)!= -1){
                htmlCatalog += `
                <li class="shopping_element">
                    <img src="${img}" class="shopping_element__img"/>
                    <div>
                    <span class="shopping_element__name">${productName}</span>
                    <span class="shopping_element__price">${price.toLocaleString()}EUR</span>
                    </div>
                </li>
                `;
                sumCatalog += price;
            }

        })


        const html = `
            <div class="shopping_container">
                <div class="shopping__close" onclick="closeShoppingCart">
                    <img src="img/icons/close.png" class="shopping_close__icon" />
                <div> 
                </div>
                <h4 class="shopping_title">
                    Shopping Cart
                </h4>
                <ul>
                    ${htmlCatalog}
                </ul>
                <div>
                    <span class="shopping_element__name">Total: </span>
                    <span class="shopping_element__price">${sumCatalog.toLocaleString()}EUR</span>
                </div>    
            </div>
        `
        const ROOT_SHOPPING = document.getElementById("shopping");
        ROOT_SHOPPING.innerHTML = html;

    }
}
const shoppingPage = new Shopping();
