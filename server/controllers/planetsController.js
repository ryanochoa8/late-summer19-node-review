import express from 'express'
import _planetService from '../services/planetsService'

export default class PlanetController {

  async getAllPlanets(req, res, next) {
    try {
      let Planets = await _planetService.find()
      res.send(Planets)
    } catch (error) {
      next(error)
    }
  }
  async getPlanet(req, res, next) {
    try {
      let planet = await _planetService.findById(req.params.planetId)
      if (!planet) {
        return res.status(400).send("This is not the Planet you are looking for...")
      }
      res.send(planet)
    } catch (error) { next(error) }
  }

  async createPlanet(req, res, next) {
    try {
      let planet = await _planetService.create(req.body)
      res.send(planet)
    } catch (error) { next(error) }
  }
  async editPlanet(req, res, next) {
    try {
      let editedPlanet = await _planetService.findByIdAndUpdate(req.params.planetId, req.body, { new: true })
      res.send(editedPlanet)
    } catch (error) { next(error) }
  }
  async destroyPlanet(req, res, next) {
    try {
      let deathOfPlanet = await _planetService.findByIdAndDelete(req.params.planetId)
      res.send("Planet Delorted")
    } catch (error) {
      next(error)
    }
  }

  constructor() {
    this.router = express.Router()
      //NOTE remove "this.getAllPlanets" for production
      .get('', this.getAllPlanets)
      .get('/:planetId', this.getPlanet)
      .post('', this.createPlanet)
      .put('/:planetId', this.editPlanet)
      .delete('/:planetId', this.destroyPlanet)
  }
}