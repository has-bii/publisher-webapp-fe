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

                            <div class="row">

                                <Nuxt />

                                <!-- Widgets -->
                                <TheWidget />
                            </div>
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
    head: {
        bodyAttrs: {
            class: 'page-top'
        }
    },
}
</script>