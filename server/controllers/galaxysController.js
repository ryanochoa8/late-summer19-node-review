import express from 'express'
import _galaxyService from '../services/galaxysService.js'

export default class GalaxyController {
  async createGalaxy(req, res, next) {
    try {
      let galaxy = await _galaxyService.create(req.body)
      res.send(galaxy)
    } catch (err) { next(err) }
  }

  async getAllGalaxys(req, res, next) {
    try {

      let galaxys = await _galaxyService.find()
      res.send(galaxys)
    } catch (err) { next(err) }
  }

  constructor() {
    this.router = express.Router()
      .get('', this.getAllGalaxys)
      .post('', this.createGalaxy)

  }
}

