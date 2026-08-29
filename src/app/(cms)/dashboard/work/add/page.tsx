import { redirect } from "next/navigation";
import { createProject } from "@/actions/projects";
import { ProjectForm } from "../project-form";

export default function AddWorkPage() {
  async function action(formData: FormData) {
    "use server";
    await createProject(formData);
    redirect("/dashboard/work");
  }

  return <ProjectForm action={action} title="Initiate New Case Study" />;
}
