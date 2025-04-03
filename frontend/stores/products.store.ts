import { defineStore } from "pinia";

interface Product {
  id: number;
  name: string;
  status: string;
  date_created: string;
  price: number;
  category: string;
  stock: number;
  brand: string;
  rating: number;
}

interface DataState {
  products: Product[]

}

export const useProductsStore = defineStore("products", {
  state: (): DataState => ({
    products: []
  }),
  getters: {
    getAllProducts(state) {
      return state.products;
    },
    getAllBrands(state) {
      return new Set(state.products.map((product) => product.brand));
    },
  },
  actions: {
    async fetchProducts() {
      try {
        const data  = await fetch("/api/products");
        this.$state.products = data as Product[];
      } catch (error) {
      } 
    },
    async createProduct(productData: Omit<Product, "id">) {
      try {
        const newProduct = await fetch("/api/products", {
          method: "POST",
          body: JSON.stringify(productData),
        });
        this.$state.products = [newProduct, ...this.$state.products]
        return newProduct;
      } catch (error) {
        throw error;
      }
    },

    async updateProduct(id: number, productData: Partial<Product>) {
      try {
        const updatedProduct = await $fetch<Product>(`/api/products/${id}`, {
          method: "PUT",
          body: productData,
        });

        this.$state.products = this.$state.products.map((item) => (item.id === id ? { ...item, ...updatedProduct } : item));

        return updatedProduct;
      } catch (error) {
        throw error;
      } 
    },

    async deleteProduct(id: number) {
      try {
        await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });

        this.$state.products =  this.$state.products.filter((item) => item.id !== id);

      } catch (error) {
        throw error;
      } 
    },
  },
});
