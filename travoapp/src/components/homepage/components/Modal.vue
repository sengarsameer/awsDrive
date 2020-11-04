<template>
    <div>
        <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            Create a S3 Bucket
                        </h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input
                            v-model="bucketName"
                            required="true"
                            type="text"
                            class="form-control"
                            placeholder="Bucket Name"
                            name="bucketname"
                            aria-describedby="basic-addon1"
                        />
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="save"
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import awsServices from "@/services/awsServices";
// import axios from '@/axios'
export default {
    name: "Modal",
    props: ["closeModal", "bucketList"],
    data() {
        return {
            bucketName: "",
        };
    },
    methods: {
        close() {
            this.$emit("close");
        },
        save() {
            const response = this.bucketList.map((res) => {
                if(this.bucketName == res.Name) {
                    this.$toastr.w("This BucketName already have, try another one!");
                    return false;
                }
            })
            if(response[0] == false) {
                return
            }
            awsServices.createBucket(this.bucketName).then((res) => {
                this.$emit("bucket", this.bucketName);
                if (res.Location) {
                    this.$toastr.s("SUCCESS MESSAGE", "Your Bucket added successfully");
                    this.closeModal;
                }
                this.$emit("close");
            });
        },
    },
};
</script>

<style>
</style>