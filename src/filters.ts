import numeral from 'numeral'

const dollarFilter = function(value : number) {
    if(!value) {
        return '$ 0'
    }
    return numeral(value).format('$0,0.00')
}

const percenterFilter = function(value : number) {
    if(!value) {
        return '0%'
    }
    return numeral(value).format('0,0.00') + '%'
}

const marketFilter = function(value : number) {
    if(!value) {
        return '$ 0'
    }
    return numeral(value).format('$0,0')
}

const circulatingSupplyFilter = function(value : number) {
    if(!value) {
        return '$ 0'
    }
    return numeral(value).format('0,0')
}

export { dollarFilter, percenterFilter, marketFilter, circulatingSupplyFilter }