const ShoppingListService = {
    getAllItems(db) {
        return db.select('*').from('shopping_list')
    }, 
    insertItem(db, newItem) {
        return db
        .insert('newItem')
        .into('shopping_list')
        .returning('*')
        .then(array => {
            return array[0]
        })
    },
    getById(db, id) {
        return db
        .from('shopping_list')
        .select('*')
        .where('id', id)
        .first()
    },
    deleteItem(db, id) {
        return db
        .from('shopping_list')
        .where('id', id)
        .delete()
    },
    updateItem(db, id, newItemFields) {
        return db
        .from('shopping_list')
        .where('id', id)
        .update(newItemFields)
    }
}

module.exports = ShoppingListService