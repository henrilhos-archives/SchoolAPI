db.getCollection('students').aggregate(
  // Pipeline
  [
    // Stage 1
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

    // Stage 2
    {
      $unwind: {
        path: '$schoolSubjects',
        includeArrayIndex: 'arrayIndex', // optional
        preserveNullAndEmptyArrays: false, // optional
      },
    },

    // Stage 3
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
          average: '$schoolSubjects.grades.grade',
        },
      },
    },

    // Stage 4
    {
      $project: {
        name: 1,
        demographics: 1,
        addresses: 1,
        studentUsername: 1,
        email: 1,
        currentSemester: 1,
        schoolSubject: {
          title: 1,
          semester: 1,
          teacher: 1,
          grades: 1,
          average: { $avg: '$schoolSubject.average' },
        },
      },
    },
  ],

  // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/
)
