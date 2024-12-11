"use client";

import { useState } from "react";

export default function CheckCoupons() {
  const [fromCoupon, setFromCoupon] = useState("");
  const [toCoupon, setToCoupon] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResults([]); // Clear previous results

    try {
      const response = await fetch("/api/check-coupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fromCoupon, toCoupon }),
      });

      const data = await response.json();
      if (response.ok) {
        setResults(data.prizes);
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch results. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Check Your Coupons
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            From Coupon:
          </label>
          <input
            type="text"
            value={fromCoupon}
            onChange={(e) => setFromCoupon(e.target.value)}
            placeholder="e.g., AK1886406"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            To Coupon:
          </label>
          <input
            type="text"
            value={toCoupon}
            onChange={(e) => setToCoupon(e.target.value)}
            placeholder="e.g., AK1886424"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Check Prizes
        </button>
      </form>

      <h1 className="">Total number of coupons: {results.length}</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Results:</h2>
        {/* Total Number of Coupons */}
        <h1 className="text-2xl font-semibold text-blue-600 mb-6">
          Total Number of Coupons: {results.length}
        </h1>

        {results.length > 0 ? (
          <ul className="space-y-3">
            {results.map(({ coupon, prize }, index) => (
              <li
                key={index}
                className="bg-gray-50 border rounded-md p-3 flex justify-between items-center"
              >
                <span className="text-gray-700 font-medium">{coupon}</span>
                <span
                  className={`${
                    prize === "No Prize"
                      ? "text-red-500"
                      : "text-green-500 font-semibold"
                  }`}
                >
                  {prize}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            No results yet. Enter your 7 Digit coupon number.
          </p>
        )}
      </div>
    </div>
  );
}
