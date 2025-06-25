import cron from 'node-cron'
import checkStocks from '../utils/lowStockChecker.js'

const scheduleStockCheck = () => {
    cron.schedule('*/2 * * * * ', async () => {
    console.log('🔄 Check product stocks')
    await checkStocks()
})}

console.log('✅ stock sheck job scheduled')

export default scheduleStockCheck