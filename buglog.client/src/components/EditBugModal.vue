<template>
  <div class="edit-bug-modal">
    <div
      class="modal fade"
      id="edit-bug"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Bug</h5>
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
            <form @submit.prevent="editBug">
              <div class="form-group">
                <div class="form-group">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    class="form-control mb-2"
                    placeholder="Enter Bug Title"
                    aria-describedby="helpId"
                    v-model="state.bug.title"
                  />
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    class="form-control"
                    placeholder="Enter Bug Description"
                    aria-describedby="helpId"
                    v-model="state.bug.description"
                  />
                </div>
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
            <button class="btn btn-success" @click="editBug">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, computed } from 'vue'
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { AppState } from '../AppState'
export default {
  name: 'EditBugModal',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      bug: computed(() => AppState.activeBug)
    })
    return {
      state,
      async editBug() {
        try {
          $('#edit-bug').modal('hide')
          await bugsService.editBug(state.bug)
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
