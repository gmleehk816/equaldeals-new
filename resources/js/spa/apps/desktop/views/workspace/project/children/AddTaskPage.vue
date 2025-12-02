<template>
    <div class="row">
        <div class="col-lg-12">
            <h3>Add Checklist</h3>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="mb-3">
                <label for="taskName" class="form-label">Task Name</label>
                <input type="text" class="form-control" id="taskName" placeholder="Enter task name">
            </div>
            <div class="mb-3">
                <label for="taskDescription" class="form-label">Task Description</label>
                <textarea class="form-control" id="taskDescription" rows="3" placeholder="Enter task description"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Add Task</button>
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