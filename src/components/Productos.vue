<template>
  <div class="productos">
    <div class="search">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar productos..."
      />
    </div>
    <div v-if= "searchQuery === ''" class="productos-grid">
      <product-card
        v-for="(product, index) in products"
        :key="index"
        :product="product"
      ></product-card>
    </div>
    <div v-if= "searchQuery !== ''" class="productos-grid">
      <product-card
        v-for="(product, index) in filteredProducts"
        :key="index"
        :product="product"
      ></product-card>
    </div>
  </div>
</template>

<script lang="ts">
import ProductCard from "@/components/ProductCard.vue";
export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
      searchQuery: "",
    };
  },
  computed: {
  filteredProducts() {
    const searchQuery = this.searchQuery.toLowerCase();
    return this.products.filter(product => {
      return product.title.toLowerCase().includes(searchQuery) || product.body.toLowerCase().includes(searchQuery);
    });
  }
},

  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => (this.products = data));
    },
  },
  mounted() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((products) => {
        this.products = products;
      })
      .catch((error) => console.error(error));
  },
};
</script>

<style lang="scss">
.productos {
  padding: 20px;
}

.productos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
}

.search {
  margin-bottom: 20px;
  input {
    width: 100%;
    padding: 10px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    background-color: #eee;
  }
}
</style>
