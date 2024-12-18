let express = require("express")
let app = express();

const datos = ['Elemento 1', 'Elemento 2', 'Elemento 3', 'Elemento 4'];
const autonomousCommunities = [
    { name: "Andalucía", population: 8446561, area: 87599, budget: 33930 },
    { name: "Cataluña", population: 7600065, area: 32114, budget: 33141 },
    { name: "Comunidad de Madrid", population: 6779888, area: 8028, budget: 23456 },
    { name: "Comunidad Valenciana", population: 5003769, area: 23255, budget: 22120 },
    { name: "Galicia", population: 2699499, area: 29574, budget: 14637 },
    { name: "Castilla y León", population: 2399549, area: 94222, budget: 18412 }
  ];

  app.get('/', (req, res) => {
    res.send('¡Hola mundo! Esta es una aplicación web con Express.');
});

app.get('/datos', (req, res) => {
    res.json(datos);
});

app.get('/communities', (req, res) => {
    let filteredCommunities = autonomousCommunities;

    const moreBudgetThan = parseFloat(req.query.moreBudgetThan);
    if (!isNaN(moreBudgetThan)) {
        filteredCommunities = filteredCommunities.filter(
            (com) => com.budget > moreBudgetThan
        );
    }

    const lessPopulationThan = parseFloat(req.query.lessPopulationThan);
    if (!isNaN(lessPopulationThan)) {
        filteredCommunities = filteredCommunities.filter(
            (com) => com.population < lessPopulationThan
        );
    }

    res.json(filteredCommunities);
});

app.get('/communities/:name', (req, res) => {
    const communityName = req.params.name;
    const community = autonomousCommunities.find(
        (com) => com.name.toLowerCase() === communityName.toLowerCase()
    );
    if (community) {
        res.json(community);
    } else {
        res.status(404).send({ error: 'Comunidad no encontrada' });
    }
});

const PORT = 8080;
app.listen(PORT, ()=>{
    console.log("Servidor activo");
})