<template>
    <div class="col">

        <div class="card shadow border-light mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">
                    Untaken Contents
                </h6>
            </div>
            <div class="card-body">

                <div class="row mb-4">

                    <div class="col">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Name of content" @input="fetch_contents()"
                                v-model="search.name">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Name of author" @input="fetch_contents()"
                                v-model="search.author_name">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Name of editor" @input="fetch_contents()"
                                v-model="search.editor_name">
                        </div>
                    </div>
                    <div class="col">
                        <select v-if="$fetchState.pending" class="form-select">
                            <option selected value="">Loading</option>
                        </select>
                        <select v-else-if="$fetchState.error" class="form-select">
                            <option selected value="">Error!</option>
                        </select>
                        <select v-else class="form-select" @change="getContentsGenres" v-model="search.type_id">
                            <option selected value="">Select type..</option>
                            <option v-for="type in types" :value="type.id">{{ type.name }}</option>
                        </select>
                    </div>

                    <div class="col">
                        <select v-if="$fetchState.pending" class="form-select">
                            <option selected value="">Loading</option>
                        </select>
                        <select v-else-if="$fetchState.error" class="form-select">
                            <option selected value="">Error!</option>
                        </select>
                        <select v-else class="form-select" @change="fetch_contents()" v-model="search.genre_id">
                            <option selected value="">Select genre..</option>
                            <option v-for="genre in genres" :value="genre.id">{{ genre.name }}</option>
                        </select>
                    </div>

                    <div class="col">
                        <select v-if="$fetchState.pending" class="form-select">
                            <option selected value="">Loading</option>
                        </select>
                        <select v-else-if="$fetchState.error" class="form-select">
                            <option selected value="">Error!</option>
                        </select>
                        <select v-else class="form-select" @change="fetch_contents()" v-model="search.status_id">
                            <option selected value="">Select status..</option>
                            <option v-for="status in statuses" :value="status.id">{{ status.name }}</option>
                        </select>
                    </div>

                    <div class="col">
                        <select class="form-select" @change="fetch_contents()" v-model="search.limit">
                            <option selected value="10">Number of Rows..</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>

                <table class="table mb-4">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Cover</th>
                            <th scope="col">Price</th>
                            <th scope="col">File</th>
                            <th scope="col">Type</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Author</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="$fetchState.pending">
                        <tr>
                            <td colspan="12"> <b-skeleton></b-skeleton> </td>
                        </tr>
                    </tbody>
                    <tbody v-else-if="$fetchState.error">
                        <tr class="text-center">
                            <td colspan="12"> Error! </td>
                        </tr>
                    </tbody>
                    <tbody v-else-if="contents.length == 0" class="table-group-divider">
                        <tr class="text-center">
                            <td colspan="12" class="text-center"> Empty. </td>
                        </tr>
                    </tbody>
                    <tbody v-else class="table-group-divider">
                        <tr v-for="(content, index) in contents">
                            <th>
                                {{ index + 1 }}
                            </th>
                            <td>
                                {{ content.name }}
                            </td>
                            <td>
                                <a :href="getImage(content.cover)" target="_blank">{{ content.cover }}</a>
                            </td>
                            <td>
                                {{ content.price ? '$ ' + content.price + '.00' : 'unpriced' }}
                            </td>
                            <td>
                                <a :href="getFile(content.file)" target="_blank">
                                    {{ content.file ? content.file : 'none' }}
                                </a>
                            </td>
                            <td class="text-truncate col-w1">
                                {{ content.type.name }}
                            </td>
                            <td class="text-truncate col-w5">
                                {{ content.genre.name }}
                            </td>
                            <td class="text-truncate col-w5">
                                {{ content.author.name }}
                            </td>
                            <td class="text-truncate col-w1">
                                <span class="badge rounded-pill" :class="statusBadge(content.status_id)">{{
                                    content.status.name }}</span>
                            </td>
                            <td>
                                <button :id="content.id" :name="content.name" type="button" class="btn btn-success btn-sm"
                                    data-bs-toggle="modal" data-bs-target="#takeOverModal" @click="selectItem">Take
                                    over</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- Pagination -->
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ 'disabled': !prev_page_url }"><a class="page-link" href="#"
                                @click.prevent="fetch_contents(prev_page_url)">Previous</a></li>
                        <li v-for="link in links" class="page-item"
                            :class="{ 'active': link.active, 'disabled': !link.url }"><a class="page-link" href="#"
                                @click.prevent="fetch_contents(link.url)">{{ link.label }}</a></li>
                        <li class="page-item" :class="{ 'disabled': !next_page_url }"><a class="page-link" href="#"
                                @click.prevent="fetch_contents(next_page_url)">Next</a></li>
                    </ul>
                </nav>
            </div>
        </div>


        <!-- Modal -->
        <div class="modal fade" id="takeOverModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Take Over Content</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Please select publisher to take over <b>{{ selected_item.name }}</b>
                        <select v-if="$fetchState.pending" class="form-select">
                            <option selected value="">Loading</option>
                        </select>
                        <select v-else-if="$fetchState.error" class="form-select">
                            <option selected value="">Error!</option>
                        </select>
                        <select v-else class="form-select mt-2" v-model="selected_item.publisher_id">
                            <option selected disabled value="">Select publisher..</option>
                            <option v-for="mypublisher in publishers" :value="mypublisher.id">{{ mypublisher.name }}
                            </option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="clearSelected">
                            Close
                        </button>
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="takeOver">
                            Take Over
                        </button>
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
            types: [],
            genres: [],
            statuses: [],
            publishers: [],
            search: {
                name: '',
                type_id: '',
                genre_id: '',
                status_id: '',
                author_name: '',
                limit: 10,
            },
            selected_item: {
                id: '',
                name: '',
                publisher_id: '',
            },
            links: [],
            next_page_url: null,
            prev_page_url: null,
        }
    },
    async fetch() {
        this.fetch_contents()
        this.fetch_types()
        this.fetch_statuses()
        this.fetch_publishers()
    },
    methods: {
        async fetch_publishers() {
            await this.$axios.get('get-users', {
                params: {
                    id: this.$auth.user.id
                }
            })
                .then(({ data }) => {
                    this.publishers = data.result.publishers
                })
                .catch(error => {
                    console.error(error);
                });
        },
        async fetch_contents(url = '/content') {
            await this.$axios.get(url, {
                params: {
                    name: this.search.name,
                    type_id: this.search.type_id,
                    genre_id: this.search.genre_id,
                    author_name: this.search.author_name,
                    status_id: this.search.status_id,
                    publisher_id: 'untaken',
                    limit: this.search.limit
                }
            })
                .then(({ data }) => {
                    this.contents = data.result.data

                    this.links = data.result.links
                    this.links.pop()
                    this.links.shift()

                    this.next_page_url = data.result.next_page_url
                    this.prev_page_url = data.result.prev_page_url
                })
                .catch(error => {
                    console.error(error);
                });
        },
        async fetch_types() {
            await this.$axios.get('type')
                .then(({ data }) => {
                    this.types = data.result.data
                })
                .catch(error => {
                    console.error(error);
                });
        },
        async fetch_genres() {
            this.search.genre_id = ''

            await this.$axios.get('genre', {
                params: {
                    type_id: this.search.type_id
                }
            })
                .then(({ data }) => {
                    this.genres = data.result.data
                })
                .catch(error => {
                    console.error(error);
                });
        },
        async fetch_statuses() {
            await this.$axios.get('status')
                .then(({ data }) => {
                    this.statuses = data.result.data
                })
                .catch(error => {
                    console.error(error);
                });
        },
        async takeOver() {

            if (this.selected_item.publisher_id == '') {
                console.log('Choose one publisher!')

                this.clearSelected()
                return
            }

            await this.$axios.post(`/content/update/${this.selected_item.id}`,
                {
                    status_id: 2,
                    publisher_id: this.selected_item.publisher_id
                })
                .then(({ }) => {
                    this.fetch_contents()
                })
                .catch(error => {
                    console.error(error);
                });

            this.clearSelected()
        },
        getContentsGenres() {
            this.fetch_genres()

            if (this.search.type_id == '') {
                this.search.genre_id = ''

                this.genres = []
            }

            this.fetch_contents()
        },
        getImage(file) {
            const path = process.env.BASE_URL + 'storage/covers/' + file

            return path
        },
        getFile(file) {
            const path = process.env.BASE_URL + 'storage/files/' + file

            return path
        },
        statusBadge(status_id) {
            const statusId = status_id
            let className = ''

            if (statusId == 1) {
                className = 'text-bg-dark'
            } else if (statusId == 2) {
                className = 'text-bg-info'
            } else if (statusId == 3) {
                className = 'text-bg-primary'
            } else if (statusId == 4) {
                className = 'text-bg-danger'
            } else if (statusId == 5) {
                className = 'text-bg-warning'
            } else if (statusId == 6) {
                className = 'text-bg-success'
            }

            return className
        },
        selectItem(event) {
            this.selected_item.id = event.target.id
            this.selected_item.name = event.target.name
        },
        clearSelected() {
            this.selected_item.id = ''
            this.selected_item.name = ''
            this.selected_item.publisher_id = ''
        }
    }

}
</script>