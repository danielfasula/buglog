<template>
  <div class="create-bug-modal">
    <div
      class="modal fade"
      id="create-bug"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Report a Bug</h5>
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
            <form @submit.prevent="createBug">
              <div class="form-group">
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control"
                  placeholder="Enter Bug Title"
                  aria-describedby="helpId"
                  v-model="state.newBug.title"
                />
                <input
                  type="text"
                  name="description"
                  id="description"
                  class="form-control"
                  placeholder="Enter Bug Description"
                  aria-describedby="helpId"
                  v-model="state.newBug.description"
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
            <button class="btn btn-success" @click="createBug">
              Send Report
            </button>
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
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
export default {
  name: 'CreateBugModal',
  setup() {
    const router = useRouter()
    const state = reactive({
      user: computed(() => AppState.user),
      newBug: {}
    })
    return {
      state,
      async createBug() {
        try {
          const bugId = await bugsService.createBug(state.newBug)
          $('#create-bug').modal('hide')
          state.newBug.user = state.user
          router.push({ name: 'BugDetailsPage', params: { id: bugId } })
          state.newBug = {}
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
