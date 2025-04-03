import { Product, ProductsResponse } from "@/types.d";

 async function fetchProducts() {
  const products = await fetch("http://localhost:3001/products");
  return products;
}

 async function uploadProduct(data: Product) {
    const product = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {

        }
    });
    return product;
  }
  async function updateProduct(data: Product) {
    const product = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {

        }
    });
    return product;
  }

  async function deleteProduct(data: Product) {
    const product = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {

        }
    });
    return product;
  }
  
  

  export {
    fetchProducts,
    uploadProduct,
    updateProduct,
    deleteProduct
  }