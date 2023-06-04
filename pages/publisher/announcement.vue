<template>
    <div class="row">
        <div class="col">

            <div class="card shadow border-light mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">
                        Announcements {{ selected_publisher.name ? ' | ' + selected_publisher.name : '' }}
                    </h6>
                </div>

                <div class="card-body">

                    <div class="row">
                        <div class="col">
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
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Title of announcement"
                                    @input="fetch_announcements()" v-model="search.title">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Name of content"
                                    @input="fetch_announcements()" v-model="search.content_name">
                            </div>
                        </div>
                        <div class="col">
                            <select class="form-select" @change="fetch_announcements()" v-model="search.limit">
                                <option selected value="5">Number of Rows..</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                        <div class="col-auto">
                            <div class="input-group">
                                <button type="button" class="btn btn-success" @click="clearSelectedAnnouncement">
                                    Add New</button>
                            </div>
                        </div>
                    </div>

                    <!-- Table -->
                    <table class="table my-3">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Body</th>
                                <th scope="col">Content Name</th>
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
                        <tbody v-else-if="announcements.length == 0" class="table-group-divider">
                            <tr class="text-center">
                                <td colspan="13" class="text-center"> No publisher is selected. </td>
                            </tr>
                        </tbody>
                        <tbody v-else class="table-group-divider">
                            <tr v-for="(announcement, index) in announcements">
                                <th scope="row">
                                    {{ index + 1 }}
                                </th>
                                <td class="text-truncate col-w10">
                                    {{ announcement.title }}
                                </td>
                                <td class="text-truncate col-w10">
                                    {{ announcement.body }}
                                </td>
                                <td>
                                    {{ announcement.content.name }}
                                </td>
                                <td>
                                    <button type="button" class="btn btn-primary btn-sm"
                                        @click="selectItem(announcement)">Edit</button>
                                    <button :id="announcement.id" type="button" class="btn btn-danger btn-sm"
                                        data-bs-toggle="modal" data-bs-target="#deleteModal"
                                        @click="selectItem(announcement)">Remove</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Pagination -->
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                            <li class="page-item" :class="{ 'disabled': !prev_page_url }"><a class="page-link" href="#"
                                    @click.prevent="fetch_announcements(prev_page_url)">Previous</a></li>
                            <li v-for="link in links" class="page-item"
                                :class="{ 'active': link.active, 'disabled': !link.url }"><a class="page-link" href="#"
                                    @click.prevent="fetch_announcements(link.url)">{{ link.label }}</a></li>
                            <li class="page-item" :class="{ 'disabled': !next_page_url }"><a class="page-link" href="#"
                                    @click.prevent="fetch_announcements(next_page_url)">Next</a></li>
                        </ul>
                    </nav>

                </div>
            </div>

        </div>

        <div class="col-5" v-if="selected_announcement.id">
            <div class="card shadow border-light mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">
                        Edit Announcement for {{ selected_announcement.content_name }}
                    </h6>
                </div>

                <div class="card-body">

                    <form @submit.prevent="updateAnnouncement">
                        <div class="mb-3">
                            <label for="titleInput" class="form-label">
                                Announcement Title of {{ selected_announcement.content_name }}
                            </label>
                            <input type="text" class="form-control" id="titleInput" placeholder="Title of announcement"
                                v-model="selected_announcement.title" required>
                        </div>
                        <div class="mb-3">
                            <label for="bodyInput" class="form-label">Body</label>
                            <textarea class="form-control" id="bodyInput" rows="3" placeholder="Body of announcement"
                                v-model="selected_announcement.body" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-5" v-if="!selected_announcement.id">
            <div class="card shadow border-light mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">
                        Add New Announcement
                    </h6>
                </div>

                <div class="card-body">

                    <form @submit.prevent="createAnnouncement">
                        <div class="mb-3">
                            <label for="selectContent" class="form-label">
                                Published Content
                            </label>
                            <select v-if="$fetchState.pending" class="form-select" id="selectContent">
                                <option selected value="">Select content..</option>
                            </select>
                            <select v-else-if="$fetchState.error" class="form-select" id="selectContent">
                                <option selected value="">Select content..</option>
                            </select>
                            <select v-else-if="contents.length == 0" class="form-select" id="selectContent">
                                <option selected>There is no ready content..</option>
                            </select>
                            <select v-else class="form-select" id="selectContent" v-model="selected_announcement.content_id"
                                required>
                                <option selected disabled value="">Select a published content..</option>
                                <option v-for="content in contents" :value="content.id">{{ content.name }}</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="titleInput" class="form-label">
                                Announcement Title
                            </label>
                            <input type="text" class="form-control" id="titleInput" placeholder="Title of announcement"
                                v-model="selected_announcement.title" required>
                        </div>
                        <div class="mb-3">
                            <label for="bodyInput" class="form-label">Body</label>
                            <textarea class="form-control" id="bodyInput" rows="3" placeholder="Body of announcement"
                                v-model="selected_announcement.body" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-success">Announce</button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Delete Modal -->
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="deleteModalLabel">Delete Announcement</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete {{ selected_announcement.title }}?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal"
                            @click="clearSelectedAnnouncement">Close</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                            @click="deleteAnnouncement">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'announcement',
    layout: 'dashboard',
    middleware: 'auth',
    data() {
        return {
            contents: [],
            announcements: [],
            publishers: [],
            selected_publisher: {
                id: null,
                name: ''
            },
            selected_announcement: {
                id: null,
                title: '',
                body: '',
                content_id: '',
                content_name: '',
                publisher_id: null,
            },
            search: {
                title: '',
                content_name: '',
                limit: 5,
            },
            links: [],
            prev_page_url: '',
            next_page_url: '',

        }
    },
    async fetch() {
        this.fetch_publishers()
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
        async fetch_announcements(url = 'announcement/fetch-announcement') {

            if (!this.selected_publisher.id) {
                console.log('Select one publisher first!')

                return
            }

            await this.$axios.get(url, {
                params: {
                    publisher_id: this.selected_publisher.id,
                    title: this.search.title,
                    content_name: this.search.content_name,
                    limit: this.search.limit
                }
            })
                .then(({ data }) => {
                    this.announcements = data.result.data

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
        async fetch_contents() {
            await this.$axios.get('content', {
                params: {
                    publisher_id: this.selected_publisher.id,
                    status_id: 3
                }
            })
                .then(({ data }) => {
                    this.contents = data.result.data
                })
                .catch(error => {
                    console.error(error);
                });
        },
        async createAnnouncement() {
            await this.$axios.post('announcement', {
                title: this.selected_announcement.title,
                body: this.selected_announcement.body,
                content_id: this.selected_announcement.content_id,
                publisher_id: this.selected_publisher.id
            })
                .then(({ }) => {
                    this.clearSelectedAnnouncement()
                    this.fetch_announcements()
                })
                .catch(error => {
                    console.error(error);
                });
        },
        async updateAnnouncement() {
            await this.$axios.post(`announcement/update/${this.selected_announcement.id}`, {
                title: this.selected_announcement.title,
                body: this.selected_announcement.body,
            })
                .then(({ }) => {
                    this.clearSelectedAnnouncement()
                    this.fetch_announcements()
                    console.log('Update Success....!!!')
                })
                .catch(error => {
                    console.error(error);
                });
        },
        async deleteAnnouncement() {
            await this.$axios.delete(`announcement/delete/${this.selected_announcement.id}`)
                .then(({ }) => {
                    this.fetch_announcements()
                    this.clearSelectedAnnouncement()
                })
                .catch(error => {
                    console.error(error);
                });
        },
        selectPublisher() {
            this.fetch_announcements()
            this.fetch_publisher()
            this.fetch_contents()
        },
        selectItem(announcement) {
            this.selected_announcement.id = announcement.id
            this.selected_announcement.title = announcement.title
            this.selected_announcement.body = announcement.body
            this.selected_announcement.content_name = announcement.content.name
        },
        clearSelectedAnnouncement() {
            this.selected_announcement.id = null
            this.selected_announcement.title = ''
            this.selected_announcement.body = ''
            this.selected_announcement.content_name = ''
            this.selected_announcement.content_id = null
            this.selected_announcement.publisher_id = null
        }
    }
}
</script>