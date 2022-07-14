const inputElement = document.querySelector(".input-nova-tarefa")
const adicionarTarefa = document.querySelector(".btn-nova-tarefa")
const listaAfazeres = document.querySelector(".afazeres")

const validarInput = () => {
  return inputElement.value.trim().length > 0
}

const validarTarefa = () => {
  const inputIsValid = validarInput()

  if (!inputIsValid) {
    return inputElement.classList.add("error")
  }

  const itemTarefa = document.createElement("div")
  itemTarefa.classList.add("tarefa")

  const descricao = document.createElement("p")
  descricao.innerText = inputElement.value

  descricao.addEventListener('click', () => validarFinalizada(descricao))

  const deletarTarefa = document.createElement("i")
  deletarTarefa.classList.add("fa-solid")
  deletarTarefa.classList.add("fa-trash")

  deletarTarefa.addEventListener('click', () => validarDelete(itemTarefa, descricao))

  itemTarefa.appendChild(descricao)
  itemTarefa.appendChild(deletarTarefa)

  listaAfazeres.appendChild(itemTarefa)

  inputElement.value = ""
  updateLocalStorage();
}

const validarFinalizada = (descricao) => {

  const tarefas = listaAfazeres.childNodes

  for (const tarefa of tarefas) {
    const tarefaatual = tarefa.firstChild.isSameNode(descricao)
    if (tarefaatual) {
      tarefa.firstChild.classList.toggle("tarefa-finalizada")
    }
  }
  updateLocalStorage();
}

const validarDelete = (itemTarefa, descricao) => {
  const tarefas = listaAfazeres.childNodes
  for (const tarefa of tarefas) {
    if (tarefa.firstChild.isSameNode(descricao)) {
      itemTarefa.remove()
    }
  }
  updateLocalStorage();
}

const validarMudançaNoInput = () => {
  const inputIsValid = validarInput();
  if (inputIsValid) {
    return inputElement.classList.remove("error")
  }
}
const updateLocalStorage = () => {
  const tarefas = listaAfazeres.childNodes

  const localStorageTarefas = [...tarefas].map(tarefa => {
    const afazer = tarefa.firstChild
    const isFinalizada = afazer.classList.contains("tarefa-finalizada")
    return { descricao: afazer.innerText, isFinalizada }
  })
  localStorage.setItem("tarefas", JSON.stringify(localStorageTarefas))
}

const getTarefasFromLocalStorage = () => {
  const tarefasFromLocalStorage = JSON.parse(localStorage.getItem("tarefas"))

  for (const tarefa of tarefasFromLocalStorage) {
    const itemTarefa = document.createElement("div")
    itemTarefa.classList.add("tarefa")

    const descricao = document.createElement("p")
    descricao.innerText = tarefa.descricao

    if(tarefa.isFinalizada){
      descricao.classList.add("tarefa-finalizada")
    }

    descricao.addEventListener('click', () => validarFinalizada(descricao))

    const deletarTarefa = document.createElement("i")
    deletarTarefa.classList.add("fa-solid")
    deletarTarefa.classList.add("fa-trash")

    deletarTarefa.addEventListener('click', () => validarDelete(itemTarefa, descricao))

    itemTarefa.appendChild(descricao)
    itemTarefa.appendChild(deletarTarefa)

    listaAfazeres.appendChild(itemTarefa)
  }
}

getTarefasFromLocalStorage()
adicionarTarefa.addEventListener("click", () => validarTarefa())
inputElement.addEventListener("change", () => validarMudançaNoInput())
