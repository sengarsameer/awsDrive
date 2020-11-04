<template>
    <div>
        <div class="row imagetiles">
            <div
                class="col-lg-3 col-md-3 col-sm-3 col-xs-6"
                style="margin-top: 10px"
                v-for="(image, i) in imageList.Contents"
                :key="i"
            >
                <img
                    class="image img-responsive img-fluid img-thumbnail"
                    :src="imgURL + image.Key"
                    @click="index = i"
                />
            </div>
        </div>
        <vue-gallery-slideshow
            :images="images"
            :index="index"
            @close="index = null"
        ></vue-gallery-slideshow>
    </div>
</template>

<script>
import awsServices from "@/services/awsServices";
import VueGallerySlideshow from "vue-gallery-slideshow";
export default {
    name: "SlideShow",
    components: {
        VueGallerySlideshow,
    },
    props: ["imageList"],
    data() {
        return {
            imgURL: "https://" + this.$route.params.id + ".s3.amazonaws.com/",
            images: [
                "https://placekitten.com/801/800",
                "https://placekitten.com/802/800",
                "https://placekitten.com/803/800",
                "https://placekitten.com/804/800",
                "https://placekitten.com/805/800",
                "https://placekitten.com/806/800",
                "https://placekitten.com/807/800",
                "https://placekitten.com/808/800",
                "https://placekitten.com/809/800",
                "https://placekitten.com/810/800",
            ],
            index: null,
        };
    },
    mounted() {
        // awsServices.getBucketList().then((res) => {
        //     // this.images = res
        // });
    },
};
</script>

<style>
</style>