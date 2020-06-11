const ArticlesService = {
    //using 'db' as parameter here but curriculum uses 'knex' instead
    getAllArticles(db) {
        return db.select('*').from('blogful_articles')
    },
    insertArticle(db, newArticle) {
        return db
               .insert(newArticle)
               .into('blogful_articles')
               .returning('*')
               //will return an array so then 'pull' out the object in the first index [0] position
               .then(array => {
                         return array[0]
                       })
           },
    getById(knex, id) {
       return knex.from('blogful_articles').select('*').where('id', id).first()
     },
    deleteArticle(knex, id) {
           return knex.from('blogful_articles')
             .where({ id })
             .delete()
         },
    updateArticle(knex, id, newArticleFields) {
           return knex.from('blogful_articles')
             .where({ id })
             .update(newArticleFields)
             },
}

module.exports = ArticlesService