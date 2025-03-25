<template>
    <main class="spells-view__wrapper">
        <ScrollTop/>

        <div class="filters__wrapper">
            <div class="spell-filter-group">
                <label for="spell_name">Spell Name</label>
                <InputText 
                    id="spell_name" 
                    name="spellName" 
                    type="text" 
                    v-model="spellSearchFilters.name"
                    placeholder="E.G Opening Charm" 
                    fluid
                />
            </div>

            <div class="spell-filter-group">
                <label for="spell_incantation">Incantation</label>
                <InputText 
                    id="spell_incantation" 
                    name="spellIncantation"
                    type="text" 
                    v-model="spellSearchFilters.incantation"
                    placeholder="E.G Avada Kedavra"
                    fluid
                />
            </div>

            <div class="spell-filter-group">
                <label for="spell_type">Spell Type</label>
                <Select
                    id="spell_type"
                    :show-clear="true"
                    v-model="spellSearchFilters.type" 
                    :options="spellTypeOptions" 
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Filter Spell Type"
                    fluid
                />
            </div>
        </div>

        <div class="loading__wrapper" v-show="isPending">
            <Ripple>
                <MotionSortingHatIcon 
                    :size="90"
                    :initial="{scale: 0.8}"
                    :animate="{scale: 1.2}"
                    :transition="{
                        repeat: Infinity,
                        duration: 1,
                        repeatType: 'reverse',
                    }"
                />
            </Ripple>
            <span>Fetching Spells</span>
        </div>
        
        <div class="spells__wrapper" v-show="!isPending">
            <Accordion class="spell-catagory" value="0">
                <AccordionPanel 
                    v-for="[type, spells] in Object.entries(spellsByType)" 
                    :key="type" :value="type"
                >
                    <AccordionHeader class="spell-header__wrapper">
                        <div class="spell-header">
                            <div class="icon">
                                <component 
                                    :is="spellTypeIconMapper[type.toLowerCase() as keyof typeof spellTypeIconMapper]" 
                                    :size="32" 
                                    weight="light"
                                />
                            </div>
                            <span> {{ formatSpellType(type) }}</span>
                        </div>
                    </AccordionHeader>
    
                    <AccordionContent>
                        <SpellCard
                            v-for="spell of spells"
                            :key="spell.id"
                            :spell="spell"
                        />                    
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </div>
    </main>
</template>

<script setup lang="ts">
import { groupBy } from 'ramda';
import { useToast } from 'primevue';
import { useSpellsQuery } from '@/composables/wizard-world/useSpells';
import { computed, reactive, watch } from 'vue';
import {
    Select, 
    InputText, 
    ScrollTop,
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent
} from 'primevue';
import { 
    PhArrowCounterClockwise, 
    PhArrowsOut, 
    PhDropHalf, 
    PhExcludeSquare, 
    PhEyeSlash, 
    PhFunnel, 
    PhHandFist, 
    PhHeartbeat, 
    PhHexagon, 
    PhLightning, 
    PhLightningSlash,
    PhMagicWand,
    PhScroll,
    PhShieldCheckered,
    PhShieldStar,
    PhSkull,
    PhSmileyXEyes,
    PhSparkle
} from '@phosphor-icons/vue';
import { motion } from 'motion-v';
import type { ISpell, ISpellSearchParams } from '@/api/wizard-world/utils';
import SpellCard from '@/components/Spells/SpellCard.vue';
import Ripple from '@/components/Decorative/Ripple.vue';
import SortingHatIcon from '@/components/Icons/SortingHatIcon.vue';

const MotionSortingHatIcon = motion.create(SortingHatIcon);

const spellTypeIconMapper = {
    charm: PhSparkle,
    conjuration: PhDropHalf,
    transfiguration: PhExcludeSquare,
    darkcharm: PhSkull,
    spell: PhMagicWand,
    healingspell: PhHeartbeat,
    jinx: PhLightning,
    curse: PhHandFist,
    magicaltransportation: PhArrowsOut,
    hex: PhHexagon,
    counterspell: PhShieldCheckered,
    darkarts: PhSkull,
    counterjinx: PhLightningSlash,
    countercharm: PhShieldStar,
    none: PhSmileyXEyes,
    untransfiguration: PhArrowCounterClockwise,
    bindingmagicalcontract: PhScroll,
    vanishment: PhEyeSlash
}

const spellTypeOptions = [
    {label: 'Charm', value: 'Charm'},
    {label: 'Conjuration', value: 'Conjuration'},
    {label: 'Transfiguration', value: 'Transfiguration'},
    {label: 'Dark Charm', value: 'DarkCharm'},
    {label: 'Spell', value: 'Spell'},
    {label: 'Healing Spell', value: 'HealingSpell'},
    {label: 'Jinx', value: 'Jinx'},
    {label: 'Curse', value: 'Curse'},
    {label: 'Magical Transportation', value: 'MagicalTransportation'},
    {label: 'Hex', value: 'Hex'},
    {label: 'Counter Spell', value: 'CounterSpell'},
    {label: 'Dark Arts', value: 'DarkArts'},
    {label: 'Counter Jinx', value: 'CounterJinx'},
    {label: 'Counter Charm', value: 'CounterCharm'},
    {label: 'None', value: 'None'},
    {label: 'Untransfiguration', value: 'Untransfiguration'},
    {label: 'Binding Magical Contract', value: 'BindingMagicalContract'},
    {label: 'Vanishment', value: 'Vanishment'},
];

const toast = useToast();

const spellSearchFilters  = reactive<ISpellSearchParams>({
    name: '',
    type: '',
    incantation: ''
});

const {isPending, data, isError, error} = useSpellsQuery(spellSearchFilters);

// Watch for errors when loading and show a toast if error
watch(isPending, (nextValue) => {
    if (nextValue) return;

    if (isError.value) {
        toast.add({
            severity: 'error', 
            summary: 'Error', 
            detail: error.value?.message || 'Unable to fetch spells!',
            life: 3000
        });
    }
});

// Group the data by spell type
const spellsByType = computed(() => {
    if (!data.value) return {};
    return groupBy((spell: ISpell) => spell.type, data.value);
});

function formatSpellType(type: string) {
    if (type.toLowerCase() === 'none') return "unknown";
    return type.replace(/([a-z])([A-Z])/g, '$1 $2');
}
</script>

<style lang="scss" scoped>
.spells-view__wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 22px;
    
    padding-block: 2rem;
}

.filters__wrapper {
    display: flex;
    justify-content: center;
    gap: 12px;

    @include mobileAndBelow() {
        flex-wrap: wrap;
        justify-content: revert;
    }
}

.spell-filter-group {
    display: flex;
    flex-direction: column;
    gap: 6px;

    label {
        margin-left: 2px;
        color: hsl(var(--color-primary));
    }
}

.loading__wrapper {
    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

/* Spell Type & Accordion Styles */
.spell-header__wrapper {
    background-color: transparent;

    &:hover .icon {
        border-color: hsl(var(--color-primary));
    }
}

.spell-header {
    width: 100%;
    
    display: flex;
    align-items: center;
    gap: 12px;

    font-size: 1.2rem;
    letter-spacing: 1px;
    text-transform: capitalize;

    @include mobileAndBelow() {
        font-size: 1rem;
    }
}

.icon {
    padding: 4px;
    border-radius: 6px;
    border: 1px solid hsl(0, 0%, 20%);
    background-color: hsl(220, 6%, 10%);
    transition: border-color 0.2s ease;

    @include mobileAndBelow() {
        display: none;
    }
}
</style>