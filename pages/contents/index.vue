<template>
    <div class="col">
        <div class="card shadow border-light mb-4" style="border-radius: 1rem;">
            <div class="d-flex">
                <div class="p-3 flex-grow-1 text-gray-500 m-auto">Upload your contents</div>
                <NuxtLink :to="{ name: 'contents-add' }" class="p-3"><i class="fas fa-plus-square fa-2x"
                        style="color: rgb(78 115 223);"></i>
                </NuxtLink>

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
                            <td colspan="12">
                                <b-skeleton></b-skeleton>
                            </td>
                        </tr>
                        <tr v-else-if="contents.data.result.total == 0">
                            <td colspan="12" class="text-center">
                                Empty
                            </td>
                        </tr>
                        <tr v-else v-for="(content, index) in contents.data.result.data" :key="content.id">
                            <td>
                                {{ index + 1 }}
                            </td>
                            <td class="text-truncate" style="max-width: 10rem;" :title="content.name">
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
                                            <a :id="content.id" :name="content.name" type="button" class="btn dropdown-item"
                                                :href="getUrl(content.file, 1)" target="_blank">
                                                Open file
                                            </a>

                                        </li>
                                        <li>
                                            <!-- Button trigger modal -->
                                            <button :id="content.id" :name="content.name" type="button"
                                                class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                @click="getCover(content.cover)">
                                                Open cover
                                            </button>

                                        </li>
                                        <li>
                                            <!-- Button trigger modal -->
                                            <button :id="content.id" :name="content.name" type="button"
                                                data-bs-toggle="modal" data-bs-target="#editModal" class="dropdown-item"
                                                @click="pushItem">
                                                Edit
                                            </button>

                                        </li>
                                        <li>
                                            <!-- Button trigger modal -->
                                            <button :id="content.id" :name="content.name" type="button"
                                                class="dropdown-item" data-bs-toggle="modal" data-bs-target="#deleteModal"
                                                @click="pushItem">
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

        <!-- Modal Cover-->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Preview Cover</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img v-if="!cover" alt="Cover file" class="img-modal">
                        <img v-else :src="cover" alt="Cover file" class="img-modal">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
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
                        Do you want to edit {{ $store.state.contents.name }}?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="toEdit">
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
                        Do you want to delete {{ $store.state.contents.name }}?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="delContent">
                            Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="toast-container position-fixed top-0 end-0 p-3">
            <div id="liveToast" class="toast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive"
                aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        The content has been deleted!
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
    layout: 'dashboard',
    middleware: 'auth',
    data() {
        return {
            contents: [],
            cover: ''
        }
    },
    async fetch() {
        this.contents = await this.$axios.get('/content', {
            params: {
                author_id: this.$auth.user.id
            }
        })
    },
    methods: {
        getCover(fileName) {
            this.cover = this.getUrl(fileName, 2)

            console.log(this.cover)
        },
        getUrl(fileName, index) {
            if (index == 1) {
                return process.env.BASE_URL + 'storage/files/' + fileName
            } else {
                return process.env.BASE_URL + 'storage/covers/' + fileName
            }

        },
        pushItem(e) {
            this.$store.commit('contents/pushItem', {
                id: e.target.id,
                name: e.target.name
            })
        },
        toEdit() {
            this.$router.push({ path: `contents/edit/${this.$store.state.contents.id}` })
        },
        async delContent() {
            this.$axios.delete('/content/delete', {
                params: {
                    id: this.$store.state.contents.id
                }
            })

            this.contents = await this.$axios.get('/content', {
                params: {
                    author_id: this.$auth.user.id
                }
            })

            console.log("Deleted")

            this.toast()
        },
        toast() {
            const toastLiveExample = document.getElementById('liveToast')
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
        }
    }

}
</script>

<style>
img.img-modal {
    width: 100%;
    height: auto;
    margin-left: auto !important;
    margin-right: auto !important;
}
</style>