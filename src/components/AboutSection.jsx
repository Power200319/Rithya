import v1 from "../assets/event2.mp4";
import p1 from "../assets/about.png";

const AboutSection = () => {
  return (
    <section id="about" className="bg-[#e6f3f7] py-20">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT: Profile Section */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="relative rounded-full  overflow-hidden border-4 border-white shadow-lg w-54 h-54 mb-6 hover:scale-105 transition-transform duration-300">
            <img
              src={p1}
              alt="Instructor"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-head font-semibold text-aqua-600 mb-2  underline">
            អំពីយើង
          </h3>
          <p className="text-gray-800 text-body leading-relaxed max-w-md text-justify">
            ស្វែងយល់ពីអ្វីគ្រប់យ៉ាងដែលអ្នកត្រូវដឹងអំពីកីឡាហែល ទឹករបស់កម្ពុជា
            ពីគ្រូដែលមានបទពិសោធន៏ អតីតកីឡាករ កីឡាការិនីជម្រើសជាតិ
            ធ្នាប់ចូលរួមប្រកួតហែលទឹក ទាំង ថ្នាក់ជាតិ និងអន្តរជាតិ
            និងជាពិសេសដែលទទួលស្គាល់ពី សហព័ន្ធខ្មែរកីឡាហែលទឹក ដែលបានចូលរួមបណ្តុះ
            បណ្តាល ទាំងទ្រឹស្តី និងអនុវត្តន៏ ពីការបង្ហាត់បង្រៀន ការ
            រៀបចំផែនការហាត់ហ្វឹកហ្វឺន លើបច្ចេកទេសកីឡាហែលទឹក
            ចាប់ផ្តើមពីកម្រិតមូលដ្ឋាន រហូត់ដល់កម្រិតខ្ពស់បំផុត។
          </p>
        </div>

        {/* RIGHT: Mission & Image */}
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-64 object-cover"
          >
            <source src={v1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="p-6">
            <h3 className="text-lg font-semibold text-navy-800 mb-2 text-head">
              ហេតុអ្វីជ្រើសរើសហែលទឹក?
            </h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-2 text-justify text-body">
              <li>ការហែលទឹកជួយអភិវឌ្ឍសុខភាពខាងកាយនិងចិត្ត</li>
              <li>ជាជំនាញសម្រាប់ការជួយខ្លួនបើមានអាសន្ន</li>
              <li>ជាកីឡាដែលអាចហាត់បានគ្រប់អាយុ</li>
              <li>ជួយអភិវឌ្ឍការលេងរួមជាមួយអ្នកដទៃ</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
