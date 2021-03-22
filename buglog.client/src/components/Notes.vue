<template>
  <tbody class="notes nope" v-if="note.creator">
    <tr>
      <th scope="col">
        <img :src="note.creator.picture" height="30" class="mr-2" />
        {{ note.creator.name }}
      </th>
      <td scope="col">
        {{ note.body }}
      </td>
      <td scope="col">
        <button type="button" class="btn ml-1" @click="deleteNote">
          <i class="far fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  </tbody>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
import NotificationsService from '../NotificationsService'

export default {
  name: 'Notes',
  props: {
    note: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      bug: computed(() => AppState.activeBug)
    })
    return {
      state,
      async deleteNote() {
        if (await NotificationsService.confirmAction()) {
          await notesService.deleteNote(props.note.id)
          notesService.getNotesByBugId(state.bug.id)
        }
      }
    }
  },
  components: {}
}
</script>

<style scoped>
.nope {
  color: black !important;
}
</style>
