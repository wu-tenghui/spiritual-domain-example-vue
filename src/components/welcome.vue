<template>
    <div id="welcome-div">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Welcome extends Vue {

        constructor() {
            super();
        }

    }
</script>

<style scoped lang="less">
    #welcome-div {
        width: 100%;
        height: 100%;
    }
</style>
