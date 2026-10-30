// app/api/orders/[id]/stream/route.js

export async function GET(request, { params }) {
  const orderId = params.id;

  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (data) => {
        // SSE format strictly requires "data: " + payload + "\n\n"[cite: 118]
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
      };

      // Initial status
      sendEvent({ status: "Preparing", lat: 8.9950, lng: 38.7896, eta: "25 mins" });

      // Simulate live status updates every 4 seconds
      const interval = setInterval(() => {
        sendEvent({
          status: "Out for Delivery",
          lat: 8.9980, // Updated courier coordinates[cite: 115]
          lng: 38.7810,
          eta: "10 mins",
        });
      }, 4000);

      // Clean up on disconnect
      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream", // SSE Header[cite: 118]
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}