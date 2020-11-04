<!-- eslint-disable -->
<template>
    <div>
        <div role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div
                class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
            >
                <h1 class="h2">{{ this.$route.params.id }}</h1>
            </div>
            <div class="card">
                <div class="card-body">
                    <image-uploader @update-img="updateImage" />
                </div>
            </div>

            <gallery :images="images" />

        </div>
    </div>
</template>

<script>
import ImageUploader from "./ImageUploader";
import Gallery from "./SlideShow";
export default {
    name: "DashBoard",
    components: {
        Gallery,
        ImageUploader,
    },
    props: ['images'],
    data() {
        return {
            files: [],
            uploadedFiles: [],
            setURL: "",
            updatedImageList: []
        };
    },
    methods: {
        updateImage(updateImg) {
           
            updateImg.map((res) => {
                this.images.push("https://" + this.$route.params.id + ".s3.amazonaws.com/"+res.Key);
            })

        }
    },
    created() {

    },
    mounted() {
        
    },
    beforeMount() {

    },
};
</script>

<style>
.feather {
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
}

/*
    * Sidebar
    */

.sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100; /* Behind the navbar */
    padding: 48px 0 0; /* Height of navbar */
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

@media (max-width: 767.98px) {
    .sidebar {
        top: 5rem;
    }
}

.sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: 0.5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
    .sidebar-sticky {
        position: -webkit-sticky;
        position: sticky;
    }
}

.sidebar .nav-link {
    font-weight: 500;
    color: #333;
}

.sidebar .nav-link .feather {
    margin-right: 4px;
    color: #999;
}

.sidebar .nav-link.active {
    color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
    color: inherit;
}

.sidebar-heading {
    font-size: 0.75rem;
    text-transform: uppercase;
}

/*
    * Navbar
    */

.navbar-brand {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    font-size: 1rem;
    background-color: rgba(0, 0, 0, 0.25);
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}

.navbar .navbar-toggler {
    top: 0.25rem;
    right: 1rem;
}

.navbar .form-control {
    padding: 0.75rem 1rem;
    border-width: 0;
    border-radius: 0;
}

.form-control-dark {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
    border-color: transparent;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}
.dropZone {
    border: 2px dashed #acccd6;
    width: 100%;
    height: 110px;
    text-align: center;
    background: #add8e65c;
}
.dragover {
    background: lightgoldenrodyellow;
}
</style>