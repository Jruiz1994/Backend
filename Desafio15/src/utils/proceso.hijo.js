const randomList = (cantidad) => {
    let listaRepetidos = {};
    for (let i = 1; i < cantidad; i++) {
        let numeroRandom = Math.floor(Math.random() * 999) + 1;
        if (!listaRepetidos[numeroRandom]) {
            listaRepetidos[numeroRandom] = 0
        }
        listaRepetidos[numeroRandom]++
    }
    return listaRepetidos
}

process.send('estoyListo')
process.on('message', (cantidad) => {
    console.log(cantidad)
    const resultado = randomList(cantidad)
    process.send(resultado)
})