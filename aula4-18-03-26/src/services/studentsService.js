const students = [
    { id: 1, name: 'Ivan', age: 17 },
    { id: 2, name: 'KacetudJosé', age: 18 },
    { id: 3, name: 'Pedro', age: 67 },
]

class studentsServices {

    getAll() {
        return students
    }
}

export const studentsService = new studentsServices()