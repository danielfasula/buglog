import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async find(query = {}) {
    const notes = await dbContext.Note.find(query).populate('creator', 'name picture')
    return notes
  }

  async findById(id) {
    const note = await dbContext.Note.findById(id).populate('creator', 'name picture')
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async create(body) {
    await dbContext.Note.create(body)
  }

  async edit(id, userId, body) {
    const note = await dbContext.Note.findOneAndUpdate({ _id: id, creatorId: userId }, body, { new: true })
    if (!note) {
      throw new BadRequest('Invalid Id or You are not the Creator')
    }
    return note
  }

  async delete(id, userId) {
    const list = await dbContext.Note.findOneAndRemove({ _id: id, creatorId: userId })
    if (!list) {
      throw new BadRequest('You are NOT my real dad, Jeff')
    }
    return list
  }
}

export const notesService = new NotesService()
