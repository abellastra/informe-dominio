import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import SeccionAutomotor from "../components/landing/SeccionAutomotor";
import SeccionMonotributo from "../components/landing/SeccionMonotributo";
import SeccionVeraz from "../components/landing/SeccionVeraz";
import SeccionApostillas from "../components/landing/SeccionApostillas";
import SeccionServiciosLocales from "../components/landing/SeccionServiciosLocales";
import SeccionNosotros from "../components/landing/SeccionNosotros";
import Footer from "../components/landing/Footer";

const Landing = () => (
  <div className="min-h-screen bg-[#F8FAFC] font-sans">
    <Navbar />
    <Hero />
    <SeccionAutomotor />
    <SeccionMonotributo />
    <SeccionVeraz />
    <SeccionApostillas />
    <SeccionServiciosLocales />
    <SeccionNosotros />
    <Footer />
  </div>
);

export default Landing;
