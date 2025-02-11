
// controllers/urlController.js
const Url = require('../models/Url');
const shortid = require('shortid');
const validUrl = require('valid-url');

exports.shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!validUrl.isUri(originalUrl)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }
    let url = await Url.findOne({ originalUrl });
    if (!url) {
      const shortUrl = shortid.generate();
      url = new Url({ originalUrl, shortUrl });
      await url.save();
    }
    res.json({ shortUrl: url.shortUrl });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });
    if (url) {
      return res.redirect(url.originalUrl);
    } 
    res.status(404).json({ error: 'URL not found' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};