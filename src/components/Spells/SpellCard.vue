<template>
    <article class="spell">
        <h3>{{ spell.name }}</h3>

        <dl class="spell-description-list">
            <div class="spell-desription" v-if="spell.incantation">
                <dt>Incantation</dt>
                <dd>{{ spell.incantation }}</dd>
            </div>

            <div class="spell-desription">
                <dt>Effect</dt>
                <dd>{{ spell.effect }}</dd>
            </div>

            <div class="spell-desription">
                <dt>Creator</dt>
                <dd>{{ spell.creator || 'Unknown' }}</dd>
            </div>

            <div class="spell-desription">
                <dt>Utterable</dt>
                <dd>
                    <PhCheck color="green" :size="26" v-if="spell.canBeVerbal"/>
                    <PhXCircle color="red" :size="26" v-else />
                    <VisuallyHidden>
                        {{ spell.canBeVerbal }}
                    </VisuallyHidden>
                </dd>
            </div>
        </dl>
    </article>
</template>

<script setup lang="ts">
import type { ISpell } from '@/api/wizard-world/utils';
import type { PropType } from 'vue';
import { PhCheck, PhXCircle } from '@phosphor-icons/vue';
import VisuallyHidden from '../VisuallyHidden.vue';

defineProps({
    spell: {
        type: Object as PropType<ISpell>,
        required: true
    }
});
</script>

<style lang="scss" scoped>
.spell {
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    color: hsl(220, 9%, 94%);
    background-color: #131313;
    border-radius: 12px;
    padding: 22px;

    margin-bottom: 22px;
    margin-inline: 42px;

    &:last-of-type {
        margin-bottom: 0;
    }

    @include tabletAndBelow() {
        margin-inline: 0;
    }
}

h3 {
    font-size: 1.25rem;
    letter-spacing: 1px;
    border-bottom: 2px solid hsl(0, 0%, 10%);
}

.spell-description-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.spell-desription {
    display: flex;
    align-items: baseline;
    gap: 12px;

    @include mobileAndBelow() {
        flex-direction: column;
    }

    dt {
        min-width: 100px;

        font-size: 1.125rem;
        padding: 2px 6px;
        margin-left: -6px;
        border-radius: 6px;
        background-color: #18181b;
        border: 1px solid hsl(0, 0%, 20%);
    }
    
    dd {
        display: flex;
        align-items: center;

        &::before {
            content: '-';
            margin-right: 8px;
        }
    }
}
</style>