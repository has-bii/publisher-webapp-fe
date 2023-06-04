<template>
    <div class="row">

        <!-- Publisher Information -->
        <div class="col-5">

            <div class="card shadow border-light mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">
                        Manage Publisher
                    </h6>
                </div>

                <div class="card-body">
                    <div class="mb-3">
                        <div class="fs-6 text-secondary">Publisher Name:</div>
                        <p v-if="$fetchState.pending" class="fs-4">Loading</p>
                        <p v-else-if="$fetchState.error" class="fs-4">Error</p>
                        <p v-else class="fs-4 fw-bold">{{ publisher.name }}</p>
                    </div>
                    <div class="mb-3">
                        <div class="fs-6 text-secondary">Publisher Email:</div>
                        <p v-if="$fetchState.pending" class="fs-4">Loading</p>
                        <p v-else-if="$fetchState.error" class="fs-4">Error</p>
                        <p v-else class="fs-5 fw-bold">{{ publisher.email }}</p>
                    </div>
                </div>
            </div>

            <div class="card shadow border-light mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">
                        Add Member
                    </h6>
                </div>

                <!-- table -->
                <div class="card-body">

                    <div class="row mb-3">
                        <!-- Search by name -->
                        <div class="col">
                            <input class="form-control" type="text" placeholder="Search by name" @input="fetch_users()"
                                v-model="filter_user.name">
                        </div>
                        <!-- Search by role_id -->
                        <div class="col">
                            <select class="form-select" aria-label="Default select example" @change="fetch_users()"
                                v-model="filter_user.role_id">
                                <option selected value="1,2">Select role..</option>
                                <option value="1">Publisher</option>
                                <option value="2">Editor</option>
                            </select>
                        </div>
                        <!-- Limit search -->
                        <div class="col">
                            <select class="form-select" aria-label="Default select example" @change="fetch_users()"
                                v-model="filter_user.limit">
                                <option selected value="5">Number of rows..</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </div>

                    <div class="table-responsive mb-3">

                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Role</th>
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
                                <tr v-for="(user, index) in users.data">
                                    <th>{{ index + 1 }}</th>
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.role.name }}</td>
                                    <td>
                                        <button :id="user.id" type="button" class="btn btn-success btn-sm"
                                            @click="addMember">
                                            Add Member
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                            <li class="page-item" :class="{ 'disabled': !users.prev_page_url }"><a class="page-link"
                                    href="#" @click.prevent="fetch_users(users.prev_page_url)">Previous</a></li>
                            <li v-for="link in links_users" class="page-item"
                                :class="{ 'active': link.active, 'disabled': !link.url }"><a class="page-link" href="#"
                                    @click.prevent="fetch_users(link.url)">{{ link.label }}</a></li>
                            <li class="page-item" :class="{ 'disabled': !users.next_page_url }"><a class="page-link"
                                    href="#" @click.prevent="fetch_users(users.next_page_url)">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>

        </div>

        <!-- Member of Publisher -->
        <div class="col">
            <div class="card shadow border-light mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 v-if="$fetchState.pending" class="m-0 font-weight-bold text-primary">
                        Loading
                    </h6>
                    <h6 v-else-if="$fetchState.error" class="m-0 font-weight-bold text-primary">
                        Error
                    </h6>
                    <h6 v-else class="m-0 font-weight-bold text-primary">
                        Member of {{ publisher.name }}
                    </h6>
                </div>

                <!-- table -->
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Role</th>
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
                                <tr v-for="(member, index) in members">
                                    <th>{{ index + 1 }}</th>
                                    <td>{{ member.name }}</td>
                                    <td>{{ member.email }}</td>
                                    <td>{{ member.role.name }}</td>
                                    <td>
                                        <button :id="member.id" :name="member.name" type="button"
                                            class="btn btn-warning btn-sm" data-bs-toggle="modal"
                                            data-bs-target="#removeModal" @click="pushData">
                                            Remove from publisher
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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
        <div class="modal fade" id="removeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Deleting Publisher</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure to remove {{ selected.name }} from membership?
                    </div>
                    <div class="modal-footer">
                        <button id="closeButton" type="button" class="btn btn-success" data-bs-dismiss="modal"
                            @click="clearSelected">Close</button>
                        <button type="button" class="btn btn-danger" @click="removeMember" data-bs-dismiss="modal">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ManagePublisher',
    layout: 'dashboard',
    middleware: 'auth',
    watch: {
        '$route.query': '$fetch'
    },
    data() {
        return {
            publisher: null,
            members: [],
            users: [],
            links: [],
            links_users: [],
            next_page_url: '',
            prev_page_url: '',
            search: {
                name: '',
                email: '',
                limit: 5,
            },
            filter_user: {
                name: '',
                role_id: '1,2',
                limit: 5,
            },
            toast: {
                style: '',
                text: '',
            },
            selected: {
                id: null,
                name: '',
            },
        }
    },
    async fetch() {
        await this.fetch()

        await this.fetch_users()
    },
    methods: {
        async fetch() {
            await this.$axios.get('publisher', {
                params: {
                    id: this.$route.params.id
                }
            })
                .then(({ data }) => {
                    this.publisher = data.result
                    this.members = data.result.users
                })
        },
        async fetch_users(url = 'get-users') {
            await this.$axios.get(url, {
                params: {
                    name: this.filter_user.name,
                    role_id: this.filter_user.role_id,
                    limit: this.filter_user.limit
                }
            })
                .then(({ data }) => {
                    this.users = data.result

                    this.links_users = data.result.links
                    this.links_users = this.links_users.slice(1, this.links_users.length - 1)
                })
        },
        async addMember(event) {
            await this.$axios.post('/publisher/add-member', {
                user_id: event.target.id,
                publisher_id: this.$route.params.id
            })
                .then(({ }) => {
                    this.toast.text = "Member has been added."
                    this.toast.style = 'text-bg-success'
                })
                .catch(error => {
                    console.error(error);
                });

            const toastID = document.getElementById('toastId')
            const myToastBootstrap = bootstrap.Toast.getOrCreateInstance(toastID)

            myToastBootstrap.show()

            this.fetch()
        },
        async removeMember() {
            await this.$axios.post('/publisher/remove-member', {
                user_id: this.selected.id,
                publisher_id: this.$route.params.id
            })
                .then(({ }) => {
                    this.toast.text = "Member has been removed."
                    this.toast.style = 'text-bg-success'
                })
                .catch(error => {
                    console.error(error);
                });

            const toastID = document.getElementById('toastId')
            const myToastBootstrap = bootstrap.Toast.getOrCreateInstance(toastID)

            myToastBootstrap.show()

            this.fetch()
        },
        pushData(event) {
            this.selected.id = event.target.id
            this.selected.name = event.target.name
        },
        clearSelected() {
            this.selected.id = null
            this.selected.name = ''
        }
    }
}
</script>