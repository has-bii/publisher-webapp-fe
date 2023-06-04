<template>
    <div>
        <!-- Heading -->
        <div class="sidebar-heading">
            Publisher
        </div>

        <!-- Nav Item - Type -->
        <li class="nav-item">
            <NuxtLink class="nav-link" :to="{ name: 'publisher' }">
                <i class="fas fa-fw fa-square-pen"></i>
                <span>My Publishers</span>
            </NuxtLink>
        </li>

        <!-- Nav Item - Contents -->
        <li class="nav-item">
            <NuxtLink class="nav-link" :to="{ name: 'publisher-contents' }">
                <i class="fas fa-fw fa-note-sticky"></i>
                <span>All Contents</span>
            </NuxtLink>
        </li>

        <!-- Nav Item -->
        <li class="nav-item">
            <NuxtLink class="nav-link" :to="{ name: 'publisher-manage' }">
                <i class="fas fa-fw fa-hand"></i>
                <span>Manage Contents</span>
            </NuxtLink>
        </li>

        <!-- Nav Item -->
        <li class="nav-item">
            <NuxtLink class="nav-link" :to="{ name: 'publisher-announcement' }">
                <i class="fas fa-fw fa-circle-info"></i>
                <span>Announcement</span>
            </NuxtLink>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">
    </div>
</template>