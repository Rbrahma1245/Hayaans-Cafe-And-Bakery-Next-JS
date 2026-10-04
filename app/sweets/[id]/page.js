import Link from "next/link";
import { notFound } from "next/navigation";
import { getSweets, getSweet } from "@/lib/api";
import { imageUrl } from "@/lib/image";

const PHONE_DISPLAY = "083102 21057";
const PHONE_LINK = "tel:+918310221057";

export async function generateStaticParams() {
  const sweets = await getSweets();
  return sweets.map((s) => ({ id: String(s.id) }));
}

export async function generateMetadata({ params }) {
  const sweet = await getSweet(params.id);
  return { title: sweet ? `${sweet.name} | HaYaan's Cafe And Bakery` : "HaYaan's Cafe And Bakery" };
}

export default async function SweetPage({ params }) {
  const sweet = await getSweet(params.id);
  if (!sweet) notFound();

  return (
    <>
      <div className="topbar">
        <Link href="/" className="topbar-name">HaYaan&apos;s Cafe And Bakery</Link>
      </div>

      <main className="detail">
        <Link href="/#menu" className="back">Back to all sweets</Link>

        <article className="detail-card">
          <div className="detail-art" style={{ background: sweet.tint }}>
            {sweet.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl(sweet.image)} alt={sweet.name} />
            ) : (
              <span role="img" aria-label={sweet.name}>{sweet.emoji}</span>
            )}
          </div>

          <div className="detail-info">
            <span className="detail-cat">{sweet.category}</span>
            <h1>{sweet.name}</h1>
            <p className="detail-desc">{sweet.details || sweet.description}</p>

            {sweet.sizes && sweet.sizes.length > 0 ? (
              <ul className="sizes">
                {sweet.sizes.map((z) => (
                  <li key={z.label}>
                    <span>{z.label}</span>
                    <strong>₹{z.price}</strong>
                  </li>
                ))}
              </ul>
            ) : sweet.price != null ? (
              <p className="detail-price">₹{sweet.price}</p>
            ) : (
              <p className="detail-ask">Ask at the counter for today&apos;s price.</p>
            )}

            <a className="visit-btn" href={PHONE_LINK}>Call {PHONE_DISPLAY} to order</a>
          </div>
        </article>
      </main>
    </>
  );
}
