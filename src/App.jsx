import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Camera,
  ChevronLeft,
  ChevronRight,
  Compass,
  ExternalLink,
  Leaf,
  Menu,
  Moon,
  Search,
  Sun,
  Utensils,
  X,
} from 'lucide-react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import foods from './data/foods.json';
import chapters from './data/chapters.json';
import team from './data/team.json';
import imageManifest from './data/image-manifest.json';

const coverImage = imageManifest.find((image) => image.page === 1)?.file;
const chapterById = Object.fromEntries(chapters.map((chapter) => [chapter.id, chapter]));
const sectionLabels = {
  regionalDetails: 'Regional details',
  history: 'History & cultural importance',
  ingredientsAndPreparation: 'Ingredients & preparation',
  whyAtRisk: 'Why it may be at risk',
  references: 'References & sources',
};

const topicReferenceUrls = {
  "traditional-millets": [
    {
      "label": "ICAR · Millets",
      "url": "https://icar.gov.in/en/crop-science/millets"
    },
    {
      "label": "FAO · Sustainable millets",
      "url": "https://www.fao.org/family-farming/detail/en/c/1632957/"
    }
  ],
  "mahua-flowers": [
    {
      "label": "Indigenous foods review",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7612755/"
    },
    {
      "label": "Wild edible plants study",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8307769/"
    }
  ],
  "wild-mushrooms": [
    {
      "label": "WHO · Food safety",
      "url": "https://www.who.int/health-topics/food-safety"
    },
    {
      "label": "Indigenous foods review",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7612755/"
    }
  ],
  "forest-tubers": [
    {
      "label": "Indigenous foods review",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7612755/"
    },
    {
      "label": "Wild edible plants study",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8307769/"
    }
  ],
  "indigenous-greens": [
    {
      "label": "Wild edible plants study",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8307769/"
    },
    {
      "label": "Indigenous foods review",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7612755/"
    },
    {
      "label": "Wild edible vegetables research",
      "url": "https://doi.org/10.56042/ijtk.v25i5.23697"
    }
  ],
  "jackfruit": [
    {
      "label": "Jackfruit nutrition review",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6339770/"
    }
  ],
  "ragi-sangati": [
    {
      "label": "ICAR · Ragi Sangati",
      "url": "https://ananthapuramu.ap.gov.in/culinary-delight/ragi-mudda-ragi-sangati/?utm_source=chatgpt.com"
    }
  ],
  "ambali": [
    {
      "label": "Telangana · Gastronomy",
      "url": "https://tourism.telangana.gov.in/experience/gastronomy?utm"
    }
  ],
  "chakka-puzhukku": [
    {
      "label": "Onmanorama · Chakka Puzhukku",
      "url": "https://www.onmanorama.com/food/recipe/2018/06/30/chakka-puzhukku.html?"
    }
  ],
  "ulundhu-kali": [
    {
      "label": "Ancient Tamil foods",
      "url": "https://telibrary.com/en/ancient-tamil-foods/?utm"
    }
  ],
  "basale-pundi": [
    {
      "label": "Kannada Aduge · Basale Pundi",
      "url": "https://kannadaaduge.blogspot.com/search/label/%E0%B2%95%E0%B2%B0%E0%B2%BE%E0%B2%B5%E0%B2%B3%E0%B2%BF%20%E0%B2%AA%E0%B3%8D%E0%B2%B0%E0%B2%A6%E0%B3%87%E0%B2%B6?m=1"
    }
  ],
  "hawaijar": [
    {
      "label": "Hawaijar study",
      "url": "https://pubmed.ncbi.nlm.nih.gov/37316061/"
    }
  ],
  "soibum": [
    {
      "label": "Soibum study",
      "url": "https://indianjournals.com/article/ijfft-8-1-006?utm_source"
    }
  ],
  "sinki": [
    {
      "label": "Sinki study",
      "url": "https://www.jstage.jst.go.jp/article/jgam1955/39/4/39_4_395/_article/-char/en?utm_source"
    }
  ],
  "gundruk": [
    {
      "label": "Gundruk study",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3396415/?utm_source"
    }
  ],
  "pazhaya-sadham": [
    {
      "label": "Pazhaya Sadham study",
      "url": "https://academicjournals.org/journal/IJNAM/article-abstract/1F82C1D4819?utm_source"
    }
  ],
  "siddu": [
    {
      "label": "Siddu research paper",
      "url": "https://www.iosrjournals.org/iosr-jhss/papers/Vol.25-Issue9/Series-5/F2509055358.pdf?utm_source"
    }
  ],
  "chainsoo": [
    {
      "label": "Cuisine India Society · Chainsoo",
      "url": "https://www.cuisineindiasociety.in/recipes/chainsoo/"
    }
  ],
  "haak": [
    {
      "label": "Yummefy · Kashmiri Haak",
      "url": "https://www.yummefy.com/kashmiri-haak-recipe.html"
    }
  ],
  "ker-sangri-rajasthan": [
    {
      "label": "Goya · Ker Sangri and the Khejri tree",
      "url": "https://www.goya.in/blog/ker-sangri-and-the-gift-of-the-khejri-tree"
    }
  ],
  "mah-di-dal": [
    {
      "label": "Bliss of Cooking · Maa ki Dal",
      "url": "https://www.blissofcooking.com/2020/08/maa-ki-dal/"
    }
  ],
  "gohona-bori": [
    {
      "label": "INTACH Archive · Gohona Bori",
      "url": "https://icharchive.intach.org/Myheritagedetail/Index?id=43"
    }
  ],
  "enduri-pitha": [
    {
      "label": "Odisha Tourism · Enduri Pitha",
      "url": "https://apps.odishatourism.gov.in/blog-detail/enduri-pitha-on-the-occasion-of-prathamastami"
    }
  ],
  "dal-pitha": [
    {
      "label": "Bihar Tourism · Pittha",
      "url": "https://tourism.bihar.gov.in/en/experiences/food-and-cuisine/main-course/pittha"
    }
  ],
  "jadoh": [
    {
      "label": "Meghalaya Tourism · Flavours of Heritage",
      "url": "https://www.meghalayatourism.in/explore/about-meghalaya/culinary-heritage/"
    }
  ],
  "eromba": [
    {
      "label": "Government of India · Indigenous Foods study",
      "url": "https://www.spniwcd.wcd.gov.in/archive/download/2zq4zt"
    }
  ]
};


function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? (window.scrollY / available) * 100 : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return <div className="reading-progress" style={{ transform: `scaleX(${progress / 100})` }} />;
}

function Header({ theme, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <div className="header-inner page-shell">
        <Link className="brand" to="/" aria-label="Forgotten Foods of India home">
          <span className="brand-mark"><Leaf size={19} strokeWidth={1.7} /></span>
          <span className="brand-copy"><strong>Forgotten Foods</strong><small>of India</small></span>
        </Link>
        <button className="icon-button menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <NavLink to="/chapter/heritage">The heritage</NavLink>
          <NavLink to="/gallery">Food atlas</NavLink>
          <NavLink to="/references">References</NavLink>
          <NavLink to="/about">About the project</NavLink>
          <Link className="nav-search" to="/gallery" aria-label="Search the food atlas"><Search size={17} /></Link>
          <button className="theme-toggle" type="button" onClick={onThemeToggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            <span>{theme === 'dark' ? 'Light' : 'Night'}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-inner">
        <Link className="footer-brand" to="/"><Leaf size={18} /> Forgotten Foods of India</Link>
        <p>A student-created digital book · © 2026</p>
        <div className="footer-links"><Link to="/about">The team</Link><Link to="/references">Sources</Link><Link to="/chapter/credits">Digital credits</Link></div>
      </div>
    </footer>
  );
}

function Shell({ children }) {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);
  return (
    <>
      <ScrollProgress />
      <Header theme={Shell.theme} onThemeToggle={Shell.onThemeToggle} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function PageIntro({ eyebrow, title, description, align = 'center' }) {
  return (
    <div className={`page-intro page-shell align-${align}`}>
      {eyebrow && <p className="eyebrow"><span />{eyebrow}</p>}
      <h1>{title}</h1>
      {description && <p className="intro-deck">{description}</p>}
    </div>
  );
}

function BookText({ text, compact = false }) {
  if (!text?.trim()) return null;
  const lines = text.split(/\r?\n/).map((line) => line.trim());
  return (
    <div className={`book-copy ${compact ? 'book-copy-compact' : ''}`}>
      {lines.map((line, index) => {
        if (!line) return <div className="copy-spacer" key={`space-${index}`} />;
        const isHeading = line.endsWith(':') || /^(?:\d+[.)]\s*)?(?:origin story|cultural meaning|context|ingredients|main ingredient|preparation method|preparation technique|cooking technique|the dough|the filling|the cooking technique|time-consuming process|shift to commercial|decline in traditional)/i.test(line);
        const isList = /^(?:\d+[.)]|[-•])\s/.test(line);
        const Tag = isHeading ? 'h3' : isList ? 'p' : 'p';
        return <Tag className={`${isHeading ? 'copy-label' : ''} ${isList ? 'copy-list-item' : ''}`} key={`${index}-${line.slice(0, 12)}`}>{line}</Tag>;
      })}
    </div>
  );
}

function FoodCard({ food, onImageClick, number, showImage = true }) {
  const image = food.images?.[0];
  const topicReferences = topicReferenceUrls[food.id] || [];
  return (
    <article className="food-card">
      {showImage && <div className="food-card-image-wrap">
        {onImageClick ? (
          <button className="food-card-image-button" type="button" onClick={() => onImageClick(food)} aria-label={`View ${food.title} photograph`}>
            <img className="food-card-image" src={image} alt={`${food.title} food tradition`} loading="lazy" />
            <span className="image-zoom"><Camera size={16} /></span>
          </button>
        ) : (
          <Link className="food-card-image-button" to={`/food/${food.id}`} aria-label={`Read about ${food.title}`}>
            <img className="food-card-image" src={image} alt={`${food.title} food tradition`} loading="lazy" />
            <span className="image-zoom"><ArrowUpRight size={16} /></span>
          </Link>
        )}
        {number && <span className="food-card-number">{String(number).padStart(2, '0')}</span>}
      </div>}
      <div className="food-card-copy">
        
        <h3><Link to={`/food/${food.id}`}>{food.title}</Link></h3>
        <p className="card-subtitle">{food.subtitle}</p>
        {topicReferences.length > 0 && <div className="card-reference-links" aria-label={`${food.title} references`}>{topicReferences.map((reference) => <a key={reference.url} className="card-reference-link" href={reference.url} target="_blank" rel="noreferrer">{reference.label} <ArrowUpRight size={12} /></a>)}</div>}
      </div>
    </article>
  );
}

function ChapterCard({ chapter, index }) {
  const image = chapter.images?.[0] || chapter.mapImage;
  return (
    <Link className="chapter-card" to={`/chapter/${chapter.id}`}>
      {image ? <img src={image} alt="" loading="lazy" /> : <div className="chapter-card-quiet"><BookOpen size={28} /></div>}
      <span className="chapter-card-index">Chapter {String(index + 1).padStart(2, '0')}</span>
      <span className="chapter-card-title">{chapter.title}</span>
      <ArrowUpRight className="chapter-card-arrow" size={18} />
    </Link>
  );
}

function IndiaMap() {
  const areas = [
    { id: 'north', title: 'North', x: 176, y: 103 },
    { id: 'west', title: 'West', x: 112, y: 220 },
    { id: 'east', title: 'East', x: 242, y: 207 },
    { id: 'south', title: 'South', x: 184, y: 344 },
    { id: 'wild', title: 'Wild foods', x: 181, y: 269 },
  ];
  const indiaPath = 'M 135 25 L 167 31 L 190 27 L 211 42 L 230 54 L 249 60 L 263 79 L 280 91 L 286 108 L 310 111 L 321 124 L 303 132 L 285 126 L 276 140 L 284 156 L 272 171 L 279 188 L 265 205 L 273 220 L 261 237 L 253 257 L 242 271 L 238 292 L 226 314 L 219 338 L 206 360 L 198 383 L 184 407 L 171 386 L 164 365 L 150 344 L 143 322 L 128 304 L 117 283 L 101 265 L 88 245 L 78 225 L 68 207 L 65 188 L 75 170 L 65 152 L 70 133 L 62 117 L 73 100 L 87 85 L 101 68 L 115 54 L 123 37 Z';
  return (
    <div className="map-art" aria-label="Interactive regional map of India">
      <svg viewBox="0 0 360 430" role="img" aria-labelledby="map-title map-description">
        <title id="map-title">Explore India's regional food traditions</title>
        <desc id="map-description">Select a regional marker to open the foods documented in that part of India.</desc>
        <defs><clipPath id="india-outline"><path d={indiaPath} /></clipPath></defs>
        <path className="map-shadow" d={indiaPath} transform="translate(7 8)" />
        <g clipPath="url(#india-outline)" className="map-regions">
          <rect x="50" y="20" width="300" height="107" className="map-zone-north" />
          <rect x="50" y="127" width="125" height="158" className="map-zone-west" />
          <rect x="175" y="127" width="175" height="158" className="map-zone-east" />
          <rect x="80" y="285" width="260" height="145" className="map-zone-south" />
          <path d="M 147 196 L 207 196 L 218 252 L 184 292 L 136 262 Z" className="map-zone-wild" />
          <path d="M 60 20 H 340 V 420 H 60 Z" className="map-zone-lines" />
        </g>
        <path className="map-outline" d={indiaPath} />
        {areas.map((area) => (
          <Link key={area.id} to={`/chapter/${area.id}`} className={`map-pin map-pin-${area.id}`} aria-label={`Explore ${area.title} India foods`}>
            <circle cx={area.x} cy={area.y} r="10" />
            <circle cx={area.x} cy={area.y} r="3" className="map-pin-dot" />
            <title>{area.title}</title>
          </Link>
        ))}
      </svg>
      <div className="map-legend">
        {areas.slice(0, 4).map((area) => <Link key={area.id} to={`/chapter/${area.id}`}><i className={`legend-dot legend-${area.id}`} />{area.title}</Link>)}
        <Link to="/chapter/wild"><i className="legend-dot legend-wild" />Wild foods</Link>
      </div>
    </div>
  );
}

function HomePage() {
  const visibleChapters = chapters.filter((chapter) => chapter.id !== 'credits');
  return (
    <>
      <section className="home-hero page-shell">
        <div className="home-hero-copy">
          
          <h1>FORGOTTEN<br /><em>FOODS</em> OF INDIA</h1>
          
          
          
          <div className="hero-footnote"><span>8 chapters</span><i /> <span>32 food stories</span><i /> <span>Across India</span></div>
        </div>
        <div className="hero-cover-frame">
          <div className="cover-stamp"><Leaf size={14} /><span>FIELD<br />NOTES</span></div>
          <img src={coverImage} alt="Original cover artwork for Forgotten Foods of India" />
          <span className="cover-caption">The original digital book cover</span>
          <div className="hero-ornament" aria-hidden="true">✳</div>
        </div>
      </section>

      <section className="chapters-section section-space">
        <div className="page-shell">
          
          <div className="chapter-grid">{visibleChapters.map((chapter, index) => <ChapterCard chapter={chapter} index={index} key={chapter.id} />)}</div>
        </div>
      </section>

      <section className="closing-note page-shell section-space">
        <div className="closing-note-icon"><Compass size={21} /></div>
        <div><p className="eyebrow">Keep the knowledge moving</p><h2>Every recipe is a form of <em>inheritance.</em></h2></div>
        <Link className="button button-outline" to="/about">Meet the project team <ArrowRight size={16} /></Link>
      </section>
    </>
  );
}

function ChapterPage() {
  const { id } = useParams();
  const chapter = chapterById[id];
  const chapterFoods = foods.filter((food) => food.chapterId === id);
  if (!chapter) return <NotFound />;
  const heroImage = chapter.mapImage || chapter.images?.[0];
  const introPages = chapter.openingPages || [];
  return (
    <>
      <section className="chapter-hero page-shell">
        <div className="chapter-hero-copy">
          <Link className="back-link" to="/"><ChevronLeft size={15} /> All chapters</Link>
          <p className="eyebrow"><span />Chapter {String(chapters.findIndex((item) => item.id === id) + 1).padStart(2, '0')} · pages {chapter.range[0]}–{chapter.range[1]}</p>
          <h1>{chapter.title}</h1>
          <p className="intro-deck">{chapter.description}</p>
          <div className="chapter-meta"><span><BookOpen size={15} /> Original book pages {chapter.range[0]}–{chapter.range[1]}</span><span><Utensils size={15} /> {chapterFoods.length} food {chapterFoods.length === 1 ? 'story' : 'stories'}</span></div>
        </div>
        {heroImage && <figure className="chapter-hero-art"><img src={heroImage} alt={`${chapter.title} artwork from the original book`} /><figcaption>Artwork and photography from the original PDF</figcaption></figure>}
      </section>

      {introPages.length > 0 && (
        <section className="chapter-reading section-space">
          <div className="page-shell reading-shell">
            <p className="eyebrow"><span />From the original book</p>
            {introPages.filter((page) => page.text && page.text.length > 16).map((page) => (
              <article className="source-page" key={page.page}>
                <div className="source-page-number">{String(page.page).padStart(3, '0')}</div>
                <BookText text={page.text} />
              </article>
            ))}
          </div>
        </section>
      )}

      {chapterFoods.length > 0 && (
        <section className="chapter-foods section-space">
          <div className="page-shell">
            <div className="section-heading-row"><div><p className="eyebrow"><span />Recipes and foodways</p><h2>In this <em>chapter.</em></h2></div><Link className="inline-link" to="/gallery">Open the food atlas <ArrowRight size={15} /></Link></div>
            <div className="food-grid">{chapterFoods.map((food, index) => <FoodCard food={food} number={index + 1} key={food.id} />)}</div>
          </div>
        </section>
      )}
      {id === 'credits' && <div className="page-shell chapter-credit-link"><Link className="button button-dark" to="/about">Meet the student team <ArrowRight size={16} /></Link></div>}
    </>
  );
}

function FoodPage() {
  const { id } = useParams();
  const food = foods.find((item) => item.id === id);
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(null);
  const index = foods.findIndex((item) => item.id === id);
  useEffect(() => setActiveImage(null), [id]);
  if (!food) return <NotFound />;
  const previous = foods[index - 1];
  const next = foods[index + 1];
  const sections = Object.entries(food.sections || {}).filter(([, text]) => text?.trim());
  const pageStart = Math.min(...food.sourcePages);
  const pageEnd = Math.max(...food.sourcePages);
  return (
    <>
      <section className="food-detail-hero page-shell">
        <div className="food-detail-copy">
          <Link className="back-link" to={`/chapter/${food.chapterId}`}><ChevronLeft size={15} /> {chapterById[food.chapterId]?.title}</Link>
          <p className="eyebrow"><span />{food.category} · pages {pageStart}–{pageEnd}</p>
          <h1>{food.title}</h1>
          <p className="food-detail-subtitle">{food.subtitle}</p>
          <div className="food-facts"><span><Leaf size={15} />{food.community}</span></div>
          <p className="source-note">A food story transcribed from the student book. Section headings follow the original PDF where present.</p>
        </div>
        <div className="food-detail-art">
          <button type="button" className="food-detail-main-image" onClick={() => setActiveImage(0)} aria-label={`Open larger ${food.title} photograph`}>
            <img src={food.images[0]} alt={`${food.title}`} />
            <span className="image-zoom"><Camera size={17} /> View photograph</span>
          </button>
          {food.images.length > 1 && <div className="detail-thumbnails">{food.images.slice(1).map((image, imageIndex) => <button key={image} type="button" onClick={() => setActiveImage(imageIndex + 1)} aria-label={`View photograph ${imageIndex + 2} of ${food.title}`}><img src={image} alt="" /></button>)}</div>}
          <p className="image-caption">Original photography and artwork · PDF pages {food.imagePages.join(', ')}</p>
        </div>
      </section>

      <section className="food-story section-space">
        <div className="page-shell story-layout">
          <aside className="story-sidebar"><p className="eyebrow"><span />From the book</p><h2>A place at<br />the <em>table.</em></h2><p>Regional identity, cultural memory, preparation, and the sources recorded in the original project.</p><Link className="inline-link" to="/references">Browse all references <ArrowRight size={15} /></Link></aside>
          <div className="story-sections">
            {sections.map(([key, text]) => (
              <article className="story-section" key={key}>
                <div className="story-section-number">{String(Object.keys(sectionLabels).indexOf(key) + 1).padStart(2, '0')}</div>
                <div><h2>{sectionLabels[key] || 'From the book'}</h2>{key === 'references' ? <ReferenceText text={text} foodTitle={food.title} /> : <BookText text={text} />}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <nav className="food-pagination page-shell" aria-label="Food story navigation">
        {previous ? <button type="button" className="food-page-nav prev" onClick={() => navigate(`/food/${previous.id}`)}><ChevronLeft size={18} /><span><small>Previous food</small><strong>{previous.title}</strong></span></button> : <span />}
        <Link to="/gallery" className="pagination-index">All foods <span>{String(index + 1).padStart(2, '0')} / {foods.length}</span></Link>
        {next ? <button type="button" className="food-page-nav next" onClick={() => navigate(`/food/${next.id}`)}><span><small>Next food</small><strong>{next.title}</strong></span><ChevronRight size={18} /></button> : <span />}
      </nav>
      {activeImage !== null && <ImageLightbox images={food.images} index={activeImage} title={food.title} onClose={() => setActiveImage(null)} onChange={setActiveImage} />}
    </>
  );
}

function ImageLightbox({ images, index, title, onClose, onChange }) {
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onChange((index + 1) % images.length);
      if (event.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length);
    };
    document.body.classList.add('lightbox-open');
    window.addEventListener('keydown', handleKey);
    return () => { document.body.classList.remove('lightbox-open'); window.removeEventListener('keydown', handleKey); };
  }, [images.length, index, onChange, onClose]);
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${title} image viewer`} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <button className="lightbox-close" type="button" onClick={onClose} aria-label="Close image viewer"><X size={22} /></button>
      {images.length > 1 && <button className="lightbox-arrow lightbox-prev" type="button" onClick={() => onChange((index - 1 + images.length) % images.length)} aria-label="Previous image"><ChevronLeft size={25} /></button>}
      <figure><img src={images[index]} alt={`${title} — photograph ${index + 1} of ${images.length}`} /><figcaption>{title} <span>{String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span></figcaption></figure>
      {images.length > 1 && <button className="lightbox-arrow lightbox-next" type="button" onClick={() => onChange((index + 1) % images.length)} aria-label="Next image"><ChevronRight size={25} /></button>}
    </div>
  );
}

function GalleryPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All categories');
  const [chapterId, setChapterId] = useState('All chapters');
  const [lightboxFood, setLightboxFood] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const categories = useMemo(() => [...new Set(foods.map((food) => food.category))].sort(), []);
  const filteredFoods = useMemo(() => foods.filter((food) => {
    const searchText = `${food.title} ${food.subtitle} ${food.community} ${food.category}`.toLowerCase();
    return (!query.trim() || searchText.includes(query.trim().toLowerCase()))
      && (category === 'All categories' || food.category === category)
      && (chapterId === 'All chapters' || food.chapterId === chapterId);
  }), [query, category, chapterId]);
  const openLightbox = (food) => { setLightboxFood(food); setLightboxIndex(0); };
  return (
    <>
      <PageIntro eyebrow="The food atlas · 32 entries" title={<>A country, told<br /><em>through its kitchens.</em></>} description="Search the collection by food, chapter, or the ingredients that tie each tradition to its landscape." />
      <section className="gallery-controls page-shell">
        <label className="search-field"><Search size={18} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search foods, ingredients…" aria-label="Search foods" />{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>}</label>
        <div className="filter-row">
          
          <label><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option>All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span>Chapter</span><select value={chapterId} onChange={(event) => setChapterId(event.target.value)}><option>All chapters</option>{chapters.filter((chapter) => chapter.foodIds?.length).map((chapter) => <option value={chapter.id} key={chapter.id}>{chapter.shortTitle}</option>)}</select></label>
          <p className="result-count"><strong>{filteredFoods.length}</strong> of {foods.length} foods</p>
        </div>
      </section>
      <section className="gallery-results section-space">
        <div className="page-shell">
          {filteredFoods.length ? <div className="food-grid gallery-grid">{filteredFoods.map((food, index) => <FoodCard key={food.id} food={food} number={index + 1} onImageClick={openLightbox} />)}</div> : <div className="empty-state"><span><Search size={22} /></span><h2>No foods found</h2><p>Try a different name, region, or category.</p><button className="button button-outline" type="button" onClick={() => { setQuery(''); setCategory('All categories'); setChapterId('All chapters'); }}>Clear filters</button></div>}
        </div>
      </section>
      {lightboxFood && <ImageLightbox images={lightboxFood.images} index={lightboxIndex} title={lightboxFood.title} onClose={() => setLightboxFood(null)} onChange={setLightboxIndex} />}
    </>
  );
}

function AboutPage() {
  const credits = chapterById.credits?.openingPages?.map((page) => page.text).filter(Boolean).join('\n') || '';
  const copyrightAdditions = [
    'This site accompanies the student-created book, Forgotten Foods of India.',
    'Original student-created text and design are credited to their contributors.',
    'Research summaries are provided for educational and cultural documentation.',
    'Referenced studies and websites remain the property of their authors and publishers.',
    'External links are included for attribution and further reading.',
    'Link inclusion does not imply endorsement by the linked organizations.',
    'Third-party photographs and illustrations retain their creators’ rights.',
    'Reuse of third-party text or images should follow the creator’s stated terms.',
    'Traditional recipes and food knowledge are shared with respect for their communities.',
    'This project claims no ownership of community-held food practices or knowledge.',
  ];
  const fullCredits = [credits, '', ...copyrightAdditions].join('\n');
  return (
    <>
            <section className="about-story section-space">
        <div className="page-shell about-grid">
          <div className="team-panel"><p className="eyebrow"><span />The project team</p><div className="team-list">{team.members.map((member, index) => <div className="team-member" key={member.id}><span className="team-number">{String(index + 1).padStart(2, '0')}</span><div><strong>{member.name}</strong><small>{member.id}</small></div><Leaf size={15} /></div>)}</div></div>
        </div>
      </section>
      <section className="about-credits page-shell">
        <div className="credits-rule" /><div><p className="eyebrow">Original publication notes</p><BookText text={fullCredits} compact /></div>
      </section>
    </>
  );
}

function ReferencesPage() {
  const referenceFoods = foods.filter((food) => food.sections?.references?.trim());
  return (
    <>
      <PageIntro eyebrow="Notes & bibliography" title={<>Where each story<br /><em>finds its roots.</em></>} description="Reference and source notes reproduced from the food entries in the original student book." />
      <section className="reference-list section-space">
        <div className="page-shell">
          <div className="reference-note"><BookOpen size={18} /><p>These are the sources recorded in the PDF. Links are made clickable when a complete URL is present in the extracted text.</p></div>
          {referenceFoods.map((food, index) => <article className="reference-entry" key={food.id}>
            <div className="reference-index">{String(index + 1).padStart(2, '0')}</div>
            <div className="reference-entry-title"><h2><Link to={`/food/${food.id}`}>{food.title}</Link></h2><small>PDF pages {food.sourcePages[0]}–{food.sourcePages.at(-1)}</small></div>
            <div className="reference-entry-copy"><ReferenceText text={food.sections.references} foodTitle={food.title} /></div>
          </article>)}
        </div>
      </section>
    </>
  );
}

function ReferenceText({ text, foodTitle = 'this food' }) {
  const sourceLines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const entries = [];
  for (let index = 0; index < sourceLines.length; index += 1) {
    const line = sourceLines[index];
    if (/^(?:5[.)]\s*)?references and sources:?$/i.test(line)) continue;
    if (!/https?:\/\//i.test(line)) {
      entries.push({ text: line, key: `text-${index}` });
      continue;
    }
    let rawUrl = line;
    while (index + 1 < sourceLines.length) {
      const next = sourceLines[index + 1];
      const isWrappedUrl = /^(?:%|utm_source(?:=|$))/i.test(next) || /[-?&%]$/.test(rawUrl);
      if (!isWrappedUrl) break;
      rawUrl += next;
      index += 1;
    }
    const url = rawUrl.replace(/\s+/g, '').replace(/[),.;]+$/, '').replace(/[?&]+$/, '');
    entries.push({ url, key: `url-${index}` });
  }
  return (
    <ul className="reference-lines">
      {entries.map((entry) => entry.url ? (
        <li key={entry.key}><a href={entry.url} target="_blank" rel="noreferrer" aria-label={`Open source for ${foodTitle}`}>Open source <ExternalLink size={13} /></a></li>
      ) : <li key={entry.key}>{entry.text}</li>)}
    </ul>
  );
}
function NotFound() {
  return <section className="not-found page-shell"><p className="eyebrow"><span />A page was not found</p><h1>Let's find our<br /><em>way back.</em></h1><Link className="button button-dark" to="/">Return to the book <ArrowRight size={16} /></Link></section>;
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('forgotten-foods-theme') || 'light'; } catch { return 'light'; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('forgotten-foods-theme', theme); } catch { /* private browsing can disable storage */ }
    Shell.theme = theme;
    Shell.onThemeToggle = () => setTheme((value) => value === 'dark' ? 'light' : 'dark');
  }, [theme]);
  Shell.theme = theme;
  Shell.onThemeToggle = () => setTheme((value) => value === 'dark' ? 'light' : 'dark');
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chapter/:id" element={<ChapterPage />} />
        <Route path="/food/:id" element={<FoodPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/references" element={<ReferencesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Shell>
  );
}
