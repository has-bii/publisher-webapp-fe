<template>
    <div class="row">
        <div class="col-6">

            <div class="card shadow border-light mb-4">
                <div class="card-body">

                    <div class="fs-3 fw-bold mb-3">
                        My Profile
                    </div>
                    <div class="d-flex flex-row border px-3 py-3 rounded mb-4">

                        <img :src="getImg(photo_preview)" class="img-profile" alt="...">

                        <div v-if="user" class="align-self-center ml-3">
                            <div class="fs-3 fw-bold">
                                {{ this.$auth.user.name }}
                            </div>
                            <div class="fs-4 text-body-tertiary">
                                {{ this.$auth.user.email }}
                            </div>
                        </div>
                    </div>

                    <div class="d-flex flex-column border px-3 py-2 rounded mb-3">

                        <div class="fs-5 fw-bold mb-4 flex-grow-1">
                            Personal Information
                        </div>

                        <div class="d-flex flex-row">
                            <div class="flex-grow-1">

                                <div class="mb-3">
                                    <label for="fullName" class="fw-bold label-color mb-0">Full Name</label>
                                    <input readonly v-if="user && show" id="fullName"
                                        class="fs-5 form-control-plaintext fw-medium text-black input-width"
                                        v-model="user.name">
                                    <input v-if="!show" type="text"
                                        class="form-control fs-5 fw-medium text-black input-width" id="fullName"
                                        v-model="user.name" required>
                                </div>

                                <div class="mb-3">
                                    <label for="email" class="fw-bold label-color mb-0">Email</label>
                                    <input readonly v-if="user && show" id="email"
                                        class="fs-5 form-control-plaintext fw-medium text-black input-width"
                                        v-model="user.email">
                                    <input v-if="!show" type="email"
                                        class="form-control fs-5 fw-medium text-black input-width" id="email"
                                        v-model="user.email" required>
                                </div>

                            </div>
                            <div class="flex-grow-1">

                                <div class="mb-3">
                                    <label for="role" class="fw-bold label-color mb-0">Role</label>
                                    <input readonly v-if="user && show" id="role"
                                        class="fs-5 form-control-plaintext fw-medium text-black input-width"
                                        v-model="user.role.name">
                                    <input v-if="!show" type="text"
                                        class="form-control fs-5 fw-medium text-black input-width" id="role" disabled
                                        v-model="user.role.name">
                                </div>

                                <div class="mb-3">
                                    <label for="phone" class="fw-bold label-color mb-0">Phone</label>
                                    <input readonly v-if="user && show" id="phone"
                                        class="fs-5 form-control-plaintext fw-medium text-black input-width"
                                        v-model="user.phone" placeholder="None">

                                    <input v-if="!show" type="text"
                                        class="form-control fs-5 fw-medium text-black input-width" id="fullName"
                                        v-model="user.phone" placeholder="+90/+62" required>
                                </div>

                            </div>
                        </div>

                        <div class="d-flex flex-row justify-content-end">
                            <button type="button" class="btn btn-light mr-2" @click="edit">
                                Edit
                            </button>
                            <button type="button" class="btn btn-success" @click="save">
                                Save
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>

        <div class="col-auto">
            <div class="card shadow border-light mb-4">
                <div class="card-body">
                    <div class="fs-3 fw-bold mb-3">
                        Photo Profile
                    </div>

                    <b-skeleton-img v-if="$fetchState.pending" class="photo-profile-preview"></b-skeleton-img>
                    <img v-else :src="getImg(photo_preview)" class="photo-profile-preview" alt="...">

                    <div class="mt-3">
                        <input class="form-control" type="file" id="photoFile" accept="image/*"
                            v-on:change="selectPhotoFile">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Profile',
    layout: 'dashboard',
    middleware: 'auth',
    data() {
        return {
            user: null,
            show: true,
            photo_preview: null,
            photo: null
        }
    },
    async fetch() {
        this.fetch_user()
    },
    methods: {
        async fetch_user() {
            await this.$axios.get('get-users', {
                params: {
                    id: this.$auth.user.id
                }
            })
                .then(({ data }) => {
                    this.user = data.result

                    this.photo_preview = data.result.photo
                })
                .catch(error => {
                    console.log(error)
                })
        },
        edit() {
            this.show = false
        },
        async save() {
            await this.$axios.post('update', {
                name: this.user.name,
                email: this.user.email,
                phone: this.user.phone,
            })
                .then(() => {
                    this.show = true
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async upload_photo() {

            const formData = new FormData();

            formData.append('photo', this.photo)

            await this.$axios.post(`change-photo/${this.$auth.user.id}`, formData)
                .then(() => {
                    this.fetch_user()
                })
                .catch(error => {
                    console.log(error)
                })
        },
        selectPhotoFile(event) {
            if (event.target.files[0].size > 1048576) {
                alert('File size exceeds 1MB. Please select a smaller file.');
                // Clear the file input if needed
                event.target.value = '';
                return;
            }

            this.photo = event.target.files[0]

            console.log(this.photo)

            this.upload_photo()
        },
        getImg(file) {

            if (file == null) {
                file = 'profile_dummy.png'
            }

            return process.env.BASE_URL + 'storage/photos/' + file
        }
    }
}
</script>

<style>
.img-profile {
    height: 6rem;
    width: 6rem;
    object-fit: cover;
    border-radius: 5rem;
}

.photo-profile-preview {
    height: 24.6rem;
    width: 100%;
    object-fit: cover;
}

.label-color {
    color: rgba(33, 37, 41, 0.5);
}

.input-width {
    width: 20rem;
}

.hover-overlay {
    z-index: 1000;
    background-color: #00000078;
}
</style>