
const pathMethod = (req,res) => {
    console.log(`Path : ${req.path} --- Method : ${req.method}`)
}


module.exports = pathMethod;