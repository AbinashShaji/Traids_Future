import { redirect, notFound } from "next/navigation";
import { getProject, updateProject } from "@/actions/projects";
import { ProjectForm } from "../../project-form";

export default async function EditWorkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);
  
  if (!project) {
    notFound();
  }

  async function action(formData: FormData) {
    "use server";
    await updateProject(id, formData);
    redirect("/dashboard/work");
  }

  return <ProjectForm initialData={project} action={action} title="Edit Project Details" />;
}
