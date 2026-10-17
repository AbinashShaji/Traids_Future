import { Button } from "@/components/button";

// Mock mode: static appointments defined at module level for render purity
const appointments = [
  { id: "1", name: "Sarah Jenkins", businessName: "Acme Corp", phoneNumber: "555-0100", email: "sarah@acme.com", serviceInterest: "Website Design", createdAt: new Date("2026-10-16T14:30:00Z"), status: "New" },
  { id: "2", name: "Michael Chen", businessName: "TechFlow", phoneNumber: "555-0101", email: "michael@techflow.io", serviceInterest: "Web Application", createdAt: new Date("2026-10-15T09:15:00Z"), status: "Completed" },
  { id: "3", name: "David Alaba", businessName: "Global Solutions", phoneNumber: "555-0102", email: "david@global.org", serviceInterest: "Brand Identity", createdAt: new Date("2026-10-14T11:45:00Z"), status: "Completed" }
];

export default async function AppointmentsPage() {

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Appointments</h1>
          <p className="text-gray-500 mt-2">Manage your incoming strategy call requests.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                  No appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{app.name}</div>
                    <div className="text-sm text-gray-500">{app.businessName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{app.phoneNumber}</div>
                    <div className="text-sm text-gray-500">{app.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.serviceInterest || "Not specified"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      app.status === 'New' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="outline" className="mr-2">View</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
