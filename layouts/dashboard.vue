<template>
    <div>
        <!-- Page Wrapper -->
        <div id="wrapper">

            <!-- Sidebar -->
            <SideBar />
            <!-- End of Sidebar -->

            <!-- Content Wrapper -->
            <div id="content-wrapper" class="d-flex flex-column">

                <!-- Main Content -->
                <div id="content">

                    <!-- Topbar -->
                    <TopBar />
                    <!-- End of Topbar -->

                    <!-- Begin Page Content -->
                    <div class="container-fluid">

                        <!-- Contents -->
                        <div>
                            <!-- Content Row -->
                            <Nuxt />

                        </div>

                    </div>
                    <!-- /.container-fluid -->

                </div>
                <!-- End of Main Content -->

                <!-- Footer -->
                <TheFooter />
                <!-- End of Footer -->

            </div>
            <!-- End of Content Wrapper -->

        </div>
        <!-- End of Page Wrapper -->

    </div>
</template>

<script>
export default {
    name: 'dashboard',
    head: {
        bodyAttrs: {
            class: 'page-top hidden-scroll'
        }
    },
}
</script>

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.hidden-scroll::-webkit-scrollbar {
    display: none !important;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hidden-scroll {
    -ms-overflow-style: none !important;
    /* IE and Edge */
    scrollbar-width: none !important;
    /* Firefox */
}
</style>