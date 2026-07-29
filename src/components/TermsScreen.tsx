import { memo } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';

export interface TermsScreenProps {
  onBack: () => void;
}

export const TermsScreen = memo(({ onBack }: TermsScreenProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 transition-all relative z-10">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Terms of Service</h2>
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
          These Terms of Service (the "Terms") set forth the terms and conditions for the use of "DS Exam Study App" (the "Service") provided by Rei Ashine (the "Provider"). By accessing or using the Service, you agree to be bound by these Terms.
        </p>

        <section>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">Article 1 (Scope and Application)</h3>
          <p>
            1. These Terms apply to all users ("Users") who access or use the Service.
          </p>
          <p className="mt-1">
            2. If any explanations or rules outside these Terms conflict with the provisions herein, these Terms shall prevail.
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">Article 2 (Service Description)</h3>
          <p>
            1. The Service is a free web application designed to support study and practice for the Data Scientist Examination (DS Exam - Literacy Level).
          </p>
          <p className="mt-1">
            2. The Service provides practice questions, answer checks, explanations, and learning progress tracking.
          </p>
          <p className="mt-1">
            3. The Provider reserves the right to modify, suspend, or terminate any part of the Service at any time at its sole discretion.
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">Article 3 (Intellectual Property Rights)</h3>
          <p>
            All copyrights, trademarks, text, graphics, program code, and other intellectual property rights related to the Service and its contents belong to the Provider or legitimate third-party licensors. Unauthorized reproduction, modification, distribution, or reverse engineering is strictly prohibited.
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">Article 4 (Prohibited Conduct)</h3>
          <p>Users shall not engage in any of the following activities when using the Service:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Actions that violate applicable laws, public order, or morals.</li>
            <li>Infringing upon intellectual property, privacy, or other rights of the Provider or third parties.</li>
            <li>Placing an excessive load on the servers, network, or infrastructure of the Service.</li>
            <li>Attempting unauthorized access, data scraping, or automated system exploitation.</li>
            <li>Commercial exploitation or redistribution of the Service content without prior written permission.</li>
            <li>Any other actions deemed inappropriate by the Provider.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">Article 5 (Disclaimer and Limitation of Liability)</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>The Provider does not guarantee that the practice questions, explanations, or contents are entirely accurate, complete, or up-to-date, nor that using the Service will guarantee passing the actual examination.</li>
            <li>The Provider shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of, or inability to use, the Service.</li>
            <li>The Provider is not responsible for any loss of user data stored locally in the browser due to cache clearing, browser settings, or system malfunctions.</li>
          </ol>
        </section>

        <section>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">Article 6 (Modifications to Terms)</h3>
          <p>
            The Provider reserves the right to amend these Terms at any time without prior notice. Amended Terms shall become effective immediately upon being published on the Service.
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">Article 7 (Governing Law and Jurisdiction)</h3>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of Japan. Any disputes arising out of or in connection with the Service shall be subject to the exclusive jurisdiction of the court having jurisdiction over the location of the Provider.
          </p>
        </section>
      </div>
    </div>
  );
});
