const express = require('express');

const server = express();

server.use(express.json());

const livros = [
    {   cod:1,
        titulo:"O Guia do Mochileiro das Galaxias",
        autor:"Douglas Adams",
        genero:"aventura - teste1",
        quantidade:2,
    },
]
server.get('/livraria', function (request, response) {
    response.json(livros);
})
server.post('/livraria', function (request, response) {

  /*const cod = request.body.cod;
    const titulo = request.body.titulo;
    const autor = request.body.autor;
    const genero = request.body.genero;
    const quantidade = request.body.quantidade;*/
    //pode ser escrito de maneira simplificada:
    const {cod, titulo, autor, genero, quantidade} = request.body;   //desestruturação possívl no js

    livros.push({cod, titulo, autor,genero, quantidade});
    response.status(204).send();
})
server.put('/livraria/:id', function(request, response) {
    const id = request.params.id ;
    const {cod, titulo, autor, genero, quantidade} = request.body;

    //método de percorrer o vetor:
    for(let i = 0; i < livros.length; i++){
        if (livros[i].cod == id) {
            livros[i].cod = cod;
            livros[i].titulo = titulo;
            livros[i].autor = autor;
            livros[i].genero = genero;
            livros[i].quantidade = quantidade;
            break;
        }
    }
    return response.status(204).send();
})


server.delete('/livraria/:id', function(request, response) {
    const id = request.params.id;
    for (let i = 0; i < livros.length; i++){
        if (livros[i].cod == id) {
            livros.splice(i,1);
            break;
        }
    }
    return response.status(204).send();
})

server.listen(process.env.PORT || 3000);