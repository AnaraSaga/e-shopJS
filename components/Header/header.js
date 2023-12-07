// import localStorageUtil from './components/Products/products.js/localStorageUtil';

// class Header{

//     render(count){
//         const html = `
//         <div class="header_container">
//             <div class="header_title">     
//                 <span>S</span>HOPPE
//             </div>   
//             <div class="header_flexbox_icons">     
//                 <img src="img/icons/search.png" class="header__icons"/>
//                 <div class="header_cart">
//                     <img src="img/icons/cart.png" class="header__icons"/> 
//                     <div class="header_counter">${count}</div>    
//                 </div>  
//                 <img src="img/icons/user.png" class="header__icons"/>  
//             </div>    
//         </div>`

//         const ROOT_HEADER = document.getElementById("header");
//         ROOT_HEADER.innerHTML = html;
//     }

// }

// const headerPage = new Header();
// const productsStore = localStorageUtil.getProducts();
// headerPage.render(productsStore.length);