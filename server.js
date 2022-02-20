// import express package 
const express = require('express');
const { animals } = require('./data/animals.json');

const PORT = process.env.PORT || 3001
const app = express();



function filterByQuery(query, animalsArray){
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // save personality traits as dedicated array
        if (typeof query.personalityTraits === 'string') {
          personalityTraitsArray = [query.personalityTraits];
        } else {
          personalityTraitsArray = query.personalityTraits;
        }
        // loop through each trait in the personality traits array
        personalityTraitsArray.forEach(trait => {
          filteredResults = filteredResults.filter(
            animal => animal.personalityTraits.indexOf(trait) !== -1
          );
        });
      }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // return filtered results
    return filteredResults;
}

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});