<template>
    <div class="row">

        <div class="col">

            <div v-if="$fetchState.pending" class="row">
                <div class="col-12">

                    <div class="card shadow border-light mb-3">
                        <div class="card-body">
                            <div class="row">

                                <div class="col">
                                    <div class="fs-4 fw-bold mb-1">
                                        <b-skeleton></b-skeleton>
                                    </div>
                                    <div class="fs-6 text-body-tertiary mb-4">
                                        <b-skeleton></b-skeleton>
                                    </div>
                                    <div class="fs-5 mb-3">
                                        <b-skeleton></b-skeleton>
                                        <b-skeleton></b-skeleton>
                                        <b-skeleton></b-skeleton>
                                        <b-skeleton></b-skeleton>
                                        <b-skeleton></b-skeleton>
                                        <b-skeleton></b-skeleton>
                                        <b-skeleton></b-skeleton>
                                        <b-skeleton></b-skeleton>
                                        <b-skeleton></b-skeleton>
                                        <b-skeleton></b-skeleton>
                                        <b-skeleton></b-skeleton>
                                    </div>
                                    <div class="fs-5 text-body-tertiary">
                                        <b-skeleton></b-skeleton>
                                    </div>
                                </div>
                                <div class="col-3 align-self-center col-img rounded">
                                    <b-skeleton-img no-aspect height="20rem"></b-skeleton-img>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div v-else-if="$fetchState.error" class="row">
                <div class="col-12">

                    <div class="card shadow border-light mb-3">
                        <div class="card-body">
                            <div class="row">

                                <div class="col">
                                    <div class="fs-4 fw-bold mb-1">
                                        Error!
                                    </div>
                                    <div class="fs-6 text-body-tertiary mb-4">
                                        Error
                                    </div>
                                    <div class="fs-5 mb-3">
                                        <b-skeleton></b-skeleton>
                                        <b-skeleton></b-skeleton>
                                        <b-skeleton></b-skeleton>
                                        <b-skeleton></b-skeleton>
                                        <b-skeleton></b-skeleton>
                                        <b-skeleton></b-skeleton>
                                        <b-skeleton></b-skeleton>
                                        <b-skeleton></b-skeleton>
                                        <b-skeleton></b-skeleton>
                                        <b-skeleton></b-skeleton>
                                        <b-skeleton></b-skeleton>
                                    </div>
                                    <div class="fs-5 text-body-tertiary">
                                        Error
                                    </div>
                                </div>
                                <div class="col-3 align-self-center col-img rounded">
                                    <b-skeleton-img no-aspect height="20rem"></b-skeleton-img>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div v-else class="row">
                <div v-for="announcement in announcements" class="col-12">

                    <div class="card shadow border-light mb-3">
                        <div class="card-body">
                            <div class="row">

                                <div class="col">
                                    <div class="fs-4 fw-bold mb-1">
                                        {{ announcement.title }}
                                    </div>
                                    <div class="fs-6 text-body-tertiary mb-4">
                                        {{ announcement.content.publisher.name }} | {{
                                            getDate(announcement.created_at) }}
                                    </div>
                                    <div class="fs-5 mb-3 overflow-y-auto body-h">
                                        {{ announcement.body }}
                                    </div>
                                    <div class="fs-5 text-body-tertiary">
                                        {{ announcement.content.name }} | {{ announcement.content.author.name }}
                                    </div>
                                </div>
                                <div class="col-auto align-self-center col-img rounded">
                                    <img :src="getImage(announcement.content.cover)" class="rounded img-announcement">
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="load-more d-flex justify-content-center align-items-center" v-if="loading">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>

        <!-- Widget -->
        <TheWidget />

    </div>
</template>

<script>

export default {
    layout: 'dashboard',
    middleware: 'auth',
    data() {
        return {
            announcements: [],
            search: {
                limit: 3
            },
            links: [],
            prev_page_url: '',
            next_page_url: '',
            loading: false,
        }
    },
    async fetch() {
        this.fetch_announcements()
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        async fetch_announcements(url = '/announcement') {
            await this.$axios.get(url, {
                params: {
                    limit: this.search.limit
                }
            })
                .then(({ data }) => {
                    this.announcements = data.result.data

                    this.prev_page_url = data.result.prev_page_url
                    this.next_page_url = data.result.next_page_url
                }).catch((err) => {
                    console.log(err)
                });
        },
        getImage(file) {
            return process.env.BASE_URL + 'storage/covers/' + file
        },
        getDate(date) {
            const annDate = new Date(date)
            const currentTime = new Date()

            const month = [' Jan ', ' Feb ', ' Mar ', ' Apr ', ' May ', ' Jun ', ' Jul ', ' Aug ', ' Sept ', ' Oct ', ' Nov ', ' Dec ']



            const timeDifference = Math.abs(currentTime - annDate)

            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

            // by month
            if (Math.floor(daysDifference / 30) > 0) {
                return annDate.getDay() + month[annDate.getMonth()] + annDate.getFullYear();
            }

            if (Math.floor(daysDifference / 7) > 0) {
                return Math.floor(daysDifference / 7) + (Math.floor(daysDifference / 7) == 1 ? ' week ago' : 'weeks ago')
            }

            if (daysDifference > 0) {
                return daysDifference + (daysDifference == 1 ? ' day ago' : ' days ago')
            }

            const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60))

            if (hoursDifference > 0) {
                return hoursDifference + (hoursDifference == 1 ? ' hour ago' : ' hours ago')
            }

            const minutesDifference = Math.floor((timeDifference / (1000 * 60)) % 60);

            if (minutesDifference > 0) {
                return minutesDifference + (minutesDifference == 1 ? ' minute ago' : ' minutes ago')
            }

            const secondsDifference = Math.floor(timeDifference / 1000)

            return secondsDifference + ' seconds ago'

            // return monthsDifference + ' months | ' + daysDifference + ' days | ' + hoursDifference + ' hours | ' + minutesDifference + ' minutes | ' + secondsDifference + ' minutes'
        },
        handleScroll() {
            // Get the scroll position of the window
            var scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

            // Get the height of the entire document
            var documentHeight = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );

            // Check if the scroll position is at the bottom of the page
            if (scrollPosition + window.innerHeight >= documentHeight) {
                // Scrolling has reached the bottom

                if (!this.next_page_url) {
                    return
                }

                this.loading = true;

                setTimeout(() => {
                    this.load_announcements(this.next_page_url)
                }, 1000)

                console.log('Bottom of the page reached!');
                // Your code to handle reaching the bottom of the page goes here
            }
        },
        async load_announcements(url = '/announcement') {
            await this.$axios.get(url, {
                params: {
                    limit: this.search.limit
                }
            })
                .then(({ data }) => {
                    this.announcements.push(...data.result.data)

                    this.prev_page_url = data.result.prev_page_url
                    this.next_page_url = data.result.next_page_url

                    this.loading = false
                }).catch((err) => {
                    console.log(err)
                });
        },
    }
}
</script>

<style>
.img-announcement {
    height: 20rem;
    width: auto;
}

.body-h {
    height: 11rem;
}

.load-more {
    height: 10rem;
}

/* Hide the scrollbar by default */
.body-h::-webkit-scrollbar {
    width: 10px;
    visibility: none;
}

/* Show the scrollbar when hovered */
::-webkit-scrollbar:hover {
    visibility: visible;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 5px;
}

::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>