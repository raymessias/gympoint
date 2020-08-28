import { parseISO, addMonths } from 'date-fns'
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
    const { student_id, plan_id, start_date } = req.body

    const student = await Student.findByPk(student_id)
   
    if (!student) { 
      return res.status(400).json({ error: 'Student not found' })
    }

    const plan = await Plan.findByPk(plan_id)
    
    if (!plan) {
      return res.status(400).json({ error: 'Plan not found' })
    }

    const { duration, price: priceMonth } = plan


    const date = parseISO(start_date)
    const finalDate = addMonths(date, duration)

    const price = duration * priceMonth

    const enroll = {
      name: student.name,
      date,
      finalDate,
      duration,
      priceMonth,
      price
    }

    return res.status(200).json(enroll)
  }

  async update() { }
  async delete() { }
}


export default new EnrollmentController()
