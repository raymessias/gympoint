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

  async store() {  }
  async update() {  }
  async delete() {  }
}


export default new EnrollmentController()
