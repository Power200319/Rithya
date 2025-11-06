import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Card } from "./ui/Card";
import {
  X, Edit, Trash2, Plus, Upload, Save, Eye, EyeOff,
  Home, Users, Image, BookOpen, Calendar, MessageSquare,
  Settings, Shield, LogOut, BarChart3, Sparkles, Zap
} from "lucide-react";

const AdminPanel = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about");
  const [data, setData] = useState({
    about: [],
    gallery: [],
    programs: [],
    schedule: [],
    testimonials: [],
    heroes: [],
    contacts: [],
  });
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [testimonialType, setTestimonialType] = useState(1); // 1 for basic, 2 for experience

  const tabs = [
      { id: "heroes", label: "Heroes", icon: Sparkles, color: "text-yellow-500" },
      { id: "about", label: "About", icon: Home, color: "text-blue-500" },
      { id: "about-details", label: "About Details", icon: BookOpen, color: "text-green-500" },
      { id: "gallery", label: "Gallery", icon: Image, color: "text-purple-500" },
      { id: "programs", label: "Programs", icon: Zap, color: "text-orange-500" },
      // { id: "schedule", label: "Schedule", icon: Calendar, color: "text-red-500" },
      { id: "testimonials", label: "Testimonials", icon: MessageSquare, color: "text-pink-500" },
      { id: "contacts", label: "Contact Info", icon: Settings, color: "text-indigo-500" },
    ];

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      navigate("/");
      return;
    }
    loadData(activeTab);
  }, [activeTab, navigate, user]);

  const loadData = async (tab) => {
    try {
      const response = await fetch(`https://rithya.onrender.com/api/${tab}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.ok) {
        const result = await response.json();
        setData((prev) => ({ ...prev, [tab]: result }));
        console.log(`Loaded ${result.length} items for ${tab}`);
      } else {
        console.error(`Failed to load ${tab} data:`, response.status);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Add experience type for testimonials
    if (activeTab === "testimonials") {
      // Use the experience value from formData, not testimonialType
      const experienceValue = formData.experience || testimonialType;
      formDataToSend.append("experience", experienceValue);

      if (experienceValue === 2 || experienceValue === 3) {
        // Convert line breaks to <br> tags for HTML display
        const experienceDetails = formData.experience_details || [];
        const formattedDetails = Array.isArray(experienceDetails)
          ? experienceDetails.map(item => item.replace(/\n/g, '<br>'))
          : (experienceDetails || '').split('\n').map(item => item.replace(/\n/g, '<br>'));
        formDataToSend.append("experience_details", JSON.stringify(formattedDetails));
      }
      // For basic testimonials, ensure name and image are included
      if (experienceValue === 1) {
        if (!formData.name) {
          formDataToSend.append("name", "");
        }
        // Image is optional for basic testimonials
      }
    }

    try {
      const url = editingItem
        ? `https://rithya.onrender.com/api/${activeTab}/${editingItem.id}/`
        : `https://rithya.onrender.com/api/${activeTab}/`;

      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        console.log(`Successfully ${editingItem ? 'updated' : 'created'} ${activeTab} item`);
        loadData(activeTab);
        setShowForm(false);
        setEditingItem(null);
        setFormData({});
        setTestimonialType(1);
      } else {
        console.error(`Failed to ${editingItem ? 'update' : 'create'} ${activeTab} item:`, response.status);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(
        `https://rithya.onrender.com/api/${activeTab}/${item.id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.ok) {
        console.log(`Successfully deleted ${activeTab} item`);
        loadData(activeTab);
      } else {
        console.error(`Failed to delete ${activeTab} item:`, response.status);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [e.target.name]: file });
    }
  };

  const renderForm = () => {
    const fields = {
      about: [
        { name: "title", label: "Title", type: "text", required: true, placeholder: "Enter title..." },
        { name: "description", label: "Description", type: "textarea", required: true, placeholder: "Enter description..." },
        { name: "image", label: "Image", type: "file", required: false },
      ],
      "about-details": [
        { name: "title", label: "Title", type: "text", required: true, placeholder: "Enter title..." },
        { name: "description", label: "Description", type: "textarea", required: true, placeholder: "Enter description..." },
        { name: "image", label: "Image", type: "file", required: false },
      ],
      gallery: [
        { name: "title", label: "Title", type: "text", required: true, placeholder: "Enter title..." },
        { name: "category", label: "Category", type: "select", required: true, options: [
          { value: "training", label: "កំពុងហ្វឹកហាត់" },
          { value: "competition", label: "ការប្រកួត" },
          { value: "kids", label: "កុមារ" },
          { value: "facilities", label: "គ្រឿងបរិក្ខារ" },
        ]},
        { name: "image", label: "Image", type: "file", required: true },
      ],
      programs: [
        { name: "title", label: "Title", type: "text", required: true, placeholder: "Enter program title..." },
        { name: "level", label: "Level", type: "select", required: true, options: [
          { value: "basic", label: "Basic" },
          { value: "intermediate", label: "Intermediate" },
          { value: "advanced", label: "Advanced" },
          { value: "highest", label: "Highest" },
        ]},
        { name: "description", label: "Description", type: "textarea", required: true, placeholder: 'Description text here...' },
        { name: "image", label: "Image", type: "file", required: false },
      ],
      schedule: [
        { name: "hours", label: "Hours", type: "text", required: true, placeholder: "e.g., 1 Hour Training" },
        { name: "lesson_type", label: "Lesson Type", type: "text", required: true, placeholder: "e.g., Private lesson, 1 instructor - 1 swimmer" },
        { name: "price", label: "Price", type: "text", required: true, placeholder: "e.g., $15" },
        { name: "color", label: "Color", type: "text", required: false, placeholder: "e.g., bg-blue-500" },
      ],
      testimonials: [
        { name: "name", label: "Name", type: "text", required: testimonialType === 1, placeholder: "Enter full name..." },
        { name: "image", label: "Image", type: "file", required: testimonialType === 1 },
      ],
      heroes: [
        { name: "image", label: "Image", type: "file", required: true },
      ],
      contacts: [
        { name: "phone", label: "Phone Number", type: "text", required: true, placeholder: "e.g., 012 347 400 / 088 888 9400" },
        { name: "telegram_khmer", label: "Telegram Khmer", type: "text", required: true, placeholder: "e.g., 012 347 400" },
        { name: "telegram_english", label: "Telegram English", type: "text", required: true, placeholder: "e.g., 088 888 9400" },
        { name: "email", label: "Email", type: "email", required: true, placeholder: "e.g., ksf.rithya@gmail.com" },
        { name: "address_link", label: "Address Link", type: "url", required: true, placeholder: "Google Maps link" },
        { name: "monday_friday_hours", label: "Monday-Friday Hours", type: "text", required: true, placeholder: "e.g., 6:00 AM - 19:00 PM" },
        { name: "saturday_sunday_hours", label: "Saturday-Sunday Hours", type: "text", required: true, placeholder: "e.g., 6:00 AM - 18:00 PM" },
        { name: "pool_location", label: "Pool Location", type: "text", required: true, placeholder: "e.g., Olympic Stadium / Khmer Swimming Federation" },
      ],
    };

    // Add experience details field for experience testimonials
    if (activeTab === "testimonials" && testimonialType === 2) {
      const experienceType = formData.experience;
      let experienceLabel = "Experience Details";
      let placeholder = 'Enter experience details as JSON array: ["Experience 1", "Experience 2"]';

      if (experienceType === 2) {
        experienceLabel = "បទពិសោធន៍​មន្ត្រី​បច្ចេកទេស​អន្តរជាតិ";
        placeholder = 'Enter international technical referee experience details as JSON array';
      } else if (experienceType === 3) {
        experienceLabel = "បទពិសោធន៍​ដឹក​នាំ​ក្រុម​ប្រកួត​អន្តរជាតិ";
        placeholder = 'Enter international team leadership experience details as JSON array';
      }

      fields.testimonials.push({
        name: "experience_details",
        label: experienceLabel,
        type: "textarea",
        required: true,
        placeholder: placeholder
      });
    }

    return (
      <div className="backdrop-blur-xl bg-white/90 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                {editingItem ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </div>
              <h3 className="text-2xl font-bold">
                {editingItem ? "Edit" : "Add New"} {activeTab === "testimonials" ? (testimonialType === 1 ? "Basic Testimonial" : (formData.experience === 2 ? "បទពិសោធន៍​មន្ត្រី​បច្ចេកទេស​អន្តរជាតិ" : "បទពិសោធន៍​ដឹក​នាំ​ក្រុម​ប្រកួត​អន្តរជាតិ")) : activeTab.slice(0, -1)}
              </h3>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-200"
              >
                {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                  setFormData({});
                  setShowPreview(false);
                  setTestimonialType(1);
                }}
                className="bg-red-500/20 hover:bg-red-500/30 text-white border border-red-400/30 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-200"
              >
                <X size={16} />
                Cancel
              </Button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fields[activeTab]?.filter((field) => {
              // For experience testimonials, hide name and image fields (not needed for experience data)
              if (activeTab === "testimonials" && testimonialType === 2 && (field.name === "name" || field.name === "image")) {
                return false;
              }
              return true;
            }).map((field) => {
              // Skip conditional fields if condition not met
              if (field.conditional && formData[field.conditional] != field.conditionValue) {
                return null;
              }

              // For experience testimonials, name and image are not needed
              const isExperienceTestimonial = activeTab === "testimonials" && testimonialType === 2;

              if (isExperienceTestimonial && (field.name === "name" || field.name === "image")) {
                // Make name and image not required for experience testimonials
                field.required = false;
              }

              return (
                <div key={field.name} className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 items-center gap-2">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === "textarea" ? (
                    <Textarea
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full min-h-[120px] resize-vertical bg-gray-50 border-2 border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 rounded-xl p-4 text-gray-800 placeholder-gray-400 transition-all duration-200"
                    />
                  ) : field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      required={field.required}
                      className="w-full p-4 bg-gray-50 border-2 border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 rounded-xl text-gray-800 transition-all duration-200"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "file" ? (
                    <div className="space-y-3">
                      <div className="relative">
                        <Input
                          type="file"
                          name={field.name}
                          onChange={handleFileChange}
                          required={field.required}
                          accept="image/*"
                          className="w-full file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-indigo-500 file:to-purple-500 file:text-white hover:file:from-indigo-600 hover:file:to-purple-600 cursor-pointer bg-gray-50 border-2 border-gray-200 focus:border-indigo-400 rounded-xl p-4 transition-all duration-200"
                        />
                        <Upload className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                      {formData[field.name] && typeof formData[field.name] === 'string' && (
                        <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                          <img
                            src={formData[field.name]}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg mx-auto shadow-lg"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <Input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full p-4 bg-gray-50 border-2 border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 rounded-xl text-gray-800 placeholder-gray-400 transition-all duration-200"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {user && (
            <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Save size={20} />
                {loading ? "Saving..." : editingItem ? "Update Item" : "Create Item"}
              </Button>
            </div>
          )}
        </form>

        {showPreview && (
          <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Eye className="w-5 h-5 text-indigo-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800">Content Preview</h4>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(formData).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 rounded-xl p-4">
                    <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">{key.replace(/_/g, ' ')}:</span>
                    {key === 'image' && value ? (
                      <div className="mt-3">
                        <img
                          src={typeof value === 'string' ? value : URL.createObjectURL(value)}
                          alt="Preview"
                          className="w-24 h-24 object-cover rounded-lg shadow-md border-2 border-white"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-800 mt-2 font-medium break-words">{String(value) || 'Not set'}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderTable = () => {
    const items = data[activeTab] || [];

    // Special handling for contacts (single record)
    if (activeTab === "contacts") {
      const contact = items.length > 0 ? items[0] : null;

      if (!contact) {
        return (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contact information set</h3>
            <p className="text-gray-500">Add contact information to display on your website.</p>
          </div>
        );
      }

      return (
        <div className="grid grid-cols-1 gap-8">
          <Card className="overflow-hidden  transition-all duration-500 border-0 bg-gradient-to-br from-white to-gray-50 shadow-xl hover:shadow-2xl transform hover:scale-[1.01]">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
              <div className="flex items-center gap-3">
                <Settings className="w-6 h-6" />
                <h3 className="text-xl font-bold">Contact Information</h3>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <span className="text-white text-sm">📞</span>
                    </div>
                    <h4 className="font-semibold text-blue-800">Phone</h4>
                  </div>
                  <p className="text-blue-700 font-medium">{contact.phone}</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <span className="text-white text-sm">✉️</span>
                    </div>
                    <h4 className="font-semibold text-green-800">Email</h4>
                  </div>
                  <p className="text-green-700 font-medium break-all">{contact.email}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <span className="text-white text-sm">📱</span>
                    </div>
                    <h4 className="font-semibold text-purple-800">Telegram (Khmer)</h4>
                  </div>
                  <p className="text-purple-700 font-medium">{contact.telegram_khmer}</p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl border border-pink-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-pink-500 rounded-lg">
                      <span className="text-white text-sm">📱</span>
                    </div>
                    <h4 className="font-semibold text-pink-800">Telegram (English)</h4>
                  </div>
                  <p className="text-pink-700 font-medium">{contact.telegram_english}</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200 md:col-span-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-orange-500 rounded-lg">
                      <span className="text-white text-sm">📍</span>
                    </div>
                    <h4 className="font-semibold text-orange-800">Address Link</h4>
                  </div>
                  <a
                    href={contact.address_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-700 hover:text-orange-800 font-medium break-all underline decoration-2 underline-offset-2 hover:decoration-orange-800 transition-colors"
                  >
                    {contact.address_link}
                  </a>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-2xl border border-indigo-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-indigo-500 rounded-lg">
                      <span className="text-white text-sm">🕐</span>
                    </div>
                    <h4 className="font-semibold text-indigo-800">Mon-Fri Hours</h4>
                  </div>
                  <p className="text-indigo-700 font-medium">{contact.monday_friday_hours}</p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-2xl border border-teal-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-teal-500 rounded-lg">
                      <span className="text-white text-sm">🕐</span>
                    </div>
                    <h4 className="font-semibold text-teal-800">Sat-Sun Hours</h4>
                  </div>
                  <p className="text-teal-700 font-medium">{contact.saturday_sunday_hours}</p>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-2xl border border-cyan-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-cyan-500 rounded-lg">
                      <span className="text-white text-sm">🏊</span>
                    </div>
                    <h4 className="font-semibold text-cyan-800">Pool Location</h4>
                  </div>
                  <p className="text-cyan-700 font-medium">{contact.pool_location}</p>
                </div>
              </div>

              {user && (
                <div className="flex justify-center pt-8 border-t border-gray-200 mt-8">
                  <Button
                    onClick={() => {
                      setEditingItem(contact);
                      setFormData(contact);
                      setShowForm(true);
                    }}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <Edit size={20} />
                    Edit Contact Information
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-5.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} items yet</h3>
          <p className="text-gray-500">Get started by adding your first {activeTab.slice(0, -1)} item.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden transition-all duration-500 border-0 bg-gradient-to-br from-white to-gray-50 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1 min-w-0">
                  {activeTab === "gallery" || activeTab === "about" || activeTab === "programs" || activeTab === "testimonials" || activeTab === "heroes" ? (
                    <div className="flex gap-4">
                      {item.image && (
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.title || item.name}
                            className="w-16 h-16 object-cover rounded-xl border-2 border-gray-200 flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300"
                          />
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full border-2 border-white"></div>
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-gray-900 truncate text-lg">{item.title || item.name}</h3>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                          {item.description || item.role || item.hours}
                        </p>
                        <div className="flex gap-2 mt-3">
                          {item.category && (
                            <span className="inline-block px-3 py-1 text-xs bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-full font-medium">
                              {item.category}
                            </span>
                          )}
                          {item.level && (
                            <span className="inline-block px-3 py-1 text-xs bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-full font-medium">
                              {item.level}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{item.title || item.name || item.hours}</h3>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        {item.description || item.role || item.lesson_type}
                      </p>
                      {item.price && (
                        <div className="mt-3">
                          <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
                            {item.price}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {user && (
                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <Button
                    size="sm"
                    onClick={() => {
                      setEditingItem(item);
                      setFormData(item);
                      // Set testimonial type based on experience value
                      if (item.experience === 2 || item.experience === 3) {
                        setTestimonialType(2);
                      } else {
                        setTestimonialType(1);
                      }
                      setShowForm(true);
                    }}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Edit size={16} />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDelete(item)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-bounce"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-bounce delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-1">Admin Dashboard</h1>
                <p className="text-indigo-100 text-lg">Manage your swimming school content</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-white font-semibold text-lg">Welcome back!</div>
                <div className="text-indigo-200 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {user?.username}
                </div>
              </div>
              <Button
                onClick={onLogout}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Modern Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-3xl shadow-2xl p-6 sticky top-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-bold text-xl text-gray-800">Navigation</h2>
              </div>

              <div className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-4 rounded-2xl font-medium transition-all duration-300 group ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform scale-[1.02]"
                          : "hover:bg-white/60 text-gray-700 hover:shadow-md hover:transform hover:scale-[1.01]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-5 h-5 ${isActive ? 'text-white' : tab.color}`} />
                        <span className="font-medium">{tab.label}</span>
                        {isActive && (
                          <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Modern Stats Card */}
              <div className="mt-8 pt-6 border-t border-gray-200/50">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-5 border border-indigo-100/50">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-semibold text-indigo-800">Content Stats</h3>
                  </div>
                  <div className="space-y-3">
                    {tabs.map((tab) => (
                      <div key={tab.id} className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm font-medium">{tab.label}</span>
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
                          {data[tab.id]?.length || 0}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
              {/* Content Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200/50 px-8 py-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 capitalize flex items-center gap-3">
                      {(() => {
                        const activeTabData = tabs.find(tab => tab.id === activeTab);
                        const IconComponent = activeTabData?.icon;
                        return (
                          <>
                            <IconComponent className={`w-8 h-8 ${activeTabData?.color}`} />
                            {activeTab} Management
                          </>
                        );
                      })()}
                    </h2>
                    <p className="text-gray-600 mt-2 text-lg">Manage your {activeTab} content efficiently</p>
                  </div>

                  {user && activeTab === "testimonials" ? (
                    <div className="flex gap-3">
                      <Button
                        onClick={() => {
                          setTestimonialType(1);
                          setShowForm(true);
                        }}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Plus size={18} />
                        Add Basic Testimonial
                      </Button>
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => {
                            setTestimonialType(2);
                            setFormData({ ...formData, experience: 2 });
                            setShowForm(true);
                          }}
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 text-sm"
                        >
                          <Plus size={16} />
                          បទពិសោធន៍​មន្ត្រី​បច្ចេកទេស​អន្តរជាតិ
                        </Button>
                        <Button
                          onClick={() => {
                            setTestimonialType(2);
                            setFormData({...formData, experience: 3 });
                            setShowForm(true);
                          }}
                          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 text-sm"
                        >
                          <Plus size={16} />
                          បទពិសោធន៍​ដឹក​នាំ​ក្រុម​ប្រកួត​អន្តរជាតិ
                        </Button>
                      </div>
                    </div>
                  ) : user && activeTab === "contacts" ? (
                    data.contacts.length === 0 ? (
                      <Button
                        onClick={() => setShowForm(true)}
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Plus size={20} />
                        Add Contact Info
                      </Button>
                    ) : null
                  ) : user ? (
                    <Button
                      onClick={() => setShowForm(true)}
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Plus size={20} />
                      Add New {activeTab.slice(0, -1)}
                    </Button>
                  ) : null}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-8">
                {showForm ? (
                  <div className="animate-in slide-in-from-right-4 duration-300">
                    {renderForm()}
                  </div>
                ) : (
                  <div className="animate-in fade-in-0 duration-300">
                    {renderTable()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;