<template lang="pug">
    div.account-login
        div.account
        AccountHeader(:target="'register'" :title="'login'" :href="'register'" :hrefLabel="'register'" :subtext="'account'")
        InfoVue
        div.account-body
            form(id="login-form")
                div.content
                    TokenVue
                    div.form-group-login(class="split")
                        UsernameVue(class="split-half-left") 
                        PasswordVue( class="split-half-right" :readyToSubmit="readyToSubmit"
                        :tag="'password'"
                        :placeholder="'Password'"
                        :title="'Password is required'"
                        :label="'Password'")
                    div.split
                        div.split-half-flush(class="split custom-control-input")
                            div.split-for-cb
                                input.rememeber(type="checkbox" ref="remember")
                            div.split-for-label Remember me
                        div.split-half-flush
                            a(href="#login/1") Reset Password
                div.form-group(class="submit")
                    button.form-control(type="submit" ref="submit") Login
        AccountFooter
</template>

<script lang="ts">
import Vue from 'vue';
import InfoVue from '../kulfi/info.vue';
import TokenVue from '../kulfi/token.vue';
import UsernameVue from '../kulfi/username.vue';
import PasswordVue from '../kulfi/password.vue';
import AccountHeader from './account-header.vue';
import AccountFooter from './account-footer.vue';

export default Vue.extend({
    name: 'account-login',
    components: {
        InfoVue,
        TokenVue,
        UsernameVue,
        PasswordVue,
        AccountHeader,
        AccountFooter,
    }
});
</script>



