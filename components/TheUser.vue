<template>
    <div>
        <!-- Heading -->
        <div class="sidebar-heading">
            User
        </div>

        <!-- Nav Item - Type -->
        <li class="nav-item">
            <NuxtLink class="nav-link" :to="{ name: 'profile' }">
                <i class="fas fa-fw fa-user"></i>
                <span>Profile</span>
            </NuxtLink>
        </li>

        <!-- Nav Item - User List -->
        <li class="nav-item">
            <NuxtLink class="nav-link" :to="{ name: 'message' }">
                <i class="fas fa-fw fa-envelope"></i>
                <span>Messages</span>
            </NuxtLink>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">
    </div>
</template>