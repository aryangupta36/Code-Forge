require('dotenv').config();
const express = require('express');
const path = require('path');
const Groq = require('groq-sdk');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Variable to store the last problem so the AI can give hints/solutions for it
let lastProblem = "";

app.post('/generate-problem', async (req, res) => {
    const { language, topic, difficulty } = req.body;
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: "You are a concise coding coach. Provide a Title, 2-sentence Description, and 1 Example. Keep it short." },
                { role: "user", content: `Generate a ${difficulty} ${language} problem about ${topic}.` }
            ],
            model: "llama-3.3-70b-versatile",
        });
        lastProblem = chatCompletion.choices[0].message.content;
        res.json({ text: lastProblem });
    } catch (error) {
        res.status(500).json({ error: "AI Error" });
    }
});

app.post('/get-help', async (req, res) => {
    const { type } = req.body; // 'hint' or 'solution'
    if (!lastProblem) return res.json({ text: "Please generate a problem first!" });

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: `Give a very brief ${type} for the problem provided by the user. If solution, provide only the code block.` },
                { role: "user", content: `Problem: ${lastProblem}` }
            ],
            model: "llama-3.3-70b-versatile",
        });
        res.json({ text: chatCompletion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Help Error" });
    }
});

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'trial.html')); });
app.listen(3000, () => console.log('🚀 Running at http://localhost:3000'));