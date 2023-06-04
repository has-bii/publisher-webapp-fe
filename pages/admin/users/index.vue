<template>
    <div class="row">

        <div class="col">

            <!-- Table -->
            <div class="card shadow border-light mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">
                        Users List
                    </h6>
                </div>
                <div class="card-body table-responsive">

                    <div class="row">
                        <div class="col-2">
                            <div class="input-group mb-3">
                                <span class="input-group-text"><i class="fas fa-fw fa-magnifying-glass"></i></span>
                                <input type="text" class="form-control" placeholder="Search by name" @input="filter"
                                    v-model="search.name">
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="input-group mb-3">
                                <span class="input-group-text"><i class="fas fa-fw fa-at"></i></span>
                                <input type="text" class="form-control" placeholder="Search by email" @input="filter"
                                    v-model="search.email">
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="selectRole">Role</label>
                                <select class="form-select" id="selectRole" @change="filter" v-model="search.role_id">
                                    <option selected value="0">Filter by role</option>
                                    <option value="1">Publisher</option>
                                    <option value="2">Editor</option>
                                    <option value="3">Author</option>
                                    <option value="4">Admin</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="filterRow"><i class="fas fa-fw fa-bars"></i></label>
                                <select class="form-select" id="filterRow" @change="filter" v-model="search.row">
                                    <option selected value="5">Number of rows</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <table class="table align-middle mb-4">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col" colspan="4">
                                    <a @click="orderChange">
                                        <i class="fas fa-fw"
                                            :class="search.order_by == 'asc' ? 'fa-arrow-down-a-z' : 'fa-arrow-down-z-a'"></i>
                                    </a>
                                    Name
                                </th>
                                <th scope="col" colspan="3">Email</th>
                                <th scope="col" colspan="2">Role</th>
                                <th scope="col" colspan="1">Is Verified</th>
                                <th scope="col">Action</th>
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
                            <tr v-for="(user, index) in users">
                                <th scope="row"> {{ index + 1 }} </th>
                                <td colspan="4">{{ user.name }}</td>
                                <td colspan="3">{{ user.email }}</td>
                                <td colspan="2">{{ user.role.name }}</td>
                                <td colspan="1">
                                    <span class="badge"
                                        :class="user.email_verified_at == null ? 'text-bg-warning' : 'text-bg-success'">
                                        {{ user.email_verified_at == null ? 'not verified' : 'verified' }}
                                    </span>
                                </td>
                                <td>
                                    <div class="btn-group mr">
                                        <button :id="user.id" type="button" class="btn btn-success dropdown-toggle btn-sm"
                                            data-bs-toggle="dropdown" aria-expanded="false" @click="pushData">
                                            Change role
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#" @click="changeRole(3)">Author</a>
                                            </li>
                                            <li><a class="dropdown-item" href="#" @click="changeRole(2)">Editor</a>
                                            </li>
                                            <li><a class="dropdown-item" href="#" @click="changeRole(1)">Publisher</a></li>
                                        </ul>
                                    </div>
                                    <button :id="user.id" :name="user.name" type="button" class="btn btn-danger btn-sm"
                                        data-bs-toggle="modal" data-bs-target="#deleteModal" @click="pushData">Delete
                                        user</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Pagination -->
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                            <li class="page-item" :class="{ 'disabled': !prev_page_url }"><a class="page-link" href="#"
                                    @click.prevent="getURL(prev_page_url)">Previous</a></li>
                            <li v-for="link in links" class="page-item"
                                :class="{ 'active': link.active, 'disabled': !link.url }"><a class="page-link" href="#"
                                    @click.prevent="getURL(link.url)">{{ link.label }}</a></li>
                            <li class="page-item" :class="{ 'disabled': !next_page_url }"><a class="page-link" href="#"
                                    @click.prevent="getURL(next_page_url)">Next</a></li>
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
                        <h1 class="modal-title fs-5" id="deleteModalLabel">Delete User</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="deletingToast">
                        <div class="modal-body">
                            Please type this <b>{{ selected_user_name }}</b> to delete the user.
                            <div class="my-3">
                                <input class="form-control" placeholder="Type here" v-model="delete_user" required>
                            </div>
                            <div v-if="show">The user will not be actually deleted for the UX reason.</div>
                            <div class="text-danger" v-else>The user name doesn't match!</div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" id="closeBtnModal" class="btn btn-success" data-bs-dismiss="modal"
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
                        The user has been deleted!
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
                        The user role has been updated!
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
    name: 'UsersList',
    layout: 'dashboard',
    middleware: 'auth',
    watch: {
        '$route.query': '$fetch'
    },
    data() {
        return {
            users: [],
            links: [],
            next_page_url: '',
            prev_page_url: '',
            search: {
                name: '',
                email: '',
                role_id: 0,
                order_by: 'asc',
                row: 5,
            },
            selected_user_id: null,
            selected_user_name: null,
            delete_user: '',
            show: true,
        }
    },
    async fetch() {
        await this.$axios.get('get-users', {
            params: {
                limit: this.search.row,
                order_by: this.search.order_by,
                name: this.search.name,
                email: this.search.email,
                role_id: this.search.role_id
            }
        })
            .then(({ data }) => {
                this.users = data.result.data
                this.links = data.result.links
                this.links.shift()
                this.links.pop()
                this.next_page_url = data.result.next_page_url
                this.prev_page_url = data.result.prev_page_url
            })
            .catch(error => {
                console.error(error);
            });
    },
    methods: {
        async getURL(url) {
            await this.$axios.get(url, {
                params: {
                    limit: this.search.row,
                    order_by: this.search.order_by,
                    name: this.search.name,
                    email: this.search.email,
                    role_id: this.search.role_id
                }
            })
                .then(({ data }) => {
                    this.users = data.result.data
                    this.links = data.result.links
                    this.links.shift()
                    this.links.pop()
                    this.next_page_url = data.result.next_page_url
                    this.prev_page_url = data.result.prev_page_url
                })
        },
        orderChange() {
            this.search.order_by = this.search.order_by == 'asc' ? 'desc' : 'asc';

            this.filter()
        },
        async filter() {
            // Make the API request with the updated order
            await this.$axios
                .get('get-users', {
                    params: {
                        limit: this.search.row,
                        order_by: this.search.order_by,
                        name: this.search.name,
                        email: this.search.email,
                        role_id: this.search.role_id
                    }
                })
                .then(({ data }) => {
                    this.users = data.result.data;
                    this.links = data.result.links;
                    this.links.shift()
                    this.links.pop()
                    this.next_page_url = data.result.next_page_url;
                    this.prev_page_url = data.result.prev_page_url;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        pushData(event) {
            this.selected_user_id = event.target.id
            this.selected_user_name = event.target.name
        },
        clearSelect() {
            this.selected_user_id = null
            this.delete_user = ''
        },
        deletingToast() {
            if (this.selected_user_name != this.delete_user) {
                this.show = false

                return
            }

            this.show = true

            const modal = document.getElementById('closeBtnModal')

            if (modal) {
                console.log('ada')
            }

            modal.click()

            const toastTrigger = document.getElementById('toastDeleteButton')
            const toastDelete = document.getElementById('toastDelete')

            if (toastTrigger) {
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastDelete)
                this.toastDeleteShow(toastBootstrap)
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
        async changeRole(role_id) {

            await this.$axios.post(`change-role/${this.selected_user_id}`, { 'role_id': role_id })
                .then(response => {
                    console.log(response.data)

                    this.toastUpdate()
                    this.filter()
                })
                .catch(error => {
                    console.error(error);
                });

        }

    }
}
</script>

<style>
.fa-arrow-down-a-z:hover {
    color: #3D63D2;
}
</style>