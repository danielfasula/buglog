<template>
  <div class="create-note-modal nope">
    <div
      class="modal fade"
      id="create-note"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add a Note</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createNote">
              <div class="form-group">
                <textarea
                  type="text"
                  name="body"
                  id="body"
                  class="form-control"
                  placeholder="Enter Note Here"
                  aria-describedby="helpId"
                  v-model="state.newNote.body"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer justify-content-center">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button class="btn btn-success" @click="createNote">
              Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, computed } from 'vue'
import { notesService } from '../services/NotesService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { AppState } from '../AppState'
import NotificationService from '../NotificationsService'
export default {
  name: 'CreateNoteModal',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      bug: computed(() => AppState.activeBug),
      newNote: {}
    })
    return {
      state,
      async createNote() {
        try {
          $('#create-note').modal('hide')
          state.newNote.creator = state.user
          state.newNote.creatorId = state.user.id
          state.newNote.bug = state.bug.id
          await notesService.createNote(state.newNote)
          state.newNote = {}
          NotificationService.toast('Note Added!')
        } catch (error) {
          logger.log(error)
        }
      }
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
</style>
