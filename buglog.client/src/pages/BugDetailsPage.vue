<template>
  <div class="bug-details-page container-fluid">
    <div class="row mt-3">
      <p class="col">Title:</p>
    </div>
    <div class="row">
      <h1 class="col">
        {{ state.bug.title }}
      </h1>
    </div>
    <div class="row mt-2 d-flex justify-content-between">
      <div class="col-7 text-left" v-if="state.bug.creator">
        <h3>
          <small class="pr-2">Reported By:</small> {{ state.bug.creator.name }}
        </h3>
      </div>
      <div id="status" class="col-3">
        <h3>
          <small class="pr-2">Status: </small>
          <span v-if="!state.bug.closed" class="text-success">Open</span>
          <span v-else class="text-danger">Closed</span>
        </h3>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12 justify-content-center">
        <div class="card">
          <div class="card-body">
            <h4>{{ state.bug.description }}</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 my-2" id="close-button">
        <!-- NOTE add functionality to close bug button, and dont allow close if already closed -->
        <button type="button" class="btn btn-danger">Close Bug</button>
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <table class="table col-10 mt-3">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Message</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <Notes v-for="note in state.notes" :key="note.id" :note="note" />
      </table>
    </div>

    <div class="row">
      <div
        v-if="state.user.isAuthenticated"
        class="col-12 d-flex justify-content-end"
      >
        <button
          type="button"
          class="btn btn-info btn-lg"
          data-toggle="modal"
          data-target="#create-note"
        >
          Add
        </button>
        <CreateNoteModal />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { notesService } from '../services/NotesService'
export default {
  name: 'BugDetailsPage',
  props: {
    bug: { type: Object, required: true }
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      loading: true,
      bug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.activeNotes),
      user: computed(() => AppState.user)
    })
    onMounted(async () => {
      await bugsService.getBug(route.params.id)
      await notesService.getNotesByBugId(route.params.id)
      state.loading = false
    })
    onBeforeRouteLeave((to, from, next) => {
      AppState.activeBug = {}
      next()
    })
    return {
      state
    }
  },
  components: {}
}
</script>

<style scoped>
small {
  font-size: 0.9rem;
}
h1.col {
  font-size: 3rem;
  margin-top: -20px;
}
#status {
  text-align: end;
}
#close-button {
  display: flex;
  justify-content: flex-end;
}
</style>
