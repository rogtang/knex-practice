require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

function searchQueryMatch (searchTerm) {
    knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
        console.log(result)
    })
}

searchQueryMatch('Kale');

function itemPaginate(pageNumber) {
    const itemsPerPage = 6;
    const offset = itemsPerPage * (pageNumber - 1)
    knexInstance
    .select('*')
    .from('shopping_list')
    .limit(itemsPerPage)
    .offset(offset)
    .then(results => {
        console.log(results)
    })
}

itemPaginate(2)

function itemsDateAdded(daysAgo) {
    knexInstance
    .select('*')
    .from('shopping_list')
    .where('date_added', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
    .then(result => {
        console.log(result)
    })
}

itemsDateAdded(3)

function totalCost() {
    knexInstance
    .select('category')
    .sum('price AS total')
    .from('shopping_list')
    .groupBy('category')
    .then(results => {
        console.log(results)
    })
}

totalCost()