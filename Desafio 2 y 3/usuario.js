// class Usuario{
//   constructor(nombre, apellido, libros, mascotas){
//     this.nombre = nombre,
//     this.apellido = apellido,
//     this.libros = libros,
//     this.mascotas = mascotas
//   }


//   function getFullName(chabon){
//     return `${this.nombre} ${this.apellido}`;
//   }
// }


// let jenny = new Usuario('jenny', 'ruiz', 'Harry Potter', 'Potter');

// getFullName(jenny)



// const arr = [];
// arr = [1, 2, 3, 4];
// arr.push(1, 2, 3, 4);
// console.log(arr);

//EJERCICIO PARA VER AMBITO(SCOPE) DE UNA VARIABLE
// function crearNombre(nombre) {
//     const apellido = 'Ruiz';

//     function apellidoPibe(apellidoU) {
//         console.log(`${nombre} ${apellidoU}`)
//     }
//     apellidoPibe(apellido);
// }

// crearNombre('Jennifer');



//EJERCICIO EN CLASE
// const nombre = 'pepe';
// console.log(nombre)
// let edad = 25;
// console.log(edad)
// edad += 1;
// console.log(edad)
// const precio = '$99,90';
// console.log(precio)
// const series = ['Dark', 'Mr. Robot', 'Castlevania'];
// console.log(series)
// series.push('Two and a half men')
// console.log(series)
// const peliculas = [{
//     nombre: 'Harry Potter',
//     anio: 2000,
//     protagonistas: ['Daniel Raddcliffe', 'Emma Watson', 'Rupert Grint']
// }, {
//     nombre: 'Avengers Endgame',
//     anio: 2019,
//     protagonistas: ['Robert Downey Jr.', 'Chris Heimsworth', 'Scarlet Johnson']
// }]
// console.log(peliculas)





//DEFINICION DE VARIABLES EN TYPESCRIPT
// interface peliculas {
//     {
//         nombre: string, 
//         anio: number,
//         protagonistas: string[]
//     }
// }

// interface persona {
//     nombre: string,
//         edad: number,
//         precio: number,
//         series: string[],
//         peliculas: peliculas
// }

//FUNCION ANONIMA
// (function(datos) {
//     if (datos.length < 1) {
//         console.log('Lista vacia')
//     } else {
//         console.log(datos)
//     }
// })([]);

//FUNCION NORMAL
// function mostrarLista(datos) {
//     if (datos.length < 1) {
//         console.log('Lista vacia')
//     } else {
//         console.log(datos)
//     }
// }
// mostrarLista([1, 2, 3])



// function crearMultiplicador(num1) {
//     return (function(num2) {
//         return num1 * num2
//     })(4)

// }
// console.log(crearMultiplicador(7));

// function duplicar(num1) {
//     return crearMultiplicador(num1) * 5
// }

// console.log(duplicar(3))


//Callbacks
// function dividir(dividendo, divisor) {
//     return new Promise((resolve, reject) => {
//         if (divisor === 0) {
//             reject('No se puede dividir')
//         } else {
//             resolve(dividendo / divisor)
//         }
//     })
// }

// dividir(10, 0)
//     .then((resultado) => console.log(`El resultado es ${resultado}`))
//     .catch((error) => console.log(error))

// dividir(10, 3)
//     .then((resultado) => console.log(`El resultado es ${resultado}`))
//     .catch((error) => console.log(error))

//ejercicio en clase
function MostrarLetras(palabra, termine) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < palabra.length) {
            console.log(palabra[i])
            i++
        } else {
            clearInterval(timer)
            termine()
        }
    }, 1000)
}

const fin = () => console.log('termine')

setTimeout(() => { MostrarLetras('prueba', fin) }, 0)
    // setTimeout(() => { MostrarLetras('prueba', fin) }, 250)
    // setTimeout(() => { MostrarLetras('prueba', fin) }, 500)