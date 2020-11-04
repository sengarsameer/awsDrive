<template>
  <div class="homepage"> 
      <nav-bar />
      <side-bar />

  </div>
</template>

<script>
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

export default {
    name: "HomePage",
    components: {
        NavBar,
        SideBar,
    },
    data() {
        return {
            
        }
    }
}
</script>

<style>

</style>
