<!-- eslint-disable -->
<template>
    <div>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div
                class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
            >
                <h1 class="h2">{{this.$route.params.id}}</h1>
                <button
                    type="button"
                    class="btn btn-outline-info"
                    style="margin: 0px 10px; padding: 2px 25px"
                    data-toggle="modal"
                    data-target="#exampleModal"
                >
                    +
                </button>
                <!-- <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group mr-2">
                        <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary"
                        >
                            Share
                        </button>
                        <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary"
                        >
                            Export
                        </button>
                    </div>
                    <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary dropdown-toggle"
                    >
                        <span data-feather="calendar"></span>
                        This week
                    </button>
                </div> -->
            </div>

            <image-uploader />

            <!-- <file-picker id="filePicker" v-on:vfp-file-added="fileAdded"></file-picker> -->
            <!-- <div class="card">
                <div class="card-body">
                    <form
                        method="POST"
                        id="upload-docs-form"
                        enctype="multipart/form-data"
                    >
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="text-center">
                                    <label
                                        for="document_image"
                                        ref="dropZone"
                                        class="dropZone d-none d-sm-flex justify-content-center align-items-center text-muted"
                                        ><i
                                            class="fas fa-upload fa-2x pr-3 text-muted"
                                        ></i
                                        >Drag &amp; Drop files to upload or
                                        Click Upload From Computer<br />
                                        ( Choose pdf or doc files with size less
                                        than 5 MB each )</label
                                    >
                                    <div
                                        class="d-flex d-sm-none justify-content-center text-muted"
                                    >
                                        <i
                                            class="fas fa-upload fa-2x pr-3 text-muted"
                                        ></i>
                                        ( Choose pdf or doc files with size less
                                        than 5 MB each )
                                    </div>
                                    <input
                                        type="file"
                                        id="document_image"
                                        ref="fileUploadInput"
                                        @change="handleFileUpload(null)"
                                        name="document_image"
                                        class="form-control d-none"
                                        accept=".pdf,.doc,.docx"
                                        multiple
                                    />
                                    <div
                                        class="py-3 d-none d-sm-flex justify-content-center"
                                    >
                                        <button
                                            type="button"
                                            class="btn btn-danger btn-sm"
                                        >
                                            Upload From Computer
                                        </button>
                                    </div>
                                    <div
                                        class="py-3 d-flex d-sm-none justify-content-center"
                                    >
                                        <button
                                            type="button"
                                            class="btn btn-danger btn-sm"
                                        >
                                            Upload From Device
                                        </button>
                                    </div>
                                </div>
                                <div class="text-center">
                                    <div
                                        v-if="!(files.length > 0)"
                                        class="col-xs-12 col-sm-12"
                                    >
                                        <label for="document_name"
                                            ><strong>File Name: </strong></label
                                        >
                                        <span class="text-danger"
                                            >No file chosen</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div> -->

            <gallery />
        </main>
    </div>
</template>

<script>
// import FilePicker from 'vue-file-picker';
import ImageUploader from './ImageUploader';
import Gallery from "./SlideShow";
export default {
    name: "DashBoard",
    components: {
        Gallery,
        ImageUploader
        // FilePicker
    },
    data() {
        return {
            files: [],
            uploadedFiles: [],
            setURL: ''
        };
    },
    methods: {
        uploadDocuments(data = null) {
            if (!this.files.length > 0) {
                this.showErrorMsg({
                    message: "No file chosen! Select a file to upload!",
                });
                return false;
            }

            let url = `premium-orders/documents-upload.json`;

            if (!data) {
                data = new FormData();

                if (this.documentDeal && this.documentDeal._id) {
                    data.append("documentDealId", this.documentDeal._id);
                    data.append(
                        "uploadedFiles",
                        JSON.stringify(this.uploadedFiles)
                    );
                } else {
                    data.append("deal", JSON.stringify(this.deal));
                }
                this.files.forEach((file) => {
                    data.append("file[]", file);
                });
            }
            let call_parameters = {
                url: url,
                data: data,
                method: "post",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-Token": window.csrfToken,
                },
            };

            this.loading = true;

            // this.makeApiCall(call_parameters)
            // .then(response => {
            //     if(response.status === 200 && response.data.document.isError == false ){
            //         this.showSuccessMsg({message: "File uploaded successfully"});

            //         this.uploadedFiles.push(...response.data.document.documents);
            //         if (!(this.documentDeal && this.documentDeal._id)) {
            //             this.documentDeal = response.data.document.deal;
            //         }
            //         // Resetting the file uploader
            //         this.$refs.fileUploadInput.value = '';
            //         this.files = [];
            //     }
            //     else{
            //         let errorMsg = response.data.document.error || 'Some error occured';
            //         this.showErrorMsg({message: errorMsg});
            //     }
            // })
            // .catch((e) => {
            //     this.showErrorMsg({message: `Some error occured - ${e}`});
            // }).finally(() => {
            //     this.loading = false;
            // });
        },
        handleFileUpload(dragFiles) {
            const allowedTypes = [
                "application/pdf",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/msword",
            ];
            let uploadedFiles = "";
            if (dragFiles) {
                uploadedFiles = dragFiles;
            } else {
                uploadedFiles = this.$refs.fileUploadInput.files;
            }

            for (var i = 0; i < uploadedFiles.length; i++) {
                if (!allowedTypes.includes(uploadedFiles[i].type)) {
                    // this.showErrorMsg({message: 'Files allowed are: pdf, doc, docx'});
                    return;
                }
                if (uploadedFiles[i].size > 5000000) {
                    // this.showErrorMsg({message: 'Upload a file with size less than 5 MB'});
                    return;
                }

                this.files.push(uploadedFiles[i]);
            }
            setTimeout(() => {
                this.$refs.selectedFiles.scrollIntoView();
            }, 300);
        },
        onFileChange(e) {
            var files;
            if (e.dataTransfer) {
                files = e.dataTransfer.files;
            } else if (e.target) {
                files = e.target.files;
            }
            this.handleFileUpload(files);
        },
        initializeFileUploader() {
            var element = this.$refs.dropZone;
            let $this = this;
            if (element) {
                element.addEventListener("dragover", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    element.classList.add("dragover");
                });

                element.addEventListener("dragleave", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    element.classList.remove("dragover");
                });

                element.addEventListener("drop", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    element.classList.remove("dragover");
                    $this.onFileChange(e);
                });
            }
        },
        startUpJsCodeExecution() {
            this.initializeFileUploader();
        },
    },
    created() {},
    mounted() {
        this.setURL = this.$route.path
    },
    beforeMount() {
        // this.getDocumentDeal();
        this.startUpJsCodeExecution();
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