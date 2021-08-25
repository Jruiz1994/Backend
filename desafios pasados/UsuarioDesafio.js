class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombrePersona = nombre
        this.apellidoPersona = apellido
        this.librosPersona = libros
        this.mascotasPersona = mascotas
    }

    getFullName() {
        console.log(`${this.nombrePersona} ${this.apellidoPersona}`)
    }

    countMascotas() {
        console.log(this.mascotasPersona.length);
    }

    addBook(libroNuevo, autorNuevo) {
        this.librosPersona.push({ libro: libroNuevo, autor: autorNuevo });
        console.log(`libros`, this.librosPersona)
    }

    getBookNames() {
        this.librosPersona.map((libro) => {
            console.log(libro.libro)
        })
    }
}
let user = new Usuario('Jennifer', 'Ruiz', [{ libro: 'El regalo', autor: 'Fitzek' }, { libro: 'Harry Potter', autor: 'J.K. Rowling' }, { libro: 'Terapia', autor: 'Fitzek' }], ['Potter', 'Ylussa'])

user.getFullName();

user.countMascotas();

user.addBook('El tunel', 'E. Sabato')

user.getBookNames();