// app/api/activity/route.js

export async function POST(request) {
  try {
    const data = await request.json();

    console.log("Received activity:", data);

    // Simple example — you can later save this to a DB
    // or run it through your ML model.
    // For now, let's just confirm receipt.
    return new Response(
      JSON.stringify({ message: "Activity logged successfully", data }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Error handling activity:", err);
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
