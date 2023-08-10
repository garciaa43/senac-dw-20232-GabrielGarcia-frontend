//let prompt = require('prompt-sync')();
//let cep = prompt('Informe seu CEP: ');
//buscarCEP(cep);



async function buscarCEP(cep) {
    limpar();
    var txtCep = document.getElementById('cep');
    var cepInformado = txtCep.value;

    const promiseConsultCEP = await fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
    const json = await promiseConsultCEP.json();

    if(json.erro) {
        pintarCamposdeVermelho();
    } else {
        preencherCamposComJSON(json);
    }

    console.log(json);
}

function preencherCamposComJSON(json) {

    if(json.bairro) {
        bairro.value = json.bairro;
    } else {
        bairro.disabled = false;
    }

    cidade.value = json.localidade;
    if(json.logradouro) {
        rua.value = json.logradouro;
    } else {
        rua.disabled = false;
    }
    

    estado.value = json.uf;

}


function pintarCamposdeVermelho() {
    alert('CEP informado não existe')
}


function cadastrar(cep) {
    alert('Ainda não desenvolvido')
}

function limpar() {
    bairro.value = '';
    cidade.value = '';
    estado.value = '';
    rua.value = '';

    
    
}