import IntroSection from './intro';
import ManagedOfficeTypes from './managedofficetypes';
import WhyManagedOffice from './whymanagedoffice';
import Glimpse from './glimpse';
import HowManagedOffice from './howmanagedoffice';
import Locations from '../home/components/locations';
import Amenities from '../home/components/amenities';
import SpiceThings from './spicethings';
import FutureOfWork from '../home/components/futureofwork';
import Footer from '../../components/footer/footer';

const ManagedOffice = () => {
  return (
    <div className="w-full">
      <IntroSection />
      <ManagedOfficeTypes />
      <WhyManagedOffice />
      <Glimpse />
      <HowManagedOffice />
      <Locations />
      <Amenities />
      <SpiceThings />
      <FutureOfWork />
      <Footer />
    </div>
  );
};

export default ManagedOffice;
