<template>
  <div :style="_styles">
    <div v-for="i in count" :key="i">
      <div class="skeleton w-100" :style="_styles"></div>
    </div>
    <!-- <Skeleton width="100%" height="20" margin="2" /> -->
  </div>
</template>

<script>
  export default {
    name: "SkeletonLoader",
    props: {
      width: {
        type: [String, Number],
        default: "100%"
      },
      height: {
        type: [String, Number],
        default: 10
      },
      margin: {
        type: [String, Number],
        default: 1
      },
      count: {
        type: Number,
        default: 1
      },
    },
    computed: {
      _styles() {
        return {
          width: this._width,
          height: this._height,
          margin: this._margin,
        };
      },
      _width() {
        return this.isNumeric(this.width) ? this.width + "px !important" : this.width;
      },
      _height() {
        return this.isNumeric(this.height) ?
          this.height + "px !important" :
          this.height;
      },
      _margin() {
        return this.isNumeric(this.margin) ?
          this.margin + "px !important" :
          this.margin;
      },
    },
    methods: {
      isNumeric(value) {
        return /^\d+$/.test(value);
      },
    },
  };
</script>

<style scoped>
  .skeleton {
    display: inline-block;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    /* background-color: #dddbdd; */
    background-color: #f2eef2ee;
  }

  .skeleton::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(90deg,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.2) 20%,
        rgba(255, 255, 255, 0.5) 60%,
        rgba(255, 255, 255, 0));
    -webkit-animation: shimmer 1s infinite;
    animation: shimmer 2s infinite;
    content: "";
  }

  @-webkit-keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
</style>