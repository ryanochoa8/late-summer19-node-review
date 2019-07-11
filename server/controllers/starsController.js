import express from "express"
import _starsService from '../services/starsService'

export default class StarController {
  async getAllStars(req, res, next) {
    try {
      let stars = await _starsService.find()
      res.send(stars)
    } catch (error) {
      next(error)
    }
  }
  async getStar(req, res, next) {
    try {
      let star = await _starsService.findById(req.params.starId)
      res.send(star)
    } catch (error) { next(error) }
  }

  async createStar(req, res, next) {
    try {
      let star = await _starsService.create(req.body)
      res.send(star)
    } catch (error) { next(error) }
  }

  constructor() {
    this.router = express.Router()
      .get('', this.getAllStars)
      .get('/:starId', this.getStar)
      .post('', this.createStar)
  }
}