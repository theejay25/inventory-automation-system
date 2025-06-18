import Users from '../models/users.js';

export const cleanUpUnverifiedUsers = async () => {
  const cutoff = new Date(Date.now() - 1 * 60 * 60 * 1000); // 24 hours ago

  try {
    const result = await Users.deleteMany({
      isVerified: false,
      createdAt: { $lt: cutoff },
    });

    console.log(`🧹 Cleaned up ${result.deletedCount} unverified users`);
  } catch (err) {
    console.error('Error during user cleanup:', err);
  }
};
