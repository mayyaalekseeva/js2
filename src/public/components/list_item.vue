<template>
  <div class="product-item" :class="calcWrapClass">
       <img :src="calcImg" alt="product img">
    <template v-if="type === 'catalog'">
        <div class="desc">
            <h1>{{ item.product_name }}</h1>
            <p>{{ item.price }}</p>
            <button class="buy-btn" name="buy-btn" @click="$parent.addItem(item)">Купить</button>
        </div>
    </template>
    <template v-else-if="type === 'cart'" >
        <div class="product-desc">
            <p class="product-title">{{ item.product_name }}</p>
            <p class="product-quantity">{{ item.quantity }}</p>
            <p class="product-single-price">{{ item.price }}</p>
        </div>
        <div class="right">
            <button name="del-btn" class="del-btn" @click="$emit('deleteitem', item)">&times;</button>
        </div>
    </template>
    <template v-else-if="type === 'temp'">
        <div class="desc w-75">
            <label >
                <input type="text" placeholder="Item name" v-model="newProduct.name" class="w-50">
            </label>
            <label >
                <input type="number" placeholder="Item price" v-model="newProduct.price" class="w-50">
            </label>
            <button class="buy-btn" 
                name="buy-btn"
                @click="createNew(newProduct)"
            >Добавить</button>
        </div>
    </template>
  </div>
</template>

<script>
export default {
    props: {
        item: { type: Object },
        type: { type: String, default: 'catalog' }
    },
    data() {
        return {
            newProduct: {
                name: '',
                price: 0
            }
        }

    },
    computed: {
        calcWrapClass() {
            return type === 'catalog' ? 'product-item' : 'cart-item'
        },
        calcImg() {
            return `https://placehold.it/${this.type === 'catalog' ? '300x200' : '100x80'}`
        }
    },
    methods: {
        createNew(item) {
            if (item.name && item.price) {
                this.$emit('createnew', item);
                this.newProduct.name = '';
                this.newProduct.price = 0;
            }
        }
    }

}
</script>

<style>

</style>