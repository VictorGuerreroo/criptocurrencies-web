<template>
    <div class="product-card">
      <h2 class="product-title">{{ product.title }}</h2>
      <p class="product-description">{{ product.description }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style lang="scss">
  .product-card {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
  }
  
  .product-title {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .product-description {
    font-size: 16px;
  }
  </style>
  