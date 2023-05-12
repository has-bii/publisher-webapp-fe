<template>
    <div>
        <h1>{{ message }}</h1>
        <button @click="change">Click me</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: 'not update'
        }
    },
    methods: {
        change() {
            this.message = 'updated'
        }
    }
}
</script>

