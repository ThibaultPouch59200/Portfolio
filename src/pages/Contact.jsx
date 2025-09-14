import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  return (
    <section className="space-y-4">
  <h2 className="text-2xl font-semibold text-dark dark:text-cream">{t('contact.title')}</h2>
  <p className="max-w-xl text-dark/70 dark:text-beige/90">{t('contact.text')}</p>
      <form className="space-y-3 max-w-md">
  <input type="text" placeholder="Name" className="w-full rounded px-3 py-2 text-sm bg-light-subtle dark:bg-ink text-dark dark:text-beige placeholder-dark/40 dark:placeholder-beige/50 focus:outline-none focus:ring focus:ring-accent/40" />
  <input type="email" placeholder="Email" className="w-full rounded px-3 py-2 text-sm bg-light-subtle dark:bg-ink text-dark dark:text-beige placeholder-dark/40 dark:placeholder-beige/50 focus:outline-none focus:ring focus:ring-accent/40" />
  <textarea placeholder="Message" rows="4" className="w-full rounded px-3 py-2 text-sm bg-light-subtle dark:bg-ink text-dark dark:text-beige placeholder-dark/40 dark:placeholder-beige/50 focus:outline-none focus:ring focus:ring-accent/40" />
        <button type="button" className="bg-accent hover:brightness-110 transition px-4 py-2 rounded text-sm font-medium text-ink">Send</button>
      </form>
    </section>
  );
}
