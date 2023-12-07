// class LocalStorageUtil{
//     constructor(){
//         this.keyName = 'products';
//     }

//     getProducts(){
//         const productsLocalStorage = localStorage.getItem(this.keyName);
//         if (productsLocalStorage !== null){
//             return JSON.parse(productsLocalStorage);
//         } else  {
//             return [];
//         }
//     }

//     putPtoducts(id){
//        let products = this.getProducts();
//        let pushProduct = false;
//        const index = products.indexOf(id);
//        if (index === -1){
//         products.push(id);
//         pushProduct = true;
//        } else {
//         products.splice(index, 1);
//        }
//        localStorage.setItem(this.keyName, JSON.stringify(products));
//        return {pushProduct, products}
//     }
// }
// //создаем экз класса
// const localStorageUtil = new LocalStorageUtil();
// //проверить метов getProducts
// //console.log(localStorageUtil.getProducts());