<template>
    <div class="row">
        <div class="col-lg-12">
            <router-link :to="{name:'project_add_task_page'}" class="btn btn-primary">Add Task</router-link>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Task ID</th>
                            <th>Task Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Design UI</td>
                            <td>In Progress</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Develop Backend</td>
                            <td>Not Started</td>
                        </tr>
                    </tbody>
                </table>
            </div>    
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    project_id() {
      return this.$route.params.project_id;
    }
  },
};
</script>
<style scoped>
@import "bootstrap/dist/css/bootstrap.min.css";
</style>