
const perguntasDatabase = [
    { // pergunta 1
        'pergunta' : 'O coronavírus é transmitido pelo ar ?',
        'respostas' : [
            'Não',
            'Sim'
        ],
        'correta' : 0
    },
    { // pergunta 2
        'pergunta' : 'Ao chegar em casa com as compras, devo',
        'respostas' : [
            'pedir ajuda para as pessoas que moram comigo.',
            'higienizar todos os produtos.',
            'guarda-las imediatamente.'
        ],
        'correta' : 1
    },
    { // pergunta 3
        'pergunta' : 'Que hábito é extremamente eficaz contra vírus ?',
        'respostas' : [
            'Lavar corretamente as mãos.',
            'Não coçar os olhos.',
            'Limpar as mãos com uma toalha.',
            'Descartar corretamente o lixo.'
        ],
        'correta' : 0
    },
    { // pergunta 4
        'pergunta' : 'Em qual região da China surgiu o novo coronavírus ?',
        'respostas' : [
            'Hengdu, China',
            'Shandong, China',
            'Wuhan, China',
            'Hainan, China'
        ],
        'correta' : 2
    },
    { // pergunta 5
        'pergunta' : 'Quanto tempo o novo coronavírus sobrevive em superfícies ?',
        'respostas' : [
            '86 horas',
            '72 horas',
            '48 horas',
            '23 horas'
        ],
        'correta' : 1
    },
    { // pergunta 6
        'pergunta' : 'Como deve ser feito o período de quarentena em casa para quem está com sintomas ?',
        'respostas' : [
            'Deve ser um período de folga do trabalho, aproveitando para se divertir se os sintomas não forem fortes',
            'Deve ser um período de isolamento domiciliar, aproveitando para trabalhar extra ou fazer reformas em casa',
            'Deve ser um período de isolamento social, apenas com contato com os outros moradores da casa',
            'Deve ser um período de isolamento domiciliar, evitando contato também com os outros moradores da casa'
        ],
        'correta' : 3
    },
    { // pergunta 7
        'pergunta' : 'Considerando as formas de transmissão do novo coronavírus, quais objetos podemos compartilhar ?',
        'respostas' : [
            'Copos',
            'Nenhum',
            'Máscaras',
            'Celulares'
        ],
        'correta' : 1
    },
    { // pergunta 8
        'pergunta' : 'Quando tossir, qual a melhor coisa a se fazer para evitar contaminar outras pessoas ?',
        'respostas' : [
            'Cobrir a boca com a mão',
            'Tossir para o alto',
            'Usar a dobra do antebraço',
            'Tossir para onde estão as pessoas'
        ],
        'correta' : 2
    },
    { // pergunta 9
        'pergunta' : 'Quais são as formas mais eficazes de previnir-se do novo coronavírus ?',
        'respostas' : [
            'Tomar vitaminas todos os dias.',
            'Fazer gargarejo com água morna, sal e vinagre de manhã e de noite.',
            'Vacina para gripe.',
            'Usar máscara, Lavar as mãos, Manter uma distância segura e ficar em casa sempre que possível.'
        ],
        'correta' : 3
    },
    { // pergunta 10
        'pergunta' : 'Quem foram as brasileira que sequenciaram o genoma do coronavírus ?',
        'respostas' : [
            'Nadia Ayad e Bertha Lutz',
            'Ester Sabino e Jaqueline Goes de Jesus',
            'Sonja Ashauer e Graziela Maciel Barroso',
            'Johanna Dobereiner e Jaqueline Goes de Jesus'
        ],
        'correta' : 1
    }
];

// função para incluir arquivo HTML do exercício
var obtemHTML = function(arquivo, selector) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4){
            const responseHTML = xhr.responseText;
            let child = document.createElement('div');
            child.innerHTML = responseHTML;
            document.getElementById(selector).prepend( child);

            inputMaxValue();
            obtemJS(arquivo.replace(/html/g, 'js'));
        }
    };

    xhr.open('GET', arquivo);
    xhr.send();
};

// função para incluir arquivo JS do exercício
var obtemJS = function(arquivo) {
    var s = document.createElement('script')
    s.src = arquivo;
    document.body.appendChild(s);
}

// função para o evento de input para evitar números maiores que os permitido no input[max=x]
var redefineInputMaxValue = function(e) {
    const max = parseInt(this.max);
    if (parseInt(this.value) > max) {
        this.value = max;
    }
};

// função para mapear os input
var inputMaxValue = function(){
    let numeros = document.getElementsByTagName("input");
    for(var i = 0; i < numeros.length; i++)
    {
        if ( numeros[i].hasAttribute('max') ) {
            numeros[i].removeEventListener('input', redefineInputMaxValue);
            numeros[i].addEventListener("input", redefineInputMaxValue);
        }
    }

};

function popularPergunta(indice) {
    perguntaIndice.innerHTML = 'Pergunta ' + indice + '/' + perguntasDatabase.length;
    perguntaTexto.innerHTML = perguntasDatabase[indice-1].pergunta;

    document.getElementById('p-avancar').style.display = 'none';
    document.getElementById('p-responder').style.display = 'block';

    perguntaRespostas.innerHTML = '';
    for ( let i = 0; i < perguntasDatabase[indice-1].respostas.length; i++ ) {
        const node = document.createElement('li');
        node.innerHTML = '' +
            '<label><input type="radio" name="respostas" value="' + i + '">' +
            perguntasDatabase[indice-1].respostas[i] +
            '</label>'
        ;
        perguntaRespostas.appendChild(node);
    }

    menuNavegacao.children[indice-1].setAttribute('class', 'active');
}



let respostasCertas = 0;
let perguntaAtual = 1;

const menuNavegacao = document.getElementById('perguntas-indice'),
    iniciarJogoBtn = document.getElementsByClassName('iniciar-jogo'),
    perguntas = document.getElementById('perguntas'),
    perguntaIndice = document.getElementById('pergunta-indice'),
    perguntaTexto = document.getElementById('pergunta-texto'),
    perguntaRespostas = document.getElementById('pergunta-respostas'),
    perguntaRespostasChecked = document.getElementsByName('respostas'),
    resultadoGeral = document.getElementById('resultado-geral'),
    resultadoGeralPontuacao = document.getElementById('resultado-pontuacao');

(function() {
    for ( let i = 0; i < iniciarJogoBtn.length; i++ ) {
        iniciarJogoBtn[i].addEventListener('click', function(){

            document.getElementById('introducao').style.display = 'none';
            resultadoGeral.style.display = 'none';
            respostasCertas = 0;
            perguntaAtual = 1;

            for ( let i = 0; i < menuNavegacao.children.length; i++ ) {
                menuNavegacao.children[i].setAttribute('class', '');
            }

            popularPergunta(perguntaAtual);

            perguntas.style.display = 'block';
        });
    }

    document.getElementById('p-responder').addEventListener('click', function(){
        let respostaEscolhida = undefined;

        for (let i = 0; i < perguntaRespostasChecked.length; i++ ) {
            if ( perguntaRespostasChecked[i].checked ) {
                respostaEscolhida = parseInt(perguntaRespostasChecked[i].value);
            }
        }

        let respostaTipo = '';

        if ( typeof respostaEscolhida == 'undefined' ) {
            alert('Escolha uma resposta antes de continuar');
            return false;
        } else if ( respostaEscolhida === perguntasDatabase[perguntaAtual - 1].correta ) {
            respostaTipo = 'correta';
            respostasCertas++;
        } else {
            respostaTipo = 'errada';
        }

        for ( let i = 0; i < perguntaRespostas.children.length; i++ ) {
            perguntaRespostasChecked[i].setAttribute('disabled', 'disabled');
            perguntaRespostas.children[i].setAttribute('class', '');
            if ( respostaEscolhida === i ) {
                perguntaRespostas.children[i].setAttribute('class', respostaTipo);
            }
        }

        this.style.display = 'none';
        document.getElementById('p-avancar').style.display = 'block';

    });

    document.getElementById('p-avancar').addEventListener('click', function(){

        if ( perguntaAtual == perguntasDatabase.length ) {
            resultadoGeralPontuacao.innerHTML = 'Sua pontuação: ' + respostasCertas + '/' + perguntasDatabase.length;
            perguntas.style.display = 'none';
            resultadoGeral.style.display = 'block';

            menuNavegacao.children[menuNavegacao.children.length - 1].setAttribute('class', 'active');
        } else {
            let respostaEscolhida = null;

            for (let i = 0; i < perguntaRespostasChecked.length; i++ ) {
                if ( perguntaRespostasChecked[i].checked ) {
                    respostaEscolhida = perguntaRespostasChecked[i].value;
                }
            }

            if ( ! respostaEscolhida ) {
                alert('Escolha uma resposta antes de continuar');
            } else {
                popularPergunta(++perguntaAtual);
            }
        }

    });

}());
