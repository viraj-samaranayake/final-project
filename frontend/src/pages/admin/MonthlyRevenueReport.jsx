import { useEffect, useRef, useState } from 'react';
import API from '../../api';
import { ArrowLeft, Download } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const MonthlyRevenueReport = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const reportRef = useRef();

  useEffect(() => {
    fetchReport(year);
  }, [year]);

  const fetchReport = async (selectedYear) => {
    setLoading(true);
    try {
      const res = await API.get(`/admin/reports/monthly-revenue?year=${selectedYear}`);
      setReport(res.data.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDownload = async () => {
    const input = reportRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
    pdf.save(`monthly-revenue-report-${year}.pdf`);
  };

  const chartData = {
    labels: report.map((r) => r.month),
    datasets: [
      {
        label: 'Revenue (LKR)',
        data: report.map((r) => r.revenue),
        fill: true,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
      {/* Back link */}
      <div className="absolute top-6 left-6 z-20">
        <a href="/admin" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Reports</span>
        </a>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto pt-24 pb-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Monthly Revenue Report - {year}
            </h1>
            <button
              onClick={handleDownload}
              className="flex items-center bg-gradient-to-r from-blue-700 to-purple-900 text-white px-4 py-2 rounded-lg hover:shadow-md"
            >
              <Download className="w-4 h-4 mr-2" />
              Download pdf
            </button>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Select Year:</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
            >
              {[...Array(5)].map((_, i) => {
                const y = currentYear - i;
                return <option key={y} value={y}>{y}</option>;
              })}
            </select>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <>
              <div ref={reportRef}>
              <Line data={chartData} />

              <div className="mt-10 overflow-x-auto">
                <table className="min-w-full border text-sm text-left">
                  <thead className="bg-gradient-to-r from-blue-700 to-purple-800 text-white">
                    <tr>
                      <th className="py-2 px-4">Month</th>
                      <th className="py-2 px-4">Revenue (LKR)</th>
                      <th className="py-2 px-4">Payments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.map((row, i) => (
                      <tr key={i} className="border-t text-gray-800">
                        <td className="py-2 px-4">{row.month}</td>
                        <td className="py-2 px-4">{row.revenue.toLocaleString()}</td>
                        <td className="py-2 px-4">{row.payments}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default MonthlyRevenueReport;
