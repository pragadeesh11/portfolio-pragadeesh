// Simple express server to serve static files and handle contact form
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/contact', (req, res) => {
  const {name,email,message} = req.body || {};
  if(!name || !email || !message) return res.status(400).json({message:'Missing fields'});
  const entry = {
    name, email, message, date: new Date().toISOString()
  };
  const outPath = path.join(__dirname, 'contacts.json');
  let arr = [];
  if(fs.existsSync(outPath)) {
    try { arr = JSON.parse(fs.readFileSync(outPath)); } catch(e){}
  }
  arr.push(entry);
  fs.writeFileSync(outPath, JSON.stringify(arr, null, 2));
  return res.json({message:'Thank you! Your message has been recorded.'});
});

app.get('*', (req,res)=> {
  res.sendFile(path.join(__dirname, 'public','index.html'));
});

app.listen(PORT, ()=> console.log('Server running on', PORT));
