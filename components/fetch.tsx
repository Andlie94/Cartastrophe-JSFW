
export const getProducts = async () => {
  try {
    const res = await fetch("https://v2.api.noroff.dev/online-shop", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    return data.data; // returnerer produktlisten
  } catch (error) {
    console.error(error);
    return [];
  }
};