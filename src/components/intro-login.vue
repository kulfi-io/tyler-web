<template lang="pug">
    main.intro-login-vue
        div.content
            div.login-banner
                img.salutation( src="../../public/img/login.png" alt="login")
            div.split
                div.login-vue(class='split-60')
                    form(id="login-form")
                        div.heading
                            span login
                        div.split
                            div.split-half-left
                                Username(:account="login")
                            div.split-half-right
                                Password(
                                :tag="'password'"
                                :placeholder="'Password'"
                                :title="'Password is required'"
                                :label="'Password'"
                                :account="login" :set="false")
                        div.split
                            div.split-half-flush(class="split custom-control-input")
                                div.split-for-cb(class="checkbox")
                                    input(type="checkbox" value="None" class="kulfi-cb" id="kulficb" ref="remember")
                                    label(for="kulficb")
                                div.split-for-label Remember me
                            div.split-half-flush
                        div.form-group(class="submit")
                            button.form-control(class="submitter bg-muted" type="submit" id="login-account") Login
                div.reset-vue(class='split-flex-1')
                    form(id="reset-password-form")
                        div.heading
                            span reset password
                        div.split
                            div.parallel
                                Email( 
                                :tag="'email'"
                                :placeholder="'email'"
                                :title="'email is required'"
                                :label="'email'"
                                :account="reset" :validKey="'email'")
                        div.split
                            div.split-half-flush(class="split custom-control-input")
                            div.split-flex-1
                        div.form-group(class="submit")
                            button.form-control(class="submitter bg-muted" type="submit" id="reset-account") Send reset email
</template>

<script lang="ts">
import Vue from 'vue';
import Username from './kulfi/username.vue';
import Password from './kulfi/password.vue';
import Email from './kulfi/email.vue';
import Library from '../library/account';

export default Vue.extend({
    name: 'intro-login',
    components: {
        Username,
        Password,
        Email
    },  
    computed: {
        initLoginAccount: function() {
            const _submitter = <Element>document.querySelector('#login-account');
            const _account =  <Library>this.$data.login;
            _account.readyToSubmit.submitter = _submitter;
            _account.readyToSubmit.max = 2;
            this.$data.login = _account;

            _submitter.addEventListener('click', _account.login);
        },
        initResetAccount: function() {
            const _submitter = <Element>document.querySelector('#reset-account');
            const _account =  <Library>this.$data.reset;
            _account.readyToSubmit.submitter = _submitter;
            _account.readyToSubmit.max = 1;
            _account.positionLoginResetElements();
            this.$data.reset = _account;

            _submitter.addEventListener('click', _account.resetRequest);
        }

    },
    mounted: function(){
        this.initLoginAccount;
        this.initResetAccount;
    },
    data: function() {
        return {
            login: new Library(),
            reset: new Library()
        }
    },
});
</script>
