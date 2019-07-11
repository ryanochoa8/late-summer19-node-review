import express from 'express'
import _moonService from '../services/moonsService'

export default class MoonController {
  async getAllMoons(req, res, next) {
    try {
      let Moons = await _moonService.find()
      res.send(Moons)
    } catch (error) { next(error) }
  }
  async getMoon(req, res, next) {
    try {
      let moon = await _moonService.findById(req.params.moonId)
      if (!moon) {
        return res.status(400).send("This is not the Moon you are looking for...")
      }
      res.send(moon)
    } catch (error) { next(error) }
  }

  async createMoon(req, res, next) {
    try {
      let moon = await _moonService.create(req.body)
      res.send(moon)
    } catch (error) { next(error) }
  }

  async editMoon(req, res, next) {
    try {
      let editedMoon = await _moonService.findByIdAndUpdate(req.params.moonId, req.body, { new: true })
      res.send(editedMoon)
    } catch (error) { next(error) }
  }

  async destroyMoon(req, res, next) {
    try {
      let deathOfMoon = await _moonService.findByIdAndDelete(req.params.moonId)
      res.send("Moon Gonzo")
    } catch (error) { next(error) }
  }

  constructor() {
    this.router = express.Router()
      .get('', this.getAllMoons)
      .get('?:moonId', this.getMoon)
      .post('', this.createMoon)
      .put('/:moonId', this.editMoon)
      .delete('/:moonId', this.destroyMoon)
  }
}