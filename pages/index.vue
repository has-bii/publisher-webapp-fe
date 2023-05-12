<template>
    <div class="col">

        <div class="col">
            <div class="card shadow border-light mb-4" style="border-radius: 1rem;">
                <div class="d-flex">
                    <div class="p-3 flex-grow-1 text-gray-500 m-auto">Upload your contents</div>
                    <a class="p-3"><i class="fas fa-plus-square fa-2x" style="color: rgb(78 115 223);"></i>
                    </a>

                </div>
            </div>
        </div>

        <p v-if="$fetchState.pending">Fetching announcements...</p>
        <p v-else-if="$fetchState.error">An error occurred :(</p>


        <div v-else v-for="announcement in  announcements.data.result " :key="announcement.id" class="col">

            <div class="card shadow border-light mb-3" style="border-radius: 1rem;">

                <div class="card-body">
                    <div class="row g-0">
                        <div class="d-flex">
                            <div class="px-3  py-2">
                                <h4 class="card-title fw-bold">{{ announcement.title }}</h4>
                                <div class="d-flex g-2 mb-3">
                                    <h6 class="card-subtitle text-body-secondary">
                                        {{ announcement.content.publisher.name }}
                                    </h6>
                                    <h6 class="card-subtitle text-body-secondary px-1">|</h6>
                                    <h6 class="card-subtitle text-body-secondary">{{
                                        announcement.created_date }}</h6>

                                </div>

                                <p class="card-text text-wrap">
                                    {{ announcement.body }}
                                </p>

                                <!-- <img v-if="announcement.content.cover" :src="announcement.content.cover" alt=""
                                    class="img-fluid img-thumbnail object-fit-cover" style="width: 25rem; height: 25rem;"> -->

                                <img src="assets/img/book_cover2.jpg" alt=""
                                    class="img-fluid img-thumbnail object-fit-cover" style="width: 25rem; height: 25rem;" />


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
            announcements: [],
        }
    },
    async fetch() {
        this.announcements = await this.$axios.get('/announcement')
    },
}
</script>