import { COLORS } from '../../helpers/constants/Colors';

const Departments = () => {
   const jobs = [
      {
         title: "Software Developer",
         openings: 2,
      },
      {
         title: "Real Estate Manager",
         openings: 1,
      },
      {
         title: "Digital Marketing",
         openings: 2,
      },
      {
         title: "Sales / Operations",
         openings: 2,
      },
   ];
 
   return (
      <section className='px-4 lg:px-16 py-12 lg:py-20' style={{ backgroundColor: COLORS.white }}>
         <div className='max-w-[1280px] mx-auto'>
            {/* Section Header with Yellow Background */}
            <div className='flex justify-center mb-12 lg:mb-16'>
               <div className='relative'>
                  {/* Yellow pill shape with custom border radius */}
                  <div
                     className='rounded-tl-[50px] rounded-br-[50px] px-8 lg:px-12 py-5 lg:py-6'
                     style={{
                        backgroundColor: COLORS.brandYellow,
                        boxShadow: COLORS.shadowColor,
                     }}
                  >
                     <h2
                        className='text-2xl sm:text-3xl lg:text-4xl text-center capitalize whitespace-nowrap'
                        style={{ color: COLORS.textBlack, fontFamily: 'Outfit, sans-serif' }}
                     >
                        Departments hiring at{" "}
                        <span className='font-medium'>iSprout</span>
                     </h2>
                  </div>
               </div>
            </div>
 
            {/* Job Cards Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
               {jobs.map((job, index) => (
                  <div
                     key={index}
                     className='rounded-[20px] p-6 flex flex-col justify-between hover:shadow-xl hover:scale-105 transition-all duration-300'
                     style={{
                        backgroundColor: COLORS.grayCardBg,
                        boxShadow: COLORS.shadowColor,
                     }}
                  >
                     <div>
                        <h3
                           className='font-semibold text-base lg:text-lg mb-2 capitalize min-h-[3rem]'
                           style={{
                              color: COLORS.textBlack,
                              fontFamily: "Poppins, sans-serif",
                           }}
                        >
                           {job.title}
                        </h3>
                        <p
                           className='capitalize mb-6'
                           style={{
                              color: COLORS.textBlack,
                              fontFamily: "Poppins, sans-serif",
                           }}
                        >
                           openings {job.openings}
                        </p>
                     </div>
 
                     {/* Apply Button */}
                     <button
                        className='text-white rounded-[10px] py-2 px-4 font-semibold capitalize w-full shadow-sm transition-colors'
                        style={{
                           backgroundColor: COLORS.brandBlueAlpha,
                           fontFamily: "Poppins, sans-serif",
                        }}
                        onMouseEnter={(e) => {
                           e.currentTarget.style.backgroundColor =
                              COLORS.brandBlue;
                        }}
                        onMouseLeave={(e) => {
                           e.currentTarget.style.backgroundColor =
                              COLORS.brandBlueAlpha;
                        }}
                     >
                        Apply Here
                     </button>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};
 
export default Departments;
 
 