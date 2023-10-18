import Sentiment = require("sentiment");
import * as fs from "fs";
const diccionarioEspaniol = require("natural/lib/natural/sentiment/Spanish/afinnShortSortedSpanish.json");

//Leyendo un documento de texto plano para ser analizado.
const texto = fs.createReadStream(__dirname + "/texto2.txt");
texto.setEncoding("utf-8");

//Iniciando el cliente tipo Sentiment de natural.
const sentimentClient = new Sentiment({
  language: "es",
  trainingData: diccionarioEspaniol,
});

//Función que incluye el análisis del texto y los parámetros para manejar la respuesta.
const evaluarTendenciaDelLenguaje = (texto: string) => {
  sentimentClient.analyze(
    texto,
    { extras: diccionarioEspaniol },
    (err: string, resultado: Sentiment.AnalysisResult) => {
      console.log("Score: " + resultado.score);
      console.log("Palabras evaluadas: ");
      for (const palabra of resultado.words) {
        console.info(palabra);
      }

      if (resultado.score < 0) {
        console.info("El texto contiene palabras negativas");
      } else {
        console.info("El texto contiene palabras positivas");
      }
    },
  );
};

// Agregando una función para manejar la lectura del archivo.
texto.on("data", (info) => {
  console.log("%s", info);
  const stringTexto = info as string;

  //Al leer un documento, se ejecuta la función de análisis de lenguaje.
  const clasificarTexto = evaluarTendenciaDelLenguaje(stringTexto);
  console.log(clasificarTexto);
});
