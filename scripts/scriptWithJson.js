//-------------Index--------------------
function render() {
    const productsPage = new Products();
    //headerPage.render(productsStore.length);
    productsPage.render();
  }
  //spinnerPage.render();
  let CATALOG = [];
  
  //https://api.myjson.online/v1/records/422ca1f2-67e8-43b0-ac27-cc602a9cf6e4
  //fetch('https://api.myjson.online/v1/records/422ca1f2-67e8-43b0-ac27-cc602a9cf6e4')
  
  fetch('server/catalog.json')
    .then(response => response.json())
    .then(body => {
      CATALOG = body;
      render();
    })
    .catch(error => console.log(error));

//-------------LocalStorage--------------
class LocalStorageUtil{
    constructor(){
        this.keyName = 'products';
    }

    getProducts(){
        const productsLocalStorage = localStorage.getItem(this.keyName);
        // if (productsLocalStorage !== null){
        //     return JSON.parse(productsLocalStorage);
        // } else  {
        //     return [];
        // }
        return productsLocalStorage !== null ? JSON.parse(productsLocalStorage) : [];
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
                <button id = "productBtn_${id}" class="products_element__btn ${activeClass}">${activeText}</button>
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

    // closeShoppingCartWithDelay() {
    //     setTimeout(() => {
    //         this.closeShoppingCart();
    //     }, 5000); 
    // }

    updateQuantity(id, action) {
        const { products } = localStorageUtil.putPtoducts(id, action);
        this.render();
        headerPage.render(products.length);
    }

    // updateQuantityWithDelay(id, action) {
    //     setTimeout(() => {
    //         this.updateQuantity(id, action);
    //     }, 500);
    // }

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

//-----------Spinner----------------
// class Spinner{
//     render(){
//         const html = `
//             <div class="spinner_element__img">
//                 <img src="components/Spinner/spinner.svg" class="spinner_element__img" />
//             </div>
//         `;

//         const ROOT_SPINNER = document.getElementById("spinner");
//         ROOT_SPINNER.innerHTML = html;

//     }

// }

// const spinnerPage = new Spinner();


  
