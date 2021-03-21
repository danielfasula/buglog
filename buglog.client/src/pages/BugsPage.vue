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
        <table class="table table-striped" id="myTable">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Reported By</th>
              <th scope="col">
                Status
                <button
                  type="button"
                  class="btn btn-info"
                  @click="sortTable(1)"
                >
                  Sort
                </button>
                <!-- <span v-if="!state.statusSorted">
                  <i
                    class="fas fa-caret-right fa-lg ml-1"
                    @click="sortByOpen"
                  ></i>
                </span>
                <span v-if="state.statusSortedByClosed" class="text-danger">
                  : Closed
                </span>
                <span v-if="state.statusSortedByOpen" class="text-success">
                  : Open
                </span> -->
              </th>
              <th scope="col">
                Last Modified
                <button
                  type="button"
                  class="btn btn-info"
                  @click="sortTable(2)"
                >
                  Sort by Date
                </button>
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
      showForm: false
      // statusSorted: false,
      // statusSortedByClosed: false,
      // statusSortedByOpen: false
    })
    onMounted(async () => {
      await bugsService.getAll()
      state.loading = false
    })
    return {
      state,
      sortTable(n) {
        let switching; let i; let x; let y; let shouldSwitch; let dir; let switchcount = 0
        const table = document.getElementById('myTable')
        switching = true
        dir = 'asc'
        while (switching) {
          switching = false
          const rows = table.rows
          for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false
            x = rows[i].getElementsByTagName('TD')[n]
            y = rows[i + 1].getElementsByTagName('TD')[n]
            if (dir === 'asc') {
              if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true
                break
              }
            } else if (dir === 'desc') {
              if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                shouldSwitch = true
                break
              }
            }
          }
          if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
            switching = true
            switchcount++
          } else {
            if (switchcount === 0 && dir === 'asc') {
              dir = 'desc'
              switching = true
            }
          }
        }
      }
    }
  },
  components: {}
}
</script>

<style scoped>
.fa-bug {
  font-size: 2em;
}
tbody:nth-child(even) {
  background-color: white !important;
}
</style>
