/*********************************
 * Objetivo: API para filtrar e retornar dados de cursos e alunos da escola Lion School.
 * Data: 04/12/24
 * Autora: Thayná De OLiveira Freire
 * Versão 1.0
 */

//Primeira coisa a se fazer: Instalações

//criando um objeto express, import das bibliotecas
const express    = require('express')
const cors   = require('cors')
const bodyParser     = require('body-parser')

//Inicia a utilização do express
const app = express()

//respose - significa a resposta da api
//request - Significa a chegada de dados na API

//criando dois argumentos 
app.use((request, response, next) =>{
    //permissão de onde virão as requisições na api (* - Fica liberado para qualquer máquina ou colocar o ip da máquina que vai realizar as requisições)
    response.header('Access-Control-Allow-Origin', '*')


    //permissão de quais métodos http a api irá responder
    response.header('Access-Control-Allow-Methods', 'GET')

    //Aplica as restrições para no CORS da requisição
    app.use(cors())

    next()
})


    //import do arquivo de funções
    const alunosCursos = require('./modulo/funcoes.js')


app.get('/v1/lion-school/cursos', cors(), async function (request, response) {
    let listaDeCursos = alunosCursos.getListaDeCursos()

    if (listaDeCursos) {
        response.status(200)
        response.json(listaDeCursos)
    } else {
        response.status(404)
        response.json({ 'status': 404, 'message': 'Não foram encontrados cursos para retornar' })
    }
})

app.get('/v1/lion-school/alunos', cors(), async function (request, response) {
    let listaDeAlunos = alunosCursos.getListaDeAlunos()

    if (listaDeAlunos) {
        response.status(200)
        response.json(listaDeAlunos)
    } else {
        response.status(404)
        response.json({ 'status': 404, 'message': 'Não foram encontrados alunos para retornar' })
    }
})

app.get('/v1/lion-school/alunos/:matricula', cors(), async function (request, response) {
    let mat = request.params.matricula

    let alunoo = alunosCursos.getAlunoMatricula(mat)

    if(alunoo){
        response.status(200)
        response.json(alunoo)
    }else{
        response.status(400)
        response.json({'status': 404, 'message': 'Aluno não encontrado'})
    }
})

app.get('/v1/lion-school/alunos/cursos/:sigla', cors(), async function (request, response) {
    let siglacurso = request.params.sigla

    let alunoscurso = alunosCursos.getAlunosPorCurso(siglacurso)

    if(alunoscurso){
        response.status(200)
        response.json(alunoscurso)
    }else{
        response.status(400)
        response.json({'status': 404, 'message': 'Cursos e alunos não encontrados'})
    }
})

app.get('/v1/lion-school/alunos/filtro/:status', cors(), async function(request,response){
    let estadostatus = request.params.status

    let alunosstatus = alunosCursos.getAlunoStatus(estadostatus)

    if(alunosstatus){
        response.status(200)
        response.json(alunosstatus)
    }else{
        response.status(400)
        response.json({'status': 404, 'message': 'Não foram encontrados alunos com esse status'})
    }
})

app.get('/v1/lion-school/alunos/filtro/curso/:curso/status/:status', cors(), async function (request, response) {
    let cursoSigla = request.params.curso
    let statusDisciplina = request.params.status

    let alunosFiltrados = alunosCursos.getAlunoCursoStatus(cursoSigla, statusDisciplina)

    if (alunosFiltrados) {
        response.status(200)
        response.json(alunosFiltrados)
    } else {
        response.status(404)
        response.json({
            status: 404,
            message: 'Nenhum aluno encontrado para o curso e status especificados'
        })
    }
})

app.get('/v1/lion-school/alunos/filtro/curso/:curso/conclusao/:conclusao', cors(), async function (request, response) {
    let cursosiglaa = request.params.curso
    let conclusaoDisciplina = request.params.conclusao

    let alunosFiltrados = alunosCursos.getAlunoCursoAno(cursosiglaa, conclusaoDisciplina)

    if (alunosFiltrados) {
        response.status(200)
        response.json(alunosFiltrados)
    } else {
        response.status(404)
        response.json({
            status: 404,
            message: 'Nenhum aluno encontrado para o curso e ano de conclusao especificados'
        })
    }
})



app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições..')
})