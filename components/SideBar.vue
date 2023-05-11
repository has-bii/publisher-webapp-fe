<template>
    <div>
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

            <!-- Heading -->
            <div class="sidebar-heading">
                Contents
            </div>

            <!-- Nav Item - Contents -->
            <li class="nav-item">
                <NuxtLink class="nav-link" :to="{ name: 'contents' }">
                    <i class="fas fa-fw fa-note-sticky"></i>
                    <span>Contents</span>
                </NuxtLink>
            </li>

            <!-- Nav Item - Add content -->
            <li class="nav-item">
                <NuxtLink class="nav-link" :to="{ name: 'contents' }">
                    <i class="fas fa-fw fa-file-circle-plus"></i>
                    <span>Upload Content</span>
                </NuxtLink>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">

        </ul>
        <!-- End of Sidebar -->

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous">
        </script>
    </div>
</template>