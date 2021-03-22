<template>
  <tbody class="bug">
    <tr>
      <router-link :to="{ name: 'BugDetailsPage', params: { id: bug.id } }">
        <th scope="col" class="nope">
          {{ bug.title }}
        </th>
      </router-link>
      <td scope="col" class="nope">
        {{ bug.creator.name }}
      </td>

      <td scope="col" v-if="!bug.closed" class="green">Open</td>
      <td scope="col" v-else class="red">Closed</td>
      <td scope="col" class="nope">
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

<style scoped>
.nope {
  color: black !important;
}
</style>
