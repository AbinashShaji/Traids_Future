import Link from "next/link";
import { getProjects, deleteProject } from "@/actions/projects";
import { Button } from "@/components/button";
import { Edit2, Trash2, ExternalLink } from "lucide-react";

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Case Studies</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage your portfolio projects and case studies.</p>
        </div>
        <Link href="/dashboard/work/add">
          <Button variant="primary">Add New Project</Button>
        </Link>
      </div>

      {/* List Container */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        {projects.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center gap-3">
            <p className="text-gray-500 font-medium">No projects found.</p>
            <p className="text-sm text-gray-400">Click &quot;Add New Project&quot; to create your first case study.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {projects.map((project) => {
              const deleteProjectAction = deleteProject.bind(null, project.id);
              return (
                <div key={project.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {project.clientName || "Unknown Client"}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs text-gray-500">
                        {project.industry}
                      </span>
                      {project.published ? (
                        <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase tracking-wider">
                          Live
                        </span>
                      ) : (
                        <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px] font-bold uppercase tracking-wider">
                          Draft
                        </span>
                      )}
                      {project.featured && (
                        <span className="px-2 py-0.5 bg-gray-900 text-white rounded text-[10px] font-bold uppercase tracking-wider">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-heading text-xl font-medium text-gray-900 truncate">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      /{project.slug}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 sm:shrink-0">
                    <Link href={`/dashboard/work/${project.id}/edit`}>
                      <button type="button" className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </Link>
                    
                    <form action={deleteProjectAction}>
                      <button type="submit" className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                    
                    <Link href={`/work/${project.slug}`} target="_blank">
                      <button type="button" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="View Live">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
