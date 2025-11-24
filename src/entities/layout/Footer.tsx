const Footer = () => {
  return (
    <footer className="bg-background/60 border-t backdrop-blur-md">
      <div className="p-5">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} Quotes App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
