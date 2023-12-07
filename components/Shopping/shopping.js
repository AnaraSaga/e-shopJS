// class Shopping{
//     closeShoppingCart(){
//         const ROOT_SHOPPING = document.getElementById("shopping");
//         ROOT_SHOPPING.innerHTML = "";
//     }

//     render(){
//         const productsStore = localStorageUtil.getProducts();
//         let htmlCatalog = "";
//         let sumCatalog = 0;

//         CATALOG.forEach(({ id, productName, img, price})=>{
//             if(productsStore.indexOf(id)!= -1){
//                 htmlCatalog += `
//                 <tr class="shopping_element">
//                     <td class="shopping_element__img"><img src="${img}"/></td>
//                     <td class="shopping_element__name">${productName}</td>
//                     <td class="shopping_element__price">${price.toLocaleString()} EUR</td>    
//                 </tr>
//                 `;
//                 sumCatalog += price;
//             }
//         })

//         const html = `
//             <div class="shopping_container">
//                 <div class="shopping__close" onclick="shoppingPage.closeShoppingCart();"></div>
//                 <h4 class="shopping_title">
//                     Shopping Cart
//                 </h4>
//                 <table>
//                     <tbody>
//                     ${htmlCatalog}
//                     <tr>
//                         <td class="shopping_element__name">Total: </td>
//                         <td class="shopping_element__price">${sumCatalog.toLocaleString()}EUR</td>
//                     </tr>  
//                     </tbody>
//                 </table>
                  
//             </div>
//         `
//         const ROOT_SHOPPING = document.getElementById("shopping");
//         ROOT_SHOPPING.innerHTML = html;

//     }
// }
// const shoppingPage = new Shopping();
