const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Serve pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'projects.html'));
});

app.get('/resume', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'resume.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Get projects
app.get('/api/projects', async (req, res) => {
  try {
    const data = await fs.readFile('db.json', 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).send('Error reading database');
  }
});

// Add a project (for testing)
app.post('/api/projects', async (req, res) => {
  try {
    const data = await fs.readFile('db.json', 'utf8');
    const db = JSON.parse(data);
    db.projects.push(req.body);
    await fs.writeFile('db.json', JSON.stringify(db, null, 2));
    res.status(201).json(req.body);
  } catch (err) {
    res.status(500).send('Error saving project');
  }
});

// Add a contact form submission
app.post('/api/contacts', async (req, res) => {
  try {
    const data = await fs.readFile('db.json', 'utf8');
    const db = JSON.parse(data);
    db.contacts.push({
      id: db.contacts.length + 1,
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      timestamp: new Date().toISOString()
    });
    await fs.writeFile('db.json', JSON.stringify(db, null, 2));
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving message' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));