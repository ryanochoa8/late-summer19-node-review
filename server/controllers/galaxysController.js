import express from 'express'
import _galaxyService from '../services/galaxysService.js'
import _starService from '../services/starsService.js'

export default class GalaxyController {
  async getAllGalaxies(req, res, next) {
    try {
      let galaxies = await _galaxyService.find()
      res.send(galaxies)
    } catch (err) { next(err) }
  }

  async getOneGalaxyWithStars(req, res, next) {
    try {
      let stars = await _starService.find({ galaxy: req.params.galaxyId })
    } catch (error) {

    }
  }

  async createGalaxy(req, res, next) {
    try {
      let galaxy = await _galaxyService.create(req.body)
      res.send(galaxy)
    } catch (err) { next(err) }
  }


  constructor() {
    this.router = express.Router()
      .get('', this.getAllGalaxies)
      .get('/:galaxyId/stars', this.getOneGalaxyWithStars)
      .post('', this.createGalaxy)

  }
}

