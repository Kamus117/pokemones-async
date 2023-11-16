const llegada = () => {
    console.log(`He llegado`)
}

const espera = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const RandomError = Math.random() < 0.5;

            if (RandomError) {
                reject(new Error(`Se ha arruinado la fiesta :(`))
            }
            else {
                console.log(`Disfruto la visita`)
                resolve()
            }
        }, 2000)
    })
}

const salida = () => {
    console.log(`He de partir, gracias por todo :)`)
}

const init = async () => {
    try{
        llegada()
        await espera()
        salida()
    }
    catch(error){
        console.error(error);
    }
}

init()