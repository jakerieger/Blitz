<template>
    <div id="sidebar">
        <div class="sidebar-content">
            <div class="sidebar-menu">
                <div :class="activateMenuItem == 0 ? 'sidebar-menu-item active' : 'sidebar-menu-item'">
                    <div class="sidebar-menu-item-content" @click="changePage(0)">
                        <span><i class="mdi mdi-download"></i></span> Torrents
                    </div>
                </div>
                <div :class="activateMenuItem == 1 ? 'sidebar-menu-item active' : 'sidebar-menu-item'">
                    <div class="sidebar-menu-item-content" @click="changePage(1)">
                        <span><i class="mdi mdi-cog"></i></span> Settings
                    </div>
                </div>
            </div>
        </div>
        <div class="statusbar">
            <div class="statusbar-content">
                v{{version}}
            </div>
        </div>
    </div>
</template>

<script>
import { remote } from 'electron'

export default {
    name: 'Sidebar',
    data() {
        return {
            activateMenuItem: 0,
            version: remote.app.getVersion()
        }
    },
    methods: {
        changePage(pageID) {
            this.activateMenuItem = pageID;

            // router stuff here
            switch(pageID) {
                case 0:
                    this.$router.push('/');
                    break;
                case 1:
                    this.$router.push('settings');
                    break;
            }
        }
    }
}
</script>

<style scoped>
#sidebar {
    position: fixed;
    width: 230px;
    height: 100vh;
    background: #262626;
    border-right: 1px solid #313131;
    -webkit-app-region: drag;
    -webkit-user-select: none;
}

.sidebar-content {
    padding-top: 40px;
    padding-left: 20px;
    padding-right: 20px;
}

.sidebar-menu {
    display: flex;
    flex-direction: column;
}

.sidebar-menu-item {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
}

.sidebar-menu-item-content:hover {
    color: #fff;
    cursor: pointer;
}

.sidebar-menu-item.active {
    background: #404040;
    border-radius: 10px;
}

.sidebar-menu-item.active .sidebar-menu-item-content,
.sidebar-menu-item.active .sidebar-menu-item-content i {
    color: #fff;
    font-weight: 400;
}

.sidebar-menu-item-content {
    width: 100%;
    padding-left: 10px;
    transition: 250ms;
}

.sidebar-menu-item-content i {
    padding-right: 6px;
}

.statusbar {
    position: fixed;
    width: 230px;
    background: #141414;
    height: 40px;
    line-height: 40px;
    font-size: 10pt;
    bottom: 0;
}

.statusbar-content {
    color: #fff;
    padding-left: 20px;
    padding-right: 20px;
}
</style>