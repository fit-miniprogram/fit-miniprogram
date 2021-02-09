import throttle from '../../gradient-bar/utils/throttle';
const SCROLL_TOP_OFFSET = 200;
Page({


  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  
  clickMove: function (e) {
    var that = this 
    this.setData({
      swiperClass: 'swiper-init swiper-moved',
      searchClass: 'searchPartInit searchPartMove',
      cameraClass:'camera-init cameraMove',
      speechClass:'speech-init speechMove',
      bottomClass:'bottom-init bottomMove',
      searchTipClass:'searchTip-init searchTipMove',
      placeHolderContent: " "
    })
   /* setTimeout(function () {   //此处必须为that 垃圾微信
      that.setData({isShow:false})},1000)*/
  },

  moveBack: function (e) {
   /* var that = this
    setTimeout(function () {
      that.setData({isShow:true})},1000)
  */
    this.setData({
      swiperClass: 'swiper-init',
      searchClass: 'searchPartInit',
      cameraClass:'camera-init',
      speechClass:'speech-init',
      bottomClass:'bottom-init',
      searchTipClass:'searchTip-init',
      placeHolderContent: "开 始 热 量 查 找",
      //isShow: true,
      inputValue:''
    })
  },

  data: {
    opacity: 0,
    list: new Array(40),
    cardCur: 0,
    placeHolderContent: "开 始 热 量 查 找",
    searchClass: 'searchPartInit ',
    swiperClass: 'swiper-init ',
    cameraClass:'camera-init',
    speechClass:'speech-init',
    bottomClass:'bottom-init',
    searchTipClass:'searchTip-init',
    isShow:true,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
  },
  onLoad() {
    this.towerSwiper('swiperList');
    getApp().loadFont();
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },
  onPageScroll(evt) {
    throttle(this.handleScroll.bind(this), 300)(evt);
  },

  handleScroll({ scrollTop }) {
    if (scrollTop > SCROLL_TOP_OFFSET && this.data.opacity === 1) {
      // 不需要再计算
      return;
    }
    let opacity = scrollTop / SCROLL_TOP_OFFSET;
    if (scrollTop > SCROLL_TOP_OFFSET) {
      opacity = 1;
    }

    this.setData({ opacity });
  }
})

  


