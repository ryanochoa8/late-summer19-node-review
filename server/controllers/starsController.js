import express from "express"
import _starsService from '../services/starsService'

export default class StarsController {
  async createStar(req, res, next) {
    try {
      let star = await _starsService.create(req.body)
      res.send(star)
    } catch (error) { next(error) }

  }
  async getStar(req, res, next) {
    try {
      let star = await _starsService.findById(req.params.starId)
      res.send(star)
    } catch (error) { next(error) }
  }
}