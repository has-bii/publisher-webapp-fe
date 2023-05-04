<template>
    <div>
        <h1>Welcome to our website</h1>
    </div>
</template>

<script>
export default {
    layout: 'dashboard',
    middleware: 'auth',
}
</script>