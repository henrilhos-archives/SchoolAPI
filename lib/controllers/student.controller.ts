import { Request, Response } from 'express'
import * as mongoose from 'mongoose'
import { StudentSchema } from '../models/student.model'

const Student = mongoose.model('Student', StudentSchema)

export class StudentController {
  public addNewStudent(req: Request, res: Response): void {
    const newStudent = new Student(req.body)

    newStudent.save((err, student): void => {
      if (err) {
        res.send(err)
      }
      res.json(student)
    })
  }

  public getStudents(req: Request, res: Response): void {
    Student.find({}, (err, students): void => {
      if (err) {
        res.send(err)
      }
      res.json(students)
    })
  }

  public getStudentsBySemester(req: Request, res: Response): void {
    Student.find({ currentSemester: req.params.semester }, (err, students): void => {
      if (err) {
        res.send(err)
      }
      res.json(students)
    })
  }

  public getFailedStudents(req: Request, res: Response): void {
    let aggregationParams = [
      {
        $project: {
          name: 1,
          demographics: 1,
          addresses: 1,
          studentUsername: 1,
          email: 1,
          currentSemester: 1,
          schoolSubjects: {
            $filter: {
              input: '$schoolSubjects',
              as: 'schoolSubject',
              cond: { $eq: ['$$schoolSubject.semester', '$currentSemester'] },
            },
          },
        },
      },
      {
        $unwind: {
          path: '$schoolSubjects',
          includeArrayIndex: 'arrayIndex',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $project: {
          name: 1,
          demographics: 1,
          addresses: 1,
          studentUsername: 1,
          email: 1,
          currentSemester: 1,
          schoolSubject: {
            title: '$schoolSubjects.title',
            semester: '$schoolSubjects.semester',
            teacher: '$schoolSubjects.teacher',
            grades: '$schoolSubjects.grades',
            average: { $avg: '$schoolSubjects.grades.grade' },
          },
        },
      },
      {
        $group: {
          _id: {
            _id: '$_id',
            name: '$name',
            demographics: '$demographics',
            addresses: '$addresses',
            studentUsername: '$studentUsername',
            email: '$email',
            currentSemester: '$currentSemester',
          },
          schoolSubjects: { $push: '$schoolSubject' },
        },
      },
      {
        $project: {
          _id: '$_id._id',
          name: '$_id.name',
          demographics: '$_id.demographics',
          addresses: '$_id.addresses',
          studentUsername: '$_id.studentUsername',
          email: '$_id.email',
          currentSemester: '$_id.currentSemester',
          schoolSubjects: {
            $filter: {
              input: '$schoolSubjects',
              as: 'schoolSubject',
              cond: { $lt: ['$$schoolSubject.average', 6] },
            },
          },
        },
      },
    ]

    Student.aggregate(aggregationParams, (err, students): void => {
      if (err) {
        res.send(err)
      }
      res.json(students)
    })
  }

  public getStudentWithId(req: Request, res: Response): void {
    Student.findById(req.params.studentId, (err, student): void => {
      if (err) {
        res.send(err)
      }
      res.json(student)
    })
  }

  public updateContact(req: Request, res: Response): void {
    Student.findOneAndUpdate({ _id: req.params.studentId }, req.body, { new: true }, (err, student): void => {
      if (err) {
        res.send(err)
      }
      res.json(student)
    })
  }

  public deleteStudent(req: Request, res: Response): void {
    Student.remove({ _id: req.params.studentId }, (err): void => {
      if (err) {
        res.send(err)
      }
      res.json({ message: 'Successfully deleted contact!' })
    })
  }
}
