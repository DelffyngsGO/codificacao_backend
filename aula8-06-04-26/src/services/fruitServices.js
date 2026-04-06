import fruits from '../data/fruits.js'

class FruitServices {
    getAll() {
        return fruits
    }

    getById(id) {
        return fruits.find(f => f.id === parseInt(id))
    }

    updatePatch(id, nome) {
        const index = fruits.findIndex((p) => p.id === parseInt(id));


        if (index === -1) return null;

        if (nome) {
            fruits[index].nome = nome;
        }

        return fruits[index];
    }

    updatePut(id, newData) {
        const index = fruits.findIndex(p => p.id === parseInt(id));

        if (index === -1) return null;

        const fruitUpd = { id: parseInt(id), ...newData };

        fruits[index] = fruitUpd;

        return fruitUpd;
    }
}

export const fruitServices = new FruitServices()