import { StudentController } from '../controllers/student.controller'

export class StudentRoutes {
  public studentController: StudentController = new StudentController()

  public routes(app): void {
    app
      .route('/student')
      .get(this.studentController.getStudents)
      .post(this.studentController.addNewStudent)

    app
      .route('/student/:studentId')
      .get(this.studentController.getStudentWithId)
      .put(this.studentController.updateContact)
      .delete(this.studentController.deleteStudent)
  }
}
