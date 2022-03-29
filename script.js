// Posições dos elementos
const getEmail = document.querySelector('#input-email-login');
const getPassword = document.querySelector('#input-password');
const getButton = document.querySelector('#input-button');
const getAgree = document.querySelector('#agreement');
const getAgreeBtn = document.querySelector('#submit-btn');
const textArea = document.querySelector('#textarea');
const counter = document.querySelector('#counter');

// Posições dos valores dos inputs
const getFirstName = document.querySelector('#input-name');
const getLastName = document.querySelector('#input-lastname');
const getEmail2 = document.querySelector('#input-email');
const getHouse = document.getElementById('house');
const getFamily = document.querySelectorAll('.label-family-radio');
const getContent = document.querySelectorAll('.subject');
const getLabelRate = document.querySelectorAll('.label-rate-radio');
const getForm = document.querySelector('#evaluation-form');

// Desativação do botão de submit
getAgreeBtn.disabled = true;

// Função para validação do primeiro forms - referente ao login
function validateData() {
  if (getEmail.value === 'tryber@teste.com' && getPassword.value === '123456') {
    return alert('Olá, Tryber!');
  }
  return alert('Email ou senha inválidos.');
}

// Função de avaliação do botão de submit - apenas envia se concordar antes
// Referência de como utilizar a propriedade disable (link: https://cursos.alura.com.br/forum/topico-habitar-desabilitar-botao-65202?gclid=Cj0KCQiAmeKQBhDvARIsAHJ7mF53HoiOj02ppDteP9ZvVvs4D3st2KW0FNTomiXERiXAAyzrSxBjs8AaAn7sEALw_wcB)
function isChecked() {
  if (getAgree.checked) {
    getAgreeBtn.disabled = false;
  } else {
    getAgreeBtn.disabled = true;
  }
}

// Função de contagem dos caracteres na área de texto
// Referência da função utilizada para contar o número de caracteres (link: https://htmldom.dev/count-the-number-of-characters-of-a-textarea/)
function countText(event) {
  const position = event.target;
  const maxLength = event.target.getAttribute('maxlength');
  const currentLength = position.value.length;
  counter.innerHTML = maxLength - currentLength;
}

// Função que informa o valor selecionado no input select - Casa
// Funções de retornar valores do input select proveniente do exercício da maonitoria (link: https://www.horadecodar.com.br/2021/04/16/pegar-o-valor-selecionado-no-select-com-javascript/)
function houseValue() {
  return getHouse.options[getHouse.selectedIndex].value;
}

// Função que informa o valor selecionado no input radio - Família
// Funções de retornar valores dos input radio e checkbox proveniente do exercício da maonitoria (link: https://github.com/MathheusGuedes/Academia-de-Logica-6.2-Rubric)
function familyValue() {
  for (let i = 0; i < getFamily.length; i += 1) {
    if (getFamily[i].checked) {
      return getFamily[i].value;
    }
  }
}

// Função que informa o(s) valor(es) selecionado(s) no input checkbox - Matérias
function labelCheckboxValue() {
  const array = [];
  for (let w = 0; w < getContent.length; w += 1) {
    if (getContent[w].checked) {
      array.push(getContent[w].value);
    }
  }
  console.log(array);
  return array;
}

// Função que transforma o array proveniente em um lista (em formato de string) separadas por vírgula
function arrayToString(array) {
  let string = '';
  for (let r = 0; r < array.length; r += 1) {
    const control = array.length - 1;
    if (r === control) {
      string += ` ${array[r]}`;
    } else {
      string += ` ${array[r]},`;
    }
  }
  return string;
}

// Função que informa o valor selecionado no input radio referente a Avaliação
function labelRateValue() {
  for (let j = 0; j < getLabelRate.length; j += 1) {
    if (getLabelRate[j].checked) {
      return getLabelRate[j].value;
    }
  }
}

// Função que armazenas os dados coletados nas funções acima no localStorage do navegador
function saveData() {
  localStorage.setItem('Nome:', `${getFirstName.value} ${getLastName.value}`);
  localStorage.setItem('Email:', getEmail2.value);
  localStorage.setItem('Casa:', houseValue());
  localStorage.setItem('Família:', familyValue());
  localStorage.setItem('Matérias:', arrayToString(labelCheckboxValue()));
  localStorage.setItem('Avaliação:', labelRateValue());
  localStorage.setItem('Observações:', textArea.value);
}

// Função que remove todas os filhos do elemento form
function removeFormChild() {
  const formChild = getForm.childNodes;
  for (let w = 0; w < formChild.length; w += 1) {
    const position = formChild[w];
    getForm.removeChild(position);
    w -= 1;
  }
}

// Função que cria a lista não ordenada como filha da tag form
function addUnorderedList() {
  const unorderedList = document.createElement('ul');
  unorderedList.className = 'evaluation-form-list';
  getForm.appendChild(unorderedList);
}

// Função que agrega as cinco primeiras informações que devem ser apresentadas como filhas ul presente na tag form
function printListItensStart() {
  const position1 = document.createElement('p');
  const position2 = document.createElement('p');
  const position3 = document.createElement('p');
  const position4 = document.createElement('p');
  const position5 = document.createElement('p');
  position1.innerText = `Nome: ${localStorage.getItem('Nome:')}`;
  position2.innerText = `Email: ${localStorage.getItem('Email:')}`;
  position3.innerText = `Casa: ${localStorage.getItem('Casa:')}`;
  position4.innerText = `Família: ${localStorage.getItem('Família:')}`;
  position5.innerText = `Matérias:${localStorage.getItem('Matérias:')}`;
  getForm.appendChild(position1);
  getForm.appendChild(position2);
  getForm.appendChild(position3);
  getForm.appendChild(position4);
  getForm.appendChild(position5);
}

// Função que agrega as duas últimas informações que devem ser apresentadas como filhas ul presente na tag form
function printListItensEnd() {
  const position6 = document.createElement('p');
  const position7 = document.createElement('p');
  position6.innerText = `Avaliação: ${localStorage.getItem('Avaliação:')}`;
  position7.innerText = `Observações: ${localStorage.getItem('Observações:')}`;
  getForm.appendChild(position6);
  getForm.appendChild(position7);
}

// Função que executa as funções definidas acima na ordem correta após o click no botão de submit
function showData() {
  saveData();
  removeFormChild();
  addUnorderedList();
  printListItensStart();
  printListItensEnd();
}

window.onload = () => {
  getButton.addEventListener('click', validateData);
  getAgree.addEventListener('click', isChecked);
  textArea.addEventListener('input', countText);
  getAgreeBtn.addEventListener('click', showData);
};
