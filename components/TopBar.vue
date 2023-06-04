<template>
    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 sticky-top shadow">

        <!-- Sidebar Toggle (Topbar) -->
        <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
            <i class="fa fa-bars"></i>
        </button>

        <!-- Topbar Navbar -->
        <ul class="navbar-nav ml-auto">

            <!-- Nav Item - Search Dropdown (Visible Only XS) -->
            <li class="nav-item dropdown no-arrow d-sm-none">
                <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-search fa-fw"></i>
                </a>
                <!-- Dropdown - Messages -->
                <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                    aria-labelledby="searchDropdown">
                    <form class="form-inline mr-auto w-100 navbar-search">
                        <div class="input-group">
                            <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..."
                                aria-label="Search" aria-describedby="basic-addon2">
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button">
                                    <i class="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </li>

            <!-- Nav Item - Messages -->
            <li class="nav-item dropdown no-arrow mx-1">
                <a class="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false" @click="fetch_chats">
                    <i class="fas fa-envelope fa-fw"></i>
                    <!-- Counter - Messages -->
                </a>
                <!-- Dropdown - Messages -->
                <div v-if="chats.length == 0"
                    class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="messagesDropdown">
                    <h6 class="dropdown-header">
                        Message Center
                    </h6>
                    <a v-for="chat in chats" class="dropdown-item d-flex align-items-center" href="#">
                        <div class="dropdown-list-image mr-3">
                            <img class="rounded-circle" src="~/assets/img/undraw_profile_1.svg" alt="...">
                            <div class="status-indicator bg-success"></div>
                        </div>
                        <div class="font-weight-bold">
                            <div class="text-truncate">...</div>
                            <div class="small text-gray-500">...</div>
                        </div>
                    </a>

                    <NuxtLink class="dropdown-item text-center small text-gray-500" href="#" :to="{ name: 'message' }">Read
                        More Messages</NuxtLink>
                </div>
                <div v-else class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="messagesDropdown">
                    <h6 class="dropdown-header">
                        Message Center
                    </h6>
                    <a v-for="chat in chats" class="dropdown-item d-flex align-items-center" href="#">
                        <div class="dropdown-list-image mr-3">
                            <img class="rounded-circle" src="~/assets/img/undraw_profile_1.svg" alt="...">
                            <div class="status-indicator bg-success"></div>
                        </div>
                        <div class="font-weight-bold">
                            <div class="text-truncate">{{ chat.last_message.message }}</div>
                            <div class="small text-gray-500">{{ chat.participants[0].user.name }}</div>
                        </div>
                    </a>

                    <NuxtLink class="dropdown-item text-center small text-gray-500" href="#" :to="{ name: 'message' }">Read
                        More Messages</NuxtLink>
                </div>
            </li>

            <div class="topbar-divider d-none d-sm-block"></div>

            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small"> {{ this.$auth.user.name }} </span>
                    <img class="img-profile rounded-circle" :src="getImg($auth.user.photo)">
                </a>
                <!-- Dropdown - User Information -->
                <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    <NuxtLink class="dropdown-item no-active" :to="{ name: 'profile' }">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        Profile
                    </NuxtLink>
                    <NuxtLink class="dropdown-item no-active" :to="{ name: 'message' }">
                        <i class="fas fa-envelope fa-sm fa-fw mr-2 text-gray-400"></i>
                        Message
                    </NuxtLink>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#" data-toggle="modal" @click="logout" data-target="#logoutModal">
                        <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Logout
                    </a>
                </div>
            </li>

        </ul>

    </nav>
</template>

<script>
export default {
    data() {
        return {
            chats: []
        }
    },
    methods: {
        async logout() {

            try {
                await this.$auth.logout()

                this.$router.push({ name: 'login' })

            } catch (error) {
                console.log(error)
            }

        },
        async fetch_chats() {
            await this.$axios.get('message/chat', {
                params: {
                    limit: 5
                }
            })
                .then(({ data }) => {
                    this.chats = data.result.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getImg(file) {

            if (file == null) {
                file = 'profile_dummy.png'
            }

            return process.env.BASE_URL + 'storage/photos/' + file
        }
    }
}
</script>

<style>
.no-active.dropdown-item.nuxt-link-exact-active {
    color: #3a3b45 !important;
    font-weight: 400 !important;
}

.no-active.dropdown-item.nuxt-link-exact-active i {
    color: #d1d3e2 !important;
}
</style>