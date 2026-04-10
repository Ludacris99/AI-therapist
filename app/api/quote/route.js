export async function GET() {
  try {
    const res = await fetch("https://motivational-spark-api.vercel.app/api/quotes/random");
    const data = await res.json();

    return Response.json(data);
  } catch (err) {
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
