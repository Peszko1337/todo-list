const storage = require('azure-storage')
const service = storage.createTableService("todonodefpaccount", "G0O1FrPUjeJUm7cXMx0mlNvrouaGr1Zn0m7dASnyTSJkOoAEJdmBtMIbPuzZzCDzAnRD/gxVship7kcPVzgWjA==")
const table = 'tasks'
const uuid = require('uuid')
const init = async () => (
 new Promise((resolve, reject) => {
 service.createTableIfNotExists(table, (error, result, response) => {
 !error ? resolve() : reject()
 })
 })
)
const addTask = async ({ title }) => (
    new Promise((resolve, reject) => {
      const gen = storage.TableUtilities.entityGenerator
      const task = {
        PartitionKey: gen.String('task'),
        RowKey: gen.String(uuid.v4()),
        title
      }
  
      service.insertEntity(table, task, (error) => {
        !error ? resolve() : reject()
      })
    })
  )
  const listTasks = async () => (
    new Promise((resolve, reject) => {
      const query = new storage.TableQuery()
        .select(['RowKey', 'title'])
        .where('PartitionKey eq ?', 'task')
  
      service.queryEntities(table, query, null, (error, result) => {
        !error ? resolve(result.entries.map((entry) => ({
          id: entry.RowKey._,
          title: entry.title._
        }))) : reject()
      })
    })
  )
  const deleteTask = async ({ id }) => (
    new Promise((resolve, reject) => {
      const gen = storage.TableUtilities.entityGenerator
      const task = {
        PartitionKey: gen.String('task'),
        RowKey: gen.String(id)
      }
  
      service.deleteEntity(table, task, (error) => {
        !error ? resolve() : reject()
      })
    })
  )
module.exports = {
 init, addTask, listTasks, deleteTask
}

