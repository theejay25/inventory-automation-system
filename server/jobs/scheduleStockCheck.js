import cron from 'node-cron'
import { getLowStockProducts } from '../utils/lowStockChecker.js'
const scheduleStockCheck = () => {
    cron.schedule('0 * * * * ', async () => {
    console.log('🔄 Check product stocks')
    await getLowStockProducts()
})}

console.log('✅ stock sheck job scheduled')

export default scheduleStockCheck