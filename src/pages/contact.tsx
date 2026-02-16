import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { submitContact } from '@/lib/api';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Linkedin, Github, Send } from 'lucide-react';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await submitContact({
        name: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        message: String(formData.get('message') || ''),
      });
      setOk(res.message);
      toast.success('Message sent successfully!');
      form.reset();
      setTimeout(() => router.push('/thank-you'), 2000);
    } catch (e: any) {
      const msg = e?.message || 'Failed to send';
      setErr(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SEO
        title="Contact Us | Get in Touch | Xws Solution"
        description="Get in touch with Xws Solution for SaaS Development Services, Web Development, DevOps Solutions, AI & Robotics Development, and Custom Software Development. Contact us for consultations, project inquiries, and free quotes. Located in Karachi, Pakistan. Response within 24 hours."
        keywords="Contact Xws Solution, SaaS Development Contact, Web Development Contact, DevOps Consulting, AI Consulting, Robotics Consulting, Software Development Contact, Project Inquiry, Free Consultation, Get Quote, Contact Form, Karachi Pakistan, Software Development Services Contact"
        canonical="https://xws.digital/contact"
      />
      <Layout title="Contact">
        <section className="container-responsive py-16 sm:py-20" id="contact">
          <div className="text-center mb-12">
            <motion.p 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-sm font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Let's Connect
            </motion.p>
           
            <motion.h1 
              className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              We're here for you! How can we help? Whether you have a project in mind or just want to explore possibilities, we'd love to hear from you.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              className="rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border border-gray-200/50 dark:border-gray-800/50 p-8 shadow-xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send us a message</h2>
              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    name="name" 
                    required 
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white transition-all" 
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input 
                    name="email" 
                    type="email" 
                    required 
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white transition-all" 
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    name="message" 
                    rows={6} 
                    required 
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white transition-all resize-none" 
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>
                <motion.button 
                  type="submit"
                  disabled={loading} 
                  className="w-full rounded-xl bg-gradient-to-r from-brand to-purple-600 text-white px-6 py-4 font-semibold disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-brand/50 transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
                {ok && <p className="text-green-600 dark:text-green-400 text-sm font-medium">{ok}</p>}
                {err && <p className="text-red-600 dark:text-red-400 text-sm font-medium">{err}</p>}
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="rounded-3xl bg-gradient-to-br from-brand/10 via-purple-500/10 to-brand/5 border border-brand/20 p-8">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">Location</p>
                      <p className="text-gray-600 dark:text-gray-400">Karachi, Pakistan</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">Phone</p>
                      <a href="tel:+923442862704" className="text-brand hover:underline">
                        +923442862704
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">Email</p>
                      <a href="mailto:mnaveed2862@gmail.com" className="text-brand hover:underline">
                        mnaveed2862@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Follow Us</h3>
                <div className="flex gap-4">
                  <a 
                    href="https://www.linkedin.com/company/team-tech-wave-solution" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-brand hover:text-white flex items-center justify-center transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://github.com/Muhammad-Naveed704" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-brand hover:text-white flex items-center justify-center transition-all"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-gray-900 to-gray-950 text-white p-8">
                <h3 className="text-lg font-semibold mb-3">Response Time</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We typically respond within 24 hours during business days. For urgent inquiries, please call us directly.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
}


