import React from 'react';

function FilterSearch({ onFilterChange }) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Search Filter</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">City Name:</label>
                <input 
                    type="text" 
                    placeholder="Enter city name" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => onFilterChange('city', e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Section:</label>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <input 
                            type="checkbox" 
                            id="molestation" 
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            onChange={(e) => onFilterChange('molestation', e.target.checked)}
                        />
                        <label htmlFor="molestation" className="ml-2 text-sm text-gray-600">Molestation</label>
                    </div>
                    <div className="flex items-center">
                        <input 
                            type="checkbox" 
                            id="kidnapping" 
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            onChange={(e) => onFilterChange('kidnapping', e.target.checked)}
                        />
                        <label htmlFor="kidnapping" className="ml-2 text-sm text-gray-600">Kidnapping</label>
                    </div>
                    <div className="flex items-center">
                        <input 
                            type="checkbox" 
                            id="rape" 
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            onChange={(e) => onFilterChange('rape', e.target.checked)}
                        />
                        <label htmlFor="rape" className="ml-2 text-sm text-gray-600">Rape Cases</label>
                    </div>
                    <div className="flex items-center">
                        <input 
                            type="checkbox" 
                            id="murder" 
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            onChange={(e) => onFilterChange('murder', e.target.checked)}
                        />
                        <label htmlFor="murder" className="ml-2 text-sm text-gray-600">Murder Cases</label>
                    </div>
                </div>
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Graphs:</label>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <input 
                            type="radio" 
                            name="graphType" 
                            id="lineGraph" 
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            onChange={() => onFilterChange('graph', 'line')}
                        />
                        <label htmlFor="lineGraph" className="ml-2 text-sm text-gray-600">Line</label>
                    </div>
                    <div className="flex items-center">
                        <input 
                            type="radio" 
                            name="graphType" 
                            id="pieGraph" 
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            onChange={() => onFilterChange('graph', 'pie')}
                        />
                        <label htmlFor="pieGraph" className="ml-2 text-sm text-gray-600">Pie</label>
                    </div>
                    <div className="flex items-center">
                        <input 
                            type="radio" 
                            name="graphType" 
                            id="barGraph" 
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            onChange={() => onFilterChange('graph', 'bar')}
                        />
                        <label htmlFor="barGraph" className="ml-2 text-sm text-gray-600">Bar</label>
                    </div>
                </div>
            </div>
            <button 
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
                onClick={() => onFilterChange('applyFilters')}
            >
                Apply Filters
            </button>
        </div>
    );
}

export default FilterSearch;
