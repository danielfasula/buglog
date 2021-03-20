import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async getNotesByBugId(bugId) {
    try {
      const res = await api.get('api/bugs/' + bugId + '/notes')
      AppState.activeNotes = res.data
      logger.log(res.data)
    } catch (error) {
      logger.log(error)
    }
  }

  async createNote(noteData) {
    try {
      const res = await api.post('api/notes', noteData)
      AppState.activeNotes.push(res.data)
    } catch (error) {
      logger.log(error)
    }
  }
}

export const notesService = new NotesService()
