<template>
    <div class="sidebar-sticky">
        <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div class="sidebar-brand-text mx-3">My Publisher</div>
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Nav Item - Dashboard -->
            <li class="nav-item">
                <NuxtLink class="nav-link" :to="{ name: 'index' }">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </NuxtLink>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">

            <TheAdmin v-if="role_id == 4 ? true : false" />

            <ThePublisher v-if="role_id == 1 ? true : false" />

            <TheEditor v-if="role_id == 2 ? true : false" />

            <TheAuthor v-if="role_id == 3 || role_id == 1 || role_id == 2 ? true : false" />

            <TheUser />

        </ul>
        <!-- End of Sidebar -->

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous">
        </script>
    </div>
</template>

<script>
export default {
    data() {
        return {
            role_id: this.$store.state.auth.user.role_id
        }
    }
}

</script>

<style>
.sidebar {
    position: sticky !important;
    top: 0 !important;
    left: 0 !important;
}

.nuxt-link-exact-active {
    color: #fff !important;
    font-weight: 600;
}

.nuxt-link-exact-active i {
    color: #fff !important;
}
</style>