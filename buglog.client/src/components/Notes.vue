<template>
  <tbody class="notes" v-if="note.creator">
    <tr>
      <th scope="col">
        <img :src="note.creator.picture" height="30" class="mr-2" />
        {{ note.creator.name }}
      </th>
      <td scope="col">
        {{ note.body }}
      </td>
      <td scope="col">
        <!-- NOTE add delete functionality -->
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
        if (window.confirm('Are you sure?')) {
          await notesService.deleteNote(props.note.id)
          notesService.getNotesByBugId(state.bug.id)
        }
        // Swal.fire({
        //   title: 'Are you sure?',
        //   text: "You won't be able to revert this!",
        //   icon: 'warning',
        //   showCancelButton: true,
        //   confirmButtonColor: '#3085d6',
        //   cancelButtonColor: '#d33',
        //   confirmButtonText: 'Yes, delete it!'
        // }).then((result) => {
        //   if (result.isConfirmed) {
        //     notesService.deleteNote(props.note.id)
        //     Swal.fire(
        //       'Deleted!',
        //       'Your Comment has been deleted.',
        //       'success'
        //     )
        //   }
        // })
      }
    }
  },
  components: {}
}
</script>
