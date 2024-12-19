import { connectToDatabase } from "@/db/db";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { prizes } = body;

        if (!Array.isArray(prizes)) {
            return new Response(
                JSON.stringify({ error: "Prizes must be an array of objects." }),
                { status: 400 }
            );
        }

        const isValid = prizes.every(
            (prize) =>
                typeof prize.title === "string" &&
                prize.title.trim() !== "" &&
                typeof prize.prize === "string" &&
                prize.prize.trim() !== ""
        );

        if (!isValid) {
            return new Response(
                JSON.stringify({
                    error: "Each prize must have a non-empty title and prize.",
                }),
                { status: 400 }
            );
        }

        const client = await connectToDatabase();
        const db = client.db("yourDatabaseName"); // Replace with your database name
        const Prizes = db.collection("prizes"); // Replace with your collection name

        const prizeTitles = prizes.map((p) => p.title);
        const existingPrizes = await Prizes.find({ title: { $in: prizeTitles } }).toArray();
        const existingTitles = existingPrizes.map((p) => p.title);

        const newPrizes = prizes
            .filter((prize) => !existingTitles.includes(prize.title))
            .map((prize) => ({
                ...prize,
                _id: new ObjectId(),
            }));

        if (newPrizes.length === 0) {
            return new Response(
                JSON.stringify({ error: "All prizes already exist in the database." }),
                { status: 400 }
            );
        }

        await Prizes.insertMany(newPrizes);

        return new Response(
            JSON.stringify({
                message: `${newPrizes.length} prizes added successfully.`,
                addedPrizes: newPrizes,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error processing POST request:", error);
        return new Response(
            JSON.stringify({ error: "An unexpected error occurred." }),
            { status: 500 }
        );
    }
}
