import { useState, useRef } from "react";
import v1 from "../assets/about1.jpg";
import p1 from "../assets/about.png";
import gift from "../assets/vd.gif";
import p2 from "../assets/about2.png";
import p3 from "../assets/about3.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";

const AboutSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dialogRef = useRef(null);

  const details = [
    {
      image: v1,
      title: "ហេតុផល​អ្វី​ត្រូវ​ជ្រើស​រើស​ការ​រៀន​ហែលទឹក​​ប្រចាំ​ជីវិត​?",
      description: `
&nbsp;&nbsp;&nbsp;ការរៀនហែលទឹក គឺជាជំនាញចាំបាច់សម្រាប់ជីវិត ហើយវាមានសារៈសំខាន់ខ្លាំងដូចខាងក្រោម៖<br>
១. សុវត្ថិភាពផ្ទាល់ខ្លួន<br>
- ការចេះហែលទឹកអាចជួយជីវិតអ្នកនៅពេលជួបប្រឈមនឹងស្ថានភាពគ្រោះថ្នាក់ក្នុងទឹក ដូចជា៖<br>
   . ធ្លាក់ទឹក ឬជួបអន្តរាយនៅពេលធ្វើដំណើរតាមផ្លូវទឹក។<br>
  . ការជួយសង្គ្រោះអ្នកដទៃដែលកំពុងលង់ទឹក។<br>
<br>
២. សុខភាពល្អ និងការអភិវឌ្ឍន៍រាងកាយ<br>
- ហែលទឹកជាកីឡាកម្សាន្តដែលអាចជួយ៖<br>
   . ពង្រឹកសាច់ដុំ និងប្រសិទ្ធភាពបេះដូង។<br>
   . កាត់បន្ថយស្ត្រេស និងជំរុញឱ្យរាងកាយរីករាយ។<br>
<br>
៣. ភាពងាយស្រួលក្នុងជីវិតប្រចាំថ្ងៃ<br>
- អាចចូលរួមកម្សាន្តនៅឆ្នេរខ្សាច់ សមុទ្រ បឹង អាងហែលទឹក ឬកន្លែងដែលមានទឹក។<br>
- បើអ្នកចូលចិត្តកីឡាទឹក (ដូចជា ប្រណាំងទូក ការធ្វើដំណើរតាមដៃទឹក) ការចេះហែលទឹកធ្វើឱ្យអ្នកមានភាពរីករាយនិងមានសុវត្ថិភាព។<br>
<br>
៤. ជំនាញសម្រាប់ការងារ<br>
- ក្នុងមុខរបរខ្លះ (ដូចជា អាជីវកម្មទេសចរណ៍ អ្នកជួយសង្គ្រោះ ឬអ្នកហែលទឹកប្រណាំង) ការចេះហែលទឹកគឺជាតម្រូវការចាំបាច់។<br>
<br>
៥. ភាពរីករាយ និងទំនុកចិត្ត<br>
- ការចេះហែលទឹកផ្តល់ឱ្យអ្នកនូវភាពរីករាយ និងទំនុកចិត្តខ្ពស់ពេលនៅក្នុងទឹក។<br>
- អាចជាការលេងសប្បាយជាមួយក្រុមគ្រួសារ ឬមិត្តភក្តិ។<br>
<br>
សន្និដ្ឋាន<br>
ការចេះហែលទឹកគឺមិនគ្រាន់តែជាជំនាញសម្រាប់ការរស់រានប៉ុណ្ណោះទេ ប៉ុន្តែវាក៏ជាវិធីល្អដើម្បីថែរក្សាសុខភាព និងពង្រីកបទពិសោធន៍ជីវិតផងដែរ។ ដូច្នេះ វាជាជំនាញដែលមនុស្សគ្រប់រូបគួររៀនហែលទឹក!`,
    },
    {
      image: p2,
      title: "តើអាយុសមស្របសម្រាប់ការចាប់ផ្តើមរៀនហែលទឹកពីអាយុប៉ុន្នានឆ្នាំទៅល្អ?",
      description: `
&nbsp;&nbsp;&nbsp;តើអាយុសមស្របសម្រាប់ការចាប់ផ្តើមរៀនហែលទឹកពីអាយុប៉ុន្នានឆ្នាំទៅល្អ?<br>
ចម្លើយរបស់ខ្ញុំមានដូចខាងក្រោម៖<br>
១. ១–៣ ឆ្នាំ (អាយុល្អបន្តិច)<br>
   - អាចស្គាល់ទឹកដោយមានឪពុកម្តាយ ឬអ្នកថែទាំនៅជិត (ឧ. លេងទឹកត្រជាក់ ឬហែលក្នុងអាងតូចជាមួយគាត់)។<br>
   - មិនគួរចាប់ផ្តើមរៀនហែលជាផ្លូវការនៅអាយុនេះទេ ព្រោះកុមារមិនទាន់មានសមត្ថភាពគ្រប់គ្រាន់ក្នុងការគ្រប់គ្រងដង្ហើម ស្តាប់ការពន្យល់របស់គ្រូមិនបានល្អ និងចលនាឱ្យបានត្រឹមត្រូវ។<br>
២. ៤–៦ ឆ្នាំ (អាយុល្អបំផុតដើម្បីចាប់ផ្តើម)<br>
   - កុមារភាគច្រើនមានសមត្ថភាពរៀន ការគ្រប់គ្រងដង្ហើម និង ចលនាដៃ-ជើង ឱ្យសមស្របបាន។<br>
   - អាចចូលរួម មេរៀនហែលទឹកសម្រាប់កុមារ ដែលមានគ្រូជំនាញ។<br>
៣. ៧ ឆ្នាំឡើង<br>
   - បើមុននេះមិនទាន់រៀន កុមារនៅអាយុនេះអាចចាប់ផ្តើមបានយ៉ាងងាយ ព្រោះមានសមត្ថភាពរៀនបច្ចេកទេសលឿន និងកម្លាំងខ្លាំងជាងអាយុក្រោម ៧ឆ្នាំ។<br>
សញ្ញាថាកុមារត្រៀមខ្លួនហើយក្នុងការរៀនហែលទឹក<br>
- មិនខ្លាចទឹក និងចូលចិត្តលេងទឹកនៅក្នុងអាង។<br>
- អាចធ្វើតាមសកម្មភាពដោយសុវត្ថិភាព (ដូចជាការដាក់មុខចុះទឹក រក្សាដង្ហើម ឬបណ្តែតខ្លួនបាន)។<br>
- អាចស្តាប់ ឬយល់ដឹងពីការណែនាំពីគ្រូបាន។<br>
អ្វីដែលត្រូវជ្រើសរើស?<br>
 - ត្រូវមានគ្រូជំនាញកីឡាហែលទឹក ឬឪពុកម្តាយដែលចេះហែលទឹកនៅជិតគាត់។<br>
 - ជ្រើសរើស អាងហែលទឹកសុវត្ថិភាព ។<br>
 - ប្រើ ឧបករណ៍ត្រឹមត្រូវ ដូចជា វែនតាហែលទឹក ឯកសណ្ឋានហែលទឹក និងមួកហែលទឹក។<br>
ចំណាំ៖ កុមារម្នាក់ៗមានភាពខុសគ្នា ដូច្នេះគួរចាប់ផ្តើមនៅពេលដែលពួកគេមានភាពសុខភាពល្អ ស្រស់ស្រាយ និងរីករាយក្នុងការរៀន។`,
    },
    {
      image: p3,
      title: "អត្ថប្រយោជន៍នៃការហែលទឹក",
      description: `
&nbsp;&nbsp;&nbsp;មនុស្សវ័យចាស់ដែលមានអាយុ ចាប់ពី៣០ឆ្នាំឡើង គួរតែមកហែលទឹក ឬប្រកួតហែលទឹកដោយសារប្រយោជន៍ជាច្រើនដូចខាងក្រោម៖<br>

១. ការកាត់បន្ថយការឈឺសន្លាក់<br>
ការហែលទឹកជាលំហាត់ប្រាណដែលមិនជាប់ជាមួយការប៉ះទង្គិចខ្លាំង ដែលអាចជួយកាត់បន្ថយសម្ពាធលើសន្លាក់។ នៅពេលហែលទឹក ទម្ងន់រាងកាយ ៩០% ត្រូវបានទ្រដោយទឹក ដែលធ្វើឲ្យសន្លាក់មិនឈឺចាប់ក្នុងពេលធ្វើចលនា។ វាក៏ជួយពង្រឹងសាច់ដុំជុំវិញសន្លាក់ ដែលជាកត្តាសំខាន់ក្នុងការការពារការរួញនិងអស់ស្ថេរភាពសន្លាក់។<br>

២. ពង្រឹងសុខភាពចិត្ត និងការលើកទឹកចិត្ត<br>
ការហែលទឹកផ្តល់អារម្មណ៍សប្បាយ និងជួយបន្ថយភាពតានតឹងផ្លូវចិត្ត ដែលជាបញ្ហាទូទៅសម្រាប់មនុស្សវ័យចាស់។ ការចូលរួមក្នុងការប្រកួតហែលទឹកក៏អាចជួយលើកទឹកចិត្ត និងផ្តល់គោលដៅជីវិតដល់ពួកគេ។<br>

៣. ការពារហានិភ័យសុខភាពផ្សេងៗ<br>
ការហែលទឹកជាលំហាត់ប្រាណដែលអាចកាត់បន្ថយហានិភ័យនៃការធ្លាក់ ឬរបួស ដោយសារវាពង្រឹងសាច់ដុំ និងធ្វើឲ្យរាងកាយមានតុល្យភាពល្អ។ វាក៏ជួយកាត់បន្ថយហានិភ័យនៃជំងឺបេះដូង និងជំងឺទឹកនោមផ្អែមដែលអាចកើតឡើងនៅវ័យចាស់។<br>

៤. អាចបត់បែនបានសម្រាប់មនុស្សវ័យចាស់<br>
ការហែលទឹកអាចធ្វើបានតាមល្បឿននិងកម្រិតដែលសមស្របសម្រាប់មនុស្សវ័យចាស់។ វាមិនតម្រូវឲ្យប្រើកម្លាំងខ្លាំងដូចកីឡាផ្សេងៗទៀត ដូចជាការរត់ ឬលោត។ របៀបហែលទឹកដូចជា របៀបហែលសេរី របៀបហែលផ្ងារ របៀបហែលកង្កែប អាចជាជម្រើសល្អ ព្រោះវាងាយស្រួលសម្រាប់អ្នកចាប់ផ្តើម និងមានប្រសិទ្ធភាពក្នុងការពង្រឹងសាច់ដុំ។<br>

៥. ការរក្សាសុខភាពសរសៃប្រសាទ និងសាច់ដុំ<br>
ការហែលទឹកជួយពង្រឹងប្រព័ន្ធប្រសាទ និងធ្វើឲ្យឈាមដង្ហើមបានល្អ ដែលជាកត្តាសំខាន់សម្រាប់មនុស្សវ័យចាស់។ វាក៏អាចជួយកាត់បន្ថយអស់កម្លាំងយ៉ាងឆាប់រហ័ស ដែលជាបញ្ហាទូទៅសម្រាប់អ្នកចាស់។`,
    },
  ];

  const toggleReadMore = () => {
    setExpanded(!expanded);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % details.length);
    if (dialogRef.current) {
      dialogRef.current.scrollTop = 0;
    }
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + details.length) % details.length
    );
    if (dialogRef.current) {
      dialogRef.current.scrollTop = 0;
    }
  };

  return (
    <section id="about" className="bg-[#e6f3f7] py-20">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT: Profile Section */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="relative rounded-full overflow-hidden border-4 border-white shadow-lg w-54 h-54 mb-6 hover:scale-105 transition-transform duration-300">
            <img
              src={p1}
              alt="Instructor"
              loading="lazy"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-head font-semibold text-aqua-600 mb-2 underline">
            អំពីយើង
          </h3>
          <p
            className={`text-gray-800 text-body leading-relaxed max-w-md  ${
              expanded ? "" : "line-clamp-1"
            }`}
            style={{ textAlign: "justify", textJustify: "inter-word" }}
          >
            &nbsp;&nbsp;&nbsp;ស្វែងយល់ពីអ្វីគ្រប់យ៉ាងដែលអ្នកត្រូវដឹងអំពីកីឡាហែលទឹករបស់កម្ពុជា
            ពីគ្រូដែលមានបទពិសោធន៏ អតីតកីឡាករ
            កីឡាការិនីជម្រើសជាតិធ្លាប់ចូលរួមប្រកួតហែលទឹកទាំង ថ្នាក់ជាតិ
            និងអន្តរជាតិនិងជាពិសេសដែលទទួលស្គាល់ពី សហព័ន្ធខ្មែរកីឡាហែលទឹក
            ដែលបានចូលរួមបណ្តុះបណ្តាល ទាំងទ្រឹស្តី និងអនុវត្តន៏
            ពីការបង្ហាត់បង្រៀនការរៀបចំផែនការហាត់ហ្វឹកហ្វឺន
            លើបច្ចេកទេសកីឡាហែលទឹកចាប់ផ្តើមពីកម្រិតមូលដ្ឋាន
            រហូតដល់កម្រិតខ្ពស់បំផុត។
          </p>
          <button
            onClick={toggleReadMore}
            className="mt-2 text-sm text-blue-600 hover:underline z-10 relative text-body"
            style={{ pointerEvents: "auto" }}
          >
            {expanded ? "បិទ" : "អានបន្ថែម"}
          </button>
        </div>

        <div className="block md:hidden">
          <img src={gift} alt="" />
        </div>
        {/* RIGHT: Image and Description */}
        <div className="bg-white shadow-md rounded-xl  overflow-hidden">
          <Dialog>
            <DialogTrigger asChild>
              <div className="cursor-pointer">
                <img
                  src={v1}
                  alt="Instructor"
                  loading="lazy"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-navy-800 mb-2 text-head">
                    ព័ត៌មាន​បន្ថែម
                  </h3>
                  <button className="mt-2 text-sm text-blue-600 hover:underline text-body">
                    អានបន្ថែម
                  </button>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent key={currentIndex} ref={dialogRef} className="sm:max-w-[600px] bg-white max-h-[500px] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-head">
                  {details[currentIndex].title}
                </DialogTitle>
                <DialogDescription>
                  <img
                    src={details[currentIndex].image}
                    alt="Detail image"
                    loading="lazy"
                    className="w-full h-64 object-cover mt-4 rounded-lg"
                  />
                  <p
                    className="list-disc list-inside text-gray-700 text-sm space-y-2 text-body mt-4"
                    style={{ textAlign: "justify", textJustify: "inter-word" }}
                    dangerouslySetInnerHTML={{ __html: details[currentIndex].description }}
                  />
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-between mt-4">
                <button onClick={handlePrev} className="px-4 py-2 bg-gray-200 rounded-lg">Previous</button>
                <button onClick={handleNext} className="px-4 py-2 bg-gray-200 rounded-lg">Next</button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
