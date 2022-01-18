const random = max => Math.floor(Math.random() * max) + 1;

export const randomList = (cantidad, i = 1, repetidos = {}) => {

    for (i; i < cantidad; i++) {

        const num = random(1000);

        repetidos[num] = repetidos[num] + 1 || 1
    }
    return repetidos
}