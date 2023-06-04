<template>
    <div class="row">
        <div class="col">

            <!-- Card -->
            <div class="card shadow border-light mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">
                        Manage Contents of
                        {{ selected_publisher.name ? selected_publisher.name : 'No Publisher Selected' }}
                    </h6>
                </div>

                <div class="card-body">

                    <!-- Filter and select -->
                    <div class="row mb-4">
                        <div class="col-2">
                            <select v-if="$fetchState.pending" class="form-select">
                                <option selected value="">Loading</option>
                            </select>
                            <select v-else-if="$fetchState.error" class="form-select">
                                <option selected value="">Error!</option>
                            </select>
                            <select v-else class="form-select" @change="selectPublisher" v-model="selected_publisher.id">
                                <option selected disabled value="null">Select publisher..</option>
                                <option v-for="mypublisher in publishers" :value="mypublisher.id">{{ mypublisher.name }}
                                </option>
                            </select>
                        </div>

                        <div class="col">
                            <button type="button" class="btn btn-primary" @click="selectPublisher">Select</button>
                        </div>

                        <div class="col-9">
                            <div class="row">
                                <div class="col">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Name of content"
                                            @input="fetch_contents()" v-model="search.name">
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Name of author"
                                            @input="fetch_contents()" v-model="search.author_name">
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Name of editor"
                                            @input="fetch_contents()" v-model="search.editor_name">
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

                                <div class="col-2">
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

                                <div class="col-2">
                                    <select v-if="$fetchState.pending" class="form-select">
                                        <option selected value="">Loading</option>
                                    </select>
                                    <select v-else-if="$fetchState.error" class="form-select">
                                        <option selected value="">Error!</option>
                                    </select>
                                    <select v-else class="form-select" @change="fetch_contents()"
                                        v-model="search.status_id">
                                        <option selected disabled value="">Select status..</option>
                                        <option v-for="status in statuses" :value="status.id">{{ status.name }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="table-responsive"> -->
                    <table class="table">
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
                                <th scope="col">Editor</th>
                                <th scope="col">Status</th>
                                <th scope="col">Published</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="$fetchState.pending">
                            <tr>
                                <td colspan="13"> <b-skeleton></b-skeleton> </td>
                            </tr>
                        </tbody>
                        <tbody v-else-if="$fetchState.error">
                            <tr class="text-center">
                                <td colspan="13"> Error! </td>
                            </tr>
                        </tbody>
                        <tbody v-else-if="!contents" class="table-group-divider">
                            <tr class="text-center">
                                <td colspan="13" class="text-center"> No publisher is selected. </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr v-for="(content, index) in contents">
                                <th scope="row">
                                    {{ index + 1 }}
                                </th>
                                <td class="text-truncate col-w5">
                                    {{ content.name }}
                                </td>
                                <td class="text-truncate col-w5">
                                    <a :href="getImage(content.cover)" target="_blank">{{ content.cover }}</a>
                                </td>
                                <td class="text-truncate col-w1">
                                    {{ content.price ? '$ ' + content.price + '.00' : 'unpriced' }}
                                </td>
                                <td class="text-truncate col-w5">
                                    <a :href="getFile(content.file)" target="_blank">{{ content.file ? content.file : 'none'
                                    }}</a>
                                </td>
                                <td class="text-truncate col-w4">
                                    {{ content.type.name }}
                                </td>
                                <td class="text-truncate col-w5">
                                    {{ content.genre.name }}
                                </td>
                                <td class="text-truncate col-w5">
                                    {{ content.author.name }}
                                </td>
                                <td class="text-truncate col-w5">
                                    {{ content.editor ? content.editor.name : 'none' }}
                                </td>
                                <td class="text-truncate col-w1">
                                    <span class="badge rounded-pill" :class="statusBadge(content.status_id)">{{
                                        content.status.name }}</span>
                                </td>
                                <td class="text-truncate col-w1">
                                    {{ content.published_date ? content.published_date.slice(0, 10) : 'unpublished' }}
                                </td>
                                <td class="col-auto">
                                    <div class="btn-group">
                                        <button :id="content.id" :name="content.name"
                                            class="btn btn-primary btn-sm dropdown-toggle" type="button"
                                            data-bs-toggle="dropdown" aria-expanded="false" @click="selectItem(content)">
                                            Change Status
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li>
                                                <a class="dropdown-item" href="#" @click="changeStatus(1)">Pending</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="#" @click="changeStatus(2)">Checking</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="#" @click="changeStatus(3)">Published</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="#" @click="changeStatus(4)">Rejected</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="#" @click="changeStatus(5)">Revision</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="#" @click="changeStatus(6)">Ready</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <b-button size="sm" :id="popOverId(index)" variant="success"
                                        @mouseenter="selectItem(content)">
                                        Change Price
                                    </b-button>

                                    <b-popover :target="popOverId(index)" title="Change price" triggers="hover"
                                        placement="bottomleft">
                                        <div class="input-group input-group-sm mb-3">
                                            <span class="input-group-text" id="inputGroup-sizing-sm">$</span>
                                            <input type="number" class="form-control" @keydown.enter="changePrice"
                                                v-model="selected_item.price">
                                        </div>
                                    </b-popover>

                                    <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal"
                                        data-bs-target="#giveModal" @mouseenter="selectItem(content)">
                                        Change editor
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- </div> -->

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


        </div>

        <!-- Modal -->
        <div class="modal fade" id="giveModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Give task</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Give <b>{{ selected_item.name }}</b> to editor:
                        <select v-if="$fetchState.pending" class="form-select">
                            <option selected value="">Loading</option>
                        </select>
                        <select v-else-if="$fetchState.error" class="form-select">
                            <option selected value="">Error!</option>
                        </select>
                        <select v-else class="form-select" v-model="selected_item.editor_id">
                            <option selected disabled value="null">Select editor..</option>
                            <option v-for="editor in editors" :value="editor.id">{{ editor.name }}
                            </option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            @click="clearSelected">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="giveEditor">Save
                            changes</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'ManageContents',
    layout: 'dashboard',
    middleware: 'auth',
    data() {
        return {
            selected_publisher: {
                id: null,
                name: null
            },
            selected_item: {
                id: null,
                name: '',
                price: '',
                editor_id: null
            },
            search: {
                name: '',
                price_below: '',
                price_above: '',
                type_id: '',
                genre_id: '',
                status_id: '',
                author_name: '',
                editor_name: '',
                published_date: '',
                limit: 10,
            },
            types: [],
            genres: [],
            statuses: [],
            links: [],
            next_page_url: null,
            prev_page_url: null,
            publishers: null,
            editors: null,
            contents: null,
        }
    },
    async fetch() {
        await this.fetch_publishers()

        await this.fetch_types()

        await this.fetch_statuses()
    },
    methods: {
        async fetch_publisher() {
            await this.$axios.get('publisher', {
                params: {
                    id: this.selected_publisher.id
                }
            })
                .then(({ data }) => {
                    this.selected_publisher.name = data.result.name
                })
        },
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
        async fetch_editors() {
            await this.$axios.get('publisher', {
                params: {
                    id: this.selected_publisher.id
                }
            })
                .then(({ data }) => {
                    this.editors = data.result.users
                })
        },
        async fetch_contents(url = 'content') {
            if (!this.selected_publisher.id) {
                console.log('Select a publisher first!')

                return
            }

            await this.$axios.get(url, {
                params: {
                    name: this.search.name,
                    price_below: this.search.price_below,
                    price_above: this.search.price_above,
                    type_id: this.search.type_id,
                    genre_id: this.search.genre_id,
                    publisher_id: this.selected_publisher.id,
                    author_name: this.search.author_name,
                    editor_name: this.search.editor_name,
                    status_id: this.search.status_id,
                    published_date: this.search.published_date,
                    limit: this.search.limit,
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
        getContentsGenres() {
            this.fetch_genres()
            this.fetch_contents()
        },
        selectPublisher() {
            this.fetch_contents()
            this.fetch_editors()
            this.fetch_publisher()
        },
        selectItem(content) {
            this.selected_item.id = content.id
            this.selected_item.name = content.name
            this.selected_item.price = content.price
        },
        clearSelected() {
            this.selected_item.id = null
            this.selected_item.name = ''
            this.selected_item.editor_id = null
            this.selected_item.price = ''
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
        async changeStatus(status_id) {

            let time = null

            if (status_id == 3) {
                time = this.dateNow()
            }

            await this.$axios.post(`/content/update/${this.selected_item.id}`,
                {
                    status_id: status_id,
                    published_date: time
                })
                .then(({ }) => {
                    this.fetch_contents()
                })
                .catch(error => {
                    console.error(error);
                });
        },
        async changePrice() {

            await this.$axios.post(`/content/update/${this.selected_item.id}`,
                {
                    price: this.selected_item.price
                })
                .then(({ }) => {
                    this.fetch_contents()
                })
                .catch(error => {
                    console.error(error);
                });
        },
        async giveEditor() {
            await this.$axios.post(`/content/update/${this.selected_item.id}`, { editor_id: this.selected_item.editor_id })
                .then(({ }) => {
                    this.fetch_contents()
                })
                .catch(error => {
                    console.error(error);
                });
        },
        dateNow() {

            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

            return formattedDate

        },
        getImage(file) {
            const path = process.env.BASE_URL + 'storage/covers/' + file

            return path
        },
        getFile(file) {
            const path = process.env.BASE_URL + 'storage/files/' + file

            return path
        },
        popOverId(index) {
            return 'popover-button-open-' + index
        }
    }
}
</script>

<style>
.col-w1 {
    max-width: 0.5rem !important;
}

.col-w2 {
    max-width: 2rem !important;
}

.col-w3 {
    max-width: 3rem !important;
}

.col-w4 {
    max-width: 5rem !important;
}

.col-w5 {
    max-width: 7rem !important;
}

.col-w10 {
    max-width: 8rem !important;
}
</style>