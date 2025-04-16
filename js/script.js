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
      <span style="text-decoration: ${tarefa.concluida ? 'line-through' : 'none'}">
        ${tarefa.texto}
      </span>
      <div>
        <button onclick="alternar(${index})">${tarefa.concluida ? 'Desfazer' : 'Concluir'}</button>
        <button onclick="excluir(${index})" style="color: red;">Excluir</button>
      </div>
    `;
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';
    lista.appendChild(li);
  });

  atualizarProgresso();
}

function alternar(index) {
  tarefas[index].concluida = !tarefas[index].concluida;
  atualizarLista();
}

function excluir(index) {
  tarefas.splice(index, 1); // Remove a tarefa da lista
  atualizarLista();
}

function atualizarProgresso() {
  const total = tarefas.length;
  const concluidas = tarefas.filter(t => t.concluida).length;
  const porcentagem = total === 0 ? 0 : Math.round((concluidas / total) * 100);
  if (barra) barra.style.width = porcentagem + '%';
}
