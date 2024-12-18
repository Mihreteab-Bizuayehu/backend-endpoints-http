
const api = "http://127.0.0.1:3000/products?id=1";

// Function to render a single product
function renderProduct(product) {
  const { image, name, price, description } = product;
  const productContainer = document.createElement("div");
  productContainer.classList.add("product");

  const productImage = document.createElement("img");
  productImage.src = image;

  const productName = document.createElement("h3");
  productName.innerText = name;

  const productPrice = document.createElement("h4");
  productPrice.innerText = price;

  const productDescription = document.createElement("p");
  productDescription.innerText = description;

  // Append elements to the productContainer
  productContainer.appendChild(productImage);
  productContainer.appendChild(productName);
  productContainer.appendChild(productPrice);
  productContainer.appendChild(productDescription);

  // Append the productContainer to the container
  document.querySelector(".container").appendChild(productContainer);
}

let productData = {
  id: 21,
  image:
    "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/w/3/4/-original-imahyytukhkky5ew.jpeg?q=70",
  name: "vivo T3x 5G ",
  price: "$40",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
};

// Fetch products from the API
fetch(api)
  .then((response) => response.json())
  .then((products) => {
    products.forEach(renderProduct);
  })
  .catch((error) => console.error("Error fetching products:", error));


