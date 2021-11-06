<template>
    <div id="modal" :style="{ opacity: visible ? '1.0' : '0.0', 'z-index': visible ? '50' : '-10' }">
        <div class="modal-bg"></div>
        <div class="modal-content-container">
            <div class="modal-content">
                <div class="modal-close-button">
                    <button class="button modal-close" @click="closeCallback()">
                        <i class="mdi mdi-close"></i>
                    </button>
                </div>
                <div class="modal-title" v-if="hasTitle">
                    {{title}}
                </div>
                <div class="modal-body">
                    <div class="modal-prompt">{{prompt}}</div>
                    <input v-if="type == 'input'" :placeholder="inputPlaceholder" v-model="inputText" @change="inputValueChanged">
                </div>
                <div class="modal-buttons">
                    <button class="button primary" @click="callback()">{{confirmText}}</button>
                    <button class="button secondary" @click="closeCallback()">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        title: String,
        visible: Boolean,
        callback: Function,
        type: String,
        hasTitle: Boolean,
        prompt: String,
        inputPlaceholder: String,
        confirmText: String,
        closeCallback: Function,
    },
    data() {
        return {
            inputText: ''
        }
    },
    methods: {
        inputValueChanged() {
            this.$emit('InputValueChanged', this.inputText)
        }
    }
}
</script>

<style scoped>
#modal {
    position: fixed;
    left: 0;
    top: 0;
    transition: 500ms;
}

.modal-content-container {
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

.modal-content {
    width: 300px;
    /* height: 300px; */
    background: #1a1a1a;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    position: relative;
    /* padding: 20px; */
}

.modal-title {
    color: #fff;
    font-size: 14pt;
    padding: 20px;
}

.modal-body {
    padding: 20px;
}

.modal-prompt {
    color: #fff;
    font-weight: 300;
}

.modal-buttons {
    border-top: 1px solid #313131;
    background: #141414;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
}

.modal-buttons button {
    float: right;
}

.modal-buttons button:first-child {
    margin-right: 10px;
}

.modal-bg {
    width: 100vw;
    height: 100vh;
    background: #000;
    opacity: 0.7;
    position: fixed;
}

.modal-close-button {
    position: absolute;
    top: 6px;
    right: 6px;
}

input {
    width: 100%;
    margin-top: 10px;
}
</style>