import express from "express"
import _starsService from '../services/starsService'
import _planetService from '../services/planetsService'

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
      if (!star) {
        return res.status(400).send("This is not the star you are looking for...")
      }
      res.send(star)
    } catch (error) { next(error) }
  }

  async getPlanetsByStar(req, res, next) {
    try {
      let planets = await _planetService.find({ star: req.params.starId })
      res.send(planets)
    } catch (error) {
      next(error)
    }
  }

  async createStar(req, res, next) {
    try {
      let star = await _starsService.create(req.body)
      res.send(star)
    } catch (error) { next(error) }
  }
  async editStar(req, res, next) {
    try {
      let editedStar = await _starsService.findByIdAndUpdate(req.params.starId, req.body, { new: true })
      res.send(editedStar)
    } catch (error) { next(error) }
  }
  async destroyStar(req, res, next) {
    try {
      let deathOfStar = await _starsService.findByIdAndDelete(req.params.starId)
      res.send("Star Delorted")
    } catch (error) {
      next(error)
    }
  }

  constructor() {
    this.router = express.Router()
      //NOTE remove "this.getAllStars" for production
      .get('', this.getAllStars)
      .get('/:starId', this.getStar)
      .get('/:starId/planets', this.getPlanetsByStar)
      .post('', this.createStar)
      .put('/:starId', this.editStar)
      .delete('/:starId', this.destroyStar)
  }
}