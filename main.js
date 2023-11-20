const form = document.getElementById('form-atividade'); //Responsavel por chamar o conteudo do formulario
const imgAprovado = '<img src="./img/aprovado.png" alt="Emoji celebrando" />'; // Responsavel por puxar a imagem
const imgReprovado = '<img src="./img/reprovado.png" alt="Emoji decpcionado" />'; // idem acima
const atividades = []; // variavel atividade responsavel por chama-la
const notas = []; // idem acima
const spanAprovado = '<span class="resultado aprovado">aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota minima:")); // responsavel por chamar e transformar a string em numero

let linhas = ''; // variavel

form.addEventListener('submit', function(e) { //responsavel por criar um evento quando for clicado no botao submit e resetar o form!
    e.preventDefault();

    adicionaLinha(); // função
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade'); // chama id correspondente
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)) { // if padrao
        alert(`A atividade: ${inputNomeAtividade.value} ja foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));
    
        let linha = '<tr>'; // variavel criar linha na tabela
        linha += `<td> ${inputNomeAtividade.value}</td>`;
        linha += `<td> ${inputNotaAtividade.value}</td>`;
        linha += `<td> ${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; // mostrar resultado dos inputs !
        linha += '</tr>';
    
        linhas += linha;
    }

    inputNomeAtividade.value = ''; // depois do evento volta string em branco
    inputNotaAtividade.value = '';
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody'); // seleciona a tabela e adiciona linhas com texto
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calcularMedia();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2); // calcula e traz o retorno adicionando texto
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calcularMedia() { // ultima função que junta os dados inseridos e dvide para saber si foi atingida a nota minima !
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length; // retorno do resultado !
}