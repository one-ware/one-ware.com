import axios from "axios";
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
    <div className="text-center max-w-4xl m-auto">
      <h2 className="text-3xl md:text-5xl font-bold">Interested? Contact us!</h2>

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

      <div className="max-w-xl mx-auto mt-10 p-3 rounded-lg text-left">
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
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="text-black w-full font-bold py-3 px-4 button button--primary button--md">
            Send
          </button>
        </form>
      </div>

    </div>
  );
}
