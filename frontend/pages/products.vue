<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { useProductsStore } from "~/stores/products.store";
import type { Product } from "~/types";

const authStore = useAuthStore();
const productsStore = useProductsStore();
const emptyProductObj = {
  id: 0,
  name: "",
  price: 0,
  category: "",
  description: "",
  stock: 0,
};
let selectedProduct = ref({ ...emptyProductObj });
let showModal = ref(false);

onMounted(() => {
  productsStore.fetchProducts();
});

const handleLogout = () => {
  authStore.logout();
  navigateTo("/login");
};

const handleOpenModal = () => (showModal.value = true);

//we check if user selected project if so we update, otherwise we create
const handleSave = (data: Product) => {
  if (selectedProduct.value.name) {
    const id = data.id;
    delete data.id;
    productsStore.updateProduct(id, data);
  } else {
    delete data.id;
    productsStore.createProduct(data);
  }
  handleCloseModal();
};
const handleCloseModal = () => {
  showModal.value = !showModal.value;
  selectedProduct.value = emptyProductObj;
};
const handleClick = function (e) {
  if (e.target.parentNode.className === "table-row") {
    selectedProduct.value = productsStore.getProduct(e.target.parentNode.getAttribute("id"));
    handleOpenModal();
  }
};
</script>

<template>
  <div class="account-container">
    <header>
      <h1>Товары</h1>
      <div class="actions">
        <button @click="handleOpenModal">Добавить товар</button>
        <button @click="handleLogout">Выход</button>
      </div>
    </header>

    <table class="data-table">
      <div class="table-header">
        <h3>Название</h3>
        <h3>Цена</h3>
        <h3>Категория</h3>
        <h3>Описание</h3>
        <h3>Кол-во</h3>
      </div>
      <div class="table-body" @click="handleClick">
        <InfinityScroller :load-more="productsStore.fetchProducts">
          <div class="table-row" v-for="product in productsStore.getAllProducts" :key="product.id" :id="product.id">
            <p>{{ product.name }}</p>
            <p>{{ product.price }}</p>
            <p>{{ product.category }}</p>
            <p>{{ product.description }}</p>
            <p>{{ product.stock }}</p>
          </div>
        </InfinityScroller>
      </div>
    </table>

    <ProductModal v-if="showModal" ref="productModal" :type="selectedProduct.name ? 'update' : 'create'" :product="selectedProduct" @close="handleCloseModal" @save="handleSave" />
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

    .table-header {
      display: flex;
      align-items: center;
      h3 {
        width: 20%;
        text-align: start;
      }
    }

    .table-body {
      .table-row {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        transition: 0.2s;
        cursor: pointer;
        p {
          width: 20%;
          text-align: start;
        }
      }
      .table-row:hover {
        background-color: rgb(241, 241, 241);
      }
    }
  }
}
</style>
