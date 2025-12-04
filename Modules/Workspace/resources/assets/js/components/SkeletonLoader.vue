<template>
  <div 
    class="skeleton-loader"
    :style="{
      width: width ? width + '%' : '100%',
      height: height ? height + 'px' : '20px',
      margin: margin ? margin + 'px 0' : '0'
    }"
  ></div>
</template>

<script>
export default {
  name: 'SkeletonLoader',
  props: {
    width: {
      type: [String, Number],
      default: '100'
    },
    height: {
      type: [String, Number],
      default: '20'
    },
    margin: {
      type: [String, Number],
      default: '0'
    }
  }
}
</script>

<style scoped>
.skeleton-loader {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
