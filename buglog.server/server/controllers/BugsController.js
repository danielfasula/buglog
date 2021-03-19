import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .get('/:id/notes', this.getAllNotesByBugId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.closeBug)
  }

  async getAll(req, res, next) {
    try {
      return res.send(await bugsService.find(req.query))
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      return res.send(await bugsService.findById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async getAllNotesByBugId(req, res, next) {
    try {
      return res.send(await notesService.find({ bug: req.params.id }))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await bugsService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      delete req.body.closed
      res.send(await bugsService.edit(req.params.id, req.userInfo.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async closeBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await bugsService.closeBug(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }
}
