import { createStore } from 'vuex'

export default createStore({
  state: {
    cartArray:[]
  },
  mutations: {
    // 添加商品到购物车
    toCart(state:any, tag:any){
      const goods:any = state.cartArray.find((val:any)=>{
        return val.id == tag.id
      })

      if(goods){
        goods.cartCount += 1
      }else {
        const item = {
          id: tag.id,
          title: tag.details,
          cartCount: 1,
          img: tag.img
        }
        state.cartArray.push(item)
      }
    },
    getCart(state:any){
      console.log(state.cartArray);
    },
    clearCart(state:any){
      state.cartArray = []
    },
    add(state:any,tag:any){
      const goods:any = state.cartArray.find((val:any)=>{
        return val.id == tag.id
      })
      if(goods){
        goods.cartCount += 1
      }else {
        const item = {
          id: tag.id,
          title: tag.title,
          cartCount: 1,
          img: tag.img
        }
        state.cartArray.push(item)
      }
    },
    subtract(state:any,val:any){
      for(let i =0;i<state.cartArray.length;i++){
        if(state.cartArray[i].id == val.id){
          if(state.cartArray[i].cartCount == 1){
            state.cartArray.splice(i,1)
          }else {
            state.cartArray[i].cartCount -= 1
          }
        }
      }
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
    getGoodsNum(state:any){
      let num = 0
      state.cartArray.forEach((val:any)=>{
        num += val.cartCount
      })
      return num
    }
  }
})
