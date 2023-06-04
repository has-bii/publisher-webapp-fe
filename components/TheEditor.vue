<template>
    <div>
        <!-- Heading -->
        <div class="sidebar-heading">
            Editor
        </div>

        <!-- Nav Item - User List -->
        <li class="nav-item">
            <NuxtLink class="nav-link" :to="{ name: 'editor-content' }">
                <i class="fas fa-fw fa-swatchbook"></i>
                <span>Contents</span>
            </NuxtLink>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">
    </div>
</template>