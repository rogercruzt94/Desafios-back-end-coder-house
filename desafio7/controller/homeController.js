const getDataHome = (req, res) => {
    const data = {
        title: "Desafio Nº7 - Nuestra primera DB",
        content: "En la web se podrán ingresar productos, chatear en tiempo real"
    }
    return res.render(`index`, data);
}

module.exports = {
    getDataHome,
};

