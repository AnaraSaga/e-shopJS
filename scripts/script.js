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

    putPtoducts(id,action){
       let products = this.getProducts();
       let pushProduct = false;
       let index = products.indexOf(id);

       if (action === 'add' || index === -1) {
            products.push(id);
            pushProduct = true;
        } else if (action === 'remove' ) {
            products.splice(index, 1);
        } else if (action === 'remove-all') {
            // Удаляет все 
            while (index !== -1) {
                products.splice(index, 1);
                index = products.indexOf(id);
            }
        } else {
            products.splice(index, 1);
        } 
        localStorage.setItem(this.keyName, JSON.stringify(products));
        return {pushProduct, products}
    }
}
const localStorageUtil = new LocalStorageUtil();

 //-------------Products--------------
class Products{
    constructor(){
        this.classNameActive = "products_element__btn_active";
        this.labelAdd = "Add to Cart";
        this.labelRemove = "Remove from Cart";
    }

    render(){
        const productsStore = localStorageUtil.getProducts();

        let htmlCatalog = "";

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
    
        CATALOG.forEach(({ id }) => {
            const btn = document.getElementById(`productBtn_${id}`);
            btn.addEventListener("click", ()=> {
                const { pushProduct, products } = localStorageUtil.putPtoducts(id);
                if (!pushProduct) {
                    btn.classList.remove(productsPage.classNameActive);
                    btn.innerHTML = productsPage.labelAdd;
                } else {
                    btn.classList.add(productsPage.classNameActive);
                    btn.innerHTML = productsPage.labelRemove;
                }
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
    closeShoppingCart(){
        const ROOT_SHOPPING = document.getElementById("shopping");
        ROOT_SHOPPING.innerHTML = "";
        productsPage.render();
    }

    updateQuantity(id, action) {
        const { products } = localStorageUtil.putPtoducts(id, action);
        this.render();
        headerPage.render(products.length);
    }

    render(){
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = "";
        let sumCatalog = 0;

        CATALOG.forEach(({ id, productName, img, price})=>{
            const quantity = productsStore.reduce((count, productId) => (productId === id ? count + 1 : count), 0);

            if(quantity > 0){
                htmlCatalog += `
                <tr class="shopping_element">
                    <td class="shopping_element__img"><img src="${img}"/></td>
                    <td class="shopping_element__name">${productName}</td>
                    <td class="shopping_element__price">${price.toLocaleString()} EUR</td>   
                    <td class="shopping_element__quantity">
                        <button onclick="shoppingPage.updateQuantity('${id}', 'remove')">-</button>
                        <span>${quantity}</span>
                        <button onclick="shoppingPage.updateQuantity('${id}', 'add')">+</button>
                    </td>
                    <td class="shopping_element__totalPrice">${(price * quantity).toLocaleString()} EUR</td>  

                    <td class="shopping_element__removeAll" onclick="shoppingPage.updateQuantity('${id}', 'remove-all')"><img src="img/icons/deleteAll.png"/></td>
                </tr>
                `;
                sumCatalog += price*quantity;
            }
        })

        const html = `
            <div class="shopping_container">
                <div class="shopping__close" onclick="shoppingPage.closeShoppingCart();"></div>
                <h4 class="shopping_title">
                    Shopping Cart
                </h4>
                <table>
                    <tbody>
                    ${htmlCatalog}
                    <tr>
                        <td class="shopping_element__name">Total: </td>
                        <td class="shopping_element__price">${sumCatalog.toLocaleString()}EUR</td>
                    </tr>  
                    </tbody>
                </table>
            </div>
        `
        const ROOT_SHOPPING = document.getElementById("shopping");
        ROOT_SHOPPING.innerHTML = html;
    }
}
const shoppingPage = new Shopping();
