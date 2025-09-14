import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">{t('contact.title')}</h2>
      <p className="text-gray-300 max-w-xl">{t('contact.text')}</p>
      <form className="space-y-3 max-w-md">
        <input type="text" placeholder="Name" className="w-full bg-gray-800 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-primary-500" />
        <input type="email" placeholder="Email" className="w-full bg-gray-800 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-primary-500" />
        <textarea placeholder="Message" rows="4" className="w-full bg-gray-800 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-primary-500" />
        <button type="button" className="bg-primary-600 hover:bg-primary-500 transition px-4 py-2 rounded text-sm font-medium">Send</button>
      </form>
    </section>
  );
}
