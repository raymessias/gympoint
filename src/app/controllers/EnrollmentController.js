import { parseISO, addMonths } from 'date-fns'
import { Op } from 'sequelize'
import * as yup from 'yup'
import Enrollment from '../models/Enrollment'
import Student from '../models/Student'
import Plan from '../models/Plan'

class EnrollmentController {
  async index(req, res) {
    const enroll = await Enrollment.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price'],
      include: [
        {
          model: Student,
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          attributes: ['title', 'duration', 'price']
        }
      ]
    })

    return res.status(200).json(enroll)
  }

  async store(req, res) {
    const schema = yup.object().shape({
      student_id: yup.number().required(),
      plan_id: yup.number().required(),
      start_date: yup.date().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { student_id, plan_id, start_date } = req.body

    const alreadyEnroll = await Enrollment.findOne({ where: { student_id } })

    if (alreadyEnroll) {
      return res.status(400).json({ error: 'Student already enrolled' })
    }

    const student = await Student.findByPk(student_id)

    if (!student) {
      return res.status(400).json({ error: 'Student not found' })
    }

    const plan = await Plan.findByPk(plan_id)

    if (!plan) {
      return res.status(400).json({ error: 'Plan not found' })
    }

    const { duration, price: priceMonth } = plan


    const end_date = addMonths(parseISO(start_date), duration)

    const price = Math.floor(duration * priceMonth)

    const enroll = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price
    })

    return res.status(200).json(enroll)
  }

  async update(req, res) {
    const schema = yup.object().shape({
      student_id: yup.number().required(),
      plan_id: yup.number().required(),
      start_date: yup.date().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { id } = req.params
    const { student_id, plan_id, start_date } = req.body

    const enroll = await Enrollment.findByPk(id)

    if (!enroll) {
      return res.status(400).json({ error: 'Enrollment not found' })
    }

    // Check if student already has other enrollment
    const enrollDuplicated = await Enrollment.findOne({
      where: {
        id: { [Op.ne]: id },
        student_id,
      }
    })

    if (enrollDuplicated) {
      return res.status(401).json({ error: 'Student already has enrollment' })
    }

    const plan = await Plan.findByPk(plan_id)

    if (!plan) {
      return res.status(400).json({ error: 'Plan not found' })
    }

    const { duration, price: priceMonth } = plan

    const end_date = addMonths(parseISO(start_date), duration)

    const price = Math.floor(duration * priceMonth)

    await enroll.update({
      student_id,
      plan_id,
      start_date,
      end_date,
      price
    })

    await enroll.save()

    return res.status(200).json(enroll)

  }

  async delete() { }
}


export default new EnrollmentController()
