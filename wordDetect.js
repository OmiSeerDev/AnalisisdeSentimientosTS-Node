"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sentiment = require("sentiment");
var fs = require("fs");
var diccionarioEspaniol = require("natural/lib/natural/sentiment/Spanish/afinnShortSortedSpanish.json");
//Leyendo un documento de texto plano para ser analizado.
var texto = fs.createReadStream(__dirname + "/texto2.txt");
texto.setEncoding("utf-8");
//Iniciando el cliente tipo Sentiment de natural.
var sentimentClient = new Sentiment({
    language: "es",
    trainingData: diccionarioEspaniol,
});
//Función que incluye el análisis del texto y los parámetros para manejar la respuesta.
var evaluarTendenciaDelLenguaje = function (texto) {
    sentimentClient.analyze(texto, { extras: diccionarioEspaniol }, function (err, resultado) {
        console.log("Score: " + resultado.score);
        console.log("Palabras evaluadas: ");
        for (var _i = 0, _a = resultado.words; _i < _a.length; _i++) {
            var palabra = _a[_i];
            console.info(palabra);
        }
        if (resultado.score < 0) {
            console.info("El texto contiene palabras negativas");
        }
        else {
            console.info("El texto contiene palabras positivas");
        }
    });
};
// Agregando una función para manejar la lectura del archivo.
texto.on("data", function (info) {
    console.log("%s", info);
    var stringTexto = info;
    //Al leer un documento, se ejecuta la función de análisis de lenguaje.
    var clasificarTexto = evaluarTendenciaDelLenguaje(stringTexto);
    console.log(clasificarTexto);
});
