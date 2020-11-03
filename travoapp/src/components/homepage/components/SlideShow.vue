<template>
  <div>
        <!-- <div class="container"> -->
            <div class="row imagetiles">
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6" style="margin-top: 10px;" v-for="(image, i) in images" :key="i">
                    <!-- <img src=https://i.scdn.co/image/2fd8fa0f7ef2f83691a0fb9628ee369b8e3b688e class="img-responsive"> -->
                    <img class="image img-responsive img-fluid img-thumbnail" :src="image" @click="index = i">
                </div>
            </div>
        <!-- </div> -->
        <vue-gallery-slideshow :images="images" :index="index" @close="index = null"></vue-gallery-slideshow>
  </div>
</template>

<script>
import awsServices from '@/services/awsServices';
import VueGallerySlideshow from 'vue-gallery-slideshow';
export default {
    name: "SlideShow",
    components: {
        VueGallerySlideshow
    },
    data() {
        return {
            images: [
                'https://placekitten.com/801/800',
                'https://placekitten.com/802/800',
                'https://placekitten.com/803/800',
                'https://placekitten.com/804/800',
                'https://placekitten.com/805/800',
                'https://placekitten.com/806/800',
                'https://placekitten.com/807/800',
                'https://placekitten.com/808/800',
                'https://placekitten.com/809/800',
                'https://placekitten.com/810/800'
            ],
            index: null
        }
    },
    mounted() {
        awsServices.getBucketList()
        .then(res => {
            // this.images = res
        })
    }
}
</script>

<style>

</style>