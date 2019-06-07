import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

export const StudentSchema = new Schema({
  addresses: [
    {
      city: { type: String },
      complement: { type: String },
      neighborhood: { type: String },
      number: { type: Number },
      postalCode: { type: Number },
      state: { type: String },
      street: { type: String },
    },
  ],
  alerts: [
    {
      description: { type: String },
      expiresDate: { type: String },
      type: { type: String },
    },
  ],
  demographics: {
    birthDate: { type: Date },
    gender: { type: String },
    projectedGraduationYear: { type: Number },
  },
  name: {
    firstName: { type: String },
    lastName: { type: String },
    middleName: { type: String },
  },
  schoolSubjects: [
    {
      grades: [
        {
          description: { type: String },
          grade: { type: Number },
          weight: { type: Number },
        },
      ],
      semester: { type: Number },
      teacher: { type: String },
      title: { type: String },
    },
  ],
  studentUsername: { type: String },
})
