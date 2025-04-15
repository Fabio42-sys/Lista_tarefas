const input = document.getElementById('inputTaf');
const btn = document.getElementById('criarTaf');
const lista = document.getElementById('tafs');
const barra = document.getElementById('progressoBar');

let tarefas = [];

btn.addEventListener('click', () => {
  const texto = input.value.trim();
  if (texto === '') return;

  const nova = { texto, concluida: false };
  tarefas.push(nova);
  input.value = '';
  atualizarLista();
});

function atualizarLista() {
  lista.innerHTML = '';

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span style="text-decoration: ${tarefa.concluida ? 'line-through' : 'none'}">${tarefa.texto}</span>
      <button onclick="alternar(${index})">${tarefa.concluida ? 'Desfazer' : 'Concluir'}</button>
    `;
    lista.appendChild(li);
  });

  atualizarProgresso();
}

function alternar(index) {
  tarefas[index].concluida = !tarefas[index].concluida;
  atualizarLista();
}

function atualizarProgresso() {
  const total = tarefas.length;
  const concluidas = tarefas.filter(t => t.concluida).length;
  const porcentagem = total === 0 ? 0 : Math.round((concluidas / total) * 100);
  barra.style.width = porcentagem + '%';
}
