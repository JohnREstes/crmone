const express = require('express');
const router = express.Router();
const Request = require('../models/request');
const User = require('../models/user');
const { isAuthenticated } = require('../middleware');


// List all requests & load Notifications

router.get('/', isAuthenticated, async (req, res) => {
  try {
    const user = req.user;
    const users = await User.find({}, '_id name profileImage');
    let requests;

    if (req.query.q) {
      // If there's a search query, perform a case-insensitive search on the 'name' field
      requests = await Request.find({ name: { $regex: new RegExp(req.query.q, 'i') } }).populate('owner', '_id name profileImage');
    } else {
      // If there's no search query, list all requests
      requests = await Request.find().populate('owner', '_id name profileImage');
    }

    const notifications = user.notifications;
    // Fetch notifications for the user
    const unreadNotificationCount = notifications.filter(notification => !notification.read).length;

    res.render('dashboard', { requests, users, unreadNotificationCount });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Create a new request
router.get('/create', isAuthenticated, async (req, res) => {
  try {
    const users = await User.find({}, '_id name');
    res.render('create', { users });
  } catch (error) {
    console.error(error);
    res.redirect('/dashboard');
  }
});


router.post('/create', isAuthenticated, async (req, res) => {
  try {
    const { type, name, tag, owner, deadline, status } = req.body;
    const existingRequests = await Request.find();
    const id = existingRequests.length + 1;

    const request = new Request({ id, type, name, tag, owner, deadline, status });
    await request.save();

    // Create a notification for the owner
    const ownerUser = await User.findById(owner);
    if (ownerUser) {
      ownerUser.notifications.push({
        message: `You have been assigned a new ${type}: ${name}`,
        type: 'request',
        data: {
          requestId: request._id,
        },
      });
      await ownerUser.save();
    }

    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Edit a request

router.get('/:id/edit', isAuthenticated, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.redirect('/dashboard');
    }
    const users = await User.find({}, '_id name');
    res.render('edit', { request, users });
  } catch (error) {
    console.error(error);
    res.redirect('/dashboard');
  }
});

router.post('/:id/edit', isAuthenticated, async (req, res) => {
  try {
    const { type, name, tag, owner, deadline, status } = req.body;
    await Request.findByIdAndUpdate(req.params.id, {
      type,
      name,
      tag,
      owner,
      deadline,
      status,
    });
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a request
router.post('/:id/delete', isAuthenticated, async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// List all requests with dynamic search
router.get('/search', isAuthenticated, async (req, res) => {
  try {
    const searchQuery = req.query.q;
    let requests;

    if (searchQuery) {
      // If there's a search query, perform a case-insensitive search on the 'name' field
      requests = await Request.find({
        name: { $regex: new RegExp(searchQuery, 'i') },
      }).populate('owner', '_id name profileImage'); // Populate the owner field with user data
    } else {
      // If there's no search query, list all requests
      requests = await Request.find().populate('owner', '_id name profileImage'); // Populate the owner field with user data
    }

    // Respond with JSON data containing the search results
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
