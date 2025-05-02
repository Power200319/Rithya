import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { useToast } from "../components/ui/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "Phone",
      content: (
        <>
          012 347 400 / 088 888 9400
        </>
      ),
      link: "tel:+15551234567",
    },
    {
      icon: <FaTelegramPlane size={24} />,
      title: "Telegram",
      content: (
        <>
          012 347 400 ( Khmer Speaking ) <br /> 088 888 9400 ( English Speaking
          )
        </>
      ),
      link: "Allowed to open in Telegram",
    },
    {
      icon: <Mail size={24} />,
      title: "Email",
      content: "ksf.rithya@gmail.com",
      link: "mailto:info@aquaelite.com",
    },
    {
      icon: <MapPin size={24} />,
      title: "Address",
      content: "https://maps.app.goo.gl/R2uxFEfFwzfoPvP89?g_st=it",
      link: "https://maps.google.com",
    },
  ];

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text​ text-head text-aqua-500">
            ទំនាក់ទំនង
          </h2>
          <div className="w-24 h-1 bg-aqua-500 mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8 card-shadow">
            <h3 className="text-2xl font-bold text-navy-800 mb-6">
              Send us a message
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="border-gray-300 focus:border-aqua-500 focus:ring-aqua-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                    className="border-gray-300 focus:border-aqua-500 focus:ring-aqua-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className="border-gray-300 focus:border-aqua-500 focus:ring-aqua-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-gray-700"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Message subject"
                    required
                    className="border-gray-300 focus:border-aqua-500 focus:ring-aqua-500"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                  className="min-h-[120px] border-gray-300 focus:border-aqua-500 focus:ring-aqua-500"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-aqua-500 hover:bg-aqua-600 text-white font-medium py-3 rounded-md transition-colors"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-navy-800 mb-6">
                Contact Information
              </h3>
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
            </div>

            {/* Opening Hours */}
            <div className="bg-navy-800 text-white rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Opening Hours</h3>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>6:00 AM - 19:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday - Sunday</span>
                  <span>6:00 AM - 18:00 PM</span>
                </li>
                {/* <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>8:00 AM - 6:00 PM</span>
                </li> */}
              </ul>
              <div className="mt-8 pt-6 border-t border-navy-600">
                <p className="text-aqua-300 font-medium">Swimming Pool:</p>
                <p className="text-gray-300 mt-2">
                  Olympic Stadium / Khmer Swimming Federation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-gray-200 rounded-lg h-96 overflow-hidden">
            <iframe
              src="https://maps.app.goo.gl/rio6pXBn97Eo2Tqz9"
              className="w-full h-full border-0"
              loading="lazy"
              title="Map location of AquaElite Swimming Club"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
