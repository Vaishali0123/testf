"use client";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen text-white ">
      <div className="w-6xl space-y-8 p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
        <p className="text-sm">Effective Date: 22-09-2025</p>
        <p className="text-sm">Last Updated: 22-09-2025</p>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            1. Introduction
          </h2>
          <p>
            Webivus (“we,” “our,” “us”) provides an AI-powered SaaS platform
            designed to help users manage and interact with their WordPress
            websites through natural language commands. Protecting your privacy
            and ensuring transparency is fundamental to us.
          </p>
          <p>
            This Privacy Policy explains what information we collect, how we use
            it, how we protect it, and what rights you have. By using Webivus,
            you agree to this policy. If you do not agree, you must discontinue
            use of our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            2. Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Account Information:</strong> Email address, Password
              (hashed), Payment details (processed securely by third-party
              providers).
            </li>
            <li>
              <strong>Website Connection Data:</strong> Website URL(s),
              authentication tokens/keys (encrypted).
            </li>
            <li>
              <strong>Operational Data:</strong> Chat history, action logs,
              AI-generated snippets (temporarily retained).
            </li>
            <li>
              <strong>Exclusions:</strong> No plugin code, theme code, or
              database access.
            </li>
            <li>
              <strong>Optional Information:</strong> Feedback, survey responses,
              support communications.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To provide Webivus services (connection, AI, rollback).</li>
            <li>To improve accuracy, performance, and user experience.</li>
            <li>To maintain security and detect abuse.</li>
            <li>
              To send essential communications (account notices, billing).
            </li>
            <li>For analytics and product development.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            4. Rollback vs Backups
          </h2>
          <p>
            Webivus offers rollback features to revert changes made through the
            system. However, Webivus does not provide backups of your website.
            It is your responsibility to maintain backups. Webivus is not liable
            for data loss or downtime due to lack of backups.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            5. Sharing & Disclosure of Data
          </h2>
          <p>
            We do not sell or rent your personal information. Limited sharing
            occurs with:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Service providers (cloud, email, payment).</li>
            <li>Legal authorities if required by law.</li>
            <li>Business transfers (acquisition/merger).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            6. Data Retention
          </h2>
          <p>
            Retention depends on type: account data (while active), chat logs
            ([X days/months]), billing records (as required by law). Data
            deletion requests: privacy@webivus.com.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            7. Security Measures
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Encrypted storage (AES-256).</li>
            <li>TLS/SSL communication.</li>
            <li>Access control & monitoring.</li>
            <li>Audits and penetration testing.</li>
          </ul>
          <p>
            Limitation of Liability: No system is 100% secure. Webivus cannot be
            held liable for breaches beyond reasonable control.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            8. Your Rights
          </h2>
          <p>
            Depending on your jurisdiction (GDPR, CCPA, etc.), you may request
            access, correction, deletion, portability, or opt-out. Contact:
            privacy@webivus.com.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            9. International Data Transfers
          </h2>
          <p>
            Webivus may transfer data globally, ensuring adequate safeguards
            such as standard contractual clauses.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            10. Children’s Privacy
          </h2>
          <p>
            Services are not directed to under-16s. We do not knowingly collect
            children’s data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            11. Updates to this Policy
          </h2>
          <p>
            We may update this Privacy Policy. Check the “Last Updated” date for
            changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            12. Contact Us
          </h2>
          <p>Email: hi@webivus.com</p>
        </section>
      </div>
    </div>
  );
}
