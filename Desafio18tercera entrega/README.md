Comandos para correr test de carga:
--Modo fork:
Correr el server con npm run start
Abrir otra terminal y ejecutar artillery quick --count 50 -n 40 http://localhost:8080/api/products > fork.txt

--Modo cluster:
Correr el server con npm run startCluster
Abrir otra terminal y ejecutar artillery quick --count 50 -n 40 http://localhost:8080/api/products > cluster.txt