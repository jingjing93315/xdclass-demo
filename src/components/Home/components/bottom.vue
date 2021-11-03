<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="homeTop">首页</van-tabbar-item>
      <van-tabbar-item icon="cart-o" :badge="goodsNum" to="shopCart">购物车</van-tabbar-item>
      <van-tabbar-item icon="friends-o" @click="loginOut">退出</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'HomeBottm',
  setup() {
    const active = ref(0);
    const store = useStore();

    const { proxy }:any = getCurrentInstance();

    const goodsNum = ref(
      computed(() => {
        return store.getters.getGoodsNum;
      })
    );

    function loginOut() {
      window.sessionStorage.removeItem('token')
      proxy.$router.push('/login')
    }
    return {
      active,
      goodsNum,
      loginOut,
    };
  },
});
</script>
<style scoped>
</style>