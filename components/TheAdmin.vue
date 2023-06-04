<template>
    <div>
        <!-- Heading -->
        <div class="sidebar-heading">
            Admin
        </div>

        <!-- Nav Item - User List -->
        <li class="nav-item">
            <NuxtLink class="nav-link" :to="{ name: 'admin-users' }">
                <i class="fas fa-fw fa-users"></i>
                <span>User List</span>
            </NuxtLink>
        </li>

        <!-- Nav Item - Type -->
        <li class="nav-item">
            <NuxtLink class="nav-link" :to="{ name: 'admin-type' }">
                <i class="fas fa-fw fa-book"></i>
                <span>Type & Genre</span>
            </NuxtLink>
        </li>

        <!-- Nav Item - Type -->
        <li class="nav-item">
            <NuxtLink class="nav-link" :to="{ name: 'admin-publisher' }">
                <i class="fas fa-fw fa-square-pen"></i>
                <span>Publisher List</span>
            </NuxtLink>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">
    </div>
</template>