<template>
  <div class="bugs-page container-fluid">
    <div class="row justify-content-end">
      <div v-if="state.user.isAuthenticated" class="col-2">
        <button
          type="button"
          class="mt-3 btn btn-success btn-lg"
          data-toggle="modal"
          data-target="#create-bug"
        >
          <i class="fas fa-bug fa-spin"></i>
        </button>
        <CreateBugModal />
      </div>
    </div>
    <div class="row justify-content-center mt-3">
      <div class="col-10">
        <table class="table" id="myTable">
          <thead>
            <tr class="text-white">
              <th scope="col">Title</th>
              <th scope="col">Reported By</th>
              <th scope="col">
                Status
                <i
                  type="button"
                  class="fas fa-sort fa-sm ml-1"
                  @click="sortByStatus"
                ></i>
              </th>
              <th scope="col">
                Last Modified
                <i
                  type="button"
                  class="fas fa-sort fa-sm ml-1"
                  @click="sortByDate"
                ></i>
              </th>
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
      openBugs: computed(() => AppState.openBugs),
      showForm: false,
      sortedBy: 'none',
      sortDate: 'none'
    })
    onMounted(async () => {
      await bugsService.getAll()
      state.loading = false
    })
    return {
      state,
      sortByStatus() {
        if (state.sortedBy === 'none') {
          state.bugs.sort(function (a, b) { return a.closed - b.closed })
          state.sortedBy = 'open'
        } else if (state.sortedBy === 'open') {
          state.bugs.sort(function (a, b) { return b.closed - a.closed })
          state.sortedBy = 'closed'
        } else {
          bugsService.getAll()
          state.sortedBy = 'none'
        }
      },
      sortByDate() {
        if (state.sortDate === 'none') {
          state.bugs.sort(function (a, b) { return new Date(a.updatedAt) - new Date(b.updatedAt) })
          state.sortDate = 'first'
        } else if (state.sortDate === 'first') {
          state.bugs.sort(function (a, b) { return new Date(b.updatedAt) - new Date(a.updatedAt) })
          state.sortDate = 'last'
        } else {
          bugsService.getAll()
          state.sortDate = 'none'
        }
      }
    }
  }
}
</script>

<style scoped>
.fa-bug {
  font-size: 2em;
}
</style>
