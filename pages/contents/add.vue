<template>
    <div class="col">
        <div class="card shadow border-light mb-4" style="border-radius: 1rem;">
            <div class="d-flex">
                <div class="p-3 flex-grow-1 text-gray-500 m-auto">Adding content</div>
                <a class="p-3"><i class="fas fa-plus-square fa-2x" style="color: rgb(78 115 223);"></i>
                </a>

            </div>
        </div>

        <div class="card shadow border-light mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">
                    Add Content
                </h6>
            </div>
            <div class="card-body">

                <form @submit.prevent="addContent">
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" placeholder="Enter name of content"
                            v-model="form.name" required>
                    </div>

                    <div class="mb-3">
                        <label for="formFile" class="form-label">Content File</label>
                        <input class="form-control" type="file" id="formFile" accept=".pdf" v-on:change="selectContentFile"
                            required>
                    </div>

                    <div class="mb-3">
                        <label for="formFileCover" class="form-label">Cover File</label>
                        <input class="form-control" type="file" id="formFileCover" accept=".png, .jpeg, .jpg"
                            v-on:change="selectCoverFile">
                    </div>

                    <div class="mb-3">
                        <label for="selectType" class="form-label">Content Type</label>
                        <select v-if="$fetchState.pending" class="form-select" id="selectType">
                            <option selected>Loading</option>
                        </select>
                        <select v-else-if="$fetchState.error" class="form-select" id="selectType">
                            <option selected>Error</option>
                        </select>
                        <select v-else class="form-select" id="selectType" required @change="fetchGenres"
                            v-model="form.type_id">
                            <option selected disabled value="">Please select one type</option>
                            <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="selectGenre" class="form-label">Content Genre</label>
                        <select v-if="$fetchState.pending" class="form-select" id="selectGenre">
                            <option selected>Loading</option>
                        </select>
                        <select v-else-if="$fetchState.error" class="form-select" id="selectGenre">
                            <option selected>Error</option>
                        </select>
                        <select v-else class="form-select" id="selectGenre" required v-model="form.genre_id">
                            <option selected disabled value="">Please select one genre</option>
                            <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
                        </select>
                    </div>

                    <button type="submit" class="btn btn-primary btn-user mx-auto mt-3">
                        Submit
                    </button>
                </form>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    name: 'Add-Content',
    layout: 'dashboard',
    middleware: 'auth',
    data() {
        return {
            types: [],
            genres: [],
            form: {
                name: '',
                type_id: '',
                genre_id: ''
            },
            file: null,
            cover: null
        }
    },
    async fetch() {
        this.types = await this.$axios.get('type')

        this.types = this.types.data.result.data
    },
    methods: {
        async fetchGenres(event) {
            await this.$axios.get('/genre', {
                params: {
                    type_id: event.target.value
                }
            })
                .then(({ data }) => {
                    this.genres = data.result.data
                })
        },
        selectCoverFile(event) {
            if (event.target.files[0].size > 1048576) {
                alert('File size exceeds 1MB. Please select a smaller file.');
                // Clear the file input if needed
                event.target.value = '';
                return;
            }

            this.cover = event.target.files[0]

            console.log(this.cover)
        },
        selectContentFile(event) {
            if (event.target.files[0].size > 1048576 * 10) {
                alert('File size exceeds 10MB. Please select a smaller file.');
                // Clear the file input if needed
                event.target.value = '';
                return;
            }

            this.file = event.target.files[0]

            console.log(this.file)
        },
        async addContent() {

            const formData = new FormData();

            formData.append('name', this.form.name)
            formData.append('file', this.file)

            if (this.cover) {
                formData.append('cover', this.cover)
            }

            formData.append('genre_id', this.form.genre_id)
            formData.append('type_id', this.form.type_id)

            await this.$axios.post('content', formData)
                .then(response => {

                    console.log(response.data)
                })
                .catch(error => {

                    console.log(error)
                })

            this.$router.push({ name: 'contents' })
        }
    }
}
</script>