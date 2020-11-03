<template>
  <div class="homepage"> 
      <nav-bar />
      <side-bar />
      <!-- <image-upload /> -->
      <!-- <dash-board /> -->

  </div>
</template>

<script>
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import ImageUpload from './components/ImageUpload';
import DashBoard from './components/DashBoard';

export default {
    name: "HomePage",
    components: {
        NavBar,
        SideBar,
        ImageUpload,
        DashBoard
    },
    data() {
        return {
            bucketList: []
        }
    },
    mounted() {
        // awsServices.getBucketList()
        // .then(res => {
        //     this.bucketList = res
        // })
    },
    beforeMount() {
        // awsServices.getBucketList()
        // .then(res => {
        //     this.bucketList = res
        // })
    },
    computed: {

    },
    methods: {
        
    }
}
</script>

<style>

</style>
