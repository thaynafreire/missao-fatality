const alunos = require('./alunos')
const cursos = require('./cursos')

function getListaDeCursos() {
    if (cursos.length === 0) {
        return false
    }

    var listaCursos = []
    cursos.forEach(function (curso) {
        listaCursos.push(curso); 
    })

    return listaCursos
}
//console.log(getListaDeCursos())

function getListaDeAlunos() {
    if (alunos.length === 0) {
        return false
    }

    var listaAlunos = []

    alunos.forEach(function (aluno) {
        listaAlunos.push({
            foto: aluno.foto,
            nome: aluno.nome,
            matricula: aluno.matricula,
            sexo: aluno.sexo,
            curso: aluno.curso
        })
    })

    return listaAlunos
}
//console.log(getListaDeAlunos())

function getAlunoMatricula(matricula){
    var alunoEncontrado = null
    alunos.forEach(function(item){
        if(String(item.matricula).toUpperCase() == matricula.toUpperCase()){
            alunoEncontrado = {
                foto: item.foto,
                nome: item.nome,
                matricula: item.matricula,
                sexo: item.sexo,
                curso: item.curso
            }
        }
    })
    return alunoEncontrado || false
}

//console.log(getAlunoMatricula('20151001024'))

function getAlunosPorCurso(siglacurso) {

    var alunosEncontradosCurso = []

    alunos.forEach(function(aluno) {
        aluno.curso.forEach(function(curso) {
            if (String(curso.sigla).toUpperCase() == siglacurso.toUpperCase()) {
                alunosEncontradosCurso.push(aluno)
            }
        })
    })

    if (alunosEncontradosCurso.length === 0) {
        return false
    }

    return alunosEncontradosCurso
}

//console.log(getAlunosPorCurso('rds'))

function getAlunoStatus(statuss) {
    var alunosStatus = []

    alunos.forEach(function(aluno) {
       
        if (typeof aluno.status === 'string') {
            if (aluno.status.toUpperCase() == statuss.toUpperCase()) {
                alunosStatus.push(aluno)
            }
        }else{
            aluno.status.forEach(function(status) {
                if (status.toUpperCase() == statuss.toUpperCase()) {
                    alunosStatus.push(aluno)
                }
            })
        }
    })

    if (alunosStatus.length === 0) {
        return false
    }

    return alunosStatus
}

//console.log(getAlunoStatus('cursando'))


function getAlunoCursoStatus(cursosigla, statusdisciplina) {
    var alunoCursoStatus = []

    alunos.forEach(function(aluno){
        aluno.curso.forEach(function(curso){
            if (curso.sigla.toUpperCase() === cursosigla.toUpperCase()){
                curso.disciplinas.forEach(function(disciplina){
                    if (disciplina.status && disciplina.status.toUpperCase() === statusdisciplina.toUpperCase()){
                        alunoCursoStatus.push(aluno)
                    }
                })
            }
        })
    })

    if (alunoCursoStatus.length === 0) {
        return false
    }

    return alunoCursoStatus
}

//console.log(getAlunoCursoStatus('rds','exame'))


function getAlunoCursoAno(siglacurso, anoconclusao){
    var alunoCursoAnoConclusao = []

    alunos.forEach(function(aluno){
        aluno.curso.forEach(function(curso){
            if (curso.sigla.toUpperCase() === siglacurso.toUpperCase()){
                if (curso.conclusao && curso.conclusao.toUpperCase() === anoconclusao.toUpperCase()){
                    alunoCursoAnoConclusao.push(aluno)
                }
            }
        })
    })
    if (alunoCursoAnoConclusao.length === 0){
        return false
    }
    return alunoCursoAnoConclusao
}

//console.log(getAlunoCursoAno('rds', '2023'))

module.exports = {
    getListaDeCursos,
    getListaDeAlunos,
    getAlunoMatricula,
    getAlunosPorCurso,
    getAlunoStatus,
    getAlunoCursoStatus,
    getAlunoCursoAno
}