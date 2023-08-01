let prompt = require('prompt-sync')();
let cep = prompt('Informe seu CEP: ');
buscarCEP(cep);



async function buscarCEP(cep) {
    const promiseConsultCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const json = await promiseConsultCEP.json();

    console.log(json);
}