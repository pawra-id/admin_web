<script setup lang="ts">
const {$sayShit} = useNuxtApp();
const {sayHello} = useUtils();
sayHello();
$sayShit("Shit");
</script>
<template>
    <div>
        <Alert/>
        <h1>Home</h1>
        <img src="@/assets/images/Flyer.png" alt="Nuxt Logo" class="w-[40%]"/>
        <img src="/lady_bird.jpg" alt="Nuxt Logo" class="w-[40%]"/>
    </div>
</template>