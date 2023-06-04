<template>
    <div>
        <!-- Heading -->
        <div class="sidebar-heading">
            Contents
        </div>

        <!-- Nav Item - Contents -->
        <li class="nav-item">
            <NuxtLink class="nav-link" :to="{ name: 'contents' }">
                <i class="fas fa-fw fa-note-sticky"></i>
                <span>My Contents</span>
            </NuxtLink>
        </li>

        <!-- Nav Item - Add content -->
        <li class="nav-item">
            <NuxtLink class="nav-link" :to="{ name: 'contents-add' }">
                <i class="fas fa-fw fa-file-circle-plus"></i>
                <span>Upload Content</span>
            </NuxtLink>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">
    </div>
</template>