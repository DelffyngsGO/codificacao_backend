import sushis from '../data/sushi.js'

class SushiService {
    getAll() {
        return sushis
    }

    getById(id) {
        return sushis.find(p => p.id === parseInt(id))
    }

    create(data) {
        const newSushi = {
            id: sushis.length > 0 ? sushis[sushis.length - 1].id + 1 : 1,
            nome: data.nome,
            peso: data.peso
        }

        sushis.push(newSushi)

        return newSushi
    }

    updatePatch(id, nome, peso) {
        const index = sushis.findIndex((p) => p.id === parseInt(id));

        if (index === -1) return null;

        if (nome) {
            sushis[index].nome = nome;
        }

        if (peso) {
            sushis[index].peso = peso;
        }

        return sushis[index];
    }

    updatePut(id, newData) {
        const index = sushis.findIndex(p => p.id === parseInt(id));

        if (index === -1) return null;

        const sushiUpd = { id: parseInt(id), ...newData };

        sushis[index] = sushiUpd;

        return sushiUpd;
    }

    delete(id) {
        const index = sushis.findIndex(p => p.id === parseInt(id));

        if (index === -1) return false;

        sushis.splice(index, 1);
        return true;
    }
}

export const sushiService = new SushiService()