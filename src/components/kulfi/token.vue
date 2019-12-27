<template lang="pug">
    div.kulfi-token(class="form-group")
        label.control-label( for="token") token
            span.required-field
        input.form-control(type="text" ref="token" id="token" disabled)
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'kulfi-token',
    mounted: function() {
        var _token = <HTMLInputElement>document.querySelector("#token");
        var _wrapper = _token.parentElement;
        
        if(_token) {
            if(this.$route.params.id) {
                _token.value = this.$route.params.id;
            } else {
                if(_wrapper) {
                    //_wrapper.style.display = 'none';
                }
            }
        } 
    }
})
</script>
