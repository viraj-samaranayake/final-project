const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

// Use your actual API key from env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/ai/ask
router.post('/ask', async (req, res) => {
  const { message, role } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4o', // or 'gpt-3.5-turbo'
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant for a ${role} on an online learning platform.`,
        },
        { role: 'user', content: message },
      ],
    });

    const reply = chatCompletion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('AI assistant error:', error);
    res.status(500).json({ error: 'Failed to generate AI response' });
  }
});

module.exports = router;
