<template>
    <div class="base-form__wrapper">
        <div class="icon__container" v-if="slots.formIcon">
           <slot name="formIcon"></slot>
        </div>

        <div class="title__wrapper">
            <h2>
                <slot name="title">Title</slot>
            </h2>
        </div>

       <slot name="form">
            Form
       </slot>
    </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

const slots = useSlots();
</script>

<style lang="scss" scoped>
.base-form__wrapper {
    position: relative;

    display: flex;
    flex-direction: column;
    gap: 8px;

    max-width: min(600px, 100%);
    margin-inline: auto;
}

.icon__container {
    align-self: center;
}
</style>