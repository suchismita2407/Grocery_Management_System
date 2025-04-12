// products-data.js
const products = [
    {
        id: 1,
        name: "Fresh Apples",
        category: "fruits",
        price: 120,
        weight: "1kg",
        image: "https://media.istockphoto.com/id/184276818/photo/red-apple.jpg",
        deliveryTime: "30 mins"
    },
    {
        id: 2,
        name: "Bananas",
        category: "fruits",
        price: 50,
        weight: "6 pieces",
        image: "https://media.istockphoto.com/id/636739634/photo/banana-bunch.jpg",
        deliveryTime: "30 mins"
    },
    {
        id: 3,
        name: "Fresh Oranges",
        category: "fruits",
        price: 80,
        weight: "1kg",
        image: "https://media.istockphoto.com/id/185284489/photo/orange.jpg",
        deliveryTime: "30 mins"
    },
    {
        id: 4,
        name: "Tomatoes",
        category: "vegetables",
        price: 40,
        weight: "1kg",
        image: "https://media.istockphoto.com/id/466175630/photo/tomato-isolated-on-white-background.jpg",
        deliveryTime: "30 mins"
    },
    {
        id: 5,
        name: "Potatoes",
        category: "vegetables",
        price: 30,
        weight: "1kg",
        image: "https://media.istockphoto.com/id/157430678/photo/three-potatoes.jpg",
        deliveryTime: "30 mins"
    },
    {
        id: 6,
        name: "Onions",
        category: "vegetables",
        price: 25,
        weight: "1kg",
        image: "https://media.istockphoto.com/id/466175630/photo/tomato-isolated-on-white-background.jpg",
        deliveryTime: "30 mins"
    },
    {
        id: 7,
        name: "Milk",
        category: "dairy",
        price: 55,
        weight: "1 liter",
        image: "https://media.istockphoto.com/id/155417827/photo/milk-bottle.jpg",
        deliveryTime: "30 mins"
    },
    {
        id: 8,
        name: "Cheese",
        category: "dairy",
        price: 200,
        weight: "200g",
        image: "https://media.istockphoto.com/id/174845257/photo/cheese.jpg",
        deliveryTime: "30 mins"
    },
    {
        id: 9,
        name: "Eggs",
        category: "dairy",
        price: 60,
        weight: "6 pieces",
        image: "https://media.istockphoto.com/id/1028915708/photo/eggs-in-a-carton.jpg",
        deliveryTime: "30 mins"
    },
    {
        id: 10,
        name: "Bread",
        category: "bakery",
        price: 35,
        weight: "1 loaf",
        image: "https://media.istockphoto.com/id/157377819/photo/sliced-bread-loaf.jpg",
        deliveryTime: "30 mins"
    },
    {
        id: 11,
        name: "Cookies",
        category: "snacks",
        price: 40,
        weight: "200g",
        image: "https://media.istockphoto.com/id/1250010409/photo/chocolate-chip-cookies-on-white-background.jpg",
        deliveryTime: "30 mins"
    },
    {
        id: 12,
        name: "Chips",
        category: "snacks",
        price: 20,
        weight: "50g",
        image: "https://media.istockphoto.com/id/510840566/photo/potato-chips-in-package-isolated-on-white.jpg",
        deliveryTime: "30 mins"
    }
];

// Function to get products by category
function getProductsByCategory(category) {
    return products.filter(product => product.category === category);
}

// Function to get all products
function getAllProducts() {
    return products;
}