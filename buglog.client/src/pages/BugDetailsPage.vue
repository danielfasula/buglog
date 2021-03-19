<template>
  <div class="bug-details-page">
    {{ state.bug }}
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
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
      user: computed(() => AppState.user)
    })
    onMounted(async () => {
      await bugsService.getBug(route.params.id)
    })
    return {
      state
    }
  },
  components: {}
}
</script>
