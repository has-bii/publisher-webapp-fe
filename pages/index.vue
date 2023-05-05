<template>
    <div>
        <!-- Content Row -->

        <div class="row">

            <!-- <p v-if="$fetchState.pending">Fetching mountains...</p>
            <p v-else-if="$fetchState.error">An error occurred :(</p>

            <div v-else> -->

            <!-- Timeline -->
            <div class="col-xl-8 col-lg-7">

                <div class="card border-light mb-4" style="border-radius: 1rem;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img class="img-fluid" src="assets/img/book_cover.jpg" alt="..."
                                style="border-radius: 1rem 0 0 1rem;">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title"></h5>
                                <p class="card-text"></p>
                                <p class="card-text"></p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- widget -->
        <div class="col-xl-4 col-lg-5">
        </div>

    </div>
</template>

<script>
export default {
    layout: 'dashboard',
    middleware: 'auth',
    data() {
        return {
            announcements: [],
        }
    },
    async fetch() {
        this.announcements = await this.$axios.get('/announcement')
    },
}
</script>