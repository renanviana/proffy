import knex from 'knex' // querys sql em javascript
import path from 'path' // facilitar a manipulacao de paths 

const db = knex({
    client: 'sqlite3', // definir qual banco de dados sera usado
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite') // caminho para criar arquivo do banco em memoria
    },
    useNullAsDefault: true // setar nulo em campos que nao foram atribuidos valores

})

export default db