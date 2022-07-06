module.exports=(temp,product)=>{
    let display=temp.replace(/{%PRODUCTNAME%}/g,product.productName)
    display=display.replace(/{%IMAGE%}/g,product.image)
    display=display.replace(/{%PRICE%}/g,product.price)
    display=display.replace(/{%FROM%}/g,product.from)
    display=display.replace(/{%NUTRIENTS%}/g,product.nutrients)
    display=display.replace(/{%QUANTITY%}/g,product.quantity)
    display=display.replace(/{%ID%}/g,product.id)
    display=display.replace(/{%DESCRIPTION%}/g,product.description)
    if(!product.organic)display=display.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
    return display
}