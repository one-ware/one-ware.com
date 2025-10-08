import axios from "axios";
import { useState } from "react";
import { CiLinkedin, CiMail } from "react-icons/ci";
import Translate, { translate } from '@docusaurus/Translate';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    axios({
      method: "POST",
      url: "https://contact.one-ware.com/send",
      data: formData
    }).then((response) => {
      if (response.data.status === 'success') {
        alert("Message Sent. We will respond to you shortly!");
        setFormData({ name: '', email: '', message: '' });
      } else if (response.data.status === 'fail') {
        alert("Message failed to send.")
      }
    })
  };

  return (
    <div className="text-center w-full">
      <div className="max-w-4xl mx-auto mb-8">
        <h2 className="text-3xl md:text-5xl font-bold"> <Translate id="contactus.headline">Interested? Contact us!</Translate></h2>
      </div>

      {/* Leo Sales Section & Contact Form - Side by Side on Desktop */}
      <div className="mt-12 mb-4 w-full px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start max-w-7xl mx-auto">
          
          {/* Leo Sales Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700 h-full">
              <div className="text-center">
                <div className="mb-6">
                  <img
                    src={require('@site/static/img/AboutUs/Leo.png').default}
                    alt="Leo Wiegand - Sales Representative"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#00FFD1]/20 mx-auto"
                  />
                </div>
                
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Leo Wiegand
                  </h3>
                  <p className="text-[#00FFD1] font-semibold mb-4 text-lg">
                    <Translate id="contactus.leo.role">
                      Your Sales Contact
                    </Translate>
                  </p>
                  <p className="text-gray-300 mb-8 leading-relaxed text-base md:text-lg max-w-md mx-auto">
                    <Translate id="contactus.leo.description">
                      Leo is our sales expert who takes care of projects of all kinds. Whether you need evaluations for ideas, custom quotes, partnership opportunities, or strategic consulting - Leo is your go-to contact for business inquiries.
                    </Translate>
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="mailto:sales@one-ware.com?subject=Business Inquiry"
                      className="inline-flex items-center justify-center px-6 py-3 bg-[#00FFD1] text-black font-semibold rounded-lg hover:bg-[#00FFD1]/90 transition-colors duration-300"
                    >
                      <CiMail className="w-5 h-5 mr-2" />
                      <Translate id="contactus.leo.cta">
                        Send E-Mail
                      </Translate>
                    </a>
                    
                    <a 
                      href="https://www.linkedin.com/in/leo-wiegand-b27aa0272/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 border border-[#00FFD1] text-[#00FFD1] font-semibold rounded-lg hover:bg-[#00FFD1]/10 transition-colors duration-300"
                    >
                      <CiLinkedin className="w-5 h-5 mr-2" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700 h-full">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-200">
                <Translate id="contactus.form.title">
                  Send us a message directly
                </Translate>
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-300">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:border-[#00FFD1] transition-colors"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-bold mb-2 text-gray-300">E-Mail</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:border-[#00FFD1] transition-colors"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-bold mb-2 text-gray-300">
                    <Translate id="contactus.form.1">Message</Translate>
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:border-[#00FFD1] transition-colors resize-none"
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="text-black w-full font-bold py-4 px-6 button button--primary button--md transition-all hover:scale-[1.02]">
                   <Translate id="contactus.buttonsend">Send</Translate>
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  );
}
