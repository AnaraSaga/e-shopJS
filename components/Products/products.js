// //module.import { CATALOG } from './constants/catalog.js';
// //import {LocalStorageUtil} from ".utilits/localStorageUtils";

// class Products{
//     constructor(){
//         this.classNameActive = "products_element__btn_active";
//         this.labelAdd = "Add to Cart";
//         this.labelRemove = "Remove from Cart";
//     }

//     //метод отоброжает данные на страничке в виде HTML
//     render(){
//         const productsStore = localStorageUtil.getProducts();

//         let htmlCatalog = "";

//         //переменная доступна в константах        
//         //+деструктуризация 
//         CATALOG.forEach(({ id, productName, img, price, description})=>{
//             let activeClass = "";
//             let activeText = "";

//             if (productsStore.indexOf(id) === -1){
//                 activeText = this.labelAdd;
//             } else {
//                 activeClass = this.classNameActive;
//                 activeText = this.labelRemove;
//             }

//             htmlCatalog += 
//             `<li class="products_element">
//                 <img src="${img}" class="products_element__img"/>
//                 <span class="products_element__name">${productName}</span>
//                 <span class="products_element__price">${price.toLocaleString()}EUR</span>
//                 <button id = "productBtn_${id}" class="products_element__btn ${activeClass}">
//                     ${activeText}
//                 </button>
//             </li>`  
//         });
    
//         const html = 
//         `<ul class="products_container">
//             ${htmlCatalog}
//         </ul>`
        
//         const ROOT_PRODUCTS = document.getElementById("products");
//         ROOT_PRODUCTS.innerHTML = html;
    
//         // обрабатываем событие на кнопке
//         CATALOG.forEach(({ id }) => {
//             //console.log(id)
//             const btn = document.getElementById(`productBtn_${id}`);
//             //console.log(btn)
            
//             btn.addEventListener("click", ()=> {
//                 const { pushProduct, products } = localStorageUtil.putPtoducts(id);
//                 if (!pushProduct) {
//                     btn.classList.remove(productsPage.classNameActive);
//                     btn.innerHTML = productsPage.labelAdd;
//                 } else {
//                     btn.classList.add(productsPage.classNameActive);
//                     btn.innerHTML = productsPage.labelRemove;
//                 }
//                 //для отображения в счетчике при нажатии на кнопку
//                 headerPage.render(products.length);
//             });
//         });
//     }  
// }     
// const productsPage = new Products();
// productsPage.render();

