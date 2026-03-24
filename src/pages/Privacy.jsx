import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <main className="terms-page">
      <Link to="/" className="terms-back">&larr; Back to Checker</Link>

      <h1>Privacy Policy</h1>
      <p className="terms-updated">Last updated: March 24, 2026</p>

      <section>
        <h2>Introduction</h2>
        <p>
          Supplement Checker ("we", "us", or "the Site") is committed to
          protecting your privacy. This Privacy Policy explains what information
          we collect, how we use it, and your choices regarding that information.
        </p>
      </section>

      <section>
        <h2>Information We Collect</h2>
        <p>
          Supplement Checker is a client-side tool. <strong>We do not collect,
          store, or transmit any personal data or supplement information you
          enter.</strong> All supplement checks run entirely in your browser.
        </p>
        <p>
          We may collect anonymous, aggregated usage data through third-party
          services (see below) such as page views, browser type, device type,
          and general geographic region. This data cannot be used to identify
          you personally.
        </p>
      </section>

      <section>
        <h2>Cookies and Tracking Technologies</h2>
        <p>
          The Site itself does not set any cookies. However, third-party
          services we use (such as Google AdSense) may place cookies on your
          device to serve personalized or non-personalized ads and to measure
          ad performance.
        </p>
        <p>
          You can manage cookie preferences through your browser settings. Most
          browsers allow you to block or delete cookies. Note that blocking
          cookies may affect the ads displayed on the Site but will not affect
          the functionality of the supplement checker tool.
        </p>
      </section>

      <section>
        <h2>Google AdSense</h2>
        <p>
          We use Google AdSense to display advertisements. Google AdSense may
          use cookies and web beacons to serve ads based on your prior visits to
          this site or other websites. Google's use of advertising cookies
          enables it and its partners to serve ads based on your visit to this
          site and/or other sites on the internet.
        </p>
        <p>
          You may opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads Settings
          </a>. Alternatively, you may opt out of some third-party vendors' use
          of cookies for personalized advertising by visiting{" "}
          <a
            href="https://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.aboutads.info/choices
          </a>.
        </p>
      </section>

      <section>
        <h2>Third-Party Links</h2>
        <p>
          The Site may contain links to third-party websites. We are not
          responsible for the privacy practices or content of those websites.
          We encourage you to review the privacy policies of any third-party
          sites you visit.
        </p>
      </section>

      <section>
        <h2>Children's Privacy</h2>
        <p>
          The Site is not directed at children under the age of 13. We do not
          knowingly collect personal information from children. If you believe a
          child has provided us with personal information, please contact us so
          we can take appropriate action.
        </p>
      </section>

      <section>
        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated "Last updated" date. Your
          continued use of the Site after changes are posted constitutes
          acceptance of the updated policy.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          If you have questions about this Privacy Policy, contact us at{" "}
          <a href="mailto:kevinwongbarron@gmail.com">kevinwongbarron@gmail.com</a>.
        </p>
      </section>
    </main>
  );
}
