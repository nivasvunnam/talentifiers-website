import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './talentifiers/pages/Home';
import About from './talentifiers/pages/About';
import Services from './talentifiers/pages/Services';
import Solutions from './talentifiers/pages/Solutions';
import Technologies from './talentifiers/pages/Technologies';
import Clients from './talentifiers/pages/Clients';
import Careers from './talentifiers/pages/Careers';
import Contact from './talentifiers/pages/Contact';
import NotFound from './talentifiers/pages/NotFound';
import { routerBasename } from './talentifiers/assets';
import { SiteLayout } from './talentifiers/layout';

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    const timer = window.setTimeout(() => {
      if (hash) {
        const element = document.getElementById(hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter basename={routerBasename()}>
      <SiteLayout>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SiteLayout>
    </BrowserRouter>
  );
}
