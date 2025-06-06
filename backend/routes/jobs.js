import express from 'express';
import Job from '../models/Job.js';

const router = express.Router();


// POST to /api/jobs
router.post('/', async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error: error.message });
  }
});

// GET from /api/jobs
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    const jobs = userId ? await Job.find({ userId }) : await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
});

export default router;
