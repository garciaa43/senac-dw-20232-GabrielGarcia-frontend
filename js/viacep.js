//let prompt = require('prompt-sync')();
//let cep = prompt('Informe seu CEP: ');
//buscarCEP(cep);



async function buscarCEP(cep) {
    limpar();
    var txtCep = document.getElementById('txtCep');
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

function preencherCamposComJSON() {

    if(json.bairro) {
        txtBairro.value = json.bairro;
    } else {
        txtBairro.disabled = false;
    }

    txtLocalidade.value = json.localidade;
    if(json.logradouro) {
        txtRua.value = json.logradouro;
    } else {
        txtRua.disabled = false;
    }
    

    txtUf.value = json.uf;

}

function limpar() {
    txtBairro.value = '';
    txtLocalidade.value = '';
    txtUf.value = '';
    txtRua.value = '';
}

function pintarCamposdeVermelho() {
    limpar();
    divDadosEndereco.style = "background-color: red";
    divCEP.style = "background-color: red";
    alert('CEP informado não existe')
}