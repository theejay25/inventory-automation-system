import Users from '../../models/users.js'

// @route   GET /api/admin/all-users
// @desc    Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({
      message: 'All users retrieved successfully',
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to retrieve users',
      error: error.message,
    });
  }
};

// @route   GET /api/admin/users
// @desc    Get users by name
export const getUsersByName = async (req, res) => {
  try {
    const name = req.query.name;

    if (!name) {
      return res.status(400).json({ message: 'Name query is required' });
    }

    const users = await Users.find({ name });

    res.status(200).json({
      message: 'Authorized for route',
      users,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Something went wrong while fetching users',
      error: error.message,
    });
  }
};

//@route PUT /api/admin/:id
//desc update user info