<template>
    <div class="row">

        <div class="col">
            <!-- Table -->
            <div class="card shadow border-light mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">
                        Publishers List
                    </h6>
                </div>
                <div class="card-body table-responsive">

                    <!-- Filters & Adding Inputs -->
                    <div class="row mb-3">

                        <div class="col-2">
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-fw fa-magnifying-glass"></i></span>
                                <input type="text" class="form-control" placeholder="Search by name"
                                    @input="fetch_publishers()" v-model="search.name">
                            </div>
                        </div>

                        <div class="col-2">
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-fw fa-at"></i></span>
                                <input type="text" class="form-control" placeholder="Search by email"
                                    @input="fetch_publishers()" v-model="search.email">
                            </div>
                        </div>

                        <div class="col-2">
                            <div class="input-group">
                                <label class="input-group-text" for="filterRow"><i class="fas fa-fw fa-bars"></i></label>
                                <select class="form-select" id="filterRow" @change="fetch_publishers()"
                                    v-model="search.limit">
                                    <option selected value="5">Number of rows</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-auto">
                            <div class="vr" style="height: 100%;"></div>
                        </div>

                        <div class="col-2">
                            <input type="text" class="form-control" placeholder="Add new publisher" v-model="form.name">
                        </div>
                        <div class="col-2">
                            <input type="email" class="form-control" placeholder="Email of new publisher"
                                v-model="form.email">
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-primary" @click="addNewPublisher">Add Publisher</button>
                        </div>
                    </div>

                    <table class="table align-middle mb-4">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">
                                    Name
                                </th>
                                <th scope="col">Email</th>
                                <th scope="col" colspan="3">Action</th>
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
                        <tbody v-else class="table-group-divider">
                            <tr v-for="(publisher, index) in publishers">
                                <th scope="row"> {{ index + 1 }} </th>
                                <td>
                                    {{ publisher.name }}
                                </td>
                                <td>
                                    {{ publisher.email }}
                                </td>
                                <td colspan="3">
                                    <NuxtLink type="button" class="btn btn-primary btn-sm"
                                        :to="{ name: 'admin-publisher-id', params: { id: publisher.id } }">Open</NuxtLink>
                                    <button :id="publisher.id" :name="publisher.name" type="button"
                                        class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal"
                                        @click="pushData">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Pagination -->
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                            <li class="page-item" :class="{ 'disabled': !prev_page_url }"><a class="page-link" href="#"
                                    @click.prevent="fetch_publishers(prev_page_url)">Previous</a></li>
                            <li v-for="link in links" class="page-item"
                                :class="{ 'active': link.active, 'disabled': !link.url }"><a class="page-link" href="#"
                                    @click.prevent="fetch_publishers(link.url)">{{ link.label }}</a></li>
                            <li class="page-item" :class="{ 'disabled': !next_page_url }"><a class="page-link" href="#"
                                    @click.prevent="fetch_publishers(next_page_url)">Next</a></li>
                        </ul>
                    </nav>

                </div>
            </div>
        </div>

        <!-- Toast -->
        <div class="toast-container position-fixed top-0 end-0 p-3">
            <div id="toastId" class="toast align-items-center border-0" :class="toast.style" role="alert"
                aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        {{ toast.text }}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                        aria-label="Close"></button>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Deleting Publisher</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Please type "<b>{{ selected.name }}</b>" to delete the publisher.
                        <div class="my-3">
                            <input class="form-control" placeholder="Type here" v-model="validate.name" required>
                        </div>
                        <div class="text-danger" v-if="validate.show">The type names don't match!</div>
                    </div>
                    <div class="modal-footer">
                        <button id="closeButton" type="button" class="btn btn-success"
                            data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" @click="deletePublisher">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PublishersList',
    layout: 'dashboard',
    middleware: 'auth',
    data() {
        return {
            publishers: [],
            links: [],
            next_page_url: '',
            prev_page_url: '',
            search: {
                name: '',
                email: '',
                limit: 5,
            },
            form: {
                name: '',
                email: ''
            },
            toast: {
                style: '',
                text: '',
            },
            selected: {
                id: null,
                name: '',
            },
            validate: {
                name: '',
                show: false,
            }
        }
    },
    async fetch() {
        await this.fetch_publishers()
    },
    methods: {
        async fetch_publishers(url = '/publisher') {
            await this.$axios.get(url, {
                params: {
                    name: this.search.name,
                    email: this.search.email,
                    limit: this.search.limit
                }
            })
                .then(({ data }) => {

                    this.publishers = data.result.data

                    this.links = data.result.links
                    this.links.shift()
                    this.links.pop()
                    this.prev_page_url = data.result.prev_page_url
                    this.next_page_url = data.result.next_page_url
                })
        },
        async addNewPublisher() {

            const myToast = document.getElementById('toastId')
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(myToast)

            if (!this.form.name) {

                this.toast.text = 'Field name must not be empty!'
                this.toast.style = 'text-bg-warning'

                toastBootstrap.show()

                return
            }
            if (!this.form.email) {

                this.toast.text = 'Field email must not be empty!'
                this.toast.style = 'text-bg-warning'

                toastBootstrap.show()

                return
            }

            await this.$axios.post('publisher', this.form)
                .then(({ }) => {
                    this.toast.style = 'text-bg-success'
                    this.toast.text = this.form.name + ' has been added.'

                    this.form.name = ''
                    this.form.email = ''

                    this.fetch_publishers()
                })
                .catch(error => {
                    this.toast.style = 'text-bg-danger'
                    this.toast.text = 'Error!'

                    console.error(error);
                });

            toastBootstrap.show()
        },
        async deletePublisher() {

            const myToast = document.getElementById('toastId')
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(myToast)

            if (!this.validate.name) {
                this.toast.text = 'The input field is required!'
                this.toast.style = 'text-bg-danger'

                toastBootstrap.show()

                return
            }
            if (this.selected.name != this.validate.name) {
                this.validate.show = true;

                return
            }

            this.validate.show = false

            await this.$axios.delete(`publisher/delete/${this.selected.id}`)
                .then(({ }) => {
                    this.toast.text = this.selected.name + ' has been deleted.'
                    this.toast.style = 'text-bg-success'
                })
                .catch(error => {
                    this.toast.style = 'text-bg-danger'
                    this.toast.text = 'Error!'

                    console.error(error);
                });

            this.clearSelected()

            const closeModal = document.getElementById('closeButton')

            closeModal.click()

            this.fetch_publishers()

            toastBootstrap.show()

        },
        pushData(event) {
            this.selected.id = event.target.id
            this.selected.name = event.target.name
        },
        clearSelected() {
            this.selected.id = null
            this.selected.name = ''
            this.validate.name = ''
        }
    }
}
</script>