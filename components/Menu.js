"use client";

import { useState } from "react";
import SweetCard from "./SweetCard";

export default function Menu({ sweets }) {
  const categories = ["All", ...new Set(sweets.map((s) => s.category))];
  const [active, setActive] = useState("All");
  const visible = active === "All" ? sweets : sweets.filter((s) => s.category === active);

  return (
    <>
      <nav className="tabs" aria-label="Sweet categories">
        {categories.map((c) => (
          <button key={c} className={c === active ? "tab on" : "tab"} onClick={() => setActive(c)}>
            {c}
          </button>
        ))}
      </nav>

      {visible.length === 0 ? (
        <p className="empty">Nothing here yet. Add sweets in the admin page.</p>
      ) : (
        <section className="grid" key={active}>
          {visible.map((s, i) => <SweetCard key={s.id} sweet={s} index={i} />)}
        </section>
      )}
    </>
  );
}
