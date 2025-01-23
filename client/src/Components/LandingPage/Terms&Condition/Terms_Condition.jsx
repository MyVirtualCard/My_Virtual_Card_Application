import React from "react";
import "./Terms_Condition.scss";
import { Link } from "react-router-dom";
const Terms_Condition = () => {
  return (
    <div className="terms_container">
      <div className="back_to_home">
        <Link to="/"><i className='bx bx-home'></i>Back to Home</Link>
      </div>
      <div className="terms_box">
        <div className="term_title">
          <h5>Terms and Conditions</h5>
        </div>
        <div className="content_box">
          <div className="content">
            <h4>**Effective Date:** 19 - 07- 2024</h4>
            <p>
              Welcome to My Virtual Card, a service provided by Aristostech
              India Pvt Ltd ("Company", "we", "us", or "our"). By accessing or
              using our service ("Service"), you agree to be bound by these
              Terms and Conditions ("Terms"). If you do not agree to these
              Terms, please do not use the Service.
            </p>
          </div>
          <div className="content">
            <h4>1. Acceptance of Terms</h4>
            <p>
              By using the Service, you acknowledge that you have read,
              understood, and agree to be bound by these Terms. We reserve the
              right to modify these Terms at any time, and we will provide
              notice of such changes by posting the revised Terms on our
              website. Your continued use of the Service after any changes are
              made constitutes your acceptance of the new Terms.
            </p>
          </div>
          <div className="content">
            <h4>2. Use of the Service</h4>
            <p>
              - You must be at least 18 years old to use the Service.
              <br /> - You agree to use the Service only for lawful purposes and
              in accordance with these Terms.
              <br /> - You are responsible for all activities that occur under
              your account.
            </p>
          </div>
          <div className="content">
            <h4>3. Account Registration</h4>
            <p>
              To use the Service, you must create an account by providing
              accurate and complete information. You are responsible for
              maintaining the confidentiality of your account information and
              for all activities that occur under your account. You agree to
              notify us immediately of any unauthorized use of your account.
            </p>
          </div>
          <div className="content">
            <h4>4. Privacy</h4>
            <p>
              Your use of the Service is also governed by our Privacy Policy,
              which can be found at [link to Privacy Policy]. By using the
              Service, you consent to the collection and use of your information
              as described in the Privacy Policy.
            </p>
          </div>
          <div className="content">
            <h4>5. Payment and Fees</h4>
            <p>
              - Some features of the Service may require payment of fees. You
              agree to pay all applicable fees in connection with your use of
              the Service.
              <br />- We reserve the right to change our fees at any time. Any
              fee changes will be effective upon posting on our website.
            </p>
          </div>
          <div className="content">
            <h4>6. Intellectual Property</h4>
            <p>
              All content and materials available on the Service, including but
              not limited to text, graphics, website name, code, images, and
              logos, are the intellectual property of Aristostech India Pvt Ltd
              and are protected by applicable intellectual property laws. You
              are granted a limited license only for the purposes of viewing and
              using the Service.
            </p>
          </div>
          <div className="content">
            <h4>7. Termination</h4>
            <p>
              We reserve the right to terminate or suspend your account and
              access to the Service at our sole discretion, without notice, for
              conduct that we believe violates these Terms or is harmful to
              other users of the Service, us, or third parties, or for any other
              reason.
            </p>
          </div>
          <div className="content">
            <h4>8. Disclaimer of Warranties</h4>
            <p>
              The Service is provided on an "as is" and "as available" basis. We
              make no warranties, expressed or implied, regarding the Service,
              including but not limited to the implied warranties of
              merchantability, fitness for a particular purpose, and
              non-infringement.
            </p>
          </div>
          <div className="content">
            <h4>9. Limitation of Liability</h4>
            <p>
              In no event shall Aristostech India Pvt Ltd be liable for any
              indirect, incidental, special, consequential, or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from <br />
              (i) your use or inability to use the Service; <br />
              (ii) any unauthorized access to or use of our servers and/or any
              personal information stored therein; <br />
              (iii) any interruption or cessation of transmission to or from the
              Service; and
              <br /> (iv) any bugs, viruses, trojan horses, or the like that may
              be transmitted to or through our Service by any third party.
            </p>
          </div>
          <div className="content">
            <h4>10. Governing Law</h4>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of India, without regard to its conflict of law
              principles. You agree to submit to the personal jurisdiction of
              the courts located in [City, State], India, for the purpose of
              litigating all such claims or disputes.
            </p>
          </div>
          <div className="content">
            <h4>11. Contact Us</h4>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="company">
              <h5>Aristostech India Pvt Ltd</h5>
              <strong>Email: contact@aristostechindia.com</strong>
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

export default Terms_Condition;
