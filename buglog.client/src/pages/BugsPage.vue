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
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
          // Start by saying: no switching is done:
          switching = false
          const rows = table.rows
          /* Loop through all table rows (except the
          first, which contains table headers): */
          for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName('TD')[n]
            y = rows[i + 1].getElementsByTagName('TD')[n]
            // Check if the two rows should switch place:
            if (dir === 'asc') {
              if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                // If so, mark as a switch and break the loop:
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
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
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
