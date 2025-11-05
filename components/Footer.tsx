export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-8 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p>&copy; {currentYear} Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
}

