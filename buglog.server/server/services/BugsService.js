import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async find(query = {}) {
    return await dbContext.Bug.find(query).populate('creator', 'name picture')
  }

  async findById(id) {
    const bug = await dbContext.Bug.findById(id).populate('creator', 'name picture')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async create(body) {
    return await dbContext.Bug.create(body)
  }

  async edit(id, userId, body) {
    const bug = await dbContext.Bug.findOneAndUpdate({ _id: id, creatorId: userId }, body, { new: true })
    if (!bug) {
      throw new BadRequest('Invalid Id or You are not the Creator')
    }
    if (bug.closed) {
      throw new BadRequest('You cannot edit a closed bug')
    }
    return bug
  }

  async closeBug(id, userId) {
    return await dbContext.Bug.findOneAndUpdate({ _id: id, creatorId: userId, closed: false }, { closed: true }, { new: true })
  }
}

export const bugsService = new BugsService()
