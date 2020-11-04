<template>
    <div class="hello">
        <router-view> </router-view>
    </div>
</template>

<script>
import HomePage from './homepage/HomePage';
export default {
    name: "HelloWorld",
    components: {
      HomePage
    },
    props: {
        msg: String,
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
