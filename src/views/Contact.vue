<template>
    <v-row>
        <v-col cols="6">
            <v-form ref="form" v-model="valid" lazy-validation class="ml-15 mt-15">
                <v-text-field
                    v-model="name"
                    :counter="10"
                    :rules="nameRules"
                    label="Name"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>

                <v-textarea
                    v-model="select"
                    :items="items"
                    :rules="[(v) => !!v || 'Item is required']"
                    label="Message"
                    required
                ></v-textarea>

                <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
                    Validate
                </v-btn>

                <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

                <v-btn color="warning" @click="resetValidation"> Reset Validation </v-btn>
        </v-form>
        </v-col>
        <v-col cols="6">
            <v-container class="ml-15 mt-15">
                <v-icon class="mr-4">{{ 'mdi-instagram '}}</v-icon>
                <v-icon class="mr-4">{{ 'mdi-twitter '}}</v-icon>
                <v-icon class="mr-4">{{ 'mdi-facebook '}}</v-icon>
                <v-spacer class="mt-15"></v-spacer>
                <strong>Grain & Mortur</strong>
                <v-spacer class="mt-4"></v-spacer>
                <span>1221 N, 18th St.Suite 148</span>
                <v-spacer class="mt-4"></v-spacer>
                <span>California, NE 78043</span>
                <v-spacer class="mt-15"></v-spacer>
                <div class="color-link">Get Directions >></div>
                <v-spacer class="mt-15"></v-spacer>
                <strong>New business:</strong>
                <v-spacer class="mt-4"></v-spacer>
                <div class="color-link">hello@grainandmortar.com</div>
                <v-spacer class="mt-4"></v-spacer>
                <span>402-370-8170</span>
            </v-container>
        </v-col>
    </v-row>
</template>
<script lang="ts">
export default {
    methods: {
        validate () {
            this.$refs.form.validate()
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },
    },
};
</script>
<style scope>
    .color-link {
        color: #ffa600;
        }
</style>
