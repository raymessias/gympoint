import Student from '../models/Student'
import Queue from '../lib/Queue'

class StudentController {
  async index(req, res) {

    const students = await Student.findAll({ limit: 20 })

    return res.status(200).json(students)
  }

  async store(req, res) {

    const { name, email, age, weight, height } = req.body

    const existStudent = await Student.findOne({ where: { email } })

    if (existStudent) {
      return res.status(400).json({ error: 'Students alread exists' })
    }

    const student = await Student.create({ name, email, age, weight, height })

    // Add job RegistrationMail na fila 
    await Queue.add('RegistrationMail', { student })

    return res.status(200).json(student)
  }

  async update(req, res) {
    const { id } = req.params

    const student = await Student.findByPk(id)

    if (!student) {
      return res.status(400).json({ error: 'Student not found' })
    }

    const { name, email, age, weight, height } = await student.update(req.body)
    await student.save()
    
    return res.status(200).json({
      id,
      name,
      email,
      age,
      weight,
      height
    })
  }

  async delete(req, res) {
    const { id } = req.params
    const student = await Student.findByPk(id)


    if (!student) {
      return res.status(400).json({ error: 'Student not found' })
    }

    const { name, email } = student

    await Student.destroy({ where: { id } })

    return res.status(400).json({
      id,
      name,
      email,
      message:'Student deleted succesfully'
    })
  }
}


export default new StudentController()
