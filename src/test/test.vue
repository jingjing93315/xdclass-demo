<template>
  <div>
  </div>
</template>
<script lang="ts">
import {defineComponent, getCurrentInstance} from 'vue';
export default defineComponent({
  name: 'Test',
  setup(){
    const { proxy }:any = getCurrentInstance()

    // 发送ajax请求
    function ajaxTest(){
      proxy.$http.get(`/api/test`)
      .then((res:any)=>{
        console.log(res);
      }).catch((error:any)=>{
        console.log(error);
      })
    }
    ajaxTest()
  }
})
</script>
<style scoped>
</style>