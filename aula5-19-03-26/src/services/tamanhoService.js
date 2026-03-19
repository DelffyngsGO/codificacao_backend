const tamanho = [
    { id: 1, tamanho: 'Pequeno' },
    { id: 2, tamanho: 'Médio' },
    { id: 3, tamanho: 'Grande' },
]

class tamanhoServices {

    getAll() {
        return tamanho
    }
}

export const tamanhoService = new tamanhoServices()