
const http = require("http");
const url = require("url");
const fs = require("fs");
const { error,log } = require("console");

const server = http.createServer((req, res) => {
  const parsedURL = url.parse(req.url, true);
  const products = fs.readFileSync("./products.json", "utf-8");
   res.setHeader("Access-Control-Allow-Origin","*");
   res.setHeader("Access-Control-Allow-Headers","*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
  
  if (req.method === "OPTIONS") {
    res.end();
  }

  //Fetching data using GET method
  else if (
    parsedURL.pathname === "/products" &&
    req.method === "GET" &&
    parsedURL.query.id === undefined
  ) {
    res.end(products);
  } else if (
    parsedURL.pathname === "/products" &&
    req.method === "GET" &&
    parsedURL.query.id !== undefined
  ) {
    let productArray = JSON.parse(products);
    const product = productArray.find(
      (product) => product.id == parsedURL.query.id
    );
    res.end(
      JSON.stringify(product ? product : { message: "Product Not Found" })
    );
  }
  //End of fetching data using GET method

  //Setching data using POST method
  else if (parsedURL.pathname === "/products" && req.method === "POST") {
    let product = "";
    console.log("post is working");
    req.on("data", (chunck) => {
      product += chunck;
    });

    req.on("end", () => {
      let productsArray = JSON.parse(products);
      let newProduct = JSON.parse(product);
      productsArray.push(newProduct);

      fs.writeFile(
        "./products.json",
        JSON.stringify(productsArray),
        (error) => {
          if (error == null) {
            res.end(JSON.stringify({ message: "New Product is Created" }));
          }
        }
      );
    });
  }
  //End of sending data using POST method

  // Updating data using PUT method
  else if (parsedURL.pathname === "/products" && req.method === "PUT") {
    let product = "";
    req.on("data", (chunk) => {
      product += chunk;
    });
    req.on("end", () => {
      let productsArray = JSON.parse(products);
      let newProduct = JSON.parse(product);
      let index = productsArray.findIndex(
        (product) => product.id == parsedURL.query.id
      );
      productsArray[index] = newProduct;

      if (index !== -1) {
        fs.writeFile(
          "./products.json",
          JSON.stringify(productsArray),
          (error) => {
            if (error === null) {
              res.end(
                JSON.stringify({ message: " Product is Successfully updated" })
              );
            } else {
              res.end(JSON.stringify({ message: "Some problem happened" }));
            }
          }
        );
      } else {
        res.end(JSON.stringify({ message: "The product is not found" }));
      }
    });
  }
  //End of updating data using PUT method

  // Deleting data using DELETE method
  else if (parsedURL.pathname === "/products" && req.method === "DELETE") {
    let productsArray = JSON.parse(products);
    let index = productsArray.findIndex(
      (product) => product.id == parsedURL.query.id
    );
    productsArray.splice(index, 1);

    fs.writeFile("./products.json", JSON.stringify(productsArray), (error) => {
      if (error === null) {
        res.end(JSON.stringify({ message: "Product is successfully deleted" }));
      } else {
        res.end(JSON.stringify({ message: "Some problem happened" }));
      }
    });
  }
  //End of Deleting data using DELETE method
}).listen(3000, () => {
  console.log(`The server is running at port: http://127.0.0.1:3000`);
})
// console.log("Directory Name: ",__dirname);
// console.log("File Name: ", __filename);
