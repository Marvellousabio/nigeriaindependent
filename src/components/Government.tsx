"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Calendar, Award } from 'lucide-react';

const Government = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const governmentLeaders = {
    president: {
      name: "Bola Ahmed Tinubu",
      position: "President of the Federal Republic of Nigeria",
      image: "/president-tinubu.jpg",
      since: "May 29, 2023",
      party: "All Progressives Congress (APC)"
    },
    vicePresident: {
      name: "Kashim Shettima",
      position: "Vice President of the Federal Republic of Nigeria",
      image: "/vp-shettima.jpg",
      since: "May 29, 2023",
      party: "All Progressives Congress (APC)"
    }
  };

  const nigerianStates = [
    { name: "Abia", capital: "Umuahia", region: "South East", population: "3.7M" },
    { name: "Adamawa", capital: "Yola", region: "North East", population: "4.2M" },
    { name: "Akwa Ibom", capital: "Uyo", region: "South South", population: "5.5M" },
    { name: "Anambra", capital: "Awka", region: "South East", population: "5.5M" },
    { name: "Bauchi", capital: "Bauchi", region: "North East", population: "6.5M" },
    { name: "Bayelsa", capital: "Yenagoa", region: "South South", population: "2.3M" },
    { name: "Benue", capital: "Makurdi", region: "North Central", population: "5.7M" },
    { name: "Borno", capital: "Maiduguri", region: "North East", population: "5.9M" },
    { name: "Cross River", capital: "Calabar", region: "South South", population: "3.7M" },
    { name: "Delta", capital: "Asaba", region: "South South", population: "5.7M" },
    { name: "Ebonyi", capital: "Abakaliki", region: "South East", population: "2.9M" },
    { name: "Edo", capital: "Benin City", region: "South South", population: "4.2M" },
    { name: "Ekiti", capital: "Ado-Ekiti", region: "South West", population: "3.3M" },
    { name: "Enugu", capital: "Enugu", region: "South East", population: "4.4M" },
    { name: "FCT", capital: "Abuja", region: "North Central", population: "3.6M" },
    { name: "Gombe", capital: "Gombe", region: "North East", population: "3.3M" },
    { name: "Imo", capital: "Owerri", region: "South East", population: "5.4M" },
    { name: "Jigawa", capital: "Dutse", region: "North West", population: "5.8M" },
    { name: "Kaduna", capital: "Kaduna", region: "North West", population: "8.3M" },
    { name: "Kano", capital: "Kano", region: "North West", population: "13.1M" },
    { name: "Katsina", capital: "Katsina", region: "North West", population: "7.8M" },
    { name: "Kebbi", capital: "Birnin Kebbi", region: "North West", population: "4.4M" },
    { name: "Kogi", capital: "Lokoja", region: "North Central", population: "4.4M" },
    { name: "Kwara", capital: "Ilorin", region: "North Central", population: "3.2M" },
    { name: "Lagos", capital: "Ikeja", region: "South West", population: "14.0M" },
    { name: "Nasarawa", capital: "Lafia", region: "North Central", population: "2.5M" },
    { name: "Niger", capital: "Minna", region: "North Central", population: "5.6M" },
    { name: "Ogun", capital: "Abeokuta", region: "South West", population: "5.2M" },
    { name: "Ondo", capital: "Akure", region: "South West", population: "4.7M" },
    { name: "Osun", capital: "Osogbo", region: "South West", population: "4.7M" },
    { name: "Oyo", capital: "Ibadan", region: "South West", population: "7.8M" },
    { name: "Plateau", capital: "Jos", region: "North Central", population: "4.2M" },
    { name: "Rivers", capital: "Port Harcourt", region: "South South", population: "7.3M" },
    { name: "Sokoto", capital: "Sokoto", region: "North West", population: "4.9M" },
    { name: "Taraba", capital: "Jalingo", region: "North East", population: "3.0M" },
    { name: "Yobe", capital: "Damaturu", region: "North East", population: "3.3M" },
    { name: "Zamfara", capital: "Gusau", region: "North West", population: "4.2M" }
  ];

  const regions = ["North West", "North East", "North Central", "South West", "South East", "South South"];

  const getStatesByRegion = (region: string) => {
    return nigerianStates.filter(state => state.region === region);
  };

  return (
    <section className="px-4 md:px-10 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Government & States of Nigeria
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn about Nigeria&apos;s federal government structure, current leadership, and explore all 36 states plus the Federal Capital Territory.
          </p>
        </div>

        {/* Government Leaders */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {Object.entries(governmentLeaders).map(([key, leader]) => (
            <div key={key} className="bg-gray-50 rounded-lg p-6 shadow-lg">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-xl font-bold text-green-800 mb-2">{leader.name}</h3>
                  <p className="text-gray-700 font-medium mb-2">{leader.position}</p>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="flex items-center justify-center md:justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      In office since: {leader.since}
                    </p>
                    <p className="flex items-center justify-center md:justify-start">
                      <Award className="w-4 h-4 mr-2" />
                      Party: {leader.party}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* States Overview */}
        <div className="bg-green-50 rounded-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-green-800 mb-4">Federal Republic of Nigeria</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="text-2xl font-bold text-green-600">36</div>
                <div className="text-sm text-gray-600">States</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="text-2xl font-bold text-green-600">1</div>
                <div className="text-sm text-gray-600">FCT</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="text-2xl font-bold text-green-600">6</div>
                <div className="text-sm text-gray-600">Geopolitical Zones</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="text-2xl font-bold text-green-600">223M</div>
                <div className="text-sm text-gray-600">Population</div>
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-center max-w-4xl mx-auto">
            Nigeria operates under a federal presidential republic system with 36 states and the Federal Capital Territory (FCT).
            Each state has its own government structure including a Governor, Deputy Governor, and House of Assembly.
            The six geopolitical zones help organize development and representation across the nation.
          </p>
        </div>

        {/* States by Region */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">States by Geopolitical Zone</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map(region => (
              <div key={region} className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {region}
                </h4>
                <div className="space-y-2">
                  {getStatesByRegion(region).map(state => (
                    <button
                      key={state.name}
                      onClick={() => setSelectedState(selectedState === state.name ? null : state.name)}
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 hover:border-green-300"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800">{state.name}</span>
                        <span className="text-sm text-gray-500">{state.capital}</span>
                      </div>
                      {selectedState === state.name && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                            <span>Capital: {state.capital}</span>
                            <span>Population: {state.population}</span>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Historical Foundation */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4 text-center">Historical Foundation</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-3">Pre-Colonial Era</h4>
              <ul className="space-y-2 text-sm">
                <li>• Ancient kingdoms: Benin, Oyo, Kanem-Bornu, Sokoto Caliphate</li>
                <li>• Nok civilization (500 BC - 200 AD)</li>
                <li>• Trans-Saharan trade routes</li>
                <li>• Diverse ethnic groups and languages</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Modern Nigeria</h4>
              <ul className="space-y-2 text-sm">
                <li>• British colonization (1914 amalgamation)</li>
                <li>• Independence: October 1, 1960</li>
                <li>• Federal Republic established: 1963</li>
                <li>• Current constitution: 1999 (as amended)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Government;