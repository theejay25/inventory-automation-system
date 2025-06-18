import cron from 'node-cron'
import { cleanUpUnverifiedUsers } from '../utils/userCleanUp.js'

export const cleanUp = () => {
      cron.schedule('0 * * * *', async () => {
    console.log('⏰ Running hourly cleanup for unverified users...');
    await cleanUpUnverifiedUsers();
  });

    console.log('✅ Cleanup cron job scheduled');
};