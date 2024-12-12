const results = {
  megaBumperPrize: [
    "2644401",
    "2029773",
    "2502764",
    "3015215",
    "1353122",
    "2317790",
    "3274884",
    "2120434",
    "1285572",
    "2424923",
    "1257932",
    "1751820",
    "1258276",
    "1019237",
    "2062684",
    "3337639",
    "3199375",
    "2730662",
    "1174870",
    "2990187",
  ],
  superBumperPrize: ["18595", "04366"],
  firstPrize: ["2724", "5054"],
  secondPrize: ["7253", "4054"],
  thirdPrize: ["0428", "6471"],
  fourthPrize: ["8372", "9759", "1071", "3340"],
  fifthPrize: ["67", "15"],
};

function checkPrizes(coupon: string): string {
  const prizes = []; // array to store all the matched prizes

  // Check Mega Bumper Prize (7 digits match)
  const last7 = coupon.slice(-7);
  if (results.megaBumperPrize.includes(last7)) {
    prizes.push("Mega Bumper Prize \n(Grand i10 NIOS)");
  }
  // return "Mega Bumper Prize (Grand i10 NIOS)";

  // Check Super Bumper Prize (Last 5 digits match)
  const last5 = coupon.slice(-5);
  if (results.superBumperPrize.includes(last5)) {
    prizes.push("Super Bumper Prize (₹50,000 Shopping)");
  }
  // return "Super Bumper Prize (₹50,000 Shopping)";

  // Check 1st Prize (Last 4 digits match)
  const last4 = coupon.slice(-4);
  if (results.firstPrize.includes(last4)) {
    prizes.push("1st Prize (30,000 Pai Loyalty Points)")
  }
  // return "1st Prize (30,000 Pai Loyalty Points)";

  // Check 2nd Prize (Last 4 digits match)
  if (results.secondPrize.includes(last4)) {
    prizes.push("2nd Prize (10,000 Pai Loyalty Points)")
  }
  // return "2nd Prize (10,000 Pai Loyalty Points)";

  // Check 3rd Prize (Last 4 digits match)
  if (results.thirdPrize.includes(last4)) {
    prizes.push("3rd Prize (5,000 Pai Loyalty Points)")
  }
  // return "3rd Prize (5,000 Pai Loyalty Points)";

  // Check 4th Prize (Last 4 digits match)
  if (results.fourthPrize.includes(last4)) {
    prizes.push("4th Prize (4,000 Pai Loyalty Points)")
  }
  // return "4th Prize (4,000 Pai Loyalty Points)";

  // Check 5th Prize (Last 2 digits match)
  const last2 = coupon.slice(-2);
  if (results.fifthPrize.includes(last2)) {
    prizes.push("5th Prize (2,000 Pai Loyalty Points)")
  }
  // return "5th Prize (2,000 Pai Loyalty Points)";

  // No prize
  // return "No Prize";

  if (prizes.length > 0) {
    return prizes.join(", ");
  } else {
    return "No Prize";
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { fromCoupon, toCoupon } = body;

  if (!fromCoupon || !toCoupon) {
    return new Response(
      JSON.stringify({ error: "Both fromCoupon and toCoupon are required." }),
      { status: 400 },
    );
  }

  const prizes = [];

  const fromNum = parseInt(fromCoupon);
  const toNum = parseInt(toCoupon);

  // Iterate over the numeric range using the numeric parts
  for (let i = fromNum; i <= toNum; i++) {
    const couponNumber = i.toString();
    const formattedCoupon = couponNumber.padStart(7, "0");
    const coupon = `AK${formattedCoupon}`; // Construct the full coupon
    const prize = checkPrizes(coupon); // Check prize for the coupon
    prizes.push({ coupon, prize });
  }

  return new Response(JSON.stringify({ prizes }), { status: 200 });
}


