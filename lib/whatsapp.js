export const WHATSAPP_NUMBER = "918876529634";

function formatAddress(c) {
  const lines = [
    `House/Flat: ${c.house || "-"}`,
    `Street/Area: ${c.street || "-"}`,
  ];
  if (c.landmark) lines.push(`Landmark: ${c.landmark}`);
  lines.push(`City: ${c.city || "-"} - ${c.pincode || "-"}`);
  return lines;
}

export function buildOrderMessage({ items, totalPrice, customer = {} }) {
  const lines = items.map(
    (item, i) =>
      `${i + 1}. ${item.name} × ${item.qty} = ₹${item.qty * item.price}`
  );

  const isDelivery = customer.type === "delivery";

  const parts = [
    "Hi HaYaan's Cafe And Bakery, I would like to place an order:",
    "",
    ...lines,
    "",
    `*Total: ₹${totalPrice}*`,
    "",
    "*Customer details*",
    `Name: ${customer.name || "-"}`,
    `Phone: ${customer.phone || "-"}`,
    `Order type: ${isDelivery ? "Delivery" : "Pickup from bakery"}`,
  ];

  if (isDelivery) {
    parts.push("", "*Delivery address*", ...formatAddress(customer));
  }

  if (customer.notes) parts.push("", `Notes: ${customer.notes}`);

  return parts.join("\n");
}

export function whatsappOrderUrl(data) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildOrderMessage(data)
  )}`;
}