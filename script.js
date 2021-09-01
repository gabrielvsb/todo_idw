class Tarefa {
    /**
     * Construtor da classe.
     */
    constructor(id, titulo, dataDeTermino, estahConcluida) {
      this.id = id;
      this.titulo = titulo;
      this.dataDeTermino = dataDeTermino;
      this.estahConcluida = estahConcluida;
    }
  
    /**
     * Método que alterna o valor do atributo `estahConcluida`.
     */
    alternarSituacao() {
      this.estahConcluida = !this.estahConcluida;
    }
  }

// Variáveis
var tarefas = [];
var editando = null;



// Formulário

function createFormTarefas(){
    // Preparando DIV's
    var divForm = document.getElementById('form-tarefas');
    var divInputsRow = document.createElement('div');
    var divInputsCol = document.createElement('div');
    var divInputsCol2 = document.createElement('div');
    var divInputsCol3 = document.createElement('div');
    var divInputsCol4 = document.createElement('div');
    divInputsRow.classList.add('row');
    divInputsCol.classList.add('col');
    divInputsCol2.classList.add('col');
    divInputsCol3.classList.add('col');
    divInputsCol4.classList.add('col');
    divInputsRow.appendChild(divInputsCol);
    divInputsRow.appendChild(divInputsCol2);
    divInputsRow.appendChild(divInputsCol3);
    divInputsRow.appendChild(divInputsCol4);
    // Criando Botão de mostrar
    var buttonMostrar = document.createElement('button');
    buttonMostrar.innerText = 'Nova tarefa';
    buttonMostrar.classList.add('btn');
    buttonMostrar.classList.add('btn-sm');
    buttonMostrar.classList.add('btn-primary');
    buttonMostrar.addEventListener('click', function(){
        var display = form.style.display;
        if(display == "none"){
            form.style.display = 'block';
            buttonMostrar.innerText = 'Esconder';
        }
        else{
            form.style.display = 'none';
            buttonMostrar.innerText = 'Nova tarefa';
            
        }
    });

    divForm.appendChild(buttonMostrar);
    divForm.appendChild(document.createElement('br'));
    divForm.appendChild(document.createElement('br'));

    // Criando formulário
    var form = document.createElement('form');
    form.style.display = 'none'
    form.appendChild(divInputsRow);

    // Criando input de texto
    var inputTitulo = document.createElement('input');
    inputTitulo.setAttribute('id', 'titulo');
    inputTitulo.setAttribute('name', 'titulo');
    inputTitulo.setAttribute('type', 'text');
    inputTitulo.setAttribute('placeholder', 'Titulo da tarefa');
    inputTitulo.classList.add('inputTitulo');
    inputTitulo.classList.add('form-control');

    // Criando input de data
    var inputData = document.createElement('input');
    inputData.setAttribute('id', 'data-tarefa');
    inputData.setAttribute('name', 'data-tarefa');
    inputData.setAttribute('type', 'date');
    inputData.classList.add('inputData');
    inputData.classList.add('form-control');

    // Criando botão de salvar
    var buttonSalvar = document.createElement('button');
    buttonSalvar.innerText = 'Salvar';
    buttonSalvar.setAttribute('type', 'button');
    buttonSalvar.classList.add('btn');
    buttonSalvar.classList.add('btn-outline-primary');
    // Evento no botão de salvar
    buttonSalvar.addEventListener('click', function(){
        var input = document.getElementById('titulo');
        var inputD = document.getElementById('data-tarefa');
        if(input.value == ''){
            input.focus();
        }else{
            if(inputData.value){
                salvarTarefa(input.value, formatarDataSalvar(inputData.value), false);
                apresentarTarefas();
                input.value = '';
                inputD.value = '';
            }else{
                var data = new Date();
                let dataFormatada = ((data.getFullYear() )) + "-" + ((data.getMonth() + 1)) + "-" + data.getDate();
                salvarTarefa(input.value, formatarDataSalvar(dataFormatada), false);
                apresentarTarefas();
                input.value = '';
                inputD.value = '';
            } 
        }
    })
    // Criando botão de cancelar
    var buttonCancelar = document.createElement('button');
    buttonCancelar.innerText = 'Cancelar';
    buttonCancelar.setAttribute('type', 'button');
    buttonCancelar.classList.add('btn');
    buttonCancelar.classList.add('btn-outline-secondary');
    // Evento no botão de cancelar
    buttonCancelar.addEventListener('click', function(){
        var input = document.getElementById('titulo');
        var inputD = document.getElementById('data-tarefa');
        input.value = '';
        inputD.value = '';
        editando = null;
        apresentarTarefas();
    })
    
    // finalizando form
    divInputsCol.appendChild(inputTitulo);
    divInputsCol2.appendChild(inputData);
    divInputsCol3.appendChild(buttonSalvar);
    divInputsCol4.appendChild(buttonCancelar);
    divForm.appendChild(form);
    inputTitulo.focus();

}

// Formatações
function formatarDataSalvar(input){
    var arrData = input.split('-');
    var dataFormatada = adicionaZero(arrData[2]) + "-" + adicionaZero(arrData[1]) + "-" + arrData[0];
    return dataFormatada
}

function formatarDataEditar(data){
    var arrData = data.split('-');
    var data = arrData[2] + '-' + adicionaZero(arrData[1]) + '-' + adicionaZero(arrData[0]);
    return data;
}

function adicionaZero(numero){
    if (numero <= 9 && numero[0] != 0){
        return "0" + numero;
    }
    else{
        return numero; 
    }
}


// Botões e suas funções
function salvarTarefa(titulo, dataDeTermino, estahConcluida) {
    var id
    if(editando){
        id = editando
        var tarefa = tarefas.find(t => t.id == id);
        tarefa['titulo'] = titulo;
        tarefa['dataDeTermino'] = dataDeTermino;
        editando = null;
    }else{
        if(tarefas.length > 0){
            id = tarefas[tarefas.length - 1]['id'] + 1;
        }else{
            id = tarefas.length + 1;
        }
        tarefas.push(new Tarefa(id, titulo, dataDeTermino, estahConcluida));
    }
}

function buttonConcluirTarefaClick() {
    var id = this.getAttribute('data-tarefas-id');
    var tarefa = tarefas.find(t => t.id == id);
    tarefa.estahConcluida = !tarefa.estahConcluida;
    apresentarTarefas();
  }    

function createButtonConcluir(tarefa) {
    var btnConcluir = document.createElement('button');
    var i = document.createElement('i');
    i.classList.add('fas');
    if (tarefa.estahConcluida) {
      i.classList.add('fa-times');
      btnConcluir.appendChild(i);
      btnConcluir.classList.add('btn-danger');
    } else {
      i.classList.add('fa-check');
      btnConcluir.appendChild(i);
      btnConcluir.classList.add('btn-success');

    }
    btnConcluir.setAttribute('data-tarefas-id', tarefa.id);
    btnConcluir.classList.add('btn');
    btnConcluir.classList.add('btn-sm');
    btnConcluir.classList.add('btnConcluir');
    btnConcluir.addEventListener('click', buttonConcluirTarefaClick);
    return btnConcluir;
  } 

function buttonExcluirTarefaClick(){
    var id = this.getAttribute('data-tarefas-id');
    var tarefa = tarefas.find(t => t.id == id);
    if(editando == tarefa['id']){
        alert('Não é possivel excluir a tarefa que está sendo editada');
        return false;
    }else{
        if(confirm('Tem certeza que deseja excluir esta tarefa?')){
            tarefas.splice(tarefas.indexOf(tarefa), 1);
        }
    }
    apresentarTarefas();
}

function buttonEditarTarefaClick(){
    var id = this.getAttribute('data-tarefas-id');
    var tarefa = tarefas.find(t => t.id == id);
    var input = document.getElementById('titulo');
    var data = document.getElementById('data-tarefa');

    input.value = tarefa['titulo'];
    data.value = formatarDataEditar(tarefa['dataDeTermino']);
    editando = tarefa['id'];
    apresentarTarefas()
}


function createButtonExcuir(tarefa) {
    var btnExcluir = document.createElement('button');
    var i = document.createElement('i');
    i.classList.add('fas');
    i.classList.add('fa-trash-alt');
    btnExcluir.appendChild(i);
    btnExcluir.setAttribute('data-tarefas-id', tarefa.id);
    btnExcluir.addEventListener('click', buttonExcluirTarefaClick);
    btnExcluir.classList.add('btn');
    btnExcluir.classList.add('btn-sm');
    btnExcluir.classList.add('btn-warning');
    btnExcluir.classList.add('btnExcluir');
    return btnExcluir;
  } 

function createButtonEditar(tarefa) {
    var btnEditar = document.createElement('button');
    var i = document.createElement('i');
    i.classList.add('fas');
    i.classList.add('fa-edit');
    btnEditar.appendChild(i);
    btnEditar.setAttribute('data-tarefas-id', tarefa.id);
    btnEditar.addEventListener('click', buttonEditarTarefaClick);
    btnEditar.classList.add('btn');
    btnEditar.classList.add('btn-sm');
    btnEditar.classList.add('btn-secondary');
    return btnEditar;
  } 

// Apresentar tarefas

function apresentarTarefas(){
    var table = document.getElementById('tableTarefas');
    var tbody = document.getElementById('tbodyTarefas');
    if (tbody) {
        tbody.remove();
    }
    tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'tbodyTarefas');
    table.appendChild(tbody);
    for (var tarefa of tarefas) {
        var tr = document.createElement('tr');
        tr.setAttribute('id', `rowTarefas-${tarefa.id}`);
        if (tarefa.estahConcluida) {
            tr.style.backgroundColor = 'lightgreen';
        }
        if(editando == tarefa.id){
            tr.style.backgroundColor = '#a2c1f5';
        }
        var tdId = document.createElement('td');
        tdId.innerHTML = tarefa.id;
        var tdTitulo = document.createElement('td');
        if (tarefa.estahConcluida) {
            var stTitulo = document.createElement('strike');
            stTitulo.innerHTML = tarefa.titulo;
            tdTitulo.appendChild(stTitulo);
        } else {
            tdTitulo.innerHTML = tarefa.titulo;
        }
        var tdTermino = document.createElement('td');
        tdTermino.innerHTML = tarefa.dataDeTermino;
        var tdConcluir = document.createElement('td');
        btnConcluir = createButtonConcluir(tarefa);
        btnExcluir = createButtonExcuir(tarefa);
        btnEditar = createButtonEditar(tarefa);
        tdConcluir.appendChild(btnConcluir);
        tdConcluir.appendChild(btnExcluir);
        tdConcluir.appendChild(btnEditar);
        tr.appendChild(tdId);
        tr.appendChild(tdTitulo);
        tr.appendChild(tdTermino);
        tr.appendChild(tdConcluir);
        tbody.appendChild(tr);
    }
}

function documentLoad(){
    createFormTarefas();
    apresentarTarefas();
}

document.addEventListener('DOMContentLoaded', documentLoad);

