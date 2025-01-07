// 单件商品数据结构
class UIGoods{
  constructor(data){
    this.data = data;
    this.choose = 0
  }

  increase(){
    this.choose += 1
  }

  decrease(){
    if(this.choose == 0){ return}
    this.choose -= 1
  }

  getTotalPrice(){
    return this.data.price * this.choose
  }

  isChoose(){
    return this.choose > 0
  }
}

// const uiGoods = new UIGoods(goods[0])

class UIData{
  constructor(){
    this.goods = goods.map(item=>new UIGoods(item))
    this.deliveryPrice = 5
    this.deliveryThreshold = 30
  }

  increase(index){
    this.goods[index].increase()
  }

  decrease(index){
    this.goods[index].decrease()
  }

  getTotalChoose(){
   return this.goods.reduce((pre,cur)=>pre + cur.choose,0)
  }

  getTotalPrice(){
    return this.goods.reduce((pre,cur)=>pre + cur.choose * cur.data.price,0)
  }

  isChoose(){
    return this.getTotalChoose() > 0
  }

  isCrossDeliveryThreshold(){
    return this.getTotalPrice() >= this.deliveryThreshold
  }
}

// const uiData = new UIData()

class UI{
  constructor(){
    this.uiData = new UIData()
    this.doms = {
      goodsListContainer: document.querySelector('.goods-list'),
      goodsBtns: document.querySelector('.goods-btns'),
      footerCar: document.querySelector('.footer-car'),
      footerCarBadge: document.querySelector('.footer-car-badge'),
      footerCarTotal: document.querySelector('.footer-car-total'),
      footerCarTip: document.querySelector('.footer-car-tip'),
      footerPay: document.querySelector('.footer-pay'),
      footerPaySpan: document.querySelector('.footer-pay span'),
    }

    const footerCarRect = this.doms.footerCar.getBoundingClientRect()
    
    this.jumpTarget = {
      x: footerCarRect.left + footerCarRect.width / 2,
      y: footerCarRect.top + footerCarRect.height / 5,
    }

    this.createHTML()
    this.initListeners()
  }

  increase(index){
    this.uiData.increase(index)
    this.updateGoodsItem(index)
    this.updateFooterCar()
    this.increaseBtnAnimate(index)
    this.carAnimate()
  }

  decrease(index){
    this.uiData.decrease(index)
    this.updateGoodsItem(index)
    this.updateFooterCar()
  }
  /**
   * 更新商品项的显示状态
   * @param {number} index - 商品项的索引
   */
  updateGoodsItem(index){
    // 检查商品是否被选中
    const isChoose = this.uiData.goods[index].isChoose();
    // 获取对应的商品项DOM元素
    const goodsItem =  this.doms.goodsListContainer.querySelectorAll('.goods-item')[index];
    // 如果商品被选中，添加 'active' 类
    if(isChoose){
      goodsItem.classList.add('active');
    } else{
      // 如果商品未被选中，移除 'active' 类
      goodsItem.classList.remove('active');
    }   
    // 获取商品数量显示的DOM元素
    const chooseNum = goodsItem.querySelector('.goods-btns span');
    // 更新商品数量显示
    chooseNum.innerHTML = this.uiData.goods[index].choose;
  }

  updateFooterCar(){
    const isChoose = this.uiData.isChoose()
    if(isChoose){
      this.doms.footerCar.classList.add('active')
    }else{
      this.doms.footerCar.classList.remove('active')
    }
    const totalPrice = this.uiData.getTotalPrice()
    this.doms.footerCarBadge.textContent = this.uiData.getTotalChoose()
    this.doms.footerCarTotal.textContent = `${totalPrice.toFixed(2)}`

    if(totalPrice >= this.uiData.deliveryThreshold){
      this.doms.footerPay.classList.add('active')
    }else{
      this.doms.footerPaySpan.textContent = `还差￥${(this.uiData.deliveryThreshold - totalPrice).toFixed(2)}元起送`
      this.doms.footerPay.classList.remove('active')
    }
  }

  carAnimate(){
    this.doms.footerCar.classList.add('animate')
  }

  increaseBtnAnimate(index){
    const goodsItem = this.doms.goodsListContainer.querySelectorAll('.goods-item')[index]
    const increaseBtn = goodsItem.querySelector('.i-jiajianzujianjiahao')
    const increaseBtnRect = increaseBtn.getBoundingClientRect()
    const div = document.createElement('div')
    div.classList.add('add-to-car');
    const i = document.createElement('i')
    i.className = 'iconfont i-jiajianzujianjiahao'
    div.style.transform = `translateX(${increaseBtnRect.left}px)`
    i.style.transform = `translateY(${increaseBtnRect.top}px)`
    div.appendChild(i)
    document.body.appendChild(div)
  
    div.clientWidth
    div.style.transform = `translateX(${this.jumpTarget.x}px)`
    i.style.transform = `translateY(${this.jumpTarget.y}px)`

    div.addEventListener('transitionend',()=>{
      // console.log('过渡结束！');
      div.remove()
    },{once: true})
  }

  initListeners(){
    this.doms.footerCar.addEventListener('animationend',()=>{
      this.doms.footerCar.classList.remove('animate')
    })

    // 点击事件
    this.doms.goodsListContainer.addEventListener('click',e=>{
      const target = e.target
      if(target.classList.contains('i-jianhao')){
        const index = target.dataset.index
        this.decrease(index)
      }else if(target.classList.contains('i-jiajianzujianjiahao')){
        const index = target.dataset.index
        this.increase(index)
      }
            
    })
  }

  createHTML(){
    let goodsItemString = ''
    this.uiData.goods.forEach((data,index)=>{
      const g = data.data
      goodsItemString += `<div class="goods-item" data-index="${index}">
          <img src="${g.pic}" alt="${g.title}商品图片" class="goods-pic" />
          <div class="goods-info">
            <h2 class="goods-title">${g.title}</h2>
            <p class="goods-desc">
              ${g.desc}
            </p>
            <p class="goods-sell">
              <span>月售 ${g.sellNumber}</span>
              <span>好评率${g.favorRate}%</span>
            </p>
            <div class="goods-confirm">
              <p class="goods-price">
                <span class="goods-price-unit">￥</span>
                <span>${g.price}</span>
              </p>
              <div class="goods-btns">
                <i class="iconfont i-jianhao" data-index="${index}"></i>
                <span>0</span>
                <i class="iconfont i-jiajianzujianjiahao" data-index="${index}"></i>
              </div>
            </div>
          </div>
        </div>`
    })
    this.doms.goodsListContainer.innerHTML = goodsItemString;
    this.doms.footerCarTip.textContent = `配送费￥${this.uiData.deliveryPrice}`
    this.doms.footerPaySpan.textContent = `还差￥${this.uiData.deliveryThreshold}元起送`
  }
}

const ui = new UI()