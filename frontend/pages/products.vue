<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { useProductsStore } from "~/stores/products.store";
import type { Product } from "~/types";

const authStore = useAuthStore();
const productsStore = useProductsStore();
const selectedProduct =  {
    id: 0,
    name: "",
    price: 0,
    category: "",
    description: "",
    stock: 0,
  };
let showModal = ref(false);

// onMounted(() => {
//   if (!authStore.isAuthenticated) {
//     return navigateTo("/login");
//   }
// });
onMounted(() => {
  productsStore.fetchProducts()
});


const handleLogout = () => {
  authStore.logout();
  navigateTo("/login");
};

const handleModal = () => {
  showModal.value = !showModal.value
  console.log(showModal)
};

</script>

<template>
  <div class="account-container">
    <header>
      <h1>Товары</h1>
      <div class="actions">
        <button @click="handleModal">Добавить товар</button>
        <button @click="handleLogout">Выход</button>
      </div>
    </header>

    <table class="data-table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Дата создания</th>
          <th>Цена</th>
          <th>Бренд</th>
          <th>Кол-во</th>
          <th>Дата создания</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in productsStore.getAllProducts" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.date_created }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.brand }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.category }}</td>
        </tr>
      </tbody>
    </table>

    <ProductModal v-if="showModal" ref="productModal" :type="selectedProduct ? 'update' : 'create'" :product="selectedProduct"  @close="showModal = !showModal"/>
  </div>
</template>

<style lang="scss">
.account-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  .actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    tr:hover {
      background-color: #f5f5f5;
    }

    .active {
      color: green;
    }

    .inactive {
      color: #dc3545;
    }
  }

  .filters {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }
}
</style>
