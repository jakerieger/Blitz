<template>
    <div id="progressbar">
        <div class="progressbar-background">
            <div class="progressbar-progress" :style="{ width: progressFormatted, background: progressBarColor }"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProgressBar',
    props: {
        progress: Number,
        status: String
    },
    computed: {
        progressBarColor: function() {
            switch(this.status) {
                case 'downloading':
                    return '#3d77c2';
                case 'seeding':
                    return '#3dc255';
                case 'failed':
                    return '#c23d53';
                default:
                    return '#3d77c2'
            }
        },
        progressFormatted: function() {
            return `${this.progress}%`
        }
    }
}
</script>

<style scoped>
#progressbar {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
}

.progressbar-background {
    background: #313131;
    border: 1px solid #313131;
    height: 6px;
    border-radius: 4px;
    z-index: 0;
    width: 100%;
}

.progressbar-progress {
    height: 6px;
    border-radius: 4px;
    z-index: 1;
}
</style>