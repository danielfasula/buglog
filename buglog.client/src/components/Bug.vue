<template>
  <tbody class="bug">
    <tr>
      <router-link :to="{ name: 'BugDetailsPage', params: { id: bug.id } }">
        <th scope="col">
          {{ bug.title }}
        </th>
      </router-link>
      <td scope="col">
        {{ bug.creator.name }}
      </td>

      <td scope="col" v-if="!bug.closed" class="text-success">Open</td>
      <td scope="col" v-else class="text-danger">Closed</td>
      <td scope="col">
        {{ convertDate(bug.updatedAt) }}
      </td>
    </tr>
  </tbody>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Bug',
  props: {
    bug: { type: Object, required: true }
  },
  setup() {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      convertDate(updatedAt) {
        const dateYear = updatedAt.slice(0, 4)
        const dateMonth = updatedAt.slice(5, 7)
        const dateDay = updatedAt.slice(8, 10)
        return dateMonth + '/' + dateDay + '/' + dateYear
      }
    }
  },
  components: {}
}
</script>
