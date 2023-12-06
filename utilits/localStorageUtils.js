class LocalStorageUtil{
    constructor(){
        this.keyName = 'products'
    }

    getProducts(){
        const productsLocalStorage = localStorage.getItem(this.keyName);
        if (productsLocalStorage !== null){
            return JSON.parse(productsLocalStorage);
        }
        return [];
    }

    putPtoducts(id){

    }
}

const localStorageUtil = new LocalStorageUtil();

const a = localStorageUtil.getProducts();
console.log(a);