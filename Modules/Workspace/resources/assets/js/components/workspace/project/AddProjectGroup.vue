<template>
    <div class="bg-black/20 outer">
        <div class="grid grid-cols-1 p-5 inner">
            <div>
                <span class="float-end cursor-pointer" @click="closeGroupBox">X</span>
            </div>
            <div>
                <div class="mb-2">
                    <label for="" class="text-sm float-left">Group Name</label>
                    <input type="text" class="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Group Name" v-model="groupForm.name">
                </div>
                <div class="mb-2">
                    <label for="" class="text-sm float-left">Description</label>
                    <textarea class="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Description" v-model="groupForm.description"></textarea>
                </div>
                <div>
                    <SpinnerLoad v-if="spiner" class="float-left"></SpinnerLoad>
                    <button class="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer float-left" @click="createGroup" v-else> 
                        Create Group
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    import workspaceGlobal from "@workspace/config/global.js";
    import SpinnerLoad from "../../skeleton/SpinnerLoad.vue";
    export default {
        name: "AddProjectGroup",
        props: {
            openGroupBox: {
                type: Function,
                required: true
            },
            getAllGroups: {
                type: Function,
                required: true
            }
        },
        components: {
            workspaceGlobal,
            SpinnerLoad
        },
        data() {
            return {
                spiner:false,
                groupForm: {
                    name: '',
                    description: ''
                }
            };
        },
        computed: {
            project_id() {
                return this.$route.params.project_id;
            },
            global() {
                return workspaceGlobal;
            }
        },
        methods: {
            closeGroupBox() {
                this.openGroupBox();
            },
            async createGroup() {
                this.spiner = true;
                const url = this.global.app_url+"/project/group/store";
                let body =  {
                    project_id: this.project_id,
                    name: this.groupForm.name,
                    description: this.groupForm.description
                }
                await axios.post(url,body)
                    .then(response => {
                        this.spiner = false;
                        this.getAllGroups();
                        this.closeGroupBox();
                    })
                    .catch(error => {
                        this.spiner = false;
                        console.error("Error creating group:", error);
                    });
            }
        }
    };
</script>
<style scoped>
    .outer{
        position: absolute;
        top:0;
        width: 100%;
        height: 100vh;
        z-index: 9999;
    }
    .inner{
        background-color: white;
        border-radius: 5px;
        width: 600px;
        position: relative;
        margin: auto;
        top: 50%;   
        transform: translateY(-50%);
    
    }
</style>