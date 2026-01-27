import { useState } from 'react';
import sundariImage from '../../assets/careers/sundari patibandla.png';
import sreenivasImage from '../../assets/careers/sreenivas tridala.png';
import vasumathiImage from '../../assets/careers/Vasumathi_Krishnan.jpg';
import vijayImage from '../../assets/careers/vijaypasupulati.jpg';
import linkedinIcon from '../../assets/footer/Linkedin.png';
import TeamMemberModal from './TeamMemberModal';

interface TeamMember {
  name: string;
  position: string;
  image: string;
  description: string;
  fullDescription: string;
  linkedin: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Sundari Patibandla",
    position: "CEO & Co-Founder",
    image: sundariImage,
    description: "Leads iSprout with a people-first vision, driving scalable growth and strong operations across multiple cities.",
    fullDescription: "Meet our number-crunching ninja and workspace wizard, the CEO & Co-Founder of iSprout! This Chartered Accountant isn't just about balance sheets and profit margins - oh no, they're on a mission to revolutionize the way India works. Since 2017, they've been turning iSprout into a managed offices powerhouse, climbing the ranks to become a top 10 player in the game. With centers in 5 cities and dreams as big as their spreadsheets, this visionary is set on conquering 2 million sq. ft of workspace awesomeness by the end of 2024. This leader's secret sauce? A dash of collaboration, a sprinkle of innovation, and a whole lot of 'let's turn problems into parties' attitude.",
    linkedin: "https://www.linkedin.com/in/sundaripatibandla/"
  },
  {
    name: "Sreenivas Tirdhala",
    position: "Co-Founder & CSO",
    image: sreenivasImage,
    description: "Heads strategy and innovation, building future-ready workspace solutions for evolving business needs.",
    fullDescription: "Hold onto your hats, folks, because this iSprout maverick's career journey is wilder than a rollercoaster! After 12+ years in the corporate jungle, they decided being a suit-wearing robot wasn't their style. Nope, this go-getter has been there, done that, and probably designed a t-shirt about it! From rubbing elbows with the bigwigs at Citibank, Goldman Sachs, and Bank of America, to unleashing their inner tech guru with Cerone Software, this multi-talented maestro knows how to shake things up. This iSprout dynamo is always ready for the next big adventure. Who knows what they'll conquer next? One thing's for sure - it'll be anything but boring!",
    linkedin: "https://www.linkedin.com/in/sreenivastirdhala/"
  },
  {
    name: "Vasumathi Krishnan",
    position: "Chief Business Officer",
    image: vasumathiImage,
    description: "Drives growth and partnerships, aligning workspace solutions with client business goals.",
    fullDescription: "At iSprout, our focus on customer relations and new business development is pivotal for driving expansion and cultivating key partnerships. With a robust background in coworking spaces, my expertise lies in nurturing client engagement and spearheading strategic growth initiatives. Our recent endeavors have centered on leveraging key account management skills to enhance the client experience, fortifying iSprout's position in the competitive market. The mission is clear: to amplify our reach and solidify enduring client relationships through tailored solutions and dedicated service.",
    linkedin: "https://www.linkedin.com/in/vasumathi-krishnan-20b47712/"
  },
  {
    name: "Vijay Pasupulati",
    position: "Chief Experience Officer",
    image: vijayImage,
    description: "Meet the CEO & Co-Founder of iSprout, a visionary leader in organisational excellence.",
    fullDescription: "Manages member experience and service delivery, ensuring quality and consistency across all centres.",
    linkedin: "https://www.linkedin.com/in/vijaypasupulati/"
  }
];

const AboutTeam = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReadMore = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full bg-white py-12 md:py-16 lg:py-20">
      {/* About Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-16">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
            The Architects Of iSprout's Innovative Workspaces
          </h2>
        </div>
        
        <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
          <p>
            Meet the masterminds behind the iSprout magic! Our fearless leaders are a quirky bunch of
            workspace wizards, each with their own secret sauce for success. They're the heart and soul of
            iSprout, and they're on a mission to make your workday awesome, one space at a time. With
            decades of combined experience in real estate, design, technology, and business management,
            our leadership team has seen it all and done it all in the world of workspaces.
          </p>
          <p>
            They've learned from the best, made mistakes (and boy, do they have some funny stories), and
            emerged with a treasure of knowledge that they're eager to put to work for you.
          </p>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* First row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {teamMembers.slice(0, 3).map((member, index) => (
            <TeamMemberCard key={index} member={member} onReadMore={handleReadMore} />
          ))}
        </div>
        
        {/* Second row: Remaining cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
          {teamMembers.slice(3).map((member, index) => (
            <TeamMemberCard key={index + 3} member={member} onReadMore={handleReadMore} />
          ))}
        </div>
      </div>

      {/* Team Member Modal */}
      <TeamMemberModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        member={selectedMember}
      />
    </div>
  );
};

const TeamMemberCard: React.FC<{ member: TeamMember; onReadMore: (member: TeamMember) => void }> = ({ member, onReadMore }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      {/* Yellow Header with LinkedIn icon */}
      <div className="bg-[#FFD700] px-4 py-2.5 flex justify-between items-center">
        <h3 className="text-black font-bold text-base md:text-lg">{member.name}</h3>
        <a 
          href={member.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-7 h-7 flex items-center justify-center bg-[#000000] rounded hover:bg-[#005885] transition-colors shrink-0"
        >
          <img src={linkedinIcon} alt="LinkedIn" className="w-4 h-4 invert brightness-0" />
        </a>
      </div>

      {/* Full Image, always visible, no overlap */}
      <div className="w-full">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-80 md:h-88 object-cover object-top"
        />
      </div>

      {/* Content section, starts after image */}
      <div className="p-5 md:p-6 flex flex-col grow">
        <div className="bg-[#FFD700] inline-block px-3 py-1.5 rounded mb-3 self-start">
          <p className="text-black font-bold text-xs md:text-sm">{member.position}</p>
        </div>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 grow">
          {member.description}
        </p>
        {/* <button
          onClick={() => onReadMore(member)}
          className="text-[#00275c] font-semibold text-sm hover:underline text-left"
        >
          Read more »
        </button> */}
      </div>
    </div>
  );
};

export default AboutTeam;