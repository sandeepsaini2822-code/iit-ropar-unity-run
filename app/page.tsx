'use client';

import { useEffect, useState, type ReactNode } from 'react';

const formUrl = 'https://forms.gle/mkvkonQNHdxVgDsF9';
const routeMapUrl = 'https://www.google.com/maps/dir/30.9670946,76.467117/30.9670683,76.4671294/@30.9683561,76.4596338,16z/data=!4m39!4m38!1m35!3m4!1m2!1d76.4485521!2d30.9701818!3s0x391aab311c79e783:0xa96fffbf2533f98d!3m4!1m2!1d76.4808466!2d30.9720673!3s0x390554c2efc57d2d:0x970e1593b51d6b8!3m4!1m2!1d76.4804566!2d30.9683118!3s0x390554e7891ef977:0x4bfd4aac8b98a1db!3m4!1m2!1d76.4780946!2d30.9682408!3s0x390554dd627a6ec5:0x9235c6ea9bd46e58!3m4!1m2!1d76.4790802!2d30.9649889!3s0x390554ddd64f8f75:0x83870898edec0f14!3m4!1m2!1d76.4742242!2d30.9635739!3s0x390554dddf142d57:0x420a91820b3175b3!3m4!1m2!1d76.4721168!2d30.9620673!3s0x390554d96ca78da3:0x96031e47f10e89ed!1m0!3e2?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D';

type NavItem = { label: string; href: string };
type TimelineItem = { time: string; title: string; detail: string };
type Person = { name: string; role: string; image?: string; href?: string; initials: string };
type Contact = { label: string; numbers: { value: string; href: string }[] };

const navItems: NavItem[] = [
  { label: 'The run', href: '#run' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Registration', href: '#registration' },
  { label: 'Team', href: '#team' },
];

const timeline: TimelineItem[] = [
  { time: '06:00', title: 'Report at Annapurna Hall', detail: 'Reporting is mandatory for certificates and awards.' },
  { time: '06:30', title: '11 KM run begins', detail: 'Quarter Marathon runners set off.' },
  { time: '06:40', title: '5 KM run begins', detail: 'Fun Run runners take their mark.' },
  { time: '07:30', title: 'Breakfast at Annapurna Hall', detail: 'Breakfast will be served in front of Annapurna Hall.' },
  { time: '07:45', title: 'Awards ceremony', detail: "Recognising the day's standout efforts." },
];

const instructions: ReactNode[] = [
  'The run starts from Annapurna Hall, IIT Ropar.',
  'Wear the event T-shirt and chest number supplied to you.',
  'Stay on the marked route and follow volunteer instructions.',
  'Refreshment points with water and fruit will be available along the route.',
  'Medical support and cycle volunteers will be present throughout.',
  'Breaking event rules may result in disqualification and further action if required.',
  <>Collect your kit (chest number and T-shirt) from the Utility Block on <strong>23 October 2026</strong> (tentative).</>,
  'Enjoy the route as much as possible by jogging and walking.',
];

const people: Person[] = [
  { name: 'Dr. Mukesh Saini', role: 'FAC, ODAC', image: '/dr-mukesh.webp', initials: 'DM' },
  { name: 'Dr. Puneet Pasricha', role: 'Dean, Student Affairs', image: '/Dr-puneet-pasricha.png', href: 'https://www.iitrpr.ac.in/maths/?p=3149', initials: 'DP' },
  { name: 'Sahil Pathak', role: 'Fitness Secretary', href: 'mailto:sahil.23csz0005@iitrpr.ac.in', initials: 'SP' },
];

const contacts: Contact[] = [
  { label: 'Dr. Charanjit', numbers: [{ value: '06283684480', href: 'tel:06283684480' }, { value: '08837828774', href: 'tel:08837828774' }] },
  { label: 'Dr. Reena', numbers: [{ value: '09501007579', href: 'tel:09501007579' }] },
  { label: 'Ambulance', numbers: [{ value: '102', href: 'tel:102' }] },
  { label: 'Police', numbers: [{ value: '100', href: 'tel:100' }] },
  { label: "Women's Helpline", numbers: [{ value: '181', href: 'tel:181' }] },
];

function Brand() {
  return <span className="brand"><span className="brand-badge"><img className="brand-logo" src="/iitrpr.png" alt="IIT Ropar" /></span><span>IIT ROPAR<br /><b>UNITY RUN 2026</b></span></span>;
}

function Arrow() { return <span aria-hidden="true">↗</span>; }

function Countdown() {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date('2026-10-25T06:00:00+05:30').getTime();
    const update = () => {
      const difference = Math.max(0, target - Date.now());
      const totalSeconds = Math.floor(difference / 1000);
      setRemaining({
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      });
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <div className="countdown" aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes and ${remaining.seconds} seconds until the run`}>
    {(['days', 'hours', 'minutes', 'seconds'] as const).map((unit) => <div key={unit}><strong>{String(remaining[unit]).padStart(2, '0')}</strong><span>{unit}</span></div>)}
  </div>;
}

function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);
    window.addEventListener('mousemove', handleMove);
    document.documentElement.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return <span className={`cursor-follower ${visible ? 'is-visible' : ''}`} style={{ left: position.x, top: position.y }} aria-hidden="true" />;
}

function HeroGallery() {
  return <div className="hero-art" role="img" aria-label="Runners at IIT Ropar Unity Run">
    <img className="hero-image hero-image-base" src="/hero-run.jpg" alt="" />
    <div className="hero-overlay" /><div className="art-stamp">IIT<br />RPR<br /><small>2026</small></div><span className="art-caption">MOVE THROUGH THE MORNING</span>
  </div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return <><CursorFollower />
    <header className="site-header">
      <a className="brand-link" href="#top" aria-label="IIT Ropar Unity Run home"><Brand /></a>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>Menu <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span></button>
      <nav className={`nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
        {navItems.map((item) => <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>)}
        <a className="nav-cta" href={formUrl} target="_blank" rel="noreferrer">Register <Arrow /></a>
      </nav>
    </header>

    <main id="top">
      <section className="hero section-wrap" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow"><span className="pulse" /> ODAC × Fitness Club present</p><h1 id="hero-title">IIT ROPAR<br /><em>UNITY RUN 2026</em></h1><p className="hero-text">IIT Ropar Unity Run 2026 is a campus-wide celebration of movement, community and the spirit of IIT Ropar.</p><div className="hero-date"><span>25</span><span>OCTOBER<br /><small>2026</small></span></div><div className="hero-actions"><a className="button button-dark" href={formUrl} target="_blank" rel="noreferrer">Register now <Arrow /></a><a className="text-link" href="#run">Explore the run <span aria-hidden="true">↓</span></a></div><Countdown /></div>
        <HeroGallery />
      </section>

      <section className="date-strip" aria-label="Event information"><div><span>Save the date</span><strong>25 October 2026</strong></div><div><span>Venue</span><strong>IIT Ropar Campus</strong></div><div><span>Open to</span><strong>Students · Staff · Community</strong></div></section>

      <section className="section-wrap intro" id="run"><p className="section-kicker">01 — The run</p><div className="intro-content"><h2>One campus.<br /><span>One finish line.</span></h2><div><p>Whether you are chasing a personal best or simply showing up for your people, IIT Ropar Unity Run 2026 is your invitation to get moving.</p><p className="muted">Choose your distance, bring your energy and make a morning of it. Every pace belongs here.</p><a className="arrow-link" href="#instructions">Everything you need to know <Arrow /></a></div></div></section>

      <section className="section-wrap distances" aria-label="Run distances"><a className="distance-card primary-card" href={routeMapUrl} target="_blank" rel="noreferrer" aria-label="Open the 5 KM Fun Run route in Google Maps"><span className="distance-number">01</span><div><p className="card-label">The community run</p><h3>5 KM <i>Fun Run</i></h3><p>A lively, inclusive route for walkers, joggers and first-time runners.</p></div><span className="card-arrow" aria-hidden="true">↗</span></a><a className="distance-card light-card" href={routeMapUrl} target="_blank" rel="noreferrer" aria-label="Open the 11 KM Quarter Marathon route in Google Maps"><span className="distance-number">02</span><div><p className="card-label">The challenge</p><h3>11 KM <i>Quarter Marathon</i></h3><p>For runners ready to stretch their stride and test their limits.</p></div><span className="card-arrow" aria-hidden="true">↗</span></a></section>

      <section className="section-wrap schedule" id="schedule"><p className="section-kicker">02 — Plan your morning</p><div className="schedule-head"><h2>From first light<br />to <span>finish line.</span></h2><p>Keep this timeline handy. Every runner must report at Annapurna Hall at 6:00 AM for certificates and awards.</p></div><div className="timeline">{timeline.map((item, index) => <div className={`timeline-item ${index === 1 ? 'highlight' : ''}`} key={item.time}><span className="time">{item.time} <small>AM</small></span><div><strong>{item.title}</strong><p>{item.detail}</p></div></div>)}</div></section>

      <section className="section-wrap payment" id="registration"><div className="payment-copy"><p className="section-kicker">03 — Registration</p><h2>Make your<br /><span>move.</span></h2><p>Registration is completed through the official Google Form. Please follow the form instructions and submit your details before the deadline.</p><p className="payment-note">The official payment QR code is available inside the registration form.</p><div className="registration-details"><strong>Deadline: 7 October 2026</strong><p><b>First 500 participants</b><br /><span className="price-line">With T-shirt: INR 300</span><br /><span className="price-line">Without T-shirt: INR 100</span></p><p><b>After 500 participants, before the deadline</b><br /><span className="price-line">INR 600</span></p><p><b>No T-shirt?</b><br />Wear a colour matching the other runners in your category. Tentative T-shirt colours: 5 KM — TBA; 11 KM — TBA.</p></div><a className="button button-accent" href={formUrl} target="_blank" rel="noreferrer">Open registration form <Arrow /></a></div><div className="registration-note"><span className="note-number">500</span><span>Registrations<br />at early rates</span><p>The first 500 registrations receive the early rates listed in the registration details. After those places are filled, the fee is INR 600 until 7 October 2026.</p></div></section>

      <section className="section-wrap instructions" id="instructions"><p className="section-kicker">04 — Know before you go</p><div className="instruction-grid"><div><h2>Run smart.<br /><span>Run together.</span></h2><p className="intro-note">A few simple things make the morning better for everyone.</p></div><div className="rules">{instructions.map((instruction, index) => <div key={index}><b>{String(index + 1).padStart(2, '0')}</b><p>{instruction}</p></div>)}</div></div></section>

      <section className="section-wrap route" id="route"><div className="route-copy"><p className="section-kicker">05 — The route</p><h2>See the campus<br /><span>in a new light.</span></h2><p>The route starts from Annapurna Hall, IIT Ropar. Follow the marked 5 KM and 11 KM routes, signage, marshals and refreshment points along the way.</p></div><a className="map-link" href={routeMapUrl} target="_blank" rel="noreferrer" aria-label="Open the IIT Ropar Unity Run route in Google Maps"><img src="/run-route-01.png" alt="IIT Ropar Unity Run route map showing the 5 KM and 11 KM routes" /><span className="map-open">Open route in Google Maps <Arrow /></span></a></section>

      <section className="section-wrap team" id="team"><p className="section-kicker">06 — The people behind the run</p><div className="team-head"><h2>Meet the<br /><span>organisers.</span></h2><p>Questions, volunteering or accessibility support? We are here to help.</p></div><div className="team-grid">{people.map((person) => { const content = <><span className="person-visual">{person.image ? <img src={person.image} alt="" /> : person.initials}</span><span className="person-copy"><strong>{person.name}</strong><small>{person.role}</small></span>{(person.name === 'Sahil Pathak' || person.name === 'Dr. Puneet Pasricha') && <span className="person-arrow" aria-hidden="true">{person.name === 'Sahil Pathak' ? '✉' : '↗'}</span>}</>; return person.href ? <a className="person" href={person.href} target={person.href.startsWith('http') ? '_blank' : undefined} rel={person.href.startsWith('http') ? 'noreferrer' : undefined} key={person.name}>{content}</a> : <div className="person" key={person.name}>{content}</div>; })}</div></section>

      <section className="emergency" id="contact"><div className="section-wrap emergency-inner"><div><p className="section-kicker">07 — Need help?</p><h2>Look out for<br /><span>each other.</span></h2></div><div className="emergency-copy"><p>For medical support during the event, contact the nearest volunteer, medical desk or one of the contacts below.</p><div className="emergency-links">{contacts.map((contact) => <div className="contact-group" key={contact.label}><small>{contact.label}</small>{contact.numbers.map((number) => <a href={number.href} key={number.value}><strong>{number.value}</strong></a>)}</div>)}<a href="mailto:sahil.23csz0005@iitrpr.ac.in"><small>Event contact</small><strong>sahil.23csz0005@iitrpr.ac.in</strong></a></div></div></div></section>
    </main>

    <footer className="footer"><div className="section-wrap footer-inner"><Brand /><p>Move together. Finish stronger.<br />Indian Institute of Technology Ropar</p><div className="footer-contact"><strong>Contact</strong><span>Indian Institute of Technology Ropar, Bara Phool, Birla Seed Farms,<br />Rupnagar, Punjab, INDIA 140001</span><a href="mailto:fitness@iitrpr.ac.in">fitness@iitrpr.ac.in</a><a href="tel:+919754605008">+91 9754605008</a></div><a className="footer-register" href={formUrl} target="_blank" rel="noreferrer">Register <Arrow /></a></div><div className="section-wrap footer-bottom"><span>© 2026 IIT Ropar Unity Run</span><span>Presented by ODAC × Fitness Club</span></div></footer>
    <a className="mobile-register" href={formUrl} target="_blank" rel="noreferrer">Register now <Arrow /></a>
  </>;
}
