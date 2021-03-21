import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getAll() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
  }

  async createBug(bugData) {
    try {
      const res = await api.post('api/bugs', bugData)
      AppState.bugs.push(res.data)
      return res.data.id
    } catch (error) {
      logger.log(error)
    }
  }

  async getBug(id) {
    try {
      const res = await api.get('api/bugs/' + id)
      AppState.activeBug = res.data
    } catch (error) {
      logger.log(error)
    }
  }

  async editBug(bug) {
    try {
      const res = await api.put('api/bugs/' + bug.id, bug)
      AppState.activeBug = res.data
      this.getBug(bug.id)
    } catch (error) {
      logger.log(error)
    }
  }

  async closeBug(bugId) {
    await api.delete('api/bugs/' + bugId)
    this.getBug(bugId)
  }
}

export const bugsService = new BugsService()
