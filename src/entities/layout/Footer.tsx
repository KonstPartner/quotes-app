const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="p-5">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} Quotes App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
