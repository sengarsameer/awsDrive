<template>
    <div class="homepage">
        <nav-bar />
        <div class="content">
            <side-bar />
            <dash-board :images="images" />
        </div>
    </div>
</template>

<script>
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import DashBoard from "./components/DashBoard";
import awsServices from "@/services/awsServices";

export default {
    name: "DashPage",
    components: {
        NavBar,
        SideBar,
        DashBoard,
    },
    data() {
        return {
            images: [],
        };
    },
    mounted() {},
    beforeMount() {
        this.getImages();
    },
    computed: {},
    methods: {
        getImages() {
            awsServices.getImages(this.$route.params.id).then((res) => {
                this.images = [];
                res.Contents.forEach((ele) => {
                    this.images.push("https://" + this.$route.params.id + ".s3.amazonaws.com/"+ele.Key)
                });
                // this.imageList = res;
            });
        },
    },
    watch: {
        $route(to, from) {
            if (to.path != from.path) {
                this.getImages();
            }
            console.log(to);
            console.log(from);
        },
    },
};
</script>

<style>
.content {
    margin-top: 50px;
}
</style>
