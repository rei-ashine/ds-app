import { memo } from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export interface PrivacyScreenProps {
  onBack: () => void;
}

export const PrivacyScreen = memo(({ onBack }: PrivacyScreenProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 transition-all relative z-10">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Privacy Policy</h2>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Back to App"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to App
        </button>
      </div>

      <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed max-h-[70vh] overflow-y-auto pr-2">
        <p className="text-xs text-gray-500 dark:text-gray-400">Last updated: March 2026</p>

        <p>
          Rei Ashine ("we", "us", or "our") respects your privacy and is committed to protecting the data collected through the "DS Exam Study App" (the "Service"). This Privacy Policy explains how data is collected, used, and handled when you use the Service.
        </p>

        <section>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">Article 1 (Information We Collect)</h3>
          <p>
            The Service does not collect personally identifiable information (such as your real name, phone number, or street address). We handle the following categories of data:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Local Application Data (LocalStorage):</strong> Your answer history, scores, category statistics, and theme preferences (dark/light mode) are stored locally in your web browser. This data remains on your device and is not sent to external servers.</li>
            <li><strong>Automatically Collected Analytics Data:</strong> Device type, browser type, operating system, IP address, referral URLs, access timestamps, and usage statistics collected via tracking technologies.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">Article 2 (Analytics Tools and Cookies)</h3>
          <p>
            We use Google Tag Manager (GTM) and Google Analytics to analyze access logs and understand user interactions with the Service to improve quality and user experience.
          </p>
          <p className="mt-2">
            These services use Cookies to collect anonymous statistical data. No data collected directly identifies individual users. You may disable Cookies through your browser settings to opt-out of analytics collection.
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">Article 3 (Purpose of Data Usage)</h3>
          <p>The data collected is used solely for the following purposes:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>To operate, maintain, and provide the core functions of the Service.</li>
            <li>To analyze usage trends, performance, and optimize features.</li>
            <li>To detect, prevent, and address technical issues or security threats.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">Article 4 (Third-Party Disclosure)</h3>
          <p>
            We do not sell, trade, or otherwise transfer your data to third parties, except as required by applicable laws or regulatory authorities.
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">Article 5 (Data Security)</h3>
          <p>
            We implement appropriate security measures, including HTTPS encryption, to safeguard data against unauthorized access, loss, or alteration.
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">Article 6 (Changes to Privacy Policy)</h3>
          <p>
            We reserve the right to update or modify this Privacy Policy at any time. Any changes will become effective immediately upon posting the updated policy on the Service.
          </p>
        </section>
      </div>
    </div>
  );
});
