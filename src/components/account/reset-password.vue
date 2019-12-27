<template lang="pug">
    div.reset-password
        div.account
        AccountHeader(:target="'reset'" :title="'Reset Password'" 
        :href="'login'" :hrefLabel="'login'" :subtext="'to account'")
        InfoVue
        div.account-body
            form(id="reset-password-form")
                div.content
                    div.form-group
                        EmailVue
                div.form-group(class="submit")
                    button.form-control(type="submit" ref="submit") Send password reset email
        AccountFooter 
</template>

<script lang="ts">
import Vue from 'vue';
import AccountHeader from './account-header.vue';
import AccountFooter from './account-footer.vue';
import EmailVue from '../kulfi/email.vue';
import InfoVue from '../kulfi/info.vue';
export default Vue.extend({
    name: 'reset-password',
    components: {
        AccountHeader,
        AccountFooter,
        EmailVue,
        InfoVue,
    }
});
</script>


