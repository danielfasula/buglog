<template>
  <div class="bugs-page container-fluid">
    <div class="row justify-content-end">
      <div v-if="state.user.isAuthenticated" class="col-2">
        <button
          type="button"
          class="btn btn-info btn-lg"
          data-toggle="modal"
          data-target="#create-bug"
        >
          Report A Bug
        </button>
        <CreateBugModal />
      </div>
    </div>
    <div class="row justify-content-center mt-3">
      <div class="col-10">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Reported By</th>
              <th scope="col">Status</th>
              <th scope="col">Last Modified</th>
            </tr>
          </thead>
          <Bug v-for="bug in state.bugs" :key="bug.id" :bug="bug" />
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
export default {
  name: 'BugsPage',
  setup() {
    const state = reactive({
      loading: true,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs),
      showForm: false
    })
    onMounted(async () => {
      await bugsService.getAll()
      state.loading = false
    })
    return {
      state
    }
  },
  components: {}
}
</script>
