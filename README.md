Shopping Cart Web App
This is a simple web application for an online shopping cart. The application uses HTML, CSS, and JavaScript to render a list of products fetched from a JSON file (server/catalog.json). Users can add or remove products from the shopping cart, and the cart's content is stored in the local storage.

Table of Contents
Getting Started
LocalStorage
Products
Header
Shopping Cart
Getting Started
To run the application, open the index.html file in a web browser. The page will display a list of products, and users can interact with the shopping cart by adding or removing items.

LocalStorage
The LocalStorageUtil class is responsible for managing the local storage. It provides methods to retrieve, add, remove, or removeAll products from the local storage.

Products
The Products class renders the product catalog on the web page. It fetches the product data from the server/catalog.json file, displays each product with an "Add to Cart" button, and updates the button text and style based on the user's actions.

Header
The Header class manages the header section of the web page. It includes the application title, search icon, shopping cart icon (with a counter), and user icon. The shopping cart icon allows users to open the shopping cart and view the items added.

Shopping Cart
The Shopping class handles the rendering and functionality of the shopping cart. Users can view and modify the contents of the cart, including adding, removing, or removing all instances of a specific product. The total price is dynamically updated based on the items in the cart.

<!-- Uncomment the following section if you want to include the Spinner functionality -->
<!-- ## Spinner

The `Spinner` class provides a loading spinner that can be used to indicate when data is being fetched or processed. The spinner is currently commented out in the code, but it can be activated by uncommenting the relevant sections.

-->