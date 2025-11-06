import { useState, useEffect } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { useToast } from "../components/ui/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch('https://rithya.onrender.com/api/public/contact/');
        if (response.ok) {
          const data = await response.json();
          setContactData(data);
        } else {
          console.error('Failed to fetch contact data');
        }
      } catch (error) {
        console.error('Error fetching contact data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = contactData ? [
    {
      icon: <Phone size={24} />,
      title: "Phone",
      content: <>{contactData.phone}</>,
      link: `tel:${contactData.phone.replace(/\s+/g, '')}`,
    },
    {
      icon: <FaTelegramPlane size={24} />,
      title: "Telegram",
      content: (
        <>
          {contactData.telegram_khmer} ( Khmer Speaking ) <br /> {contactData.telegram_english} ( English Speaking )
        </>
      ),
      link: "#",
    },
    {
      icon: <Mail size={24} />,
      title: "Email",
      content: contactData.email,
      link: `mailto:${contactData.email}`,
    },
    {
      icon: <MapPin size={24} />,
      title: "Address",
      content: contactData.address_link,
      link: contactData.address_link,
    },
  ] : [];

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text​ text-head text-aqua-500">
            ទំនាក់ទំនង
          </h2>
          <div className="w-24 h-1 bg-aqua-500 mx-auto mb-6"></div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-navy-800 mb-6">
              Contact Information
            </h3>
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="flex items-start animate-pulse">
                    <div className="bg-gray-200 p-3 rounded-full mr-4 w-12 h-12"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2 w-20"></div>
                      <div className="h-4 bg-gray-200 rounded w-48"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-aqua-100 text-aqua-600 p-3 rounded-full mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-navy-700">
                        {item.title}
                      </h4>
                      <a
                        href={item.link}
                        className="text-gray-600 hover:text-aqua-500 transition-colors"
                        target={item.title === "Address" ? "_blank" : undefined}
                        rel={
                          item.title === "Address"
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {item.content}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Opening Hours */}
          <div className="bg-navy-800 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Opening Hours</h3>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>{contactData?.monday_friday_hours || "6:00 AM - 19:00 PM"}</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday - Sunday</span>
                <span>{contactData?.saturday_sunday_hours || "6:00 AM - 18:00 PM"}</span>
              </li>
            </ul>
            <div className="mt-8 pt-6 border-t border-navy-600">
              <p className="text-aqua-300 font-medium">Swimming Pool:</p>
              <p className="text-gray-300 mt-2">
                {contactData?.pool_location || "Olympic Stadium / Khmer Swimming Federation"}
              </p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-gray-200 rounded-lg h-96 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d7817.820319202874!2d104.913674!3d11.558298!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDMzJzI5LjkiTiAxMDTCsDU0JzQ5LjIiRQ!5e0!3m2!1sen!2skh!4v1746276250104!5m2!1sen!2skh"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              title="Map location of Rithya Swimming Club"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
