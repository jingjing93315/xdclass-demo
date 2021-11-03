<template>
  <div class="top">
    <van-swipe :autoplay="2000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
  <div>
    <van-field v-model="user.name" name="账号" label="账号" placeholder="账号" :rules="[{ required: true, message: '请填写账号' }]" />
    <van-field v-model="user.password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
  </div>
  <div>
    <van-button plain type="primary" color='grey' @click="clickButton(1)">登录</van-button>
    <van-button plain type="primary" color='grey' @click="clickButton(2)">重置</van-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from 'vue';
export default defineComponent({
  name: 'Login',
  setup() {
    // 获取当前实例对象
    const { proxy }: any = getCurrentInstance();
    const images = reactive([
      'https://file.xdclass.net/video/2021/1-lbt/VIP/vip1299.png',
      'https://file.xdclass.net/video/2021/62-paas/lbt-paas.png',
      'https://file.xdclass.net/video/2021/59-Postman/59lbt.png',
    ]);

    // 保存登录的信息
    const user = reactive({
      name: '',
      password: '',
    });

    // 发送登录请求的方法
    function toLogin() {
      proxy.$http
        .post(`/api/login`, {
          name: user.name,
          password: user.password,
        })
        .then((res: any) => {
          if (res.data.code == 0) {
            proxy.$toast.success('login success');
            console.log(res.data);
            window.sessionStorage.setItem('token', res.data.data.token)
            proxy.$router.push({
              path: 'home'
            })
          } else {
            proxy.$toast.fail('login fail');
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    }

    function clickButton(value: number) {
      if (value == 1) {
        if (user.name == '' && user.password == '') {
          proxy.$toast.fail('账号和密码不能为空');
        } else {
          toLogin();
        }
      } else if (value == 2) {
        user.name = '';
        user.password = '';
      }
    }
    return { images, user, clickButton };
  },
});
</script>
<style scoped>
img {
  width: 100%;
}
.top {
  margin-bottom: 3rem;
}
</style>