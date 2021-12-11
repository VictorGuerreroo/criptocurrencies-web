import numeral from 'numeral'

const dollarFilter = function(value : number) {
    if(!value) {
        return '$ 0'
    }
    return numeral(value).format('$0,0.00')
}

export { dollarFilter }