import Plan from '../models/Plan'

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll()
    return res.status(200).json(plans)
  }

  async store(req, res) {
    const { title, duration, price } = req.body

    const plans = await Plan.create({ title, duration, price })
    return res.status(200).json(plans)
  }

  async update(req, res) {
    const { id } = req.params

    const plan = await Plan.findByPk(id)

    if (!plan) {
      return res.status(400).json({ error: 'Plan not found' })
    }

    const { title, duration, price, created_at } = await plan.update(req.body)

    return res.status(200).json({
      id,
      title,
      duration,
      price,
      created_at,
    })
  }

  async delete(req, res) {
    const { id } = req.params

    const plan = await Plan.findByPk(id)


    if (!plan) {
      return res.status(400).json({ error: 'Plan not found' })
    }

    const { title, duration, price } = plan

    await Plan.destroy({ where: { id } })

    return res.status(200).json({
      id,
      title,
      duration,
      price,
      message: 'Deleted succesfully'
    })
  }

}

export default new PlanController()
