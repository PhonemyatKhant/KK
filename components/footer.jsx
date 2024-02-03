const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 text-center text-sm text-gray-400 flex items-center justify-center">
      &copy; {currentYear} KK Fabrics
    </footer>
  );
};

export default Footer;
