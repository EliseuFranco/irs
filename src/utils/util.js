
function calcGastosComEducação(valor) {
    if (valor > 800){
        return 800 * 0.3
    }
    return valor * 0.3
}

function somaDeducoes(...valoresDaDeducao){
    if(valoresDaDeducao.length === 0){
        return 0
    }
    return valoresDaDeducao.reduce((acc, curr) => acc + curr, 0)
}

const converterNumero = function(valor){
    try {
        return Number(valor)
    } catch (error) {
        return 0
    }
}

function calcGastosComFamilia(...despesasPorPessoa){
    const valorLimite = 250

    if(despesasPorPessoa.length === 0){
        return 0
    }
    return despesasPorPessoa.
    filter(valor => converterNumero(valor) > 0).
    map(valor => Number(valor) * 0.35).reduce((acc, curr) => {
        const aux = Math.min(valorLimite, curr)
        return acc + aux
    } , 0)
}

function bloquearTeclasInvalidas(e){
    const target = e.target

    if (target.type === 'number'){
        const teclasBloqueadas = ['e', 'E', '+', '-', ','];
        if(teclasBloqueadas.includes(e.key)){
            e.preventDefault()
        }
    }
}


export {calcGastosComEducação, somaDeducoes, calcGastosComFamilia, bloquearTeclasInvalidas}
