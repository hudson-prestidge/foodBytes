let knexConfig = require('../knexfile').development;
let knex = require('knex')(knexConfig);


const getRecipesTable =  (id)=>{

  return knex('recipes').where('id', id)
}

const getStepsTable =  (id)=>{

  return knex('steps').where('recipe_id', id)
}

// call getStepsTable and store in a letiable
// attach that let to the end getRecipesTable

const getJoinTable = () => {

  return knex('steps')
    .where({recipe_id: 0})
    .select('instructions')
  //return knex.table('recipes').innerJoin('steps', 'recipes.id', '=', 'steps.recipe_id')

}


module.exports = {
  getRecipesTable,
  getStepsTable,
  getJoinTable
}
