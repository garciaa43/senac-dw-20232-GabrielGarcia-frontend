async function cadastrar() {
    let options = {
        method: "POST",
        headers : {"Content-type": "application/json"},
        body : JSON.stringify ({
            nome : document.getElementById("nome").value,
            cnpj : document.getElementById("cnpj").value,
            cep : document.getElementById("cep").value,
            cidade : document.getElementById("cidade").value,
            uf : document.getElementById("uf").value
        })
    }

    
   

    if(validarCampos()) {
        alert("Informe os campos em branco!")
    } else {
        const despesaUsuario = await fetch('http://localhost:8080/api/fabricantes', options);
         const despesaJson = await despesaUsuario.json();
        alert("Cadastro feito com sucesso")
        listarTodos();
    }

}

async function buscarCEP(){
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

    cidade.value = json.localidade;
    uf.value = json.uf;

    
}

async function listarTodos() {
    fetch('http://localhost:8080/api/fabricantes/todos')
    .then(resultado => resultado.json())
    .then(json => { 
        preencherTabela(json);
    });
}


function preencherTabela(jsonFornecedor) {
    limpar();
    var dadosTabelaFornecedor = document.getElementById('corpoTabela');

    for(let i = 0; i < jsonFornecedor.length; i++){
        let novaLinha = dadosTabelaFornecedor.insertRow();

        let celulaId = novaLinha.insertCell();
        celulaId.innerText = jsonFornecedor[i].id;

        let celulaNome = novaLinha.insertCell();
        celulaNome.innerText = jsonFornecedor[i].nome;

        let celulaCnpj = novaLinha.insertCell();
        celulaCnpj.innerText = jsonFornecedor[i].cnpj;

        let celulaCep = novaLinha.insertCell();
        celulaCep.innerText = jsonFornecedor[i].cep;

        let celulaCidade = novaLinha.insertCell();
        celulaCidade.innerText = jsonFornecedor[i].cidade;

        let celulaUf = novaLinha.insertCell();
        celulaUf.innerText = jsonFornecedor[i].uf;
    }

}


async function limpar(){
    document.getElementById("corpoTabela").innerHTML = "";
}


function validarCampos() {
    if(nome.value = '') {
        return true;
    } else if (cnpj.value = '') {
        return true;
    } else if (cep.value = '') {
        return true;
    } else if (cidade.value = '') {
        return true;
    } else if (uf.value = '') {
        return true;
    } else {
        return false;
    }
}