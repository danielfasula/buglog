<template>
  <div
    class="bug-details-page container-fluid text-white"
    v-if="state.bug.creator"
  >
    <div class="row mt-3 d-flex justify-content-between">
      <p class="col-1">Title:</p>
      <div class="col-1">
        <div v-if="!state.bug.closed">
          <button
            v-if="state.bug.creator.name == state.user.email"
            type="button"
            class="btn btn-lg"
            data-toggle="modal"
            data-target="#edit-bug"
          >
            <i class="far fa-edit"></i>
          </button>
          <EditBugModal />
        </div>
      </div>
    </div>
    <div class="row">
      <h1 class="col">
        {{ state.bug.title }}
      </h1>
    </div>
    <div class="row mt-2 d-flex justify-content-between">
      <div class="col-7 text-left d-flex" v-if="state.bug.creator">
        <h3>
          <small class="pr-2">Reported By:</small>
          <img
            class="mx-2"
            :src="state.bug.creator.picture"
            alt=""
            height="40"
          />
          {{ state.bug.creator.name }}
        </h3>
      </div>
      <div id="status" class="col-3">
        <h3>
          <small class="pr-2">Status: </small>
          <span v-if="!state.bug.closed" class="green">Open</span>
          <span v-else class="red">Closed</span>
        </h3>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12 justify-content-center">
        <div class="card bg-success">
          <div class="card-body">
            <h4>{{ state.bug.description }}</h4>
          </div>
        </div>
      </div>
    </div>
    <div v-if="state.bug.creator.name == state.user.email" class="row">
      <div v-if="!state.bug.closed" class="col-12 my-2" id="close-button">
        <button type="button" class="btn btn-danger" @click="closeBug">
          Close Bug
        </button>
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <table class="table col-10 mt-3">
        <thead>
          <tr class="text-white">
            <th scope="col">Name</th>
            <th scope="col">Message</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <Notes v-for="note in state.notes" :key="note.id" :note="note" />
      </table>
    </div>

    <div v-if="!state.bug.closed">
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
        </div>
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
import NotificationsService from '../NotificationsService'
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
      notes: computed(() => AppState.notes),
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
      state,
      async closeBug() {
        if (!state.bug.closed) {
          if (await NotificationsService.confirmAction('Close That Bug!')) {
            await bugsService.closeBug(state.bug.id)
          }
        }
      }
    }
  }
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
