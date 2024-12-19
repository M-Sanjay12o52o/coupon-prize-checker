"use client"

import React, { useState } from 'react';
import { Trash2, Plus, Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

const AdminPrizePage = () => {
    const [prizes, setPrizes] = useState([{ title: '', prize: '' }]);

    const handleInputChange = (index: number, field: string, value: string) => {
        const newPrizes = prizes.map((prize, i) =>
            i === index ? { ...prize, [field]: value } : prize
        );
        setPrizes(newPrizes);
    };

    const handleAddPrize = () => {
        setPrizes([...prizes, { title: '', prize: '' }]);
    };

    const handleRemovePrize = (index: number) => {
        setPrizes(prizes.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission
        console.log('Submitting prizes:', prizes);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <Card className="max-w-2xl mx-auto">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        Prize Management
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {prizes.map((prize, index) => (
                            <div
                                key={index}
                                className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="font-medium text-gray-700">Prize #{index + 1}</h3>
                                    {prizes.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemovePrize(index)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor={`title-${index}`}
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Prize Title
                                        </label>
                                        <input
                                            type="text"
                                            id={`title-${index}`}
                                            value={prize.title}
                                            onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor={`prize-${index}`}
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Prize Description
                                        </label>
                                        <input
                                            type="text"
                                            id={`prize-${index}`}
                                            value={prize.prize}
                                            onChange={(e) => handleInputChange(index, 'prize', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                    <button
                        type="button"
                        onClick={handleAddPrize}
                        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        <Plus className="h-5 w-5" />
                        Add Another Prize
                    </button>

                    <button
                        type="submit"
                        onClick={handleSubmit as any}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        <Save className="h-5 w-5" />
                        Save All Prizes
                    </button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default AdminPrizePage;