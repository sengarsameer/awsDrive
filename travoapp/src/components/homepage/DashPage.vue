<template>
  <div class="homepage"> 
      <nav-bar />
      <side-bar />
      <!-- <image-upload /> -->
      <dash-board />

  </div>
</template>

<script>
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import ImageUpload from './components/ImageUpload';
import DashBoard from './components/DashBoard';
import awsServices from '@/services/awsServices';


export default {
    name: "DashPage",
    components: {
        NavBar,
        SideBar,
        ImageUpload,
        DashBoard
    },
    data() {
        return {
            imageList: []
        }
    },
    mounted() {
        // awsServices.getBucketList()
        // .then(res => {
        //     this.bucketList = res
        // })
        console.log("Helllo")
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
