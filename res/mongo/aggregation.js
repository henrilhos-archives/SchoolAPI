db.getCollection("students").aggregate(

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
						cond: { $eq: ['$$schoolSubject.semester', '$currentSemester'] }
					}
				}
			}
		},

		// Stage 2
		{
			$unwind: {
				path: '$schoolSubjects',
				includeArrayIndex: 'arrayIndex',
				preserveNullAndEmptyArrays: false
			}
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
					average: { $avg: '$schoolSubjects.grades.grade' }
				}
			}
		},

		// Stage 4
		{
			$group: {
				_id : {
					_id: '$_id',
					name: '$name',
					demographics: '$demographics',
					addresses: '$addresses',
					studentUsername: '$studentUsername',
					email: '$email',
					currentSemester: '$currentSemester'
				},
				schoolSubjects: { $push: '$schoolSubject' }
			}
		},

		// Stage 5
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
						cond: { $lt: ['$$schoolSubject.average', 6] }
					}
				}
			}
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
