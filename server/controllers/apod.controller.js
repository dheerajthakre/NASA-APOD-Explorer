const nasaService = require('../services/nasa.service');

function isValidDateString(s) {
  return /^\d{4}-\d{2}-\d{2}$/.test(s);
}

exports.getTodayAPOD = async (req, res, next) => {
  try {
    const data = await nasaService.fetchAPOD({});
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getAPODByDate = async (req, res, next) => {
  try {
    const { date } = req.params;
    if (!isValidDateString(date)) {
      return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
    }
    const data = await nasaService.fetchAPOD({ date });
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getAPODRange = async (req, res, next) => {
  try {
    const { start, end, count } = req.query;

    if (start && end) {
      if (!isValidDateString(start) || !isValidDateString(end)) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
      }
      const data = await nasaService.fetchAPODRange({ start, end });
      return res.json(data);
    }

    if (count) {
      const n = Number(count);
      if (!Number.isInteger(n) || n <= 0 || n > 50) {
        return res.status(400).json({ error: 'count must be an integer between 1 and 50' });
      }
      const data = await nasaService.fetchAPODRange({ count: n });
      return res.json(data);
    }

    // default: last 10 days
    const data = await nasaService.fetchAPODRange({ count: 10 });
    return res.json(data);
  } catch (err) {
    next(err);
  }
};
