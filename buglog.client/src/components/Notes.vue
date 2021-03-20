<template>
  <tbody class="notes">
    <tr>
      <th scope="col">
        {{ note.creator.name }}
      </th>
      <td scope="col">
        {{ note.body }}
      </td>
      <td scope="col">
        <!-- NOTE add delete functionality -->
        <i class="fa fa-trash" aria-hidden="true"></i>
      </td>
    </tr>
  </tbody>
</template>

<script>
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'

export default {
  name: 'Notes',
  props: {
    note: { type: Object, required: true }
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      route
    }
  },
  components: {}
}
</script>
