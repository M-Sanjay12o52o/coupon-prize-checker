"use client";

import { useState } from "react";

type WinningCoupons = {
  coupon: string;
  prize: string;
} | null;

export default function CheckCoupons() {
  const [fromCoupon, setFromCoupon] = useState("");
  const [toCoupon, setToCoupon] = useState("");
  const [results, setResults] = useState([]);
  const [winningCoupons, setWinningCoupons] = useState<WinningCoupons[]>([]);

  console.log("winningCoupons: ", winningCoupons)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResults([]); // Clear previous results
    setWinningCoupons([]);

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

        // Identifying the winning coupons or coupon
        // const winner = data.prizes.find(({ prize }: { prize: string }) => prize !== "No Prize");
        const winners = data.prizes.filter(({ prize }: { prize: string }) => prize !== "No Prize");
        setWinningCoupons(winners || "");
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
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black h-20"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            To Coupon:
          </label>
          <div className="flex flex-row">
            <input
              type="text"
              value={toCoupon}
              onChange={(e) => setToCoupon(e.target.value)}
              placeholder="e.g., AK1886424"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black h-20"
              onFocus={() => {
                // auto fill functionality for tocoupon input
                if (!toCoupon) {
                  setToCoupon(fromCoupon);
                }
              }}
            />
            {/* New functionality: Increment and Decrement buttons */}
            <div className="ml-2 flex flex-col space-y-1">
              <button
                type="button"
                onClick={() => {
                  // Increment logic: Extract the numeric part, increment it, and reconstruct the coupon
                  const prefix = toCoupon.replace(/\d+/g, ""); // Extract non-numeric part
                  const num = parseInt(toCoupon.match(/\d+/)?.[0] || "0", 10) + 1;
                  setToCoupon(`${prefix}${num}`);
                }}
                className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 h-8 mt-2"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => {
                  // Decrement logic: Extract the numeric part, decrement it, and reconstruct the coupon
                  const prefix = toCoupon.replace(/\d+/g, ""); // Extract non-numeric part
                  const num = Math.max(
                    0,
                    parseInt(toCoupon.match(/\d+/)?.[0] || "0", 10) - 1,
                  );
                  setToCoupon(`${prefix}${num}`);
                }}
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 h-8"
              >
                -
              </button>
            </div>
          </div>

        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Check Prizes
        </button>
      </form >

      <h1 className="">Total number of coupons: {results.length}</h1>

      {/* // Displaying winnign coupon */}
      <div>
        <h1 className="text-2xl font-bold text-purple-600 mb-4 text-center">
          Winning Coupons:
        </h1>
        {winningCoupons && winningCoupons.length > 0 ? (
          <div className="space-y-4">
            {winningCoupons.map((coupon, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-md ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
              >
                <p className="text-lg font-medium text-gray-800">
                  <span className="font-semibold text-green-600">{index + 1} - </span>
                  <span>{coupon?.coupon}: </span>
                  <span className="text-green-700">{coupon?.prize}</span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No winning coupons available</p>
        )}
      </div>


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
                  className={`${prize === "No Prize"
                    ? "text-red-500"
                    : "text-green-500 font-semibold"
                    }h-auto block`}
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
    </div >
  );
}
