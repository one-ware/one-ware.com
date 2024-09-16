import { useState } from "react";
import { CiLinkedin, CiMail } from "react-icons/ci";

export default function ContactUs(): JSX.Element {
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
    // Here you would typically send the data to a server
    alert('Thank you for your message!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="text-center max-w-4xl m-auto">
      <h2 className="text-3xl md:text-5xl font-bold mt-20">Interested? Contact us!</h2>

      <div className="grid grid-flow-col auto-cols-max mx-auto justify-center gap-5 text-7xl">
        <div>
          <a className="text-stone-50" href="https://www.linkedin.com/company/one-ware/" target="_blank">
            <CiLinkedin />
          </a>
        </div>
        <div>
          <a className="text-stone-50" href="/docs/contact">
            <CiMail />
          </a>
        </div>

      </div>

      <div className="max-w-lg mx-auto mt-10 p-6 rounded-lg shadow-md text-left">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold mb-1">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-1">E-Mail</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-bold mb-1">Message</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="text-white w-full font-bold py-2 px-4 button button--primary button--outline button--md">
              Send
          </button>
        </form>
      </div>

    </div>
  );
}
