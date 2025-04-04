<template>
  <div class="infinite-scroller" @scroll="handleScroll" ref="scrollContainer">
    <slot></slot>

    <div v-if="loading" class="loading-indicator">Загрузка...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
const props = defineProps({
  loadMore: {
    type: Function,
    required: true,
  },
});
const productsStore = useProductsStore()
const emit = defineEmits(["load-more"]);
const loading = ref(false);
const page = ref(1);
const scrollContainer = ref<HTMLElement | null>(null);


const handleScroll = throttle(() => {

  if(productsStore.page >= productsStore.totalPages) return
  const container = scrollContainer.value;
  if (!container) return;

  const { scrollTop, scrollHeight, clientHeight } = container;
  const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 200;

  if (isNearBottom) {
    loadMoreData();
  }
}, 1000);

const loadMoreData = async () => {
  try {
    loading.value = true;
    await props.loadMore(page.value);
    page.value++;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  scrollContainer.value?.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  scrollContainer.value?.removeEventListener('scroll', handleScroll);
});
</script>


<style scoped>
.infinite-scroller {
width: 100%;
  height: 500px;
  overflow-y: auto;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.scroller-item {
  padding: 16px;
  margin-bottom: 12px;
  background: #f8f8f8;
  border-radius: 4px;
  transition: transform 0.2s;
}

.scroller-item:hover {
  transform: translateX(5px);
}

.loading-indicator {
  padding: 16px;
  text-align: center;
  color: #666;
}

.end-of-list {
  padding: 16px;
  text-align: center;
  color: #999;
  font-style: italic;
}
</style>
