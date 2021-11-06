<template>
    <div id="downloading">
        <div class="titlebar">
            <div class="titlebar-title">Downloading</div>
            <div class="titlebar-buttons">
                <button class="button secondary">Add Torrent (File)</button>
                <button class="button primary" @click="showAddTorrentModal = true">Add Torrent (Magnet)</button>
            </div>
        </div>
        <div class="titlebar-seperator"></div>
        <div class="page-content">
            <div class="downloads-list">
                <div 
                    v-for="download in downloads" 
                    v-bind:key="download.id" 
                    @click="selectedDownload = download.id" 
                    :class="selectedDownload == download.id ? 'download-list-item active' : 'download-list-item'">
                    <div class="download-list-options">
                        <!-- <span>
                            <i v-if="download.filetype == 'archive'" class="mdi mdi-archive"></i>
                            <i v-else-if="download.filetype == 'file'" class="mdi mdi-file"></i>
                            <i v-else class="mdi mdi-folder"></i>
                        </span> -->
                        <i class="mdi mdi-folder"></i>
                    </div>
                    <div class="download-list-content">
                        <div class="download-item-name">
                            {{download.name}} <span class="download-status">downloading</span>
                        </div>
                        <div class="download-item-path">
                            {{download.path}}{{download.name}}
                        </div>
                        <ProgressBar v-if="download.ready" :progress="(download.downloaded / download.length) * 100.0" status="downloading"/>
                        <div class="download-item-details">
                            <div class="detail-item" v-if="download.ready" id="total-size">
                                {{formatFileSize(download.downloaded)}} / {{formatFileSize(download.length)}}
                            </div>
                            <div class="detail-item" id="total-size" v-else>
                                {{ download.numPeers }} Peers
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal 
        :visible="showAddTorrentModal" 
        :closeCallback="(() => {showAddTorrentModal = false})" 
        :callback="addTorrentMagnet" 
        title="Magnet URI:" 
        type="input" 
        prompt="Magnet URI:" 
        inputPlaceholder="magnet:xxx" 
        confirmText="Add Torrent" @InputValueChanged="getModalInputText"/>
    </div>
</template>

<script>
import ProgressBar from '../components/ProgressBar.vue'
import Modal from '../components/Modal.vue'

import fs from 'fs'
import path from 'path'
import WebTorrent from 'webtorrent/webtorrent.min.js'
const client = new WebTorrent()

// client.on('error', err => {
//     console.log(err)
// })

// client.on('torrent', torrent => {
//     console.log(torrent)
// })

export default {
    name: 'Downloading',
    components: { ProgressBar, Modal },
    data() {
        return {
            showAddTorrentModal: false,
            magnetLink: '',
            downloads: client.torrents,
            selectedDownload: -1
        }
    },
    methods: {
        formatFileSize(sizeInBytes) {
            if (sizeInBytes <= 1000000) {
                return `${(sizeInBytes / 1000).toFixed(2)} KB`
            } else if (sizeInBytes <= 1000000000) {
                return `${(sizeInBytes / 1000000).toFixed(2)} MB`
            } else if (sizeInBytes <= 1000000000000) {
                return `${(sizeInBytes / 1000000000).toFixed(2)} GB`
            } else {
                return `${(sizeInBytes).toFixed(2)} Bytes`
            }
        },

        getModalInputText(data) {
            this.magnetLink = data
        },

        async addTorrentMagnet() {
            client.add(this.magnetLink, {
                path: '/Users/Jake/Downloads/'
            }, torrent => {
                console.log('Downloading torrent: ', torrent.infoHash)
                fs.mkdirSync(path.join(torrent.path, torrent.name))
                torrent.files.forEach(file => {
                    file.getBuffer((err, buffer) => {
                        if (err) throw err
                        fs.writeFile(path.join(torrent.path, file.path), buffer, err => {
                            if (err) throw err
                        })
                    })
                })
            })

            this.showAddTorrentModal = false
            console.log(this.downloads)
        }
    }
}
</script>

<style>
.download-list-item {
    border: 1px solid #313131;
    border-radius: 4px;
    transition: 250ms;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
}

.download-list-item:hover {
    border: 2px solid #3d77c2;
    cursor: pointer;
}

.download-list-item.active {
    border: 2px solid #3d77c2;
}

.download-list-options {
    width: 80px;
    align-self: center;
    text-align: center;
}

.download-list-content {
    background: #1f1f1f;
    padding: 10px;
    width: 100%;
}

.download-item-name {
    color: #fff;
    font-weight: 300;
}

.download-item-path {
    font-size: 10pt;
}

.download-item-details {
    width: 100%;
}

.detail-item#total-size {
    border: 1px solid #313131;
    border-radius: 10px;
    width: 100%;
    /* width: 60px; */
}

.download-status {
    font-weight: 400;
    font-size: 10pt;
    background: #313131;
    border-radius: 4px;
    padding-left: 6px;
    padding-right: 6px;
    margin-left: 6px;
    text-transform: uppercase;
}
</style>