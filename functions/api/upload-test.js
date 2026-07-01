export async function onRequestPost({ request }) {
  const buf = await request.arrayBuffer();
  return new Response(JSON.stringify({ received: buf.byteLength }), {
    headers: { "Content-Type": "application/json" }
  });
}
