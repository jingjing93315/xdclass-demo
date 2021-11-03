<template>
  <!-- swiper -->
  <div>
    <van-swipe :autoplay="2000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image.img" />
      </van-swipe-item>
    </van-swipe>
  </div>
  <!-- hot video -->
  <div>热门视频</div>
  <div class="hotVideos">
    <van-grid :border="false" :column-num="2">
      <van-grid-item  @click="toCart(item)" v-for="(item,index) in hotVideos" :key="index">
        <van-image :src="item.img" />
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue';
import { useStore } from 'vuex'
export default defineComponent({
  name: 'HomeTop',
  setup() {
    const { proxy }: any = getCurrentInstance();
    const store = useStore()
    const images = ref<any>(null);
    const hotVideos = ref<any>(null)
    // 获取首页轮播图和热门视频资源
    function getSource() {
      proxy.$http
        .get(`/api/homePhoto`)
        .then((res: any) => {
          console.log(res.data);
          if (res.data.code === 0) {
            images.value = res.data.data[0].bannerList;
            hotVideos.value = res.data.data[1].videoList
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
    getSource()

    // 定义添加商品到购物车方法
    function toCart(item:any){
      proxy.$toast.success('成功添加到购物车')
      store.commit('toCart', item)
      store.commit('getCart')
    }
    return { images, hotVideos, toCart };
  },
});
</script>
<style scoped>
img {
  width: 100%;
}
.hotVideos {
  margin-bottom: 3rem;
}
</style>