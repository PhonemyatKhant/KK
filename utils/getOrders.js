export async function getOrders() {
  const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const res = await fetch(`${apiEndpoint}/api/orders?${Date.now()}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data;
}