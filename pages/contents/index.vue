<template>
    <div class="col">
        <div class="card shadow border-light mb-4" style="border-radius: 1rem;">
            <div class="d-flex">
                <div class="p-3 flex-grow-1 text-gray-500 m-auto">Upload your contents</div>
                <a class="p-3"><i class="fas fa-plus-square fa-2x" style="color: rgb(78 115 223);"></i>
                </a>

            </div>
        </div>

        <div class="card shadow border-light mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">
                    My Contents
                </h6>
            </div>
            <div class="card-body">

                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Price</th>
                            <th scope="col">Type</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Editor</th>
                            <th scope="col">Publisher</th>
                            <th scope="col">Published Date</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-if="$fetchState.pending">
                            <td colspan="9">
                                loading
                            </td>
                        </tr>
                        <tr v-for="content in contents.data.result.data" v-else :key="content.id">
                            <td>
                                1
                            </td>
                            <td>
                                {{ content.name }}
                            </td>
                            <td>
                                <span v-if="content.status_id == 1" class="badge text-bg-dark">
                                    {{ content.status.name }}
                                </span>
                                <span v-else-if="content.status_id == 2" class="badge text-bg-info">
                                    {{ content.status.name }}
                                </span>
                                <span v-else-if="content.status_id == 3" class="badge text-bg-primary">
                                    {{ content.status.name }}
                                </span>
                                <span v-else-if="content.status_id == 4" class="badge text-bg-danger">
                                    {{ content.status.name }}
                                </span>
                                <span v-else-if="content.status_id == 5" class="badge text-bg-warning">
                                    {{ content.status.name }}
                                </span>
                                <span v-else class="badge text-bg-success">
                                    {{ content.status.name }}
                                </span>
                            </td>
                            <td>
                                ${{ content.price }}.00
                            </td>
                            <td>
                                {{ content.type ? content.type.name : 'none' }}
                            </td>
                            <td>
                                {{ content.genre ? content.genre.name : 'none' }}
                            </td>
                            <td>
                                {{ content.editor ? content.editor.name : 'none' }}
                            </td>
                            <td>
                                {{ content.publisher ? content.publisher.name : 'none' }}
                            </td>
                            <td>
                                {{ content.published_date ? content.published_date : 'none' }}
                            </td>
                            <td>
                                <div class="dropdown">
                                    <a class="" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-square-caret-down fa-xl" style="color: #213454;"></i>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <!-- Button trigger modal -->
                                            <button type="button" class="dropdown-item" data-bs-toggle="modal"
                                                data-bs-target="#editModal">
                                                Edit
                                            </button>

                                        </li>
                                        <li>
                                            <!-- Button trigger modal -->
                                            <button type="button" class="dropdown-item" data-bs-toggle="modal"
                                                data-bs-target="#deleteModal">
                                                Delete
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>

        <!-- Edit Modal -->
        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="editModalLabel">Edit Content
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Do you want to edit this content?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">
                            Edit</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Modal -->
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="editModalLabel">Delete Content
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Do you want to delete this content?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger">
                            Delete</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    layout: 'dashboard',
    middleware: 'auth',
    data() {
        return {
            contents: [],
        }
    },
    async fetch() {
        this.contents = await this.$axios.get('/content', {
            params: {
                author_id: this.$auth.user.id
            }
        })
    },
    computed: {
        keyItem() {
            return this.$store.state.keyItem
        }
    },
    methods:
}
</script>