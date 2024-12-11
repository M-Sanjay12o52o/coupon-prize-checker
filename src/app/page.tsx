"use client";

import { useState } from "react";
import { prizeWinners } from "@/helper/winners";
import { allNumbers } from "@/helper/winners";

type PrizeCategory = keyof typeof prizeWinners; // Union type of all prize categories

interface Winner {
  number: string; // Coupon number
  prize: PrizeCategory; // Corresponding prize category
}

export default function Home() {
  const [startNumber, setStartNumber] = useState<string>("");
  const [endNumber, setEndNumber] = useState<string>("");
  const [couponNumbers, setCouponNumbers] = useState<string[]>([]);
  const [winningPrizes, setWinningPrizes] = useState<Winner[]>([]);

  console.log("coupon numbers: ", couponNumbers);

  const checkWinners = () => {
    console.log("checking winners");

    // Convert start and end numbers to integers
    const startNumberInt = parseInt(startNumber, 10);
    const endNumberInt = parseInt(endNumber, 10);

    // Validate input
    if (isNaN(startNumberInt) || isNaN(endNumberInt) || startNumberInt > endNumberInt) {
      alert("Please enter valid start and end numbers.");
      return;
    }

    // Generate coupon numbers
    const newCouponNumbers: string[] = [];
    for (let i = startNumberInt; i <= endNumberInt; i++) {
      newCouponNumbers.push(i.toString());
    }
    setCouponNumbers(newCouponNumbers);

    // Check for winners
    const winners: Winner[] = [];
    for (const number of newCouponNumbers) {
      for (const prize in prizeWinners) {
        if (prizeWinners[prize as PrizeCategory].includes(number)) {
          winners.push({ number, prize: prize as PrizeCategory });
        }
      }
    }

    setWinningPrizes(winners);

    console.log("allNumbers: ", allNumbers)

  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Enter Your 7-Digit Coupon Numbers</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="number"
          value={startNumber}
          onChange={(e) => setStartNumber(e.target.value)}
          placeholder="Start Number"
          maxLength={7}
          className="border border-gray-300 text-black rounded-md p-2 w-full md:w-64"
        />
        <input
          type="number"
          value={endNumber}
          onChange={(e) => setEndNumber(e.target.value)}
          placeholder="End Number"
          maxLength={7}
          className="border border-gray-300 text-black rounded-md p-2 w-full md:w-64"
        />
      </div>
      <button
        onClick={checkWinners}
        className="bg-blue-500 mt-4 text-white rounded-md p-2 w-full md:w-64"
      >
        Check Winners
      </button>
      <div>
        <h3>Your Coupon Numbers</h3>
        <ol>
          {couponNumbers.map((number) => (
            <li key={number}>{number}</li>
          ))}
        </ol>
      </div>
      <div>
        <h3>Winning Coupons</h3>
        {winningPrizes.length > 0 ? (
          <ul>
            {winningPrizes.map(({ number, prize }) => (
              <li key={number}>
                Coupon {number} won: <strong>{prize}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p>No winning coupons in the range.</p>
        )}
      </div>
    </div>
  );
}

