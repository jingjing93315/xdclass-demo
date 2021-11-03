<template>
  <!-- 空状态组件 -->
  <div class="empty" v-if="goodsNum == 0">
    <van-empty image="search" description="当前购物车为空" />
  </div>
  <div v-else>
    <div class="goodsTop">
      <h2>购物车</h2>
    </div>
    <!-- 购物车中商品展示区域 -->
    <div class="goodsCenter">
      <div class="goodsItem" v-for="(item,index) in goodsData" :key="index">
        <div class="left">
          <img :src="item.img" />
        </div>
        <div class="center">{{item.title}}</div>
        <div class="right">
          <van-stepper 
            v-model="item.cartCount" 
            theme="round" 
            min="0" 
            step="0"
            button-size="22" 
            disable-input 
            @plus='add(item)'
            @minus='subtract(item)'
            />
        </div>
      </div>
    </div>
    <div class="goodsBottom">
      <van-button plain hairline type="info" color="grey" @click="clickButton(1)">下单</van-button>
      <van-button plain hairline type="info" color="grey" @click="clickButton(2)">清空</van-button>
    </div>
    
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed,getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'ShopCart',
  setup() {
    const { proxy }:any = getCurrentInstance()
    const store = useStore();

    // 购物车商品总数
    const goodsNum = ref(
      computed(() => {
        return store.getters.getGoodsNum;
      })
    );
    // goodsData 存储当前购物车所有数据
    const goodsData = ref(computed(()=>{
      return store.state.cartArray
    }))
    
    // 触发下单清空
    function clickButton(val:number) {
      if(val == 1){
        proxy.$toast.success('下单成功')
      }else if(val == 2) {
        store.commit('clearCart')
      }
    }
    // 定义增加商品方法add
    function add(val:number){
      store.commit('add', val)
    }
     // 定义减少商品方法add
    function subtract(val:number){
      store.commit('subtract', val)
    }
    const value = ref(0);
    return {
      goodsNum,
      value,
      goodsData,
      clickButton,
      add,
      subtract
    };
  },
});
</script>
<style scoped>
.empty {
  margin-top: 5rem;
}
.goodsTop {
  margin-top: 3rem;
  margin-bottom: 2rem;
}
.goodsItem {
  position: relative;
  width: 100%;
  height: 5rem;
  margin-top: 1rem;
}
.goodsCenter {
  position: relative;
  width: 100%;
  min-height: 5rem;
}
.left {
  height: 5rem;
  position: absolute;
  left: 1rem;
}
img {
  height: 100%;
}
.center {
  position: absolute;
  top: 0.5rem;
  right: 1.5rem;
}
.right {
  position: absolute;
  bottom: 0.5rem;
  right: 1.5rem;
}
.goodsBottom {
  margin-top: 2rem;
  margin-bottom: 5rem;
}
</style>