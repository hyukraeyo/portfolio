import { socialLinks } from '@/lib/data';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact</h2>
        <p className="text-xl text-gray-600 mb-12">
          프로젝트나 협업에 관심이 있으시다면 언제든 연락주세요!
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

