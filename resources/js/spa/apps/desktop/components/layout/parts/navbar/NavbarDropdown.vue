<template>
    <Menu as="div" class="relative cursor-pointer z-50 text-lab-sc navbar-menu">
        <MenuButton class="navbar-menu-button flex items-center cursor-pointer py-2 px-3 rounded transition-all hover:bg-gray-100 dark:hover:bg-gray-700">
            <span class="flex items-center ">
                <span class="size-icon-normal shrink-0 opacity-80">
                    <SvgIcon name="dots-horizontal" type="solid"></SvgIcon>
                </span>
                <span class="text-par-l ml-3">
                    {{ $t('labels.more') }}
                </span>
            </span>
        </MenuButton>

        <PrimaryTransition>
            <MenuItems class="navbar-menu-items absolute top-full right-0 mt-1 dropdown-menu w-80 z-50 bg-white dark:bg-gray-900 rounded shadow-lg border border-gray-300 dark:border-gray-600 py-1 px-0 m-0">
                <div v-if="isAdmin" class="block">
                    <MenuItem v-slot="{ active, close }">
                        <button class="group flex w-full items-center px-4 py-1">
                            <a v-bind:href="adminPanelUrl" target="_blank" class="block w-full" v-on:click="close">
                                <span class="w-full flex items-center overflow-hidden">
                                    <span class="shrink-0 size-icon-normal">
                                        <SvgIcon type="line" name="shield-02" classes="size-full"></SvgIcon>
                                    </span>
                                    <span class="dropdown-item-label">
                                        {{ $t('labels.admin_panel') }}
                                    </span>
                                </span>
                            </a>
                        </button>
                    </MenuItem>
                </div>
                <div class="block">
                    <MenuItem v-slot="{ active, close }">
                        <button class="group flex w-full items-center px-4 py-1">
                            <RouterLink v-bind:to="{ name: 'settings_page' }" class="block w-full" v-on:click="close">
                                <span class="w-full flex items-center overflow-hidden">
                                    <span class="shrink-0 size-icon-normal">
                                        <SvgIcon type="line" name="settings-01" classes="size-full"></SvgIcon>
                                    </span>
                                    <span class="dropdown-item-label">
                                        {{ $t('labels.account_settings') }}
                                    </span>
                                </span>
                            </RouterLink>
                        </button>
                    </MenuItem>
                </div>
                <div v-if="$config('features.wallet.enabled')" class="block">
                    <MenuItem v-slot="{ active, close }">
                        <button class="group flex w-full items-center px-4 py-1">
                            <RouterLink v-bind:to="{ name: 'wallet_page' }"  class="block w-full" v-on:click="close">
                                <span class="w-full flex items-center overflow-hidden">
                                    <span class="shrink-0 size-icon-normal">
                                        <SvgIcon type="line" name="wallet-02" classes="size-full"></SvgIcon>
                                    </span>
                                    <span class="dropdown-item-label">
                                        {{ $t('labels.wallet') }}
                                    </span>
                                </span>
                            </RouterLink>
                        </button>
                    </MenuItem>
                </div>
                <div class="block">
                    <MenuItem>
                        <button v-on:click="logoutUser" class="group flex w-full items-center px-4 py-1">
                            <span class="w-full flex items-center overflow-hidden">
                                <span class="shrink-0 size-icon-normal">
                                    <SvgIcon name="log-out-01" type="solid" classes="size-full"></SvgIcon>
                                </span>
                                <span class="dropdown-item-label">
                                    {{ $t('labels.logout') }}
                                </span>
                            </span>
                        </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </PrimaryTransition>
    </Menu>
</template>
<script>
    import { defineComponent, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '@D/store/auth/auth.store.js';
    import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';

    export default defineComponent({
        setup: function(props) {
            const Router = useRouter();
            const authStore = useAuthStore();

            return {
                isAdmin: computed(() => {
                    return authStore.userData.meta.is_admin;
                }),
                adminPanelUrl: computed(() => {
                    return authStore.userData.meta.admin.url;
                }),
                logoutUser: async () => {
                    await authStore.logoutUser();

                    window.location.href = embedder('routes.user_auth_index');
                }
            }
        },
        components: {
            Menu: Menu,
            MenuButton: MenuButton,
            MenuItems: MenuItems,
            MenuItem: MenuItem
        }
    });
</script>

<style scoped>
/* Override Bootstrap CSS conflicts with Headless UI menu */
.navbar-menu {
    position: relative;
    z-index: 50;
}

.navbar-menu-button {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    transition: all 0.2s;
    background: transparent;
    border: none;
    outline: none;
}

.navbar-menu-button:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.dark .navbar-menu-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.navbar-menu-items {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.25rem;
    width: 20rem;
    z-index: 50;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border: 1px solid #d1d5db;
    padding: 0.25rem 0;
    margin: 0;
    display: block;
    visibility: visible !important;
    opacity: 1 !important;
    transform: none !important;
}

.dark .navbar-menu-items {
    background-color: #111827;
    border-color: #374151;
}
</style>
