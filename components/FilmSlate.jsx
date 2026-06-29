const ITEMS = [
  'chuck design',
  'North Port, FL 34291',
  'Web Design',
  'Local SEO',
  'Google Business Profile',
  'Social Media Setup',
  'Website Maintenance',
  'Restaurants',
  'Home Services',
  'Health & Wellness',
  'Real Estate',
  'Professional Services',
  'Southwest Florida',
];

const TRACK = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

export default function FilmSlate() {
  return (
    <div className="film-slate" aria-hidden="true">
      <div className="film-slate__track">
        {TRACK.map((item, i) => (
          <span key={i} className="film-slate__text">
            {item}&nbsp;&nbsp;·&nbsp;&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}
