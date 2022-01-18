Steps para pruebas de carga y profiling:
//Profiling
1- node --prof src/index.js
Para generar el archivo isolate.log
Ese archivo lo renombre a conClog.log
2- artillery quick --count 50 -n 20 "http://localhost:8080/api/info" > profilingConConsoleLog.txt
50 usuarios, 20 request
3- node --prof-process conCLog.log > result_profConCLog.txt
Genero el txt que me permite ver, por ejemplo, en summary, la cantidad de ticks. Cuanto menos ticks haya, mejor rendimiento
//Test de carga
Para hacer los test en el codigo con y sin console.log, lo que hice fue comentar/descomentar las lineas correspondientes en el archivo info.controllers.js
1- npm run startCarga
Tengo configurado ese script en el package.json
2- npm run testCarga