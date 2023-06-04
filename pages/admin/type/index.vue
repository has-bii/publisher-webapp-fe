<template>
    <div class="row">

        <div class="col-5">
            <!-- Table -->
            <div class="card shadow border-light mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">
                        Types List
                    </h6>
                </div>
                <div class="card-body table-responsive">

                    <div class="row mb-3">
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Add new type" v-model="new_type"
                                @keydown.enter="addType">
                        </div>

                        <div class="col-1 p-0">
                            <button type="button" class="btn btn-primary" @click="addType">Add</button>
                        </div>

                        <div class="col-2">
                            <button type="button" class="btn btn-light" @click="fetch_types">Refresh</button>
                        </div>
                    </div>

                    <table class="table align-middle mb-4">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th colspan="3">
                                    Name
                                </th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="$fetchState.pending" class="table-group-divider">
                            <tr>
                                <td colspan="12"> <b-skeleton></b-skeleton> </td>
                            </tr>
                        </tbody>
                        <tbody v-else-if="$fetchState.error" class="table-group-divider">
                            <tr>
                                <td colspan="12" class="text-center"> ERROR! </td>
                            </tr>
                        </tbody>
                        <tbody v-else class="table-group-divider align-middle">
                            <tr v-for="(type, index) in types">
                                <th scope="row"> {{ index + 1 }} </th>
                                <td colspan="3">
                                    <span v-if="!type.isClicked" @click="type.isClicked = true">{{ type.name
                                    }}</span>
                                    <input :id="type.id" :name="type.name" v-else class="form-control form-control-sm"
                                        type="text" @blur="updateItem(type)" @keydown.enter="updateItem(type)"
                                        @input="pushData" v-model="type.name" required>
                                </td>
                                <td>
                                    <button :id="type.id" :name="type.name" type="button" class="btn btn-danger btn-sm"
                                        data-bs-toggle="modal" data-bs-target="#deleteModal" @click="pushData">
                                        Delete type</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>


        <div class="col">
            <!-- Table -->
            <div class="card shadow border-light mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">
                        Genres List
                    </h6>
                </div>
                <div class="card-body table-responsive">

                    <div class="row mb-3">
                        <div class="col-3">
                            <input type="text" class="form-control" placeholder="Add new type" v-model="new_genre"
                                @keydown.enter="addGenre">
                        </div>

                        <div class="col">
                            <select v-if="$fetchState.pending" class="form-select">
                                <option selected value="">Loading.</option>
                            </select>
                            <select v-else-if="$fetchState.error" class="form-select">
                                <option selected value="">Error!</option>
                            </select>
                            <select v-else class="form-select" v-model="new_genre_type">
                                <option selected disabled value="null">Select type..</option>
                                <option v-for="type in types" :value="type.id">{{ type.name }}</option>
                            </select>
                        </div>

                        <div class="col">
                            <button type="button" class="btn btn-primary" @click="addGenre">Add Genre</button>
                        </div>

                        <div class="col">
                            <div class="input-group mb-3">
                                <select class="form-select" id="filterRow" @change="fetch_genres()" v-model="search.row">
                                    <option selected value="5">Rows</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <select v-if="$fetchState.pending" class="form-select">
                                    <option selected value="">Loading.</option>
                                </select>
                                <select v-else-if="$fetchState.error" class="form-select">
                                    <option selected value="">Error!</option>
                                </select>
                                <select v-else class="form-select" @change="fetch_genres()" v-model="search.type_id">
                                    <option selected value="">Filter type</option>
                                    <option v-for="type in types" :value="type.id">{{ type.name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <table class="table align-middle mb-4">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th colspan="3">
                                    Name
                                </th>
                                <th>Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="$fetchState.pending" class="table-group-divider">
                            <tr>
                                <td colspan="12"> <b-skeleton></b-skeleton> </td>
                            </tr>
                        </tbody>
                        <tbody v-else-if="$fetchState.error" class="table-group-divider">
                            <tr>
                                <td colspan="12" class="text-center"> ERROR! </td>
                            </tr>
                        </tbody>
                        <tbody v-else class="table-group-divider align-middle">
                            <tr v-for="(genre, index) in genres">
                                <th scope="row"> {{ index + 1 }} </th>
                                <td colspan="3">
                                    <span v-if="!genre.isClicked" @click="genre.isClicked = true">
                                        {{ genre.name }}
                                    </span>
                                    <input :id="genre.id" :name="genre.name" v-else class="form-control form-control-sm"
                                        type="text" @blur="updateGenre(genre)" @keydown.enter="updateGenre(genre)"
                                        @input="pushData" v-model="genre.name" required>
                                </td>
                                <td>{{ genre.type_name }}</td>
                                <td>
                                    <button :id="genre.id" :name="genre.name" type="button" class="btn btn-danger btn-sm"
                                        data-bs-toggle="modal" data-bs-target="#deleteGenreModal" @click="pushData">
                                        Delete genre</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Pagination -->
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                            <li class="page-item" :class="{ 'disabled': !prev_page_url }"><a class="page-link" href="#"
                                    @click.prevent="fetch_genres(prev_page_url)">Previous</a></li>
                            <li v-for="link in links" class="page-item"
                                :class="{ 'active': link.active, 'disabled': !link.url }"><a class="page-link" href="#"
                                    @click.prevent="fetch_genres(link.url)">{{ link.label }}</a></li>
                            <li class="page-item" :class="{ 'disabled': !next_page_url }"><a class="page-link" href="#"
                                    @click.prevent="fetch_genres(next_page_url)">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>


        <!-- Modals -->
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="deleteModalLabel">Delete Type</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="deletingToast(1)">
                        <div class="modal-body">
                            Please type "<b>{{ selected_item_name }}</b>" to delete the type.
                            <div class="my-3">
                                <input class="form-control" placeholder="Type here" v-model="delete_item" required>
                            </div>
                            <div class="text-danger" v-if="!show">The type names don't match!</div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" id="closeBtnModal1" class="btn btn-success" data-bs-dismiss="modal"
                                @click="clearSelect">Close</button>
                            <button id="toastDeleteButton" type="submit" class="btn btn-danger">Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Delete Genre Modal -->
        <div class="modal fade" id="deleteGenreModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="deleteModalLabel">Delete Genre</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="deletingToast(2)">
                        <div class="modal-body">
                            Please type "<b>{{ selected_item_name }}</b>" to delete the type.
                            <div class="my-3">
                                <input class="form-control" placeholder="Type here" v-model="delete_item" required>
                            </div>
                            <div class="text-danger" v-if="!show">The type names don't match!</div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" id="closeBtnModal2" class="btn btn-success" data-bs-dismiss="modal"
                                @click="clearSelect">Close</button>
                            <button id="toastDeleteButton" type="submit" class="btn btn-danger">Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Deleting Toast -->
        <div class="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
            <div id="toastDelete" class="toast align-items-center text-bg-danger border-0" role="alert"
                aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        The data has been deleted!
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                        aria-label="Close"></button>
                </div>
            </div>
        </div>

        <!-- Error Toast -->
        <div class="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
            <div id="toastError" class="toast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive"
                aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        The input fields mustn't be empty
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                        aria-label="Close"></button>
                </div>
            </div>
        </div>

        <!-- Update Toast -->
        <div class="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
            <div id="toastUpdate" class="toast align-items-center text-bg-success border-0" role="alert"
                aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        The new data has been added!
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                        aria-label="Close"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TypeList',
    layout: 'dashboard',
    middleware: 'auth',
    watch: {
        '$route.query': '$fetch'
    },
    data() {
        return {
            types: [],
            genres: [],
            links: [],
            next_page_url: '',
            prev_page_url: '',
            search: {
                row: 5,
                type_id: '',
            },
            selected_item_id: null,
            selected_item_name: null,
            delete_item: '',
            show: true,
            new_type: '',
            new_genre: '',
            new_genre_type: null,
        }
    },
    async fetch() {
        await this.fetch_types()

        await this.fetch_genres()
    },
    methods: {
        async fetch_types() {
            try {
                const response = await this.$axios.get('/type');
                this.types = response.data.result.data.map(type => ({
                    isClicked: false,
                    id: type.id,
                    name: type.name,
                    inputText: ""
                }));
            } catch (error) {
                console.error(error);
            }
        },
        async fetch_genres(url = '/genre') {
            try {
                const response = await this.$axios.get(url, {
                    params: {
                        limit: this.search.row,
                        type_id: this.search.type_id
                    }
                });

                this.links = response.data.result.links
                this.links.shift()
                this.links.pop()
                this.prev_page_url = response.data.result.prev_page_url
                this.next_page_url = response.data.result.next_page_url

                this.genres = response.data.result.data.map(genre => ({
                    isClicked: false,
                    id: genre.id,
                    name: genre.name,
                    type_id: genre.type.id,
                    type_name: genre.type.name,
                    inputText: ""
                }));
            } catch (error) {
                console.error(error);
            }
        },
        async updateItem(type) {
            type.isClicked = false

            await this.$axios.post(`type/update/${type.id}`, { 'name': type.name })
                .then(this.toastUpdate())
        },
        async updateGenre(genre) {
            genre.isClicked = false

            await this.$axios.post(`genre/update/${genre.id}`, { name: genre.name, type_id: genre.type_id })
                .then(this.toastUpdate())
        },
        async deleteType(toastBootstrap) {
            await this.$axios.delete(`type/delete/${this.selected_item_id}`)
                .then(
                    this.toastDeleteShow(toastBootstrap),
                    this.clearSelect(),
                    this.fetch_types()
                )
                .catch(error => {
                    console.error(error);
                });
        },
        async deleteGenre(toastBootstrap) {
            await this.$axios.delete(`genre/delete/${this.selected_item_id}`)
                .then(
                    this.toastDeleteShow(toastBootstrap),
                    this.fetch_genres()
                )
                .catch(error => {
                    console.error(error);
                });
        },
        async addType() {

            if (!this.new_type) {
                this.errorToast()

                return
            }

            await this.$axios.post('type', { name: this.new_type })
                .then(
                    this.fetch_types(),
                    this.toastUpdate()
                )
                .catch(error => {
                    console.error(error);
                });
        },
        async addGenre() {

            if (!this.new_genre) {
                this.errorToast()
                return
            }
            if (!this.new_genre_type) {
                this.errorToast()
                return
            }

            await this.$axios.post('genre', { name: this.new_genre, type_id: this.new_genre_type })
                .then(
                    this.fetch_genres(),
                    this.toastUpdate()
                )
                .catch(error => {
                    console.error(error);
                });
        },
        errorToast() {
            const toastError = document.getElementById('toastError')
            const toastErrorBootstrap = bootstrap.Toast.getOrCreateInstance(toastError)

            toastErrorBootstrap.show()
        },
        pushData(event) {
            this.selected_item_id = event.target.id
            this.selected_item_name = event.target.name
        },
        clearSelect() {
            this.selected_user_id = null
            this.delete_user = ''
        },
        deletingToast(index) {
            if (this.selected_item_name != this.delete_item) {
                this.show = false

                return
            }

            this.show = true

            if (index == 1) {
                const modal = document.getElementById('closeBtnModal1')
                modal.click()
            } else {
                const modal = document.getElementById('closeBtnModal2')
                modal.click()
            }

            const toastDelete = document.getElementById('toastDelete')

            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastDelete)

            if (index == 1) {
                this.deleteType(toastBootstrap)
            } else {
                this.deleteGenre(toastBootstrap)
            }
        },
        toastDeleteShow(toastBootstrap) {

            toastBootstrap.show()
        },
        toastUpdate() {
            const toastUpdate = document.getElementById('toastUpdate')
            const toastUpdateBootstrap = bootstrap.Toast.getOrCreateInstance(toastUpdate)

            if (toastUpdateBootstrap) {

                this.toastUpdateShow(toastUpdateBootstrap)
            }
        },
        toastUpdateShow(toastUpdateBootstrap) {

            toastUpdateBootstrap.show()
        },

    }
}
</script>

<style>
.fa-arrow-down-a-z:hover {
    color: #3D63D2;
}
</style>