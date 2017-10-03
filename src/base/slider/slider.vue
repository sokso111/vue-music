<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <!-- slot插槽 将组件包裹的内容插入到其中-->
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'
  export default {
    data () {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    props: {
      // 轮播
      loop: {
        type: Boolean,
        default: true
      },
      // 自动播放
      autoPlay: {
        type: Boolean,
        default: true
      },
      // 滚动时间
      interval: {
        type: Number,
        default: 4000
      }
    },
    mounted() {
      setTimeout(() => {
        // 设置轮播图宽
        this._setSliderWidth()
        // 初始化点
        this._initDots()
        // 初始化轮播图
        this._initSlider()
        if (this.autoPlay) {
          this._play()
        }
      }, 200)
      // 监听事件，在页面宽度改变时修改轮播图div宽度,第一个参数事件名，
      // 第二个参数出发后调用方法，第三个参数boolean值，是否冒泡事件
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    methods: {
      _setSliderWidth(isResize) {
        // ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。
        // 如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例
        this.children = this.$refs.sliderGroup.children
        console.log(this.children)
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')

          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      /**
       * 初始化dots'
       * @private
      */
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      /**
       * 初始化better-scroll
       * @private
       */
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true, // 横向滚动
          scrollY: false, // 纵向滚动
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400
        })
        // 页面变换时触发方法
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex
          // 调用自动轮播
          if (this.autoPlay) {
            clearTimeout(this.timer)
            this._play()
          }
        })
      },
      _play () {
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    },
    destoryed () {
      clearTimeout(this.timer)
    }
  }
</script>
<style type="text/stylus" scoped ref="stylesheet/style" lang="stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
