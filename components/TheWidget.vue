<template>
    <div class="col-xl-3 col-lg-4 mb-4">

        <div class="row">
            <div class="col">

                <!-- Total my contents -->
                <div class="card border-left-primary shadow py-2 mb-3">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Total my contents
                                </div>
                                <div v-if="$fetchState.pending" class="h5 mb-0 font-weight-bold text-gray-800">
                                    loading
                                </div>
                                <div v-else class="h5 mb-0 font-weight-bold text-gray-800">
                                    {{ user_content.data.result.total }}
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- My published contents -->
                <div class="card border-left-info shadow py-2 mb-3">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                    My published contents
                                </div>
                                <div class="row no-gutters align-items-center">
                                    <div class="col-auto">
                                        <div v-if="$fetchState.pending" class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                            Loading
                                        </div>
                                        <div v-else class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                            {{ published_content.data.result.total }}
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="progress progress-sm mr-2">
                                            <div v-if="$fetchState.pending" class="progress-bar bg-info" role="progressbar"
                                                style=" width: 0%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                            </div>
                                            <div v-else class="progress-bar bg-info" role="progressbar"
                                                :style="{ width: (100 * published_content.data.result.total / user_content.data.result.total) + '%' }"
                                                aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-book fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contents ready to be published -->
                <div class="card border-left-success shadow py-2 mb-3">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                    Contents ready to be published
                                </div>
                                <div class="row no-gutters align-items-center">
                                    <div class="col-auto">
                                        <div v-if="$fetchState.pending" class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                            Loading
                                        </div>
                                        <div v-else class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                            {{ ready_content.data.result.total }}
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="progress progress-sm mr-2">
                                            <div v-if="$fetchState.pending" class="progress-bar bg-info" role="progressbar"
                                                style=" width: 0%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                            </div>
                                            <div v-else class="progress-bar bg-info" role="progressbar"
                                                :style="{ width: (100 * ready_content.data.result.total / user_content.data.result.total) + '%' }"
                                                aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-book-bookmark fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contents being checked -->
                <div class="card border-left-warning shadow py-2 mb-3">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                    Contents being checked
                                </div>
                                <div class="row no-gutters align-items-center">
                                    <div class="col-auto">
                                        <div v-if="$fetchState.pending" class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                            Loading
                                        </div>
                                        <div v-else class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                            {{ checked_content.data.result.total }}
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="progress progress-sm mr-2">
                                            <div v-if="$fetchState.pending" class="progress-bar bg-info" role="progressbar"
                                                style=" width: 0%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                            </div>
                                            <div v-else class="progress-bar bg-info" role="progressbar"
                                                :style="{ width: (100 * checked_content.data.result.total / user_content.data.result.total) + '%' }"
                                                aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-clipboard-check fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- My rejected contents -->
                <div class="card border-left-danger shadow py-2 mb-3">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                    My rejected contents
                                </div>
                                <div class="row no-gutters align-items-center">
                                    <div class="col-auto">
                                        <div v-if="$fetchState.pending" class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                            Loading
                                        </div>
                                        <div v-else class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                            {{ rejected_content.data.result.total }}
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="progress progress-sm mr-2">
                                            <div v-if="$fetchState.pending" class="progress-bar bg-info" role="progressbar"
                                                style=" width: 0%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                            </div>
                                            <div v-else class="progress-bar bg-info" role="progressbar"
                                                :style="{ width: (100 * rejected_content.data.result.total / user_content.data.result.total) + '%' }"
                                                aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-square-xmark fa-2x text-gray-300"></i>
                            </div>
                        </div>
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
            user_content: [],
            published_content: [],
            checked_content: [],
            ready_content: [],
            rejected_content: [],
        }
    },
    async fetch() {
        this.user_content = await this.$axios.get('/content', {
            params: {
                author_id: this.$auth.user.id
            }
        })

        this.published_content = await this.$axios.get('/content', {
            params: {
                author_id: this.$auth.user.id,
                status_id: 3
            }
        })

        this.ready_content = await this.$axios.get('/content', {
            params: {
                author_id: this.$auth.user.id,
                status_id: 6
            }
        })

        this.checked_content = await this.$axios.get('/content', {
            params: {
                author_id: this.$auth.user.id,
                status_id: 2
            }
        })

        this.rejected_content = await this.$axios.get('/content', {
            params: {
                author_id: this.$auth.user.id,
                status_id: 4
            }
        })
    },
}
</script>