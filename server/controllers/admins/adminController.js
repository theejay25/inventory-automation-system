import Users from '../../models/users.js'
import { verifyEmail } from '../authController.js';

// @route   GET /api/admin/all-users
// @desc    Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();

    const formattedUsers = users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      salary: user.salary,
      workingDays: user.workingDays,
      workingHours: user.workingHours
    }));

    res.status(200).json({
      message: 'All users retrieved successfully',
      users: formattedUsers,
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
    const name = req.query.name?.trim(); // Trim input
    const role = req.query.role;

    if (!name) {
      return res.status(400).json({ message: 'Name query is required' });
    }

    // Build dynamic query object
    const query = {
      name: { $regex: new RegExp(name, 'i') } // Case-insensitive search
    };

    if (role) {
      query.role = role;
    }

    const users = await Users.find(query);

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found with that name' });
    }

    res.status(200).json({
      message: 'Users retrieved successfully',
      users: users.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      })),
    });

  } catch (error) {
    console.error('Error fetching users by name:', error);
    res.status(500).json({
      message: 'Something went wrong while fetching users',
      error: error.message,
    });
  }
};


//@route PUT /api/admin/update-user/:id
//desc update user info
//@route PUT /api/admin/update-user/:id
//desc update user info
export const adminUpdates = async (req, res) => {
  const { id } = req.params;
  const { salary, workingDays, workingHours } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ success: false, message: 'No id provided in the parameter' });
    }

    const existingUser = await Users.findById(id);

    if (!existingUser) {
      return res.status(404).json({ success: false, message: 'User with this ID does not exist' });
    }

    if (salary) existingUser.salary = salary;
    if (workingDays) existingUser.workingDays = workingDays;
    if (workingHours) existingUser.workingHours = workingHours;

    await existingUser.save();

    res.status(200).json({
      success: true,
      message: 'User info successfully updated',
      user: {
        name: existingUser.name,
        email: existingUser.email,
        id: existingUser._id,
        salary: existingUser.salary,
        workingDays: existingUser.workingDays,
        workingHours: existingUser.workingHours
      }
    });

  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ success: false, message: 'Error in updating user data' });
  }
};


//@route PUT /api/admin/make-admin/:id
//desc make user an admin
//@route PUT /api/admin/make-admin/:id
//desc make user an admin
//@route PUT /api/admin/make-admin/:id
//desc make user an admin
export const makeAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ success: false, message: "No ID provided in the request parameters" });
    }

    const existingUser = await Users.findById(id); // ❗ added `await`

    if (!existingUser) {
      return res.status(404).json({ success: false, message: 'User with this ID does not exist' });
    }

    if (existingUser.role === 'admin') {
      return res.status(400).json({ success: false, message: 'The user is already an admin' });
    }

    existingUser.role = 'admin';
    await existingUser.save();

    res.status(200).json({
      success: true,
      message: 'User has successfully been made an admin',
      user: {
        name: existingUser.name,
        email: existingUser.email,
        id: existingUser._id,
        role: existingUser.role
      }
    });

  } catch (error) {
    console.error('Make admin error:', error);
    res.status(500).json({ success: false, message: 'Error in making user admin' });
  }
};

