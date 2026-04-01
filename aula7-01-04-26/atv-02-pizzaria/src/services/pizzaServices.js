import pizzas from '../data/pizza.js'

class PizzaService {
    getAll() {
        return pizzas
    }

    getById(id) {
        return pizzas.find(p => p.id === parseInt(id))
    }

    create(data) {
        const newPizza = {
            id: pizzas.length > 0 ? pizzas[pizzas.length - 1].id + 1 : 1,
            // nome: data.nome,
            // idade: data.idade,
            // sintoma: data.sintoma
        }

        pizzas.push(newPizza)

        return newPizza
    }

    updatePatch(id, nome) {
        const index = pizzas.findIndex((p) => p.id === parseInt(id));

        if (index === -1) return null;

        if (nome) {
            pizzas[index].nome = nome;
        }

        return pizzas[index];
    }

    updatePut(id, newData) {
        const index = pizzas.findIndex(p => p.id === parseInt(id));

        if (index === -1) return null;

        const pizzasUpd = { id: parseInt(id), ...newData };

        pizzas[index] = pizzasUpd;

        return pizzasUpd;
    }

    delete(id) {
        const index = pizzas.findIndex(p => p.id === parseInt(id));

        if (index === -1) return false;

        pizzas.splice(index, 1);
        return true;
    }
}

export const pizzaService = new PizzaService()