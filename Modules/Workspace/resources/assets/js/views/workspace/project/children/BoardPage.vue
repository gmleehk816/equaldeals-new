<template>
  
    <div class="p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <ToDo />
        <InProgress />
        <InReview />
        <Completed />
      </div>
    </div>  
  
</template>
<script>
import { useWorkspaceStore } from "@workspace/stores/workspace.js";
import axios from "axios";
import workspaceGlobal from "@workspace/config/global.js";
import ToDo from "@workspace/components/workspace/task/ToDo.vue";
import InProgress from "@workspace/components/workspace/task/InProgress.vue";
import InReview from "@workspace/components/workspace/task/InReview.vue";
import Completed from "@workspace/components/workspace/task/Completed.vue";
export default{
  components:{
    workspaceGlobal,
    ToDo,
    InProgress,
    InReview,
    Completed,
  },
  data(){
    return{
      global: workspaceGlobal,
    }
  },
}
</script>
