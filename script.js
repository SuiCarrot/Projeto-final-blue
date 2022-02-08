var prompt = require('prompt-sync')();

//////////////////////////////////////////////DECLARAÇÃO DAS FUNÇÕES
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
        if (resposta == a || resposta == b || resposta == c || resposta == d) break;
        else {
            console.log(`Escolha uma das opçòes: `);
            resposta = prompt(``).toUpperCase().replace(/\s/g, '');
        }
    }
    return (resp = resposta);
}

// FUNÇÃO PARA CRIAR MONSTRO
function clearMonstro() {
    monstros.splice(0);
}
function criarMonstro(qtd, a, b) {
    clearMonstro();
    const listNomeMonstro = [
        'Bahamut',
        'Gárgula',
        'Besta-fera',
        'Demônio Ceifador',
        'Batata Assassina',
        'Assassino da Colher',
    ];

    for (let i = 0; i < qtd; i++) {
        let nomeMonstro = listNomeMonstro[random(a, b)];
        let vidaMonstro = random(5, 10);
        let danoMonstro = random(2, 4);

        let monstro = {
            nome: nomeMonstro,
            vida: vidaMonstro,
            dano: danoMonstro,
            id: i,
        };
        monstros.push(monstro);
    }
    return monstros;
}

//FUNÇÃO COMBATE
function mortalKombat(a = 0) {
    do {
        personagens.jogador.vida =
            personagens.jogador.vida - monstros[a].dano + personagens.jogador.defesa;
        monstros[a].vida = monstros[a].vida - personagens.jogador.dano;
    } while (personagens.jogador.vida > 0 && monstros[a].vida > 0);

    if (personagens.jogador.vida > 0) {
        return (gameOver = false);
    } else {
        return (gameOver = true);
    }
}

function ifGameOver(qtd, a, b) {
    criarMonstro(qtd, a, b);
    console.log(`Você encontrou um ${monstros[0].nome}`);
    sleep(1);
    console.log(`Prepare-se para a batalha`);
    mortalKombat();
    sleep(3);
    if (gameOver == true) {
        console.console.log(`Você morreu para um ${monstros[0].nome}`);
    } else {
        personagens.jogador.vida = 10;
        console.log(
            `Parabéns você derrotou um ${monstros[0].nome}\nSua vida foi recuperada após a batalha`,
        );
    }
}

//////////////////////////////////////////////DECLARAÇÃO DE VARIAVEIS E OBJETOS
//ARRAY DE MONSTROS PARA SER USADO NA FUNÇÃO CRIARMONSTRO
const monstros = [];

// PERSONAGENS
const personagens = {
    jogador: {
        vida: 10,
        defesa: 3,
        dano: random(4, 6),
    },
    aerin: {
        nome: `Aerin`,
        vida: 10,
        defesa: 3,
        dano: random(4, 6),
    },
};

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
        personagens.jogador.defesa -= 2;
    },
    armadura: function () {
        personagens.jogador.defesa += 3;
    },
};

let play = true;
let resp;
let gameOver = false;
a = 0;

//SCRIPT
do {
    //jogar novamente
    //INICIO DO GAME NA CAVERNA
    console.log(
        '-----------------------------------------------------------------------------------------',
    );
    console.log(`Personagem acorda sem memórias em uma pequena caverna...`);
    sleep(3);
    console.log(`Ao analisar os arredores vê um pequeno acampamento montado.`);
    sleep(2);
    console.log(
        `Uma fogueira, agora apenas em brasas, com comida, uma mochila e algumas equipamentos espalhadas pelo acampamento.`,
    );
    console.log();

    //LAÇO PARA TRAZER OPÇÕES DA CAVERNA
    do {
        //personagem na caverna
        console.log(
            'Diga o que quer fazer: \nComida \nAbrir Mochila\nPegar uma arma\nSair da caverna ',
        );
        console.log();
        resp = prompt().toUpperCase().replace(/\s/g, '');
        validacaoString(resp, 'COMIDA', 'ABRIRMOCHILA', 'PEGARUMAARMA', 'SAIRDACAVERNA');
        //CONDIÇÃO GAME OVER
        if (resp === 'COMIDA') {
            console.log('A comida estava envenenada e você morreu');
            gameOver = true;
            break;
            //CONDIÇÃO DA MOCHILA, MOMENTO IMPORTANTE DA HISTÓRIA PORÉM NÃO FAZ NADA
        } else if (resp == 'ABRIRMOCHILA' && a == 0) {
            console.log(
                `Na mochila há algumas roupas e equipamentos básicos de viagem. Junto de um bilhete pedindo para o personagens.jogador encontrar na cidade de Erast. Assinado como Aerin. personagens.jogador tomado por memorias de batalha, lembra de seu nome:`,
            );
            personagens.jogador.nome = prompt();

            a = 1;
        } else if (resp == 'ABRIRMOCHILA' && a == 1) {
            console.log(
                `Você abre a mochila novamente, e vê os mesmos itens e um papel com o seu nome: ${personagens.jogador.nome}.`,
            );
            //CONDIÇÃO IPORTANTE DE SELEÇÃO DE equipamentos, MAS AINDA NÃO SAI DA CAVERNA
        } else if (resp == 'PEGARUMAARMA') {
            console.log(
                'Existem 3 equipamentos dispostas:\nEspada escudo = + Defesa -Ataque\nMachado = ++Ataque -- Defesa\nArco = +Ataque - Defesa',
            );
            //LAÇO PARA USUÁRIO ENTREGAR O VALOR C0RRETO
            resp = prompt().toUpperCase().replace(/\s/g, '');
            validacaoString(resp, 'ESPADAESCUDO', 'MACHADO', 'ARCO');
            personagens.jogador.defesa = 3;
            personagens.jogador.dano = random(4, 6);
            if (resp == 'ESPADAESCUDO') {
                equipamentos.espadaEscudo();
            } else if (resp == 'MACHADO') {
                equipamentos.machado();
            } else {
                equipamentos.arco();
            }
            //CONDIÇÃO PARA SAIR DA CAVERNA
        } else if (resp == 'SAIRDACAVERNA') {
            console.log('Você saiu da caverna');
            play = false;
            console.clear();
        }
        //CONDIÇÃO DE GAME OVER
        if (gameOver == true) break;
    } while (play); ////// Saida da caverna

    //CONDIÇÃO DE GAME OVER
    if (gameOver == true) break;
    console.log(
        '-----------------------------------------------------------------------------------------',
    );
    console.log(
        `Blablablabal cenario bonito, blablabalbla, lembra de dois caminhos, blablablabla, floresta ou montanhas?`,
    );
    resp = prompt(``).toUpperCase().replace(/\s/g, '');
    validacaoString(resp, 'FLORESTA', 'MONTANHAS');

  //CONDIÇÃO DE GAME OVER
  if (gameOver == true) break;

  console.log(
    `Blablablabal cenario bonito, blablabalbla, lembra de dois caminhos, blablablabla, floresta ou montanhas?`
  );
  resp = prompt(``).toUpperCase().replace(/\s/g, "");
  validacaoString(resposta, "FLORESTA", "MONTANHAS");

  //////////////////////////////////////////////Floresta
  if (resp == 'FLORESTA') {
    //Viagem
    for (i = 0; i < 3; i++) {
        //PRIMEIRO DIA NA FLOESTA
        if (i == 0) {
            sleep(3);
            console.log('Seu primeiro dia na floresta, tudo parece calmo.');
            ifGameOver(1, 3, 6);
            if (gameOver == true) {
                break;
            } else if (i == 1) {
                let rand = random(1, 2);
                if (rand == 1) {
                    equipamentos.armadura();
                    console.log('Você encontrou uma armadura');
                    criarMonstro(1, 3, 6);
                    console.log(`Você encontrou um ${monstros[0].nome}`);
                    mortalKombat();
                } else {
                    equipamentos.armadura();
                    console.log('Você encontrou uma armadura');
                }
            } else if (i == 2) {
                console.log('teste');
            }
        }
    }
}
  //////////////////////////////////////////////Montanhas
  if (resp == `MONTANHA`) {
    let dias = 5;

    //VIAGEM
    console.log(
      `**** partiu em sua jornada em busca de si mesmo, e assumiu que encontrar Aerin era o o seu destino, mas antes decide checar os seus STATUS, para mensurar o seu poder e evolução`
    );
    console.log();
    prompt(`Digite ENTER para prosseguir...`);
    console.clear();
    console.log();

    console.table(personagens.jogador);
    prompt(`Digite ENTER para prosseguir...`);
    console.clear();
    console.log();

    console.log(`Caminhar sobre As Montanhas Gélidas é o caminho mais longo, apesar de ser mais seguro que a Floresta **** ,
pois não há tantos monstros pelo caminho. Porém, a escassez de animais e alimentos torna a jornada igualmente complicada`);

    console.log();
    prompt(`Digite ENTER para prosseguir...`);
    console.clear();
    console.log();

    for (i = 0; i < dias; i++) {
      if (i == 0) {
        console.log(`Logo pela manhã, do primeiro dia de viagem, ****  chegou ao pé da montanha e percebeu que precisava estocar alimentos antes de continuar.
Digite o que deseja procurar: FRUTA, ANIMAL OU MONSTRO\n`);

        resp = prompt().toUpperCase().replace(/\s/g, "");
        validacaoString(resp, "FRUTA", "ANIMAL", "MONSTRO");

        if (resp === "FRUTA") {
          console.log();
          console.log(
            `Você teve sorte e encontrou rapidamente algumas árvores frutíferas, agora já está alimentado e pronto para continuar com a aventura. Romo a cidade de Erast`
          );
        } else if (resp === "ANIMAL") {
          console.log();
          console.log(`Você encontrou algumas frutas e as recolheu, mas logo avistou um cervo!
prontamento o atacou para obter carne e usou sua pele para se proteger do frio que viria. O dia se encerra com **** pronto para finalmente subir As Montanhas Gélidas`);
        } else if (resp === "MONSTRO") {
          console.log();
          console.log(`Você procura por um monstro para treinar com o equipamento recém escolhido em busca 
de aumentar seu poder, proeficiencia e se alimentar de sua carne`);
          criarMonstro(1, 3, 5);
          mortalKombat();

          if (gameOver == true) {
            console.log();
            console.log(`GAME OVER - Você morreu para um ${monstros[0].nome}`);
            break;
          } else {
            personagens.jogador.vida = 10;
            console.log();
            console.log(`Parabéns você lutou por uma tarde inteira e derrotou um ${monstros[0].nome}. 
Sua vida foi recuperada após a batalha, esses são seus STATUS atualizados: \n`);
            personagens.jogador.dano += 1;
            personagens.jogador.defesa += 1;
            personagens.jogador.vida = 10;
            console.table(personagens.jogador);
          }
        }
        console.log();
        prompt(`Digite ENTER para prosseguir...`);
        console.clear();
        console.log();
      } else if (i == 1) {
        console.log(`Na manhã do segundo dia, **** se deparou com um tempo incívelmente frio, já em cima da montanha, o sol parecia gelado, o terreno era íngreme e irregular, *** se sentia cada vez mais pesado, mas segue caminhando. Apesar da forte neblina **** conseguiu avistar uma caverna.
Digite o que deseja fazer: "ENTRAR", "CONTINUAR"\n`);

        resp = prompt().toUpperCase().replace(/\s/g, "");
        validacaoString(resp, "ENTRAR", "CONTINUAR");

        if (resp === "ENTRAR") {
          console.log();
          console.log(
            `você entrou na caverna se alimentou do que tinha em sua bolsa e preferiu descansar até o amanhecer do próximo dia`
          );
        } else if (resp === "CONTINUAR") {
          criarMonstro(1, 3, 5);
          console.log();
          console.log(
            `Você seguiu caminhando até que encontra um ${monstros[0].nome} e suas únicas opções são lutar ou morrer!`
          );
          mortalKombat();

          if (gameOver == true) {
            console.log();
            console.log(`GAME OVER - Você morreu para um ${monstros[0].nome}`);
            break;
          } else {
            console.log();
            console.log(`Parabéns você derrotou um ${monstros[0].nome}.
Sua vida foi recuperada após a batalha e esses são seus STATUS atualizados: \n`);
            personagens.jogador.vida = 10;
            personagens.jogador.dano += 1;
            personagens.jogador.defesa += 1;
            console.table(personagens.jogador);
          }
        }
        console.log(
          `Você adentrou as entranhas do monstro derrotado, e esperou até o amanhecer\n`
        );
        prompt(`Digite ENTER para prosseguir...`);
        console.clear();
        console.log();
      } else if (i == 2) {
        console.log(`Mais um dia se inicia e **** já não sabia mais diferenciar manhã, tarde e noite, nesse ponto infernal da jornada.
O sol parecia congelado no pico daquela montanha, no horizonte havia o branco e o nada, a pele do cervo já não o aquecia mais`);
        console.log();
        prompt(`Digite ENTER para prosseguir...`);
        console.clear();
        console.log();
        console.log(`A tarde chegou e você não aguentava mais caminhar, avistou um amontoado de pedras e:
Digite o que deseja fazer: "DESCANSAR", "PERSISTIR"\n`);

        resp = prompt().toUpperCase().replace(/\s/g, "");
        validacaoString(resp, "DESCANSAR", "PERSISTIR");

        if (resp === "DESCANSAR") {
          console.log();
          console.log(
            `Você se deitou sobre a neve esgueirado entre as pedras e naquele momento teve a certeza de que se não encontrasse nada no dia seguinte, você morreria`
          );
        } else if (resp === "PERSISTIR") {
          console.log();
          console.log(`Você continua andando já canbaleando e com os pés dormentes, até encontrar Ygdrassil a árvore divina, com frutas douradas e imbuídas de magia. 
Ao comer do fruto mágico e recostar sobre a árvore é envolvido de calor e plenitude, se tornando completamente resistente ao frio.
**** acabou de ganhar 5 de vida máxima e 1 de defesa. Esses são seus STATUS atualizados: \n`);
          personagens.jogador.vida += 5;
          personagens.jogador.defesa += 1;
          console.table(personagens.jogador);
        }
        console.log();
        prompt(`Digite ENTER para prosseguir...`);
        console.clear();
        console.log();
      } else if (i == 3) {
        console.log(`Ao ao alvorecer do quarto dia de jornada, **** se deparou com um urso polar, o primeiro animal que você havia visto desde que caminhava sobre as monstanhas.
Digite o que deseja fazer: "ATACAR", "IGNORAR"\n`);
        resp = prompt().toUpperCase().replace(/\s/g, "");
        validacaoString(resp, "ATACAR", "IGNORAR");

        if (resp === "ATACAR") {
          console.log();
          console.log(
            `**** atacou o animal e o matou sem grandes dificuldades, se alimentou de sua carne e trocou sua capa de cervo pela pele grossa do urso polar, que o torna quase imperceptível na névoa incessante das Montanhas Gélidas`
          );
        } else if (resp === "IGNORAR") {
          console.log();
          console.log(
            `**** ignorou o urso polar e continuou a caminhar, na esperança de encontrar outros animais`
          );
        }
        console.log();
        prompt(`Digite ENTER para prosseguir...`);
        console.clear();
        console.log();
        console.log(`Ao entardecer **** finalmente conseguia ver o final da montanha, ao leste você via o Império de Constant, em frente a Cidade de Erast e ao sul a Floresta Oculta, lugar onde Aerin havia nascido.
**** correu em direção ao pé da montanha e antes de chegar ao final, encontrou um acampamento com comida fresca, frutas e carne assada na fogueira, ainda acesa.
Digite o que deseja fazer: "COMER", "IGNORAR"\n`);

        resp = prompt().toUpperCase().replace(/\s/g, "");
        validacaoString(resp, "COMER", "IGNORAR");
        if (resp == "COMER") {
          console.log();
          console.log(
            `Você não pensou duas vezes, comeu tudo o que havia ali e fugiu antes que alguém chegasse, continuou a dercer As Montanhas Gélidas sem olhar para trás.`
          );
        } else if (resp == "IGNORAR") {
          console.log();
          console.log(`**** estava fraco e desmaiou, poucos metros após o acampamento, foi encontrado e acolhido por um grupo de aventureiros
são as primeiras pessoas que você viu desde a caverna, eles dividem sua comida e bebida com você.
Após a refeição, você se lembra do que é a amizade e a gratidão e dorme com seus novos companheiros.`);
        }
        console.log();
        prompt(`Digite ENTER para prosseguir...`);
        console.clear();
        console.log();
      } else if (i == 4) {
        console.log(`É um novo dia! Você fez amigos e está prestes a adentrar a cidade de Erast. Porém, ao acordar você vê monstros atacando e matando facilmente seus novos companheiros, pois haviam seguido seu cheiro.
Digite o que deseja fazer: "LUTAR", "FUGIR"\n`);

        resp = prompt().toUpperCase().replace(/\s/g, "");
        validacaoString(resp, "LUTAR", "FUGIR");
        if (resp == "LUTAR") {
          criarMonstro(3, 5, 5);
          mortalKombat();

          if (gameOver == true) {
            console.log();
            console.log(
              `GAME OVER - Você morreu para os monstros ${monstros[0].nome}`
            );
            break;
          } else {
            console.log(`**** lutou bravamente e vingou a morte de seus aliados, em um rompante de fúria você conseguiu
destruir os três monstros sozinho. Após derrotar os três ${monstros[0].nome}, **** fica profundamente abalado por não ter sido capaz de proteger seus amigos.
Esses são seus STATUS atualizados: \n`);
            personagens.jogador.vida = 15;
            personagens.jogador.dano += 4;
            console.table(personagens.jogador);
          }
        } else if (resp == "FUGIR") {
          console.log();
          console.log(
            `**** fogia enquanto houvia os gritos de agonia de seus amigos, mas seguia sem olhar pra trás`
          );
        }

        console.log();
        prompt(`Digite ENTER para prosseguir...`);
        console.clear();
        console.log();
      }
    }
  }
  console.log(
    `Você finalmente termina a descida pelas monstanhas se depara com a entrada da cidade de Erast\n`
  );

  //////////////////////////////////////////////Cidade
  if (Cidade) {
    console.log(`Você chega aos portões da cidade de Erast. blablablabla`);
    do {
      //personagem na caverna
      console.log(
        "Diga o que quer fazer: \nDescansar na ESTALAGEM \nPROCURAR por Aerin \nDESISTIR de procurar por Aerin "
      );
      resp = prompt().toUpperCase().replace(/\s/g, "");
      validacaoString(resp, "ESTALAGEM", "PROCURAR", "DESISTIR");
      if ((resp = "ESTALAGEM")) {
        console.log(
          `Você encontra a estalgem do Cervo Flamejante. A taverna lotada e animada é como música em seus ouvidos, atrás do balcão um meio orc sorridente lhe encara, esperando que você peça algo. Cansado de viagem, lhe resta escolher entre BEBER algo ou subir para a estalgem e DESCANSAR.`
        );
        validacaoString(resp, "BEBER", "DESCANSAR");
        if ((resp = "BEBER")) {
          console.log(
            `Nada melhor depois de uma longa viagem do que beber e comer. Principalmente quando ambos são bons como os de Erast. Enquanto sentava em sua mesa e aproveitava de sua alimentação, você ouviu rumores de um elfo misterioso que comprou uma das casas na cidade alta a pouco tempo, alguns dizem que para fazer experimentos demoníacos.`
          );
          console.log(
            `Após comer e beber, uma bela noite de sono em uma cama de palha lhe aguarda.`
          );
        } else {
          console.log(
            `Cansado de viagem, você não tem nem vontade de se alimentar e vai direto para seu quarto onde uma cama de palha extremamente confortável lhe aguarda.`
          );
        }
      }
    } while (true);
  }

} while (play);
/* personagens.jogador.vida = 10; */
