<script setup lang="ts">
import { ref, watch } from "vue";
import type { Product } from "~/types.d";

const props = defineProps<{
  type: "create" | "update";
  product?: Product;
}>();

const emit = defineEmits<{
  (e: "save", product: Product): void;
  (e: "close"): void;
}>();

const form = ref<Product>({
  id: 0,
  name: "",
  price: 0,
  category: "",
  description: "",
  stock: 0,
});

const categories = ref(["Electronics", "Clothing", "Books", "Other"]);
watch(
  () => props.product,
  (newProduct) => {
    if (props.type === "update" && newProduct) {
      form.value = { ...newProduct };
    } else {
      resetForm();
    }
  }
);

const resetForm = () => {
  form.value = {
    id: 0,
    name: "",
    price: 0,
    category: "",
    description: "",
    stock: 0,
  };
};
const closeModal = () => emit("close")
const handleSave = () => {
  if (!form.value.name || !form.value.category) {
    alert("Please fill required fields");
    return;
  }

  emit("save", { ...form.value });
};


</script>

<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>{{ type === "create" ? "Create New Product" : "Edit Product" }}</h2>

      <form @submit.prevent="handleSave">
        <div class="form-group">
          <label>Name <span class="required">*</span></label>
          <input v-model="form.name" required />
        </div>

        <div class="form-group">
          <label>Price <span class="required">*</span></label>
          <input v-model.number="form.price" type="number" step="0.01" min="0" required />
        </div>

        <div class="form-group">
          <label>Category <span class="required">*</span></label>
          <select v-model="form.category" required>
            <option value="" disabled>Select category</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea v-model="form.description" rows="3" />
        </div>

        <div class="form-group">
          <label>Stock <span class="required">*</span></label>
          <input v-model.number="form.stock" type="number" min="0" required />
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="closeModal">
            Cancel
          </button>
          <button type="submit" class="btn-primary">
            {{ type === "create" ? "Create" : "Save Changes" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.required {
  color: red;
}

.modal-actions {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-primary {
  background-color: #2196f3;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  background-color: #f5f5f5;
  color: #333;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #1976d2;
}
</style>
