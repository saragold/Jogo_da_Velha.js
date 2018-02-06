/**
 * Created by Gold's on 24/09/2017.
 */
//Var que controla a rodada do jogo
var rodada = 1;

//Criando a matriz bidimensional (Matriz que controla todo o jogo)
var matriz_jogo =  Array(3);

matriz_jogo['A'] = Array(3);
matriz_jogo['B'] = Array(3);
matriz_jogo['C'] = Array(3);

matriz_jogo['A'][1] = 0;
matriz_jogo['A'][2] = 0;
matriz_jogo['A'][3] = 0;

matriz_jogo['B'][1] = 0;
matriz_jogo['B'][2] = 0;
matriz_jogo['B'][3] = 0;

matriz_jogo['C'][1] = 0;
matriz_jogo['C'][2] = 0;
matriz_jogo['C'][3] = 0;

$(document).ready(function () {
   //Recuperando ação atraves do click
    $('#btn-inicia-jogo').click(function () {

       //Validando (Caso os campos estejam vazios)
        if($('#campo-apelido-jd1').val() == ''){
            alert('Apelido jogador 1 não foi preenchido ;)');
            return false;
        }
        if($('#campo-apelido-jd2').val() == ''){
            alert('Apelido jogador 2 não foi preenchido ;)');
            return false;
        }

        //Atribuindo os value dos campos de apelido aos spans das imgs
        $('#jogador1').html($('#campo-apelido-jd1').val());
        $('#jogador2').html($('#campo-apelido-jd2').val());

        //Escondendo/Mostrando as divs
        $('#pagina_inicial').hide();
        $('#palco_jogo').show();
    });
        //Recuperando o id do proprio contexto ID
        $('.jogada').click(function () {
           var id_campo_clicado = this.id;
           $('#' + id_campo_clicado).off(); //Para não sobescrever
           jogada(id_campo_clicado);
        });
        //Função JS de declaração de var das img de marcação e pontos
        function jogada(id) {
            var icone = '';
            var ponto = 0;

            if((rodada % 2) == 1){
                icone = 'url("imagens/marcacao_1.png")';
                ponto = -1;
            }else {
                icone = 'url("imagens/marcacao_2.png")';
                ponto = 1;
            }

            rodada++;

            //Atribuindo img a marcação de cada jogador
            $('#'+id).css('background-image', icone);

            var linha_coluna = id.split('-');

            matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

            verifica_combinacao();
        }
        
        function verifica_combinacao(){

            //verificação na horizontal
            var pontos = 0;
            //noinspection JSDuplicatedDeclaration
            for(var i = 1; i <= 3; i++){
                pontos = pontos + matriz_jogo['A'][i];
            }
            ganhador(pontos);

            pontos = 0;
            //noinspection JSDuplicatedDeclaration
            for(var i = 1; i <= 3; i++){
                pontos = pontos + matriz_jogo['B'][i];
            }
            ganhador(pontos);

            pontos = 0;
            //noinspection JSDuplicatedDeclaration
            for(var i = 1; i <= 3; i++){
                pontos = pontos + matriz_jogo['C'][i];
            }
            ganhador(pontos);

            //verificando na vertical
            for( var l = 1; l <= 3; l++){
                pontos = 0;
                pontos += matriz_jogo['A'][l];
                pontos += matriz_jogo['B'][l];
                pontos += matriz_jogo['C'][l];

                ganhador(pontos);
            }

            //Verificando na diagonal
            pontos = 0;
            pontos = matriz_jogo['A'][1] + matriz_jogo['B'][2] + matriz_jogo['C'][3];
            ganhador(pontos);

            pontos = 0;
            pontos = matriz_jogo['A'][3] + matriz_jogo['B'][2] + matriz_jogo['C'][1];
            ganhador(pontos);
        }

        function ganhador(pontos) {
            if(pontos == -3){
               var jogada_1 = $('#campo-apelido-jd1').val();
                alert(jogada_1 +'é o vencedor(a)!');
                $('.jogada').off();
            }else if (pontos == 3){
                var jogada_2 = $('#campo-apelido-jd2').val();
                alert(jogada_2 + 'é vencedor(a)');
                $('.jogada').off();
            }
        }
});