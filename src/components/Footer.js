import React from 'react';
import './Footer.css'; // Styles for the footer
import { useInView } from 'react-intersection-observer'; // Import the hook

function Footer() {
  // useInView hook for the footer
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Trigger when footer starts entering viewport
  });

  return (
    // Attach ref and conditionally add 'is-visible' class
    <footer ref={ref} className={`app-footer ${inView ? 'is-visible' : ''}`}>
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Claudia. All Rights Reserved.</p>
        {/* Optional: Add links to social media, terms, etc. here */}
        {/* <p>
          <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a>
        </p> */}
      </div>
    </footer>
  );
}

export default Footer;
