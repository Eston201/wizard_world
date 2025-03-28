<template>
    <BaseForm>
        <template #formIcon>
            <Ripple>
                <MotionSortingHatIcon
                    :size="120"
                    :initial="{scale: 0, opacity: 0}" 
                    :animate="{scale: 1, opacity: 1}" 
                    :transition="{type: 'spring', duration: 1}"
                />
            </Ripple>
        </template>

        <template #title>
            <MotionDecorativeTitle 
                :initial="{y: 10, opacity: 0}"
                :animate="{y: 0, opacity: 1}"
                :transition="{type: 'spring', duration: 1.25, delay: 0.2}"
            >
               <h2>Login</h2>
            </MotionDecorativeTitle>
        </template>

        <template #form>
            <Form
                class="login-form"
                v-slot="$form" 
                :resolver 
                @submit="onFormSubmit"
            >
                <motion.fieldset 
                    class="input-group"
                    :initial="{x: 100, opacity: 0}"
                    :animate="{x: 0, opacity: 1}"
                    :transition="{type: 'spring', duration: 1.25, delay: 0.2}"
                >
                    <FloatLabel variant="in">
                        <InputText id="login-username" name="username" type="text" v-model="formValues.username" fluid />
                        <label for="login-username">Username</label>
                    </FloatLabel>
                    <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error?.message }}</Message>
                </motion.fieldset>

                <motion.fieldset
                    class="input-group"
                    :initial="{x: -100, opacity: 0}"
                    :animate="{x: 0, opacity: 1}"
                    :transition="{type: 'spring', duration: 1.25, delay: 0.2}"
                >
                    <FloatLabel variant="in">
                        <Password id="login-password" name="password" type="text" :feedback="false" v-model="formValues.password" toggleMask fluid />
                        <label for="login-password">Password</label>
                    </FloatLabel>
                    <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error?.message }}</Message>
                </motion.fieldset>

                <MotionButton
                    :initial="{y: 20, opacity: 0}"
                    :animate="{y: 0, opacity: 1}"
                    :transition="{type: 'spring', duration: 1, delay: 0.3}"
                    type="submit" 
                    label="Login"
                />
            </Form>
        </template>
    </BaseForm>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { 
    InputText, 
    Message, 
    Button, 
    FloatLabel, 
    Password 
} from 'primevue';
import { Form } from '@primevue/forms';
import { motion } from 'motion-v';
import BaseForm from '@/components/BaseForm.vue';
import SortingHatIcon from '@/components/Icons/SortingHatIcon.vue';
import DecorativeTitle from '@/components/Decorative/DecorativeTitle.vue';
import Ripple from '@/components/Decorative/Ripple.vue';

// Super charged Motion Components
const MotionSortingHatIcon = motion.create(SortingHatIcon);
const MotionDecorativeTitle = motion.create(DecorativeTitle);
const MotionButton = motion.create(Button);

const props = defineProps({
    onSubmitFn: {
        type: Function,
        required: true
    }
});

const formValues = reactive({
    username: '',
    password: ''
});

const resolver = ({ values }: {values: any}) => {
    const errors: Record<string, any> = {};

    if (!values.username) {
        errors.username = [{ message: 'Username is required.' }];
    }

    if (!values.password) {
        errors.password = [{ message: 'Password is required.' }];
    }

    return {
        errors
    };
};

const onFormSubmit = ({ valid }: {valid: boolean}) => {
    if (!valid) return;
    props.onSubmitFn(formValues.username, formValues.password);
};
</script>

<style lang="scss" scoped>
.login-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.title__wrapper {
    display: flex;
    align-items: center;
    
    h2 {
        font-size: 3.25rem;
        font-family: var(--harry-p);
        letter-spacing: 1px;
    }
}

.input-group {
    border: none;

    display: flex;
    flex-direction: column;
    gap: 4px;
}
</style>