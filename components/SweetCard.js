import Link from "next/link";
import { imageUrl } from "@/lib/image";

export default function SweetCard({ sweet, index = 0 }) {
  return (
    <Link href={`/sweets/${sweet.id}`} className="card-link" aria-label={`View ${sweet.name}`}>
      <article className="card" style={{ "--i": index }}>
        <div className="card-art" style={{ background: sweet.tint }}>
          {sweet.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl(sweet.image)} alt={sweet.name} loading="lazy" />
          ) : (
            <span role="img" aria-label={sweet.name}>{sweet.emoji}</span>
          )}
        </div>
        <div className="card-body">
          <div className="card-head">
            <h3>{sweet.name}</h3>
            {sweet.price != null && <span className="price">₹{sweet.price}</span>}
          </div>
          <p>{sweet.description}</p>
          <span className="more">View details</span>
        </div>
      </article>
    </Link>
  );
}
