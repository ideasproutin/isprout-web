import HeroSection from './herosection';
import Questions from './questions';
import Footer from '../../components/footer/footer';
import FutureOfWork from '../home/components/futureofwork';

const FAQ = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <Questions />
      <FutureOfWork />
      <Footer />
    </div>
  );
};

export default FAQ;
