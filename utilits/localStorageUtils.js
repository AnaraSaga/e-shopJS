// class LocalStorageUtil{
//     constructor(){
//         // у элемента есть ключ продуктс. создаем констурктор с ключтом 
//         this.keyName = 'products';
//     }

//     // позволяет получить все продукты в локалсторадж  
//     getProducts(){
//         //вызвать метод getItem. для этого создаем переменную. получать будем по ключу продуктс 
//         const productsLocalStorage = localStorage.getItem(this.keyName);
//         //проверка если есть значение то вернется строка, если нет значения то вернется ноль 
//         if (productsLocalStorage !== null){
//             //если строка не ноль то возвращаем продуктс через разпарсить строку в массив и вернуть массив
//             return JSON.parse(productsLocalStorage);
//         } else  {
//             //иначе вренет пустой массив
//             return [];
//         }
//     }

//     //добавить новое значение в локалсторадж. если хотим добавить значение то передаем айди
//     putPtoducts(id){
//         //посмотреть что есть в локалст. в продуктс все что есть в ло
//        let products = this.getProducts();

//        //вернуть значение новый продукт или нет
//        let pushProduct = false;
       
//        //есть ли совпадение с айди
//        const index = products.indexOf(id);
       
//        //проверка чтобы не повторялся новый элемент 
//        //если совпадение не найдено 
//        if (index === -1){
//         // пролдуктс это массив и туда можно добавить нов эл
//         products.push(id);
//         pushProduct = true;
//        } else {
//         //иначе удалить этот элемент из массива (позиция и количество эл)
//         products.slice(index, 1);
//        }
//        //поскольку локалст принимает только строку то из массива надо делать строку и добавть в локалст
//        localStorage.setItem(this.keyName, JSON.stringify(products)); 
//        //вернуть объект 
//        return {pushProduct, products}
//     }
// }


// //создаем экз класса
// const localStorageUtil = new LocalStorageUtil();

// //проверить метов getProducts
// console.log(localStorageUtil.getProducts());

// //проверить метод putProducts
// //localStorageUtil.putPtoducts("pr07");
// //localStorageUtil.putPtoducts("pr08");