import React, { useState } from 'react';
import Navbar from '../../components/Navbar';   
import Footer from '../../components/Footer';


const brandsData = [
  {
    id: "J",
    name: "Jumia",
    industry: "E-COMMERCE",
    complaints: "2,340",
    resolved: "1,520",
    avgDays: "4.7",
    index: "64",
    indexColor: "text-amber-600"
  },
  {
    id: "FB",
    name: "First Bank",
    industry: "BANKING",
    complaints: "1,890",
    resolved: "980",
    avgDays: "6.3",
    index: "55",
    indexColor: "text-amber-600"
  },
  {
    id: "AN",
    name: "Airtel Nigeria",
    industry: "TELECOMS",
    complaints: "2,100",
    resolved: "1,340",
    avgDays: "4.5",
    index: "62",
    indexColor: "text-amber-600"
  },
  {
    id: "D",
    name: "DSTV",
    industry: "ENTERTAINMENT",
    complaints: "1,650",
    resolved: "740",
    avgDays: "7.2",
    index: "49",
    indexColor: "text-red-600"
  },
  {
    id: "I",
    name: "IBEDC",
    industry: "UTILITIES",
    complaints: "980",
    resolved: "280",
    avgDays: "12.5",
    index: "31",
    indexColor: "text-red-600"
  },
  {
    id: "B",
    name: "Bolt",
    industry: "TRANSPORTATION",
    complaints: "760",
    resolved: "520",
    avgDays: "3.8",
    index: "68",
    indexColor: "text-emerald-600"
  },
  {
    id: "AB",
    name: "Access Bank",
    industry: "BANKING",
    complaints: "1,402",
    resolved: "980",
    avgDays: "3.2",
    index: "72",
    indexColor: "text-emerald-600"
  },
  {
    id: "MN",
    name: "MTN Nigeria",
    industry: "TELECOMS",
    complaints: "3,201",
    resolved: "1,840",
    avgDays: "5.1",
    index: "58",
    indexColor: "text-amber-600"
  }
];

const Brands = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBrands = brandsData.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
    {/* Navbar */}
      <Navbar />

    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Brand Directory</h1>
          <p className="text-gray-600 mt-2">
            Accountability scores based on resolution speed and volume.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-10">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 text-sm"
            />
            <span className="absolute left-5 top-4.5 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Brands List */}
        <div className="space-y-4">
          {filteredBrands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white rounded-3xl p-8 flex items-center justify-between border border-gray-100 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-6">
                {/* Logo Circle */}
                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-xl font-bold text-gray-700 group-hover:bg-orange-100 transition-colors">
                  {brand.id}
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-xl text-gray-900">{brand.name}</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                      {brand.industry}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    {brand.complaints} complaints • {brand.resolved} resolved • Avg. {brand.avgDays} days
                  </div>
                </div>
              </div>

              {/* Score */}
              <div className="text-right">
                <div className={`text-5xl font-bold ${brand.indexColor}`}>
                  {brand.index}
                </div>
                <p className="text-xs text-gray-500 tracking-widest mt-1">INDEX</p>
              </div>
            </div>
          ))}
        </div>

        {filteredBrands.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No brands found matching your search.
          </div>
        )}
      </div>
    </div>

    {/* Footer */}
      <Footer />
    </div>
  
);
};

export default Brands;