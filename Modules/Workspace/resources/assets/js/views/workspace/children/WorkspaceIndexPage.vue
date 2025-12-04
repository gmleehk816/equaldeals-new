<template>
  <div :class="theme" class="custom">
    <div class="container-fluid">
      <AddWorkspace ref="childRef" @getAllworkspace="getAllworkspace"></AddWorkspace>
      <div class="row">
        <div class="col-lg-2">
          <!-- <div>
            <SkeletonLoader width="50%" height="15" margin="5" />
            <SkeletonLoader width="60%" height="15" margin="5" />
            <SkeletonLoader
                width="100%"
                height="15"
                margin="5"
                v-for="i in 7"
                :key="i"
            />
          </div> -->
          <div class="workspace-list">
            <ul>
              <li v-for="(item, index) in workspaces" :key="index">
                 <router-link :to="{ name: 'project_page', params: { workspace_id: item.id } }" class="">
                    {{ item.name }}                      
                  </router-link>
                   <div class="c-add-del">
                    <button
                      @click="openEditModal(item)"
                      class="btn btn-primary"
                      title="Edit workspace"
                      >
                      <SvgIcon name="pencil-01" type="solid" classes="size-icon-small"></SvgIcon>
                      </button>

                      <button
                      @click="deleteWorkspace(item.id)"
                      class="btn btn-danger"
                      title="Delete workspace"
                      >
                      <SvgIcon name="x" type="solid" classes="size-icon-small"></SvgIcon>
                      </button>
                  </div>
              </li>
            </ul>
          </div>  
        </div> 
        <div class="col-lg-10">
           <RouterView></RouterView>
        </div>
      </div>
        
    </div>
  </div>
</template>

<script scoped>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import SkeletonLoader from "@workspace/components/SkeletonLoader.vue";
import AddWorkspace from "@D/components/workspace/AddWorkspace.vue";

export default {
    components: {
        SkeletonLoader,
        AddWorkspace
    },
  data() {
    return {
      loading: false,
      workspaces: [],
    };
  },
  computed: {
        theme() {
            if(this.$global.theme == 'light') {
                return 'theme-light';
            }
            if(this.$global.theme == 'dark') {
                return 'theme-dark';
            }
        }
    },

  methods: {
  
    openEditModal(item) {
      this.$refs.childRef.isEditing = true;
      this.editId = item.id;
      this.$refs.childRef.newWorkspace = { edit_id:item.id,name: item.name,visibility_scope:item.visibility_scope, description: item.description };
      this.$refs.childRef.showModal = true;
    },

    async deleteWorkspace(id) {
      if (!confirm("Are you sure you want to delete this workspace?")) return;
      let url = this.$global.app_url+'/workspace/delete/'+id;
      await axios.delete(url)
        .then(response => {
            this.getAllworkspace();
        })
        .catch(error => {
            console.error("Error deleting workspace:", error);
        });

    },
    async getAllworkspace(){
        this.loading = true;
        
        let url = this.$global.app_url+"/workspace/get/all/"+this.$global.auth_user.id;
        await axios.get(url)
        .then(response => {
            this.workspaces = response.data.data;
            this.loading = false;
        })
        .catch(error => {
            console.error("Error fetching workspaces:", error);
        });
    }
  },
  mounted() {
     console.log("Auth User:", this.$global.auth_user);
    this.getAllworkspace();
  }
};
</script>

<style scoped>
.custom {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.theme-light {
  background-color: #fff;
  color:  #111111;
}

.theme-dark {
  background-color: #111111;
  color: #fff;
}
.c-add-del {
  display: flex;
  float: right;
  gap: 4px;
}

</style>
