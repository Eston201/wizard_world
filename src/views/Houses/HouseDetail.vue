<template>
    <article 
        v-if="!houseStore.selectedHouse" 
        class="house-not-found__wrapper"
    >
        <div class="icon">
            <PhWarning :size="32" color="red"/>
        </div>
        <div class="message">
            House <span>{{ $route.params.id }}</span> Not Found !
        </div>
    </article>

    <article 
        v-else
        class="house-detail-card__wrapper" 
        :style="houseColors"
    >
        <section class="general-details">
            <div class="description-header house-header">
                <div class="slanted-box"></div>
                <div class="slanted-box"></div>
                <h2>
                    {{ houseStore.selectedHouse?.name }}
                </h2>
            </div>

            <dl class="details__wrapper">
                <template 
                    v-for="{key, label, icon} of detailsMapper"
                    :key="key"
                >
                    <div class="details">
                        <div class="icon">
                            <component :is="icon" :size="26"/>
                        </div>

                        <div class="detail-description">
                            <dt>{{ label }}</dt>
                            <dd>{{ houseStore.selectedHouse?.[key as keyof IHouse] }}</dd>
                        </div>
                    </div>
                </template>
            </dl>
        </section>

        <section class="house-heads">
            <div class="description-header">
                <div class="icon">
                    <PhGraduationCap :size="32"/>
                </div>

                <h2>Heads</h2>
            </div>

            <ul class="details-list">
                <li v-for="head of houseStore.selectedHouse?.heads" :key="head.id">
                    {{ head.firstName }} {{ head.lastName }}
                </li>
            </ul>
        </section>

        <section class="house-traits">
            <div class="description-header">
                <div class="icon">
                    <PhMagicWand :size="32"/>
                </div>
                <h2>Traits</h2>
            </div>

            <ul class="details-list">
                <li v-for="trait of houseStore.selectedHouse?.traits" :key="trait.id">
                    {{ trait.name }}
                </li>
            </ul>
        </section>
    </article>
</template>

<script setup lang="ts">
import {  
    PhAtom, 
    PhCube,
    PhGhost,
    PhGraduationCap,
    PhMagicWand,
    PhPalette,
    PhPawPrint,
    PhUser,
    PhWarning
} from "@phosphor-icons/vue";
import { useWizardWorldHouseStore } from '@/store/wizardWorldHouse';
import { computed, onBeforeUnmount } from 'vue';
import type { IHouse } from "@/api/wizard-world/types";

const houseStore = useWizardWorldHouseStore();
const houseColors = computed(() => {
    if (!houseStore.selectedHouse) return {};
    const houseName = houseStore.selectedHouse.name.toLowerCase();

    const primary = `var(--${houseName}-primary)`;
    const secondary = `var(--${houseName}-secondary)`;
    return {
        '--house-primary-color': primary,
        '--house-secondary-color': secondary
    };
});
const detailsMapper = [
    {
        key: 'houseColours',
        label: 'House Colours',
        icon: PhPalette
    },
    {
        key: 'founder',
        label: 'founder',
        icon: PhUser
    },
    {
        key: 'animal',
        label: 'animal',
        icon: PhPawPrint
    },
    {
        key: 'element',
        label: 'element',
        icon: PhAtom
    },
    {
        key: 'ghost',
        label: 'ghost',
        icon: PhGhost
    },
    {
        key: 'commonRoom',
        label: 'commonRoom',
        icon: PhCube
    },
];

onBeforeUnmount(() => {
    houseStore.clearSelectedHouse();
});
</script>

<style lang="scss" scoped>
.house-not-found__wrapper {
    height: 100%;
    font-size: 1.5rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;

    .message > span {
        padding-inline: 4px;
        &::before {
            content: '\"';
        }
        &::after {
            content: '\"';
        }
    }
}

.house-detail-card__wrapper {
    height: 100%;

    display: flex;
    flex-wrap: wrap;
    gap: 14px;

    --spacing: 6px;

    & > section {
        min-width: min(300px, 100%);
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
}

/* Sections */
.general-details {
    flex: 1.5;
}
.house-heads {
    flex: 1;
}
.house-traits {
    flex: 1;
}

/* Section Header */
.description-header {
    display: flex;
    align-items: center;
    gap: 8px;

    @include mobileAndBelow() {
       justify-content: center;
    }
}

.house-header {
    gap: 0;
}

/* Header & Decoration */
h2 {
    font-size: 1.9rem;
    font-weight: 400;
    letter-spacing: 1px;
    margin-left: 4px;

    @include mobileAndBelow() {
        border-bottom: 1px solid var(--house-primary-color);
    }
}

.slanted-box {
    width: 8px;
    height: 22px;
    transform: skewX(-20deg);
    margin-right: var(--spacing);
    border: 1px solid hsl(0, 0%, 20%);
    background-color: var(--house-primary-color);
    
    &:last-of-type {
        background-color: var(--house-secondary-color);
    }

    @include mobileAndBelow() {
        display: none;
    }
}

/* General Details */
.details__wrapper {
    margin-left: calc(var(--spacing) * -1);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.details {
    display: flex;
    align-items: center;
    gap: 12px;
    /* Align back 4 px of padding on icon */
    margin-left: -4px;

    .icon {
        padding: 4px;
        border-radius: 6px;
        border: 1px solid hsl(0, 0%, 20%);
        background-color: hsl(220, 6%, 10%);
    }
}

.detail-description {
    display: flex;
    align-items: baseline;
    flex-direction: column;

    dt {
        text-transform: capitalize;
        font-size: 1.3rem;
    }
    
    dd {
        font-size: 1.1rem;
        &::before {
            content: "-";
            margin-right: 4px;
        }
    }
}

.details-list {
    font-size: 1.1rem;
    letter-spacing: 1px;
}
</style>