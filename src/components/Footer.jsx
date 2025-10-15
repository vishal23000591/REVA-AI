import React, { useEffect, useState } from "react";


function Footer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user is at bottom
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    visible && (
      <footer className="footer">
        <p>© {new Date().getFullYear()} REVA AI Authenticator. All rights reserved.</p>
      </footer>
    )
  );
}

export default Footer;
