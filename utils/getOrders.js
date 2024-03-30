export async function getOrders() {
    const apiEndpoint = process.env.API_ENDPOINT;
  
    const res = await fetch(`http://localhost:3000/api/orders?${Date.now()}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    const data = await res.json();
  
    return data;
  }