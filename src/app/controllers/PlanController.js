import Plan from '../models/Plan'

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll()

    return res.status(200).json(plans)
  }

  store(req, res) {
    return res.status(200).json({ ok: true })
  }

  update(req, res) {
    return res.status(200).json({ ok: true })
  }

  delete(req, res) {
    return res.status(200).json({ ok: true })
  }

}

export default new PlanController()
