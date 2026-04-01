import pacientes from '../data/paciente.js'

class PacienteService {
    getAll() {
        return pacientes
    }

    getById(id) {
        return pacientes.find(p => p.id === parseInt(id))
    }

    create(data) {
        const newPaciente = {
            id: pacientes.length > 0 ? pacientes[pacientes.length - 1].id + 1 : 1,
            nome: data.nome,
            idade: data.idade,
            sintoma: data.sintoma
        }

        pacientes.push(newPaciente)

        return newPaciente
    }

    updatePatch(id, nome) {
        const index = pacientes.findIndex((p) => p.id === parseInt(id));


        if (index === -1) return null;

        if (nome) {
            pacientes[index].nome = nome;
        }

        return pacientes[index];
    }

    updatePut(id, newData) {
        const index = pacientes.findIndex(p => p.id === parseInt(id));

        if (index === -1) return null;

        const pacienteUpd = { id: parseInt(id), ...newData };

        pacientes[index] = pacienteUpd;

        return pacienteUpd;
    }

    delete(id) {
        const index = pacientes.findIndex(p => p.id === parseInt(id));

        if (index === -1) return false;

        pacientes.splice(index, 1);
        return true;
    }
}

export const pacienteService = new PacienteService()