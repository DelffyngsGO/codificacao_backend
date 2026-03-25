import filme from '../data/filme.js'

class FilmesService {
    getAll() {
        return filme
    }

    getById(id) {
        return filme.find(f => f.id === parseInt(id))
    }
}

export const filmesService = new FilmesService()