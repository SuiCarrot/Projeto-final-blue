var prompt = require('prompt-sync')();

/*-----------------------------------------------DECLARAÇÃO DE VARIAVEIS E OBJETOS---------------------------------------------------------*/
//ARRAY DE MONSTROS PARA SER USADO NA FUNÇÃO CRIARMONSTRO
var gameOver;
let resp;
let dias = 0;
let vidaMAX;

// MONSTROS
const monstros = [
    {
        nome: 'Aranha Gigante',
        vida: 10,
        defesa: 2,
        dano: 5,
        rota: 'floresta',
    },
    {
        nome: 'Lechen',
        vida: 10,
        defesa: 2,
        dano: 5,
        rota: 'floresta',
    },
    {
        nome: 'Lobo Atroz',
        vida: 10,
        defesa: 2,
        dano: 5,
        rota: 'floresta',
    },
    {
        nome: 'Urso Coruja',
        vida: 10,
        defesa: 2,
        dano: 5,
        rota: 'floresta',
    },
    {
        nome: 'Sleipnir',
        vida: 10,
        defesa: 2,
        dano: 5,
        rota: 'montanhas',
    },
    {
        nome: 'Anão Bandido',
        vida: 10,
        defesa: 2,
        dano: 5,
        rota: 'montanhas',
    },
    {
        nome: 'Fenrir',
        vida: 10,
        defesa: 2,
        dano: 5,
        rota: 'montanhas',
    },
    {
        nome: 'Draugr',
        vida: 10,
        defesa: 2,
        dano: 5,
        rota: 'montanhas',
    },
    {
        nome: 'Caçador de recompensas',
        vida: 10,
        defesa: 2,
        dano: 5,
        rota: 'cidade',
    },
];

// PERSONAGENS
const personagens = {
    jogador: {
        nome: 'Jogador',
        vida: 0,
        defesa: 3,
        dano: 5,
    },
    aerin: {
        nome: `Aerin`,
        vida: 20,
        defesa: 5,
        dano: random(6, 8),
    },
};
// EQUIPAMENTOS
const equipamentos = {
    machado: function () {
        personagens.jogador.dano += 3;
        personagens.jogador.defesa -= 3;
    },
    espadaEscudo: function () {
        personagens.jogador.dano -= 1;
        personagens.jogador.defesa += 2;
    },
    arco: function () {
        personagens.jogador.dano += 2;
        personagens.jogador.defesa -= 1;
    },
    armadura: function () {
        personagens.jogador.defesa += 4;
    },
    mjolnir: function () {
        personagens.jogador.dano += 4;
    },
};

/*-------------------------------------------- DECLARAÇÃO DAS FUNÇÕES--------------------------------------------------------------------*/
// FUNÇÃO PARA RETARDAR A CPU
function sleep(segundos = 1) {
    segundos = segundos * 1000;
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > segundos) {
            break;
        }
    }
}

//FUNÇÃO PARA RETARDAR O JOGADOR
function continuar() {
    resp = prompt(`Pressione \x1b[33mENTER\x1b[0m para continuar...`);
    console.clear();
    console.log(
        '-----------------------------------------------------------------------------------------',
    );
}

// FUNÇÃO PARA RANDOMIZAR
function random(minimo = 0, maximo) {
    let max = Math.floor(maximo);
    let min = Math.ceil(minimo);
    let random = Math.random() * (max - min + 1) + min;
    random = parseInt(random);
    return random;
}

//FUNÇÃO DE VALIDAÇÃO DE STRINGS
function validacaoString(resposta, a, b, c, d) {
    //Função de validação para prompt numérico
    while (true) {
        if (resposta == a || resposta == b || resposta == c || resposta == d) {
            return (resp = resposta);
        } else {
            console.log(`Escolha uma das opções: `);
            resposta = prompt(``).toUpperCase().replace(/\s/g, '');
        }
    }
}

//FUNÇAO DE COMBATE
function mortalKombat(qtd, rota) {
    const monstroLUTA = [];
    let bat;

    for (const m of monstros) {
        if (rota == m.rota) {
            monstroLUTA.push(m);
        }
    }

    for (let i = 0; i < qtd; i++) {
        bat = random(0, monstroLUTA.length - 1);
        sleep(2);
        console.log(`\nVocê encontrou um \x1b[36m${monstroLUTA[bat].nome}\x1b[0m`);
        sleep(3);
        console.log(`\nPrepare-se para a batalha`);
        sleep(4);

        while (personagens.jogador.vida > 0 && monstroLUTA[bat].vida > 0) {
            if (monstroLUTA[bat].dano > personagens.jogador.defesa) {
                personagens.jogador.vida -=
                    monstroLUTA[bat].dano - personagens.jogador.defesa;

                monstroLUTA[bat].vida -=
                    personagens.jogador.dano - monstroLUTA[bat].defesa;
            } else {
                monstroLUTA[bat].vida -=
                    personagens.jogador.dano - monstroLUTA[bat].defesa;
            }
            console.log(`Vocês trocam ataques rapidamente....`);
            sleep(3);
            console.log(
                `Sua vida atual: \x1b[31m${personagens.jogador.vida}\x1b[0m:\nVida do monstro: \x1b[31m${monstroLUTA[bat].vida}\x1b[0m\n`,
            );
        }
        if (personagens.jogador.vida > 0) {
            console.log(
                `Parabéns você conseguiu matar \x1b[36m${monstroLUTA[bat].nome}\x1b[0m`,
            );
            gameOver = false;
        } else {
            console.log(`Você morreu para um \x1b[36m${monstroLUTA[bat].nome}\x1b[0m`);
            gameOver = true;
            break;
        }
    }
    console.log('\nSua vida foi restaurada após a batalha');
    if (vidaMAX > personagens.jogador.vida) personagens.jogador.vida = vidaMAX;
}

//FUNÇÃO STATUS DO JOGADOR
function statusJogador() {
    console.log('--------------');
    console.log(`Status de \x1b[31m${personagens.jogador.nome}\x1b[0m:`);
    console.log();
    console.log(
        `\x1b[33mVida\x1b[0m:\t\x1b[32m${personagens.jogador.vida}\x1b[0m\n\x1b[33mDefesa\x1b[0m:\t\x1b[32m${personagens.jogador.defesa}\x1b[0m\n\x1b[33mDano\x1b[0m:\t\x1b[32m${personagens.jogador.dano}\x1b[0m`,
    );
    console.log('--------------');
}

/*================================================================= START GAME ========================================================================*/
do {
    var play = true;
    gameOver = false;
    vidaMAX = 10;
    personagens.jogador.vida = vidaMAX;
    let a = 0;
    let respCorreta = 0;

    console.clear();

    //jogar novamente
    /*============================================================== CAVERNA ==========================================================================*/
    console.log(
        '-----------------------------------------------------------------------------------------',
    );
    sleep(1);
    console.log(
        `O gotejar na caverna te acorda subitamente. Ao abrir lentamente os olhos você sente uma dor de cabeça lancinante, com seus olhos acostumandos a luz baixa da caverna vinda de algum lugar a sua direita, seus pensamentos te levam a um local um pouco aterrorizante...Quem é você?\n`,
    );
    continuar();
    sleep(1);
    console.log(
        `Enquanto tenta vasculhar suas memórias atrás de algo, nada lhe retorna, você abre a boca e consegue falar, boas noticias. Você checa seu corpo e ele está inteiro, mais boas noticias. Ainda sem entender muita coisa você checa seus arredores, percebe que está numa caverna com estalactites acima de você.`,
    );
    sleep(4);

    //LAÇO PARA TRAZER OPÇÕES DA CAVERNA
    do {
        //personagem na caverna
        console.log(
            `Há uma fogueira, agora apenas em brasas, com \x1b[33mCOMIDA\x1b[0m, próximo a ela uma \x1b[33mMOCHILA\x1b[0m e alguns \x1b[33mEQUIPAMENTOS\x1b[0m espalhados. Além é claro, da \x1b[33mSAIDA\x1b[0m da caverna.`,
        );
        console.log('\nO que você quer fazer?');

        resp = prompt().toUpperCase().replace(/\s/g, '');

        validacaoString(resp, 'COMIDA', 'MOCHILA', 'EQUIPAMENTOS', 'SAIDA');
        // console.clear()
        //CONDIÇÃO GAME OVER
        if (resp === 'COMIDA') {
            sleep(1);
            console.log(
                '\nVocê avança até a fogueira e pega alguns pedaços de carnes já quase queimados, pão e um pedaço de queijo que estavam ao lado. Sentindo seu estomago roncar você devora a comida sem pensar duas vezes. Após alguns minutos você começa a sentir sua visão embaçar, a dor de cabeça piorar e logo tudo vai ficando preto, enquanto seu corpo cai em direção ao chão... \x1b[33mVOCÊ MORREU\x1b[0m',
            );
            console.log(
                '-----------------------------------------------------------------------------------------',
            );
            gameOver = true;
            break;
            //CONDIÇÃO DA MOCHILA, MOMENTO IMPORTANTE DA HISTÓRIA PORÉM NÃO FAZ NADA
        } else if (resp === 'MOCHILA' && a == 0) {
            sleep(1);
            console.log(
                `\nNa mochila há algumas roupas e equipamentos básicos de viagem. Junto de um bilhete pedindo para você o encontrar na cidade de Erast. Assinado como Aerin. Tomado por memorias de quando era criança, você lembra de algo:\n\n\x1b[33mQual o seu nome?\x1b[0m`,
            );

            personagens.jogador.nome = prompt();
            console.log();
            continuar();
            a = 1;
        } else if (resp === 'MOCHILA' && a == 1) {
            sleep(1);
            console.log(
                `\nVocê abre a mochila novamente, e vê os mesmos itens e um papel com o seu nome: \x1b[33m${personagens.jogador.nome}\x1b[0m.`,
            );
            continuar();
            //CONDIÇÃO IPORTANTE DE SELEÇÃO DE equipamentos, MAS AINDA NÃO SAI DA CAVERNA
        } else if (resp == 'EQUIPAMENTOS') {
            personagens.jogador.vida = vidaMAX;
            personagens.jogador.dano = random(4, 6);
            personagens.jogador.defesa = 4;
            sleep(1);
            console.log(
                '\nExistem 3 armas dispostas:\n\n\x1b[33mEspada escudo\x1b[0m = \x1b[31m-1\x1b[0m Ataque / \x1b[32m+2\x1b[0m Defesa\n\x1b[33mMachado\x1b[0m = \x1b[32m+3\x1b[0m Ataque / \x1b[31m-3\x1b[0m Defesa\n\x1b[33mArco\x1b[0m = \x1b[32m+2\x1b[0m Ataque / \x1b[31m-1\x1b[0m Defesa',
            );
            //LAÇO PARA USUÁRIO ENTREGAR O VALOR C0RRETO
            console.log();
            resp = prompt().toUpperCase().replace(/\s/g, '');
            validacaoString(resp, 'ESPADAESCUDO', 'MACHADO', 'ARCO');

            if (resp == 'ESPADAESCUDO') {
                equipamentos.espadaEscudo();
            } else if (resp == 'MACHADO') {
                equipamentos.machado();
            } else {
                equipamentos.arco();
            }
            console.log();
            sleep(1);
            statusJogador();
            continuar();
            //CONDIÇÃO PARA SAIDA DA CAVERNA
        } else if (resp == 'SAIDA') {
            sleep(1);
            console.log('\nVocê saiu da caverna');
            sleep(3);
            console.clear();
            break;
        }
        //CONDIÇÃO DE GAME OVER
        if (gameOver == true) break;
    } while (play); ////// Saida da caverna

    while (play) {
        //CONDIÇÃO DE GAME OVER
        if (gameOver == true) break;
        console.log(
            '-----------------------------------------------------------------------------------------',
        );
        sleep(1);
        console.log(
            `Ao sair da caverna, seus olhos demoram alguns segundos para se acostumarem com a luz. O sol brilha alto no céu e o som de passaros e animais rasteiros chega aos seus ouvidos. Andando pela pequena trilha que sai da caverna você chega até uma estrada maior, esta logo se divide em dois caminhos.\n`,
        );

        sleep(4);
        console.log(
            `O caminho da esquerda adentra mais na \x1b[33mFLORESTA\x1b[0m que aos poucos vai ficando mais densa com as copas das arvores competindo com os raios de sol pra ver quem vence.`,
        );

        sleep(3);
        console.log(
            `A segunda trilha começa a subir as \x1b[33mMONTANHAS\x1b[0m com seus picos nevados e cavernas escuras escondendo perigos. Sem conhecer direito do que é capaz, você decide ir por qual caminho?`,
        );

        resp = prompt().toUpperCase().replace(/\s/g, '');
        validacaoString(resp, 'FLORESTA', 'MONTANHAS');

        /*================================================================ FLORESTA =============================================================================*/

        if (resp == 'FLORESTA') {
            dias = 3;
            //Viagem
            for (i = 0; i < dias; i++) {
                console.clear();
                //PRIMEIRO DIA NA FLOESTA
                if (i == 0) {
                    sleep(2);
                    console.log(
                        '\nOk, este é seu primeiro dia na Floresta Amaldiçoada, aparentemente tudo parece calmo.',
                    );
                    sleep(3);
                    console.log(
                        'A noite cai, o frio desce, mas aqui dentro predomina esse amor que me aquece',
                    );
                    sleep(2);
                    mortalKombat(1, 'floresta');
                    if (gameOver == true) break;

                    continuar();
                } else if (i == 1) {
                    sleep(1);
                    console.log(
                        `\n${personagens.jogador.nome} você conseguiu sobreviver ao primeiro dia na floresta, mantenha os olhos atentos.`,
                    );
                    sleep(5);
                    let rand = random(1, 2);
                    if (rand == 1) {
                        console.log('Parece que encontramos algo...');
                        mortalKombat(random(1, 2), 'floresta');

                        if (gameOver == true) break;

                        sleep(1);
                        console.log('\nVocê encontrou a \x1b[33mArmadura Mithral\x1b[0m');
                        vidaMAX += 5;
                        personagens.jogador.vida = vidaMAX;
                        equipamentos.armadura();
                        statusJogador();
                        continuar();
                    } else {
                        sleep(1);
                        console.log('\nVocê encontrou a \x1b[33mArmadura Mithral\x1b[0m');
                        equipamentos.armadura();
                        statusJogador();
                        continuar();
                    }
                } else if (i == 2) {
                    sleep(3);
                    console.log(
                        `\n${personagens.jogador.nome} vamos passar pela parte mais complicada da floresta, mas você está perto de chegar a cidade, não desista.`,
                    );
                    sleep(1);
                    console.log('Parece que encontramos algo...');
                    mortalKombat(random(1, 4), 'floresta');
                    if (gameOver == true) break;
                    continuar();
                }
            }

            /*---------------------------------------------------------Montanhas--------------------------------------------------------------------*/
        } else if (resp == `MONTANHAS`) {
            let dias = 5;
            console.clear();
            //PRÓLOGO DA MONTANHA
            sleep(1);
            console.log(
                `Você começa a jornada em busca de si mesmo, a trilha que vai em direção a montanha começa sem dificuldades, conforme você avança a temperatura vai caindo, os ventos vão ficando mais gélidos e seu corpo vai começando a sentir. Quando chega ao pé da montanha você começa a entender melhor o seu corpo e suas capacidades.\n`,
            );

            sleep(3);
            statusJogador();

            continuar();

            sleep(1);
            console.log(
                `Viajar sobre As Montanhas Gélidas é o caminho mais longo, entretanto é mais seguro que as florestas, não há tantos monstros pelo caminho, mas a escassez de animais e alimentos torna a jornada igualmente complicada.\n`,
            );

            for (i = 0; i < dias; i++) {
                //PRIMEIRO DIA
                if (i == 0) {
                    sleep(1);
                    console.log(
                        `Pela manhã do primeiro dia de viagem, você chegou ao pé da montanha e se deu conta que precisava estocar alimentos antes de continuar. Olhando em volta rapidamente você percebe algumas arvores com \x1b[33mFRUTAS\x1b[0m, além disso você vê rastros de \x1b[33mANIMAIS\x1b[0m e de pequenos \x1b[33mMONSTROS\x1b[0m, ambos dariam um belo jantar.\n`,
                    );

                    //PRIMEIRA DECISÃO, PREPARAÇÃO PARA A JORNADA
                    resp = prompt().toUpperCase().replace(/\s/g, '');
                    validacaoString(resp, 'FRUTAS', 'ANIMAIS', 'MONSTROS');
                    console.clear();

                    //NÃO GANHA NADA
                    if (resp === 'FRUTAS') {
                        sleep(1);
                        console.log(
                            `\nVocê teve sorte e encontrou rapidamente algumas árvores frutíferas, agora já está alimentado e pronto para continuar com a aventura. Rumo a cidade de Erast`,
                        );
                        continuar();

                        //GANHA DEFESA
                    } else if (resp === 'ANIMAIS') {
                        sleep(1);
                        console.log(
                            `\nVocê encontrou algumas frutas e as recolheu, mas logo avistou um cervo! Prontamento o atacou para obter carne e usou sua pele para se proteger do frio, que viria mais tarde.\n`,
                        );
                        sleep(2);
                        console.log(
                            `Você ganhou 1 de defesa, confira seus STATUS atualizados\n`,
                        );
                        personagens.jogador.defesa += 1;
                        statusJogador();
                        continuar();

                        //GANHA DANO
                    } else if (resp === 'MONSTROS') {
                        sleep(1);
                        console.log(
                            `\nVocê procura por um monstro para treinar com o equipamento recém escolhido, visando aumentar seu poder e se possível, se alimentar`,
                        );

                        //PRIMEIRA BATALHA
                        mortalKombat(1, 'montanhas');
                        if (gameOver == true) break;
                        sleep(2);
                        console.log(
                            `\nVocê ganhou 1 de dano, confira seus STATUS atualizados: \n`,
                        );
                        personagens.jogador.dano += 1;
                        personagens.jogador.vida = vidaMAX;
                        statusJogador();
                        continuar();
                    }

                    //SEGUNDO DIA
                } else if (i == 1) {
                    console.clear();
                    sleep(1);
                    console.log(
                        `\nNa manhã do segundo dia, você se deparou com um tempo incívelmente frio, o sol parecia gelado, o terreno era íngreme e irregular. Apesar da forte neblina, você conseguiu avistar uma caverna e pensou em \x1b[33mENTRAR\x1b[0m, mas sabia que uma hora precisaria \x1b[33mCONTINUAR\x1b[0m andando.\n`,
                    );

                    resp = prompt().toUpperCase().replace(/\s/g, '');
                    validacaoString(resp, 'ENTRAR', 'CONTINUAR');
                    console.clear();

                    //SEM RECOMPENSA
                    if (resp === 'ENTRAR') {
                        sleep(1);
                        console.log(
                            `\nVocê entrou na caverna se alimentou do que tinha em sua bolsa e preferiu descansar até o amanhecer do próximo dia`,
                        );

                        //ENCONTRA MONSTRO E GANHA STATUS
                    } else if (resp === 'CONTINUAR') {
                        sleep(2);
                        console.log(
                            `\nVocê se deparou com uma criatura pavorosa, suas únicas opções eram lutar ou morrer!`,
                        );
                        mortalKombat(1, 'montanhas');

                        if (gameOver == true) break;
                        sleep(1);
                        console.log(
                            `\nVocê ganhou 1 de defesa, confira seus STATUS atualizados: \n`,
                        );
                        personagens.jogador.vida = vidaMAX;
                        personagens.jogador.defesa += 1;
                        statusJogador();

                        sleep(2);
                        console.log(
                            `\nVocê adentrou as entranhas do monstro derrotado, e esperou até o amanhecer`,
                        );
                    }

                    continuar();

                    //TERCEIRO DIA
                } else if (i == 2) {
                    console.clear();
                    sleep(1);
                    console.log(
                        `Mais um dia se inicia e você já não sabia mais diferenciar manhã, tarde e noite. O sol parecia congelado e a sensação de morte pairava no ar.\n`,
                    );

                    sleep(2);
                    console.log(
                        `A tarde chegou e você não aguentava mais caminhar, avistou um amontoado de pedras e sabia que precisava \x1b[33mDESCANSAR\x1b[0m, mas seu ímpeto de \x1b[33mPERSISTIR\x1b[0m te deixava em dúvida...\n`,
                    );

                    resp = prompt().toUpperCase().replace(/\s/g, '');
                    validacaoString(resp, 'DESCANSAR', 'PERSISTIR');
                    console.clear();

                    //PERDE O BONÛS
                    if (resp === 'DESCANSAR') {
                        sleep(1);
                        console.log(
                            `Você se deitou sobre a neve se esgueirando entre as pedras. Naquele momento teve a certeza de que se não encontrasse nada no dia seguinte, você morreria de fome`,
                        );

                        //BONÛS DE PERSISTÊNCIA - FACILITA PASSAR PELO DESAFIO
                    } else if (resp === 'PERSISTIR') {
                        sleep(1);
                        console.log(
                            `Você continuava a caminhar, mal conseguia permanecer em linha reta e seus pés estavam dormentes. Até  que você se depara com Yggdrasil, a árvore divina, com frutas douradas e imbuídas de magia. Ao recostar sobre o seu tronco, se encontra envolvido em uma aura de calor e plenitude, se tornando completamente resistente ao frio.\n`,
                        );
                        sleep(3);
                        console.log(
                            `Você acabou de ganhar 5 de vida máxima e 1 de defesa.\nEsses são seus STATUS atualizados:\n `,
                        );
                        vidaMAX += 5;
                        personagens.jogador.vida = vidaMAX;
                        personagens.jogador.defesa += 1;
                        statusJogador();
                    }

                    continuar();

                    //QUARTO DIA
                } else if (i == 3) {
                    console.clear();
                    sleep(1);
                    console.log(
                        `Ao alvorecer do quarto dia de jornada, você avista DOIS monstros vagando livremente, entre as imensas pedras de gelo que haviam acima das montanhas. Eles ainda não te viram e você tem a oportunidade de \x1b[33mFUGIR\x1b[0m, apesar de seu instinto te mandar \x1b[33mLUTAR\x1b[0m.\n`,
                    );

                    resp = prompt().toUpperCase().replace(/\s/g, '');
                    validacaoString(resp, 'LUTAR', 'FUGIR');
                    console.clear();

                    //DROP DE ITEM
                    if (resp === 'LUTAR') {
                        sleep(1);
                        console.log(
                            `Você não resiste a uma batalha e parte para o ataque!!!`,
                        );
                        mortalKombat(2, 'montanhas');

                        if (gameOver == true) break;

                        personagens.jogador.vida = vidaMAX;
                        equipamentos.mjolnir();
                        sleep(1);
                        console.log(
                            `Você acabou de adquirir Mjolnir, a arma lendária das Montanhas Gélidas, agora tem a opção de \x1b[33mEQUIPAR\x1b[0m o novo equipamento, ou apenas \x1b[33mIGNORAR\x1b[0m.\n`,
                        );

                        resp = prompt().toUpperCase().replace(/\s/g, '');
                        validacaoString(resp, 'EQUIPAR', 'IGNORAR');
                        console.clear();

                        if (resp === 'EQUIPAR') {
                            sleep(2);
                            personagens.jogador.dano += 2;
                            console.clear();
                            console.log(
                                `Você equipou a Mjolnir e sente um poder imenso emanando de sua nova arma\nVocê ganhou 2 de dano, confira seus STATUS atualizados: \n`,
                            );
                            statusJogador();
                            continuar();
                        } else if (resp === 'IGNORAR') {
                            sleep(2);
                            console.log(`Você continua sua jornada...\n`);
                            continuar();
                        }

                        //PERDE O ITEM SAGRADO
                    } else if (resp === 'FUGIR') {
                        console.clear();
                        sleep(1);
                        console.log(
                            `Você escapou dos monstros e continuou a caminhar, na esperança de encontrar comida`,
                        );
                    }

                    sleep(2);
                    console.log(
                        `\nAo entardecer você finalmente conseguia ver o final da montanha. A cidade de Erast se aproximava a cada passo. Enquanto descia você avistou um acampamento recém montado, porém vazio, e lá encontrou frutas frescas e carne na fogueira, ainda acesa. Você sabia que precisava \x1b[33mCOMER\x1b[0m, mas talvez \x1b[33mIGNORAR\x1b[0m fosse a melhor opção para evitar conflitos desnecessários.\n`,
                    );

                    //HISTÓRIA
                    resp = prompt().toUpperCase().replace(/\s/g, '');
                    validacaoString(resp, 'COMER', 'IGNORAR');
                    console.clear();

                    if (resp === 'COMER') {
                        sleep(1);
                        console.log(
                            `Você não pensou duas vezes, comeu tudo o que havia ali e fugiu antes que alguém chegasse, continuou a descer As Montanhas Gélidas sem olhar para trás. Até chegar a noite e descansar.`,
                        );
                    } else if (resp === 'IGNORAR') {
                        sleep(1);
                        console.log(
                            `Você estava fraco devido a fome e desmaiou poucos metros após o acampamento. Encontrado por um grupo de aventureiros, você acorda e percebe que essas, são as primeiras pessoas que você viu desde que acordou na caverna.`,
                        );
                        sleep(3);
                        console.log(
                            `\nEles dividem sua comida, bebida e suas histórias com você.`,
                        );
                    }

                    continuar();

                    //QUINTO DIA DA VIAGEM
                } else if (i == 4) {
                    console.clear();
                    sleep(1);
                    console.log(
                        `É um novo dia! Você continua a caminhar e está muito próximo da entrada de Erast. Entretanto, você ouve o som de gritos pedindo por socorro, vindos do acampamento da última montanha.\n`,
                    );

                    sleep(3);
                    console.log(
                        `Você volta rapidamente para ver o que havia ali e se depara com monstros, exterminando facilmente o grupo de aventureiros, você sabia que a culpa era sua, pois haviam seguido seu cheiro.\n`,
                    );

                    sleep(6);
                    console.log(
                        `A culpa e a raiva te diziam pra \x1b[33mLUTAR\x1b[0m, mas pela quantidade de monstros, \x1b[33mFUGIR\x1b[0m seria o mais sensato.\n`,
                    );

                    resp = prompt().toUpperCase().replace(/\s/g, '');
                    validacaoString(resp, 'LUTAR', 'FUGIR');
                    console.clear();

                    //DESAFIO FINAL DA MONTANHA
                    if (resp == 'LUTAR') {
                        mortalKombat(3, 'montanhas');
                        if (gameOver == true) break;
                        sleep(1);
                        console.log(
                            `\nVocê ganhou 2 de defesa e 2 de dano, confira seus STATUS atualizados: \n`,
                        );
                        personagens.jogador.vida = vidaMAX;
                        personagens.jogador.dano += 2;
                        personagens.jogador.defesa += 2;
                        statusJogador();
                        continuar();

                        //DESAFIO FINAL, IMPOSSÍVEL FUGIR
                    } else if (resp === 'FUGIR') {
                        sleep(1);
                        console.log(
                            `\nVocê fugia enquanto ouvia os gritos de agonia dos jovens aventureiros, mas seguia sem olhar pra trás, porém, três monstros te alcançaram, e você percebe que a única coisa que te separava do seu destino era essa batalha!`,
                        );

                        mortalKombat(3, 'montanhas');
                        if (gameOver == true) break;
                        sleep(3);
                        //RECOMPENSA COM BONUS DE STATUS
                        console.log(
                            `\nVocê ganhou 2 de defesa e 2 de dano, confira seus STATUS atualizados: \n`,
                        );
                        personagens.jogador.vida = vidaMAX;
                        personagens.jogador.dano += 2;
                        personagens.jogador.defesa += 2;
                        statusJogador();
                        continuar();
                    } //FIM DA MONTANHA
                }
            }
        }

        if (gameOver == true) break;

        /*-----------------------------------------------------------------CIDADE--------------------------------------------------------------*/
        console.clear();
        sleep(1);
        console.log(
            `\nVocê se aproxima dos grandes muros que protegem a cidade de Erast, os portões de ferro, agora abertos apra permitir a passagem dos aldeões, é vigiado por guardas no chão e nas duas torres da entrada. Com um pouco de apreensão você passa pelo portão, os guardas nem olham para você.`,
        );
        sleep(3);
        console.log(
            `\nAo caminhar pelas ruas largas da cidade, em meio ao burburinho da multidão você se sente renovado por estar de volta a civilização, longe das terras devastadas onde vivem os goblins selvagens.`,
        );
        sleep(3);
        console.log(
            `\nA passos largos você avança até a praça central, olhando em volta você vê mercadores, trabalhadores e todo tipo de pessoas e raças. Ao ver todas essas pessoas uma dor de cabeça lancinante lhe deixa levemente tonto, você lembra de Aerin, na sua infância lhe dando algo. Tão rápido quanto veio a dor ela sumiu, mas a memória permanece.`,
        );
        continuar();

        do {
            ///CIDADE TODA
            sleep(1);
            console.log(
                '\nApós aproveitar brevemente a cidade você começa a pensar no que fazer. \nvocê encontra uma \x1b[33mESTALAGEM\x1b[0m próxima a praça central, pelos barulhos uma das mais movimentas. Você pode \x1b[33mPROCURAR\x1b[0m por Aerin na cidade. Parando para pensar, você poderia voltar pelo portão e \x1b[33mDESISTIR\x1b[0m de encontrar a pessoa de suas memórias também.\n',
            );
            resp = prompt().toUpperCase().replace(/\s/g, '');
            validacaoString(resp, 'ESTALAGEM', 'PROCURAR', 'DESISTIR');
            console.clear();

            if (resp === 'DESISTIR') {
                sleep(1);
                console.log(
                    `\nAo olhar para os grandes portões da cidade e ver toda aquela vida ali dentro subitamente uma idéia passa pela sua cabeça:`,
                );
                continuar();
                sleep(1);
                console.log(
                    `\nSe você não lembra do seu passado, é quase como se você não tivesse um.\n- Nada melhor do que começar uma vida nova em outro lugar - você fala para si mesmo, em um sussurro.`,
                );
                continuar();
                sleep(1);
                console.log(
                    `\nSem olhar para trás você parte para a próxima cidade, indo para longe de Erast, pronto para iniciar uma nova vida. O que o futuro lhe reserva? Ninguém sabe. Mas isso não irá lhe impedir de tentar...`,
                );
                quebra = true;
                gameOver = true;
                break;
            } else if (resp === 'ESTALAGEM') {
                sleep(1);
                console.log(
                    `\nVocê encontra a estalagem do Cervo Flamejante. A taverna lotada e animada é como música em seus ouvidos, atrás do balcão um meio orc sorridente lhe encara, esperando que você peça algo. Cansado de viagem, lhe resta escolher entre \x1b[33mBEBER\x1b[0m algo ou subir para a estalgem e \x1b[33mDESCANSAR\x1b[0m.`,
                );

                validacaoString(resp, 'BEBER', 'DESCANSAR');
                console.clear();

                if (resp === 'BEBER') {
                    sleep(1);
                    console.log(
                        `\nNada melhor depois de uma longa viagem do que beber e comer. Principalmente quando ambos são bons como os de Erast. Enquanto sentava em sua mesa e aproveitava de sua alimentação, você ouviu rumores de um elfo misterioso que comprou uma das casas na cidade alta a pouco tempo, alguns dizem que para fazer experimentos demoníacos.`,
                    );
                    sleep(4);
                    console.log(
                        `\nApós comer e beber, uma bela noite de sono em uma cama de palha lhe aguarda.`,
                    );
                    continuar();
                } else {
                    sleep(1);
                    console.log(
                        `\nCansado de viagem, você não tem nem vontade de se alimentar e vai direto para seu quarto onde uma cama de palha extremamente confortável lhe aguarda.`,
                    );
                    continuar();
                }
            } else if (resp === 'PROCURAR') {
                while (true) {
                    sleep(1);
                    console.log(
                        `\nVocê sai para procurar por Aerin, com as informações do taverneiro você possui duas opções: procurar na \x1b[33mCIDADE ALTA\x1b[0m ou na \x1b[33mCIDADE BAIXA\x1b[0m, para qual você vai?\n`,
                    );
                    resp = prompt().toUpperCase().replace(/\s/g, '');
                    validacaoString(resp, 'CIDADEBAIXA', 'CIDADEALTA');
                    console.clear();

                    if (resp == 'CIDADEBAIXA') {
                        sleep(1);
                        console.log(
                            `\nVocê prefere procurar na cidade baixa primeiro.\nConforme você se aproxima do porto, o cheiro de peixe e agua salgada entra mais em suas narinas, atacando os seus sentidos. Uma discussão acalorada lhe faz olhar para o lado e enquanto fazia isso você sente algo sendo tirado de você. Uma criança correndo entre a multidão agora carrega sua algibeira de moedas. Sem pensar muito e talvez por puro reflexo você corre atrás dela entre as vielas até chegar em um beco. Sua algibeira no chão, ainda com as moedas lhe faz ter um pensamento repentino: "Armadilha". Tão rapido quanto você pensa isso, um movimento as suas costas já faz com que você saque sua arma, apenas para encontrar um bandido com uma adaga em punho.`,
                        );
                        continuar();
                        sleep(1);
                        console.log(
                            `\n- Parece que hoje é meu dia de sorte, encontrar um cara famoso como você, com uma recompensa alta e ainda com poucos equipamentos?!?! Parece que tirei a sorte grande!`,
                        );
                        sleep(10);
                        console.log(
                            `\nAntes que você consiga falar algo, o ladrão ataca.`,
                        );
                        mortalKombat(1, 'cidade');
                        if (gameOver == true) break;
                    } else {
                        let aerinEncontro = 1;
                        sleep(1);
                        console.log(
                            `\nIgnorando a cidade baixa você vai para a região nobre da cidade. Casas cada vez maiores, algumas mansões e até guardas patrulhando algumas regiões. Você nao sabe o porque, mas algo lhe deixa desconfortável aqui, um embruho no estomago, como se tudo lhe deixasse enjoado. Quando você senta em um banco para retomar um ar e se recuperar da tontura uma figura se aproxima de você.`,
                        );
                        continuar();
                        sleep(1);
                        console.log(
                            `\n- Graças aos deuses você chegou, está alguns dias atrasado, comecei a ficar preocupado. Venha, vamos a minha casa para conversarmos com um pouco mais de privacidade.`,
                        );
                        continuar();
                        sleep(1);
                        console.log(
                            `\nAo olhar para a figura que fala com você de forma casual você vê um elfo com cabelos prateados, trajando uma armadura de couro. Seu rosto genuinamente sorridente apenas potencializa o rosto angular e as orelhas pontudas. Subitamente você o reconhece....`,
                        );
                        sleep(10);
                        console.log(`Aerin`);
                        break;
                    }
                }
                if ((aerinEncontro = 1)) {
                    continuar();
                    sleep(1);
                    console.log(
                        `\nAerin te leva até uma casa relativamente pequena em comparação com as casas a sua volta, mas ainda grande comparada com o resto da cidade. Ao entrarem ele lhe aponta para uma poltrona na sala, ao mesmo tempo que senta em outra diretamente a sua frente.\n-Meu amigo, é realmente muito bom lhe ver novamente, espero que tenha tido uma viagem tranquila - o sorriso em seu rosto se esvai, dando lugar a uma expressão séria - Infelizmente precisarei confirmar algumas coisas com você. Perguntas de rotina você já sabe. Vamos lá.`,
                    );
                    continuar();
                    sleep(1);
                    console.log(
                        `\nQuando você era criança e me encontrou na floresta pela primeira vez eu lhe dei um item. Era uma estátua de madeira de um animal, que animal era este?\n\x1b[33mURSO\x1b[0m\n\x1b[33mCORUJA\x1b[0m\n\x1b[33mVACA\x1b[0m.\n`,
                    );
                    resp = prompt().toUpperCase().replace(/\s/g, '');
                    validacaoString(resp, 'URSO', 'CORUJA', 'VACA');

                    if (resp === 'CORUJA') {
                        sleep(1);
                        console.log(
                            `\nAerin sorri levemente\n-Fico comovido por você lembrar, muito bem, próxima pergunta.`,
                        );
                        continuar();
                        respCorreta++;
                    } else {
                        sleep(1);
                        console.log(
                            `\nO rosto de Aerin segue sério\n-Sinceramente achei que você lembraria, bem, próxima pergunta.`,
                        );
                        continuar();
                    }
                    sleep(1);
                    console.log(
                        `\nNuma de suas primeiras batalhas, eu estava presente. Você ainda era um aventureiro iniciante, mas o seu grupo resolveu invadir um covil. O desafio se provou maior do que vocês podiam suportar e eu os resgatei. De que tipos de monstros era o covil? \x1b[33mGOBLINS\x1b[0m, \x1b[33mKOBOLDS\x1b[0m ou \x1b[33mORCS\x1b[0m?\n`,
                    );
                    resp = prompt().toUpperCase().replace(/\s/g, '');
                    validacaoString(resp, 'GOBLINS', 'KOBOLDS', 'ORCS');

                    if (resp == 'GOBLINS') {
                        sleep(1);
                        console.log(
                            `\nUm leve alívio aparece brevemente no rosto do elfo\n-Foi um combate complicado, ter que proteger vocês e ao mesmo tempo acabar com aquelas pestes.`,
                        );
                        continuar();
                        respCorreta++;
                    } else {
                        sleep(1);
                        console.log(
                            `\nAerin suspira, seus olhos demonstram tristeza por alguns segundos e ele logo se recompõem.\n-Uma memória marcante dessas deveria estar gravada em sua mente, pelo que você passou meu amigo? para ter esquecido desse dia.`,
                        );
                        continuar();
                    }
                    sleep(1);
                    console.log(
                        `\nÚltima pergunta, e esse interrogatório acabará. Qual das poções você quer tomar, a  \x1b[33mVERMELHA\x1b[0m ou a \x1b[33mAZUL\x1b[0m?\n`,
                    );
                    resp = prompt().toUpperCase().replace(/\s/g, '');
                    validacaoString(resp, 'VERMELHA', 'AZUL');
                    if (resp === 'VERMELHA') {
                        sleep(2);
                        console.log(
                            `\nVocê bebe a poção vermelha, sua visão começa a ficar turva assim que você larga a poção de volta na mesa. Aos poucos sua visão fica embaçada enquanto Aerin permanece sentado na poltrona, com os dedos cruzados. Você pisca e ele subitamente é um humano negro e calvo, com óculos escuros. Você pisca novamente e ele volta a ser Aerin o elfo. Você pisca novamente e você está em sua casa, sentado em frente ao seu computador, vendo um RPG de texto se desenrolar em sua frente, talvez um pouco confuso, sem entender direito o que acabou de acontecer, mas com a certeza de que lembrará disso por algum tempo...`,
                        );
                        continuar();
                        gameOver = true;
                        break;
                    } else {
                        sleep(1);
                        console.log(
                            `\nAerin senta novamente na poltrona, feliz por você ter escolhido a poção azul.`,
                            respCorreta++,
                        );
                    }
                }
                continuar();
                if (respCorreta > 2) {
                    /////FINAL DA CAMARADAGEM
                    sleep(1);
                    console.log(
                        `\nApós um momento de silêncio, Aerin abre um grande sorriso.\n-Eu sabia que você era você. Nunca que os espiões do império conseguiriam lhe pegar, muito menos quebrar a sua mente. Venha venha, vamos comemorar hoje, e botar em prática o plano para derrubar esse império maldito de Constant amanhã.`,
                    );
                    continuar();

                    sleep(1);
                    console.log(
                        `\nVocês dois passam o dia relembrando de histórias do passado, e aos poucos suas memórias retornam, você lembra de sua infancia pobre em uma fazenda, até começar a vida de aventureiro. Após perder o seu grupo para um esquema corrupto do império você e Aerin montam um grupo de resistência, com planos para derrubar os nobres corruptos de Erast. Você não descobre o que aconteceu para que perdesse sua memória, não que isso o incomode muito, mas a sensação de estar sendo observado as vezes ainda lhe dá arrepios.`,
                    );
                    gameOver = true;
                    break;
                } else {
                    console.log(
                        `\nAerin pega uma garrafa de vinho, bebe um longo gole e levanta da poltrona lentamente.`,
                    );
                    sleep(5);
                    console.log(
                        `\n-Eu não sei o que fizeram com você velho amigo, mas pelo respeito que ainda guardo por você lhe darei uma morte honrada. EM GUARDA!!!`,
                    );
                    sleep(2);
                    console.log(
                        `\nCom um movimento fluido, Aerin saca sua espada e parte para cima de você:`,
                    );
                    do {
                        if (personagens.aerin.dano > personagens.jogador.defesa) {
                            personagens.jogador.vida -=
                                personagens.aerin.dano + personagens.jogador.defesa;
                            personagens.aerin.vida -=
                                personagens.jogador.dano + personagens.aerin.defesa;
                        } else {
                            personagens.aerin.vida -= personagens.jogador.dano;
                        }
                        console.log(
                            `Sua vida atual: \x1b[31m${personagens.jogador.vida}\x1b[0m:\nVida de Aerin: \x1b[31m${monstros[a].vida}\x1b[0m\n`,
                        );
                    } while (personagens.jogador.vida > 0 && personagens.aerin.vida > 0);

                    if (personagens.jogador.vida > 0) {
                        console.log(`\nRápido como começou tudo terminou.`);
                        continuar();
                        sleep(1);
                        console.log(
                            `\nAgindo por instinto, você se defendeu e com movimentos rápidos de um avenrureiro veterano você matou Aerin. Durante o combate suas memórias foram retornando. Você lembra de sua infancia pobre em uma fazenda, até começar a vida de aventureiro. Após perder o seu grupo para um esquema corrupto do império você e Aerin montam um grupo de resistência, com planos para derrubar os nobres corruptos de Erast.`,
                        );
                        continuar();
                        sleep(1);
                        console.log(
                            `\nAo mesmo tempo que o corpo de seu amigo caía inerte no chão, seus joelhos se dobravam e seus olhos começavam a encher de lágrimas. Uma avalanche de memórias começa a atrapalhar todos os seus sentidos, como a morte de Aerin libertasse todas elas de uma prisão. Uma voz rouca e suave ri no fundo de sua cabeça:`,
                        );
                        sleep(8);
                        console.log(`\n-Bom trabalho, muito bom trabalho. HAHAHAHA....`);
                        gameOver = true;
                        quebra = true;
                        break;
                    } else {
                        continuar();
                        sleep(1);
                        console.log(
                            `\nAgindo por instinto, você se defendeu e mesmo com movimentos rápidos de um aventureiro veterano você não conseguiu derrotar Aerin, ele foi mais rápido e mais forte que você. Junto com o golpe final, Aerin lhe segura e deposita gentilmente no chão:`,
                        );
                        sleep(8);
                        console.log(
                            `\n-Vá em paz meu amigo. Irei atrás de quem fez isso com você, e juro pelo meu nome que irei vingá-lo. Descanse agora e nos reencontraremos na outra vida....`,
                        );
                        quebra = true;
                        gameOver = true;
                        break;
                    }
                }
            }
            if (gameOver == true) break;
        } while (true);
    }
    console.log(`\nDeseja jogar novamente, \x1b[33mSIM\x1b[0m ou \x1b[33mNAO\x1b[0m?\n`);

    resp = prompt().toUpperCase().replace(/\s/g, '');
    validacaoString(resp, 'SIM', 'NAO');
    console.log();

    if (resp == 'NAO') {
        play = false;
    } else if (resp == 'SIM') {
        play = true;
    }
    console.clear();
} while (play);
