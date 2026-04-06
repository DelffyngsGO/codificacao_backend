import fs from "fs/promises";

async function readFruits() {
  const data = await fs.readFile("./fruits.json", "utf-8");
  return JSON.parse(data);
}

async function writeFruits(fruits) {
  const data = JSON.stringify(fruits, null, 2);
  await fs.writeFile("./fruits.json", data, "utf-8");
}

async function getAllFruits() {
  return await readFruits();
}

async function getFruitById(id) {
  const fruits = await readFruits();
  const fruit = fruits.find(item => item.id === Number(id));
  return fruit ?? null;
}

// NOVO: busca pelo nome (case-insensitive)
async function getFruitByName(nome) {
  const fruits = await readFruits();
  const fruit = fruits.find(
    item => item.nome.toLowerCase() === nome.toLowerCase()
  );
  return fruit ?? null;
}

// createFruit agora recebe nome, cor e preco
// e rejeita nomes duplicados
async function createFruit(nome, cor, preco) {
  const fruits = await readFruits();

  // ── impedir duplicadores ──
  const duplicate = fruits.find(
    item => item.nome.toLowerCase() === nome.toLowerCase()
  );
  if (duplicate) {
    throw new Error(`Já existe uma fruta com o nome "${nome}" (id ${duplicate.id}).`);
  }

  const newFruit = {
    id: fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1,
    nome,
    cor,
    preco: Number(preco),
  };

  fruits.push(newFruit);
  await writeFruits(fruits);

  return newFruit;
}

async function updateFruit(id, campos) {
  const fruits = await readFruits();
  const index = fruits.findIndex(item => item.id === Number(id));

  if (index === -1) return null;

  // Se o novo nome for informado, verifica duplicata em outras frutas
  if (campos.nome) {
    const duplicate = fruits.find(
      item =>
        item.nome.toLowerCase() === campos.nome.toLowerCase() &&
        item.id !== Number(id)
    );
    if (duplicate) {
      throw new Error(`Já existe outra fruta com o nome "${campos.nome}" (id ${duplicate.id}).`);
    }
    fruits[index].nome = campos.nome;
  }

  if (campos.cor   !== undefined) fruits[index].cor   = campos.cor;
  if (campos.preco !== undefined) fruits[index].preco = Number(campos.preco);

  await writeFruits(fruits);
  return fruits[index];
}

async function deleteFruit(id) {
  const fruits = await readFruits();
  const index = fruits.findIndex(item => item.id === Number(id));

  if (index === -1) return false;

  fruits.splice(index, 1);
  await writeFruits(fruits);
  return true;
}

// NOVO: apaga tudo e reinicia o arquivo com um array vazio
async function resetFruits() {
  await writeFruits([]);
}

console.log("\n======================================");
console.log("  🍉  GERENCIADOR DE FRUTAS  🍉");
console.log("======================================\n");

// 1. Lista todas as frutas
const allFruits = await getAllFruits();
console.log("📋 Todas as frutas:");
console.table(allFruits);

// 2. Busca por ID
const fruitById = await getFruitById(1);
console.log("\n🔍 Busca por ID 1:");
console.log(fruitById ?? "  Nenhuma fruta encontrada.");

// 3. Busca por nome
const fruitByName = await getFruitByName("Pitaia");
console.log("\n🔍 Busca por nome 'Pitaia':");
console.log(fruitByName ?? "  Nenhuma fruta encontrada.");

// 4. Criação com campos novos
try {
  const created = await createFruit("Abacaxi", "amarelo", 3.99);
  console.log("\n✅ Fruta criada com sucesso:");
  console.log(created);
} catch (err) {
  console.error("\n❌ Erro ao criar fruta:", err.message);
}

// 5. Tentativa de criar duplicata
try {
  await createFruit("Abacaxi", "verde", 2.5);
} catch (err) {
  console.error("\n⚠️  Duplicata bloqueada:", err.message);
}

// 6. Atualização parcial (apenas preco)
const updated = await updateFruit(1, { preco: 5.49 });
console.log("\n✏️  Fruta atualizada (novo preço):");
console.log(updated ?? "  Fruta não encontrada.");

// 7. Remoção
const deleted = await deleteFruit(5);
console.log("\n🗑️  Remoção da fruta id=3:", deleted ? "removida com sucesso" : "fruta não encontrada");

// 8. Lista final
const finalList = await getAllFruits();
console.log("\n📋 Lista final:");
console.table(finalList);

// 9. Reset (descomente para usar)
// await resetFruits();
// console.log("\n🔄 Arquivo resetado! Lista agora está vazia.");

console.log("\n======================================\n");