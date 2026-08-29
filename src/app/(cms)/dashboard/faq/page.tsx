import { getFAQs, createFAQ, deleteFAQ } from "@/actions/faq";
import { Button } from "@/components/button";
import { FormInput } from "@/components/form-input";

export default async function FAQPage() {
  const faqs = await getFAQs();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage FAQs</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Add New FAQ</h2>
        <form action={createFAQ} className="space-y-4">
          <FormInput label="Question" name="question" required />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
            <textarea name="answer" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent min-h-[100px]"></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Category" name="category" />
            <FormInput label="Display Order" name="displayOrder" type="number" defaultValue="0" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="published" name="published" defaultChecked className="w-4 h-4" />
            <label htmlFor="published">Published</label>
          </div>
          <Button type="submit">Add FAQ</Button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Question</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Category</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {faqs.map((faq) => (
              <tr key={faq.id}>
                <td className="px-6 py-4 text-sm font-medium">{faq.question}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{faq.category || '-'}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${faq.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {faq.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <form action={async () => {
                    "use server"
                    await deleteFAQ(faq.id);
                  }}>
                    <button type="submit" className="text-red-600 hover:text-red-900 font-medium">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {faqs.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No FAQs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
