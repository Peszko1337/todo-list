const storage = require('azure-storage')
const service = storage.createTableService("todonodefpaccount", "G0O1FrPUjeJUm7cXMx0mlNvrouaGr1Zn0m7dASnyTSJkOoAEJdmBtMIbPuzZzCDzAnRD/gxVship7kcPVzgWjA==")
const table = 'tasks'
const init = async () => (
 new Promise((resolve, reject) => {
 service.createTableIfNotExists(table, (error, result, response) => {
 !error ? resolve() : reject()
 })
 })
)
module.exports = {
 init
}
