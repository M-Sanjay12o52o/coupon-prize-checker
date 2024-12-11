const results = {
  megaBumperPrize: ["2644401", "2029773", "2502764", "3015215", "1353122", "2317790", "3274884", "2120434", "1285572", "2424923", "1257932", "1751820", "1258276", "1019237", "2062684", "3337639", "3199375", "2730662", "1174870", "2990187"],
  superBumperPrize: ["18595", "04366"],
  firstPrize: ["2724", "5054"],
  secondPrize: ["7253", "4054"],
  thirdPrize: ["0428", "6471"],
  fourthPrize: ["8372", "9759", "1071", "3340"],
  fifthPrize: ["67", "15"]
};

function checkPrizes(coupon) {
  // Check Mega Bumper Prize (7 digits match)
  if (results.megaBumperPrize.includes(coupon)) return "Mega Bumper Prize (Grand i10 NIOS)";

  // Check Super Bumper Prize (Last 5 digits match)
  const last5 = coupon.slice(-5);
  if (results.superBumperPrize.includes(last5)) return "Super Bumper Prize (₹50,000 Shopping)";

  // Check 1st Prize (Last 4 digits match)
  const last4 = coupon.slice(-4);
  if (results.firstPrize.includes(last4)) return "1st Prize (30,000 Pai Loyalty Points)";

  // Check 2nd Prize (Last 4 digits match)
  if (results.secondPrize.includes(last4)) return "2nd Prize (10,000 Pai Loyalty Points)";

  // Check 3rd Prize (Last 4 digits match)
  if (results.thirdPrize.includes(last4)) return "3rd Prize (5,000 Pai Loyalty Points)";

  // Check 4th Prize (Last 4 digits match)
  if (results.fourthPrize.includes(last4)) return "4th Prize (4,000 Pai Loyalty Points)";

  // Check 5th Prize (Last 2 digits match)
  const last2 = coupon.slice(-2);
  if (results.fifthPrize.includes(last2)) return "5th Prize (2,000 Pai Loyalty Points)";

  // No prize
  return "No Prize";
}

export async function POST(req) {
  const body = await req.json();
  const { fromCoupon, toCoupon } = body;

  if (!fromCoupon || !toCoupon) {
    return new Response(
      JSON.stringify({ error: "Both fromCoupon and toCoupon are required." }),
      { status: 400 }
    );
  }

  const prizes = [];
  for (let i = parseInt(fromCoupon.slice(2)); i <= parseInt(toCoupon.slice(2)); i++) {
    const coupon = `AK${i.toString().padStart(7, "0")}`;
    const prize = checkPrizes(coupon);
    prizes.push({ coupon, prize });
  }

  return new Response(JSON.stringify({ prizes }), { status: 200 });
}
