<template>
  <div class="header-cart-block">
                <div class="cart-all">
                    <span class="message">Всего товаров</span> <div id="quantity"></div>
                </div>
                
                <div class="cart-items message">
                    <item
                    v-for="item of items"
                    :key = "item.id_product"
                    :item = "item"
                    :type = "'cart'"
                    @deleteitems = "removeItem"  />
                </div>
                
                <div class="cart-final-price">
<span class="message">Общая стоимость</span> <div id="price"></div>
                </div>
            </div>
</template>

<script>
import item from "../components/list_item.vue"
export default {
    components: { item },
    data() {
        return {
            url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json',
            items: []
        }
    },
    methods:  {
        addItem(item) {
            let find = this.items.find(el => el.id_product === item.id_product);
            if (find) {
                find.quantity++;
            } else {
                this.item.push(Object.assign({}, item, {quantity: 1}));
            }
        },
        removeItem(item) {
            let find = this.items.find(el => el.id_product === item.id_product);
            if (find.quantity > 1) {
                find.quantity--
            } else {
                this.items.splice(this.items.indexOf(find), 1)
            }
        }
    },
    mounted() {
        this.$parent.get(this.url).then(d => this.items = d.contents)
    }

}
</script>

<style>

</style>