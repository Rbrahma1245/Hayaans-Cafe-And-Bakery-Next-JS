import Menu from "@/components/Menu";
import { getSweets } from "@/lib/api";

const ADDRESS = "Victorian Comfort, 18/1, Victoria Rd, Victoria Layout, Bengaluru, Karnataka 560047";
const PHONE_DISPLAY = "083102 21057";
const PHONE_LINK = "tel:+918310221057";
const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("HaYaan's Cafe And Bakery, " + ADDRESS);

const ribbon = ["Fresh baked daily", "🥐", "Cakes", "🍰", "Pastries", "🧁", "Cookies", "🍪", "Gift boxes", "🍫"];

export default async function Home() {
  const sweets = await getSweets();
  debugger
  return (
    <>
      <header className="hero">
        <span className="float f1" aria-hidden="true">🥐</span>
        <span className="float f2" aria-hidden="true">🍩</span>
        <span className="float f3" aria-hidden="true">🍪</span>
        <span className="float f4" aria-hidden="true">🧁</span>

        <p className="hero-name">HaYaan&apos;s Cafe And Bakery</p>
        <h1>
          <span>Fresh sweets,</span>
          <span>baked every morning.</span>
        </h1>
        <p className="hero-sub">Have a look at what&apos;s on the counter today.</p>
        <a className="cta" href="#menu">See our sweets</a>
      </header>

      {/* <div className="ribbon" aria-hidden="true">
        <div className="ribbon-track">
          {[...ribbon, ...ribbon, ...ribbon, ...ribbon].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div> */}

      <main id="menu">
        <h2 className="section-title">Today&apos;s sweets</h2>
        <Menu sweets={sweets} />
      </main>

      <section className="visit" id="contact">
        <h2 className="section-title">Come and visit us</h2>
        <div className="visit-grid">
          <div className="visit-card">
            <h3>Address</h3>
            <p>{ADDRESS}</p>
            <a className="visit-btn" href={MAPS_LINK} target="_blank" rel="noreferrer">Get directions</a>
          </div>
          <div className="visit-card">
            <h3>Phone</h3>
            <p>{PHONE_DISPLAY}</p>
            <a className="visit-btn" href={PHONE_LINK}>Call us</a>
          </div>
        </div>
      </section>

      <footer>
        <p>HaYaan&apos;s Cafe And Bakery, Victoria Road, Bengaluru</p>
      </footer>
    </>
  );
}
