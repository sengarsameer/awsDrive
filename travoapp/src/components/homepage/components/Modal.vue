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
                        <input v-model="bucketName" type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="button" class="btn btn-primary" @click="save">
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import awsServices from '@/services/awsServices';
export default {
    name: "Modal",
    props: [],
    data() {
        return {
            bucketName: '',
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        save() {
            awsServices.createBucket(this.bucketName)
            .then(res => {
                this.$emit('bucket', this.bucketName)
                this.close();
            })
        }
    },

};
</script>

<style>
</style>