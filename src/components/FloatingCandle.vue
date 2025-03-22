<template>
    <div 
        class="floating-candle__wrapper"
        :style="{
            '--candle-left': x,
            '--candle-top': y,
            '--float-delay': `${floatDelay}s`
        }"
    >
        <img 
            src="/images/candle.png" 
            alt="candle burning"
            :style="{
                '--candle-rotation': `${rotation}deg`
            }"
        >
    </div>
</template>

<script setup lang="ts">
defineProps({
    x: {
        type: String,
        default: "0"
    },
    y: {
        type: String,
        default: "0"
    },
    rotation: {
        type: Number,
        default: 0
    },
    floatDelay: {
        type: Number,
        default: 0
    }
})
</script>

<style lang="scss" scoped>
.floating-candle__wrapper {
    position: absolute;
    z-index: -1;
    top: var(--candle-top);
    left: var(--candle-left);
    
    img {
        width: 50px;
        height: 150px;
        transform: rotate(var(--candle-rotation));
    }

    animation: float 2.5s var(--float-delay) ease-in-out infinite alternate;
}

@keyframes float {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-20px);
  }
}
</style>