document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;

  const res = await fetch(
    `https://dragonball-api.com/api/characters?name=${nome}`,
  );
  const dados = await res.json();

  if (dados.length === 0) {
    document.getElementById("erro").textContent = "Não encontrado";
    return;
  }

  const p = dados[0];
  document.getElementById("erro").textContent = "";
  document.getElementById("foto").src = p.image;
  document.getElementById("genero").value = p.gender;
  document.getElementById("raca").value = p.race;
  document.getElementById("ki").value = p.ki;
  document.getElementById("maxki").value = p.maxKi;
  document.getElementById("afiliacao").value = p.affiliation;
});