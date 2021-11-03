import Mock from 'mockjs'

Mock.setup({
  timeout: '200-2000', // ms为单位
})

// 三个参数 正则表达式 请求方法 返回的回调函数
Mock.mock(/\/api\/test/, 'get', (req: any) => {
  console.log(req)
  return {
    code: 0,
    data: {
      msg: 'test success',
    },
  }
})
Mock.mock(/\/api\/login/, 'post', (req: any) => {
  // 账号值
  const userPools = [
    {
      name: 'gaojing',
      password: '123456',
    },
    {
      name: '狗尚',
      password: '123456',
    },
  ]
  const { name, password } = JSON.parse(req.body)
  const userLength = userPools.filter((item) => {
    return (item.name = name)
  })
  if (userLength.length > 0) {
    if (userLength[0].password == password) {
      return {
        code: 0,
        data: {
          msg: 'login success',
          token: 'gaojing',
        },
      }
    } else {
      return {
        code: -1,
        data: {
          msg: 'password error',
        },
      }
    }
  } else {
    return {
      code: -1,
      data: {
        msg: '账号不存在',
      },
    }
  }
})
Mock.mock(/\/api\/homePhoto/, 'get', () => {
  return {
    code: 0,
    data: [
      {
        title: '轮播视频',
        bannerList: [
          {
            img: 'https://file.xdclass.net/video/2021/1-lbt/VIP/vip1299.png',
            details: '超级会员',
            id: 1,
          },
          {
            img: 'https://file.xdclass.net/video/2021/62-paas/lbt-paas.png',
            details: '工业级微服务项目',
            id: 2,
          },
          {
            img: 'https://file.xdclass.net/video/2021/aliyun/03lbt.png',
            details: '阿里云服务器',
            id: 3,
          },
        ],
      },
      {
        title: '热门视频',
        videoList: [
          {
            img: 'https://file.xdclass.net/video/2021/61-RabbitMq/zt.jpg',
            details: '容器化分布式集群实战',
            id: 4,
          },
          {
            img: 'https://file.xdclass.net/video/2020-12%20%E5%AE%98%E7%BD%91%E8%B6%85100k%E4%B8%BB%E5%9B%BE%E6%9B%B4%E6%96%B0/%E4%B8%BB%E5%9B%BE/57-alibabacloud.jpg',
            details: 'AlibabaCloud',
            id: 5,
          },
          {
            img: 'https://file.xdclass.net/video/2020/SSM/zt-ssm.png',
            details: 'ssm新版',
            id: 6,
          },
          {
            img: 'https://file.xdclass.net/video/2020-12%20%E5%AE%98%E7%BD%91%E8%B6%85100k%E4%B8%BB%E5%9B%BE%E6%9B%B4%E6%96%B0/%E4%B8%BB%E5%9B%BE/37-yhq.jpeg',
            details: '微服务Dubbo',
            id: 7,
          },
          {
            img: 'https://file.xdclass.net/video/2021/59-Postman/Postman.png',
            details: 'Postman',
            id: 8,
          },
          {
            img: 'https://file.xdclass.net/video/2021/60-MLS/cover.jpeg',
            details: 'MybatisPlus',
            id: 9,
          },
          {
            img: 'https://file.xdclass.net/video/2020/SSM/zt-ssm.png',
            details: 'ssm新版',
            id: 10,
          },
          {
            img: 'https://file.xdclass.net/video/2021/61-RabbitMq/zt.jpg',
            details: 'RabbitMQ',
            id: 11,
          },
        ],
      },
    ],
  }
})
export default Mock
