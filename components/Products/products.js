//import { CATALOG } from './constants/catalog';
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

class Products{
    
    //метод отоброжает данные на страничке в виде HTML
    render(){
        let htmlCatalog = "";

        //переменная доступна в константах        
        //+деструктуризация 
        CATALOG.forEach(({ id, productName, img, price, description})=>{
            htmlCatalog += 
            `<li class="products_element">
                <img src="${img}" class="products_element__img"/>
                <span class="products_element__name">${productName}</span>
                <span class="products_element__price">${price.toLocaleString()} EUR</span>
                <button class="products_element__btn">Add to Cart</button>
            </li>`
             
        });

        const html = 
        `<ul class="products_container">
            ${htmlCatalog}
        </ul>`
        
        const ROOT_PRODUCTS = document.getElementById("products");
        ROOT_PRODUCTS.innerHTML = html;
    }
}

const productsPage = new Products();
productsPage.render();