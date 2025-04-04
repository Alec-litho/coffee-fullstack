import { defineStore } from "pinia";
import type { Product } from "~/types";

interface DataState {
  products: Product[];
  isLoading: boolean;
  page: number;
  totalPages: number
  pageSize: number;
}

export const useProductsStore = defineStore("products", {
  state: (): DataState => ({
    products: [],
    isLoading: false,
    page: 0,
    totalPages: 1,
    pageSize: 10,
  }),
  getters: {
    getAllProducts: (state): Product[] => {
      return state.products;
    },
    getAuthToken: (state) => {
      const token = useCookie("authToken") || "";
      return token.value;
    },
    getStatus: (state) => {
      return state.isLoading;
    },
    getProduct: (state) => {
      return (id:number) => state.products.filter(product => product.id == id)[0];
    },
  },
  actions: {
    async fetchProducts() {
      try {
        this.isLoading = true;
        const response = await fetch(`http://localhost:3002/products?page=${this.page+1}&pageSize=${this.pageSize}`, {
          headers: { Authorization: `Bearer ${this.getAuthToken}`, "Content-Type": "application/json" },
        });
        const {data, pagination} = await response.json();
        this.isLoading = false;
        this.products = [...this.products,...data];
        console.log(this.page, pagination)
        this.page += 1
        this.totalPages = pagination.totalPages
        return data
      } catch (error) {}
    },
    async createProduct(productData: Omit<Product, "id">) {
      try {
        this.isLoading = true;
        const response = await fetch("http://localhost:3002/products", {
          method: "POST",
          body: JSON.stringify(productData),
          headers: { Authorization: `Bearer ${this.getAuthToken}`, "Content-Type": "application/json" },
        });
        const newProduct = await response.json();
        this.isLoading = false;
        this.products = [newProduct, ...this.products];
        return newProduct;
      } catch (error) {
        throw error;
      }
    },

    async updateProduct(id:number, productData: Partial<Product>) {
      try {
        this.isLoading = true;

        const response = await fetch(`http://localhost:3002/products/${id}`, {
          method: "PUT",
          body: JSON.stringify(productData),
          headers: { Authorization: `Bearer ${this.getAuthToken}`, "Content-Type": "application/json" },
        });
        const updatedProduct = await response.json();
        this.isLoading = false;

        this.products = this.products.map((item) => (item.id === updatedProduct.id ? { ...item, ...updatedProduct } : item));

        return updatedProduct;
      } catch (error) {
        throw error;
      }
    },

    async deleteProduct(id: number) {
      this.isLoading = true;

      try {
        await fetch(`http://localhost:3002/products/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${this.getAuthToken}`, "Content-Type": "application/json" },
        });
        this.isLoading = false;

        this.products = this.products.filter((item) => item.id !== id);
      } catch (error) {
        throw error;
      }
    },
  },
});
