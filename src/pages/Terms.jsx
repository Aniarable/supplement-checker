import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <main className="terms-page">
      <Link to="/" className="terms-back">&larr; Back to Checker</Link>

      <h1>Terms of Use & Disclaimer</h1>
      <p className="terms-updated">Last updated: March 23, 2026</p>

      <section>
        <h2>Medical Disclaimer</h2>
        <p>
          The information provided by Supplement Checker ("the Site") is for
          general educational and informational purposes only. It is <strong>not
          intended as a substitute for professional medical advice, diagnosis, or
          treatment</strong>.
        </p>
        <p>
          Always seek the advice of your physician, pharmacist, or other qualified
          healthcare provider with any questions you may have regarding a medical
          condition, supplement regimen, or potential interactions with medications
          you are currently taking. <strong>Never disregard professional medical
          advice or delay seeking it because of something you read on this
          site.</strong>
        </p>
      </section>

      <section>
        <h2>No Warranties</h2>
        <p>
          The supplement interaction data, timing recommendations, and gap
          suggestions presented on this site are compiled from publicly available
          sources and may not be complete, accurate, or up to date. The Site is
          provided on an "as is" and "as available" basis without any warranties
          of any kind, either express or implied.
        </p>
        <p>
          We do not warrant that the information is error-free, that defects will
          be corrected, or that the results obtained from using this tool will be
          accurate or reliable.
        </p>
      </section>

      <section>
        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable law, Supplement Checker
          and its operators shall not be liable for any direct, indirect,
          incidental, special, consequential, or punitive damages arising out of
          or related to your use of, or inability to use, the Site or any
          information provided on it. This includes, without limitation, damages
          for personal injury, health complications, or adverse reactions
          resulting from supplement use.
        </p>
      </section>

      <section>
        <h2>Not a Healthcare Provider</h2>
        <p>
          Supplement Checker is not a healthcare provider, pharmacy, or licensed
          medical professional. No provider-patient relationship is created by
          your use of this site. The tool does not account for your individual
          health conditions, medications, allergies, or other personal factors
          that may affect supplement safety.
        </p>
      </section>

      <section>
        <h2>Use at Your Own Risk</h2>
        <p>
          You acknowledge that any reliance on the information provided by this
          site is strictly at your own risk. You are solely responsible for any
          decisions you make regarding your supplement intake.
        </p>
      </section>

      <section>
        <h2>Third-Party Content</h2>
        <p>
          The Site may contain links to third-party websites or display
          advertisements. We do not endorse, guarantee, or assume responsibility
          for any third-party content, products, or services.
        </p>
      </section>

      <section>
        <h2>Changes to These Terms</h2>
        <p>
          We reserve the right to update or modify these terms at any time without
          prior notice. Your continued use of the Site after any changes
          constitutes acceptance of the updated terms.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          If you have questions about these terms, contact us at{" "}
          <a href="mailto:kevinwongbarron@gmail.com">kevinwongbarron@gmail.com</a>.
        </p>
      </section>
    </main>
  );
}
