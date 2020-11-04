<template>
  <div class="homepage"> 
      <nav-bar />
      <side-bar />
      <dash-board :imageList="imageList" />

  </div>
</template>

<script>
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import DashBoard from './components/DashBoard';
import awsServices from '@/services/awsServices';


export default {
    name: "DashPage",
    components: {
        NavBar,
        SideBar,
        DashBoard
    },
    data() {
        return {
            imageList: []
        }
    },
    mounted() {

    },
    beforeMount() {
        this.getImages();
    },
    computed: {

    },
    methods: {
        getImages() {
            awsServices.getImages(this.$route.params.id)
            .then(res => {
                this.imageList = res
            })
        }
    },
    watch: {
        $route (to, from){
            if(to != from) {
                this.getImages();
            }
            console.log(to);
            console.log(from);
        }
    }
}
</script>

<style>

</style>
