const asyncHandler = require('express-async-handler');
const Payment = require('../models/Payment');
const moment = require('moment');
const { Parser } = require('json2csv');

// GET /admin/reports/monthly-revenue?year=2025
exports.getMonthlyRevenue = asyncHandler(async (req, res) => {
  const year = parseInt(req.query.year) || new Date().getFullYear();

  const start = new Date(`${year}-01-01`);
  const end = new Date(`${year + 1}-01-01`);

  const payments = await Payment.aggregate([
    {
      $match: {
        paymentStatus: 'success',
        paidAt: { $gte: start, $lt: end },
      },
    },
    {
      $group: {
        _id: { $month: '$paidAt' },
        totalRevenue: { $sum: '$amount' },
        totalPayments: { $sum: 1 },
      },
    },
    {
      $sort: { '_id': 1 },
    },
  ]);

  const data = Array.from({ length: 12 }, (_, i) => {
    const monthData = payments.find(p => p._id === i + 1);
    return {
      month: moment().month(i).format('MMMM'),
      revenue: monthData?.totalRevenue || 0,
      payments: monthData?.totalPayments || 0,
    };
  });

  res.status(200).json({
    success: true,
    year,
    data,
  });
});

// GET /admin/reports/monthly-revenue/download?year=2025
exports.downloadMonthlyRevenueCSV = asyncHandler(async (req, res) => {
  const year = parseInt(req.query.year) || new Date().getFullYear();

  const start = new Date(`${year}-01-01`);
  const end = new Date(`${year + 1}-01-01`);

  const payments = await Payment.aggregate([
    {
      $match: {
        paymentStatus: 'success',
        paidAt: { $gte: start, $lt: end },
      },
    },
    {
      $group: {
        _id: { $month: '$paidAt' },
        totalRevenue: { $sum: '$amount' },
        totalPayments: { $sum: 1 },
      },
    },
    {
      $sort: { '_id': 1 },
    },
  ]);

  const data = Array.from({ length: 12 }, (_, i) => {
    const monthData = payments.find(p => p._id === i + 1);
    return {
      Month: moment().month(i).format('MMMM'),
      Revenue: monthData?.totalRevenue || 0,
      Payments: monthData?.totalPayments || 0,
    };
  });

  const parser = new Parser();
  const csv = parser.parse(data);

  res.header('Content-Type', 'text/csv');
  res.attachment(`Monthly_Revenue_Report_${year}.csv`);
  return res.send(csv);
});
