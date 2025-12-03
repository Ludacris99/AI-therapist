export async function GET() {
  try {
    const res = await fetch("https://zenquotes.io/api/random");
    const data = await res.json();

    return Response.json(data);
  } catch (err) {
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
