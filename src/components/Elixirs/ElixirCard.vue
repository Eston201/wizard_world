<template>
    <article class="elixir-detail-card">
        <h3>{{ elixir.name }}</h3>

        <div class="detail-divider">
            <dl class="elixir-detail-list">
                <div 
                    v-for="{label, icon} of descriptionLabelIcons" 
                    :key="label" 
                    class="elixir-description"
                >
                    <dt>
                        <div class="icon">
                            <component :is="icon" :size="26" weight="light"/>
                        </div>
                        <span>{{ formatCamelCase(label) }}</span>
                    </dt>
                    <dd>
                        {{ elixir[label as keyof IElixir] || 'Unknown' }}
                    </dd>
                </div>
            </dl>
    
            <div class="elixir-list__description">
                <div class="elixir-list__wrapper">
                    <div class="list-header">
                        <div class="icon">
                            <PhBowlSteam :size="26" weight="light"/>
                        </div>
                        <span>Ingredients</span>
                    </div>
        
                    <ul class="description-list">
                        <li v-for="ingredient of elixir.ingredients">{{ ingredient.name }}</li>
                        <li v-if="elixir.ingredients.length === 0">Unknown</li>
                    </ul>
                </div>
                <div class="elixir-list__wrapper">
                    <div class="list-header">
                        <div class="icon">
                            <PhUsersThree :size="26" weight="light"/>
                        </div>
                        <span>Inventors</span>
                    </div>
        
                    <ul class="description-list">
                        <li v-for="inventor of elixir.inventors">{{ inventor.firstName }}  {{ inventor.lastName }}</li>
                        <li v-if="elixir.inventors.length === 0">Unknown</li>
                    </ul>
                </div>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import type { IElixir } from '@/api/wizard-world/utils';
import { formatCamelCase } from '@/utils/utils';
import { 
    PhBowlSteam, 
    PhFlask, 
    PhMagicWand, 
    PhTimer, 
    PhUserGear, 
    PhUsersThree, 
    PhWarning 
} from '@phosphor-icons/vue';
import { type PropType } from 'vue';

defineProps({
    elixir: {
        type: Object as PropType<IElixir>,
        required: true
    }
});

const descriptionLabelIcons = [
    {label: 'effect', icon: PhMagicWand},
    {label: 'sideEffects', icon: PhWarning},
    {label: 'characteristics', icon: PhFlask},
    {label: 'time', icon: PhTimer},
    {label: 'manufacturer', icon: PhUserGear},
];
</script>

<style lang="scss" scoped>
.elixir-detail-card {
    display: flex;
    flex-direction: column;
    gap: 16px;

    color: hsl(220, 9%, 94%);
    padding: 12px 18px;
    margin-bottom: 22px;
    background-color: hsl(220, 6%, 10%);
    border-radius: 4px;

    &:last-of-type {
        margin-bottom: 0;
    }
}

h3 {
    width: fit-content;
    font-size: 1.5rem;
    font-weight: 400;
    
    border-radius: 4px;
    padding: 4px 12px;
    margin-left: -26px;
    border: 1px solid hsl(var(--color-primary), 0.8);
    background-color: hsl(220, 6%, 10%);
}

.detail-divider {
    display: flex;
    gap: 22px;

    @include mobileAndBelow() {
        flex-direction: column;
    }
}

.elixir-detail-list {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;

    display: flex;
    flex-direction: column;
}

.elixir-description {
    display: flex;
    flex-direction: column;
    gap: 4px;

    dt {
        display: flex;
        align-items: center;
        gap: 8px;

        font-size: 1.15rem;
        text-transform: capitalize;

        span {
            border-bottom: 2px solid #323232;
        }
    }

    dd {
        
        &::before {
            content: "-";
            margin-right: 4px;
        }
    }

    @include mobileAndBelow() {
        .icon {
            display: none;
        }
    }
}

.elixir-list__description {
    flex: 1;

   display: flex;
   flex-direction: column;
   gap: 16px;

   @include mobileAndBelow() {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .icon {
            display: none;
        }
    }
}

.elixir-list__wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.list-header {
    display: flex;
    align-items: center;
    gap: 4px;

    font-size: 1.15rem;
    text-transform: capitalize;

    span {
        border-bottom: 2px solid #323232;
    }
}

.description-list {
    min-height: 70px;
    max-height: 150px;
    overflow-y: auto;
    margin-left: 28px;

    @include mobileAndBelow() {
        margin-left: 12px;
    }
}
</style>