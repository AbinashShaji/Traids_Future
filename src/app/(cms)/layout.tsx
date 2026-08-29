import Link from "next/link";
import { logout } from "@/actions/auth";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Briefcase, 
  FileText, 
  MessageSquareQuote, 
  HelpCircle, 
  Image as ImageIcon, 
  Settings, 
  UserCircle,
  LogOut 
} from "lucide-react";

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Appointments", href: "/dashboard/appointments", icon: CalendarDays },
    { name: "Work", href: "/dashboard/work", icon: Briefcase },
    { name: "Insights", href: "/dashboard/insights", icon: FileText },
    { name: "Testimonials", href: "/dashboard/testimonials", icon: MessageSquareQuote },
    { name: "FAQs", href: "/dashboard/faq", icon: HelpCircle },
    { name: "Media Library", href: "/dashboard/media", icon: ImageIcon },
    { name: "Website Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Profile", href: "/dashboard/profile", icon: UserCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 z-10">
        <div className="p-6 border-b border-gray-200">
          <Link href="/dashboard" className="text-xl font-bold tracking-tight text-gray-900">
            Traid Future CMS
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pl-64">
        <main className="p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
