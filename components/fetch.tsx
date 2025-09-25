
export const getProducts = async () => {
  try {
    const res = await fetch("https://v2.api.noroff.dev/online-shop", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getProductById = async (id: string) => {
  try {
    const res = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch product");
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
};