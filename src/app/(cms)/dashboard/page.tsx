import db from "@/lib/db";
import { Card } from "@/components/card";

export default async function DashboardPage() {
  const [
    totalAppointments,
    newAppointments,
    publishedProjects,
    publishedArticles,
    totalTestimonials,
    totalFaqs
  ] = await Promise.all([
    db.appointment.count(),
    db.appointment.count({ where: { status: "New" } }),
    db.project.count({ where: { published: true } }),
    db.blogPost.count({ where: { published: true } }),
    db.testimonial.count(),
    db.fAQ.count()
  ]);

  const recentAppointments = await db.appointment.findMany({
    take: 5,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-gray-500 mt-2">What requires your attention today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Strategy Calls</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{totalAppointments}</p>
          {newAppointments > 0 && (
            <p className="text-sm text-amber-600 mt-1">{newAppointments} new requests</p>
          )}
        </Card>
        
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Published Projects</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{publishedProjects}</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Published Insights</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{publishedArticles}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Testimonials</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{totalTestimonials}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">FAQs</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{totalFaqs}</p>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Appointments</h2>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentAppointments.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                    No recent appointments.
                  </td>
                </tr>
              ) : (
                recentAppointments.map((app) => (
                  <tr key={app.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {app.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {app.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        app.status === 'New' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
