import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async getNotesByBugId(bugId) {
    try {
      const res = await api.get('api/bugs/' + bugId + '/notes')
      AppState.notes = res.data
      logger.log(res.data)
    } catch (error) {
      logger.log(error)
    }
  }

  async createNote(noteData) {
    try {
      const res = await api.post('api/notes', noteData)
      AppState.notes.push(res.data)
      this.getNotesByBugId(noteData.bug)
    } catch (error) {
      logger.log(error)
    }
  }

  async deleteNote(id) {
    try {
      await api.delete('api/notes/' + id)
    } catch (error) {
      logger.log(error)
    }
  }
}

export const notesService = new NotesService()
