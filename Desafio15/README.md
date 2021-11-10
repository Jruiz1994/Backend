Ejecutar los siguientes comandos, en este orden:
pm2 start src/server.js --name front --watch
#Este comando corre el front del desafio en localhost

pm2 start src/server.js --name api8082 --watch -- --port 8082
pm2 start src/server.js --name api8083 --watch -- --port 8083
pm2 start src/server.js --name api8084 --watch -- --port 8084
pm2 start src/server.js --name api8085 --watch -- --port 8085
#Estos comandos corren la api en los puertos que se pasan como argumento

sudo service nginx start
#Este comando corre nginx