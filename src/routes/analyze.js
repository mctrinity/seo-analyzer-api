import express from 'express';
import { analyzeSeo } from '../services/seoAnalyzer.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing ?url=' });

  try {
    const result = await analyzeSeo(url);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to analyze site.' });
  }
});

export default router;
