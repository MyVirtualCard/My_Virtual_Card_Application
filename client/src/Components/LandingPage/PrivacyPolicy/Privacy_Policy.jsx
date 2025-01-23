import React from "react";
import "./Privacy_Policy.scss";
import { Link } from "react-router-dom";
const Privacy_Policy = () => {
  return (
    <div className="privacy_container">
      <div className="back_to_home">
        <Link to="/">
          <i className="bx bx-home"></i>Back to Home
        </Link>
      </div>
      <div className="terms_box">
        <div className="term_title">
          <h5>Privacy Policy</h5>
        </div>
        <div className="content_box">
          <div className="content">
            <h4>Effective Date: 19 - 07- 2024</h4>
            <p>
              Welcome to MyVirtualCard.in. Your privacy is important to us. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website{" "}
              <a href="https://myvirtualcard.in">https://myvirtualcard.in</a>,
              use our services, or engage with us in other ways. Please read
              this policy carefully. If you do not agree with the terms of this
              Privacy Policy, please do not access the site.
            </p>
          </div>
          <div className="content">
            <h4>1. Information We Collect</h4>
            <p>
              We may collect information about you in a variety of ways. The
              information we may collect on the Site includes:
            </p>
            <div className="child_content">
              <h5>Personal Data</h5>
              <ul>
                <li>
                  <bold>Contact Information:</bold> such as your name, email
                  address, phone number, and postal address.
                </li>
                <li>
                  <bold>Identity Information:</bold> such as your username,
                  password, and other similar information.
                </li>
              </ul>
            </div>
            <div className="child_content">
              <h5>Usage Data</h5>
              <ul>
                <li>
                  <bold>Activity Information: </bold>such as pages viewed,
                  access times, and browsing patterns.
                </li>
                <li>
                  <bold> Technical Information:</bold> such as IP address,
                  browser type, operating system, and Internet Service Provider.
                </li>
              </ul>
            </div>
          </div>
          <div className="content">
            <h4>2. How We Use Your Information</h4>
            <p>
              We do not sell, trade, or otherwise transfer your personal
              information to outside parties except as described below:
            </p>
            <div className="child_content">
              <ul>
                <li>
                  <bold>To Provide Services:</bold> Including creating and
                  managing your account, processing transactions, and providing
                  customer support.
                </li>
                <li>
                  <bold> To Communicate: </bold>Including sending you updates,
                  newsletters, and marketing communications.
                </li>
                <li>
                  <bold> To Improve Our Services: </bold>Including analyzing
                  usage data to enhance our website's functionality and user
                  experience.
                </li>
                <li>
                  <bold>To Ensure Security: </bold> Including detecting and
                  preventing fraud and unauthorized access.
                </li>
              </ul>
            </div>
          </div>
          <div className="content">
            <h4>3. Sharing Your Information</h4>
            <p>
              We do not sell, trade, or otherwise transfer your personal
              information to outside parties except as described below:
            </p>
            <div className="child_content">
              <ul>
                <li>
                  <bold>With Service Providers:</bold> We may share your
                  information with third-party service providers who assist us
                  in operating our website and conducting our business.
                </li>
                <li>
                  <bold>For Legal Reasons:</bold> We may disclose your
                  information when we believe it is necessary to comply with the
                  law, enforce our site policies, or protect our or others'
                  rights, property, or safety.
                </li>
              </ul>
            </div>
          </div>
          <div className="content">
            <h4>4. Data Security</h4>
            <p>
            We implement a variety of security measures to maintain the safety of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
          </div>
          <div className="content">
            <h4>5. Your Rights</h4>
            <p>
            You have certain rights regarding your personal data, including the right to access, correct, or delete your personal information, and the right to object to or restrict certain processing. To exercise these rights, please contact us at [insert contact email].
            </p>
          </div>
          <div className="content">
            <h4>6. Cookies and Tracking Technologies</h4>
            <p>
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some parts of our website.
            </p>
          </div>
          <div className="content">
            <h4>7. Third-Party Links</h4>
            <p>
            Our website may contain links to other websites. We are not responsible for the privacy practices or content of these other sites. We encourage you to read the privacy policies of each website you visit.
            </p>
          </div>
          <div className="content">
            <h4>8. Changes to This Privacy Policy
            </h4>
            <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date.
            </p>
          </div>

          <div className="content">
            <h4>11. Contact Us</h4>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="company">
              <h5>MyVirtualcard.in</h5>
              <p><b>Address:</b> No. 113, Ankur Plaza, GN Chetty Rd, T. Nagar, Chennai, India, Tamil Nadu 600017</p>
              <p><b>Email:</b> contact@aristostechindia.com</p>
              <p><b>Contact Phone Number :</b> +91 93444 82370</p>
            </div>
            <div className="note">
              <small>
                Please review this draft and let me know if you need any
                modifications or additional sections.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy_Policy;
