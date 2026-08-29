"use client";

import * as React from "react";
import { Button } from "@/components/button";
import { FormInput } from "@/components/form-input";
import { FormTextarea } from "@/components/form-textarea";
import { ImageWrapper } from "@/components/image-wrapper";
import Link from "next/link";
import { ArrowLeft, Plus, X } from "lucide-react";

export function ProjectForm({ 
  initialData, 
  action, 
  title 
}: { 
  initialData?: any; 
  action: (formData: FormData) => Promise<void>; 
  title: string;
}) {
  const [coverUrl, setCoverUrl] = React.useState(initialData?.coverImage || "");
  const [results, setResults] = React.useState<{metric: string, value: string}[]>(
    (initialData?.results as {metric: string, value: string}[]) || []
  );
  const [gallery, setGallery] = React.useState<string[]>(
    initialData?.galleryImages ? (initialData.galleryImages as any[]).map(g => g.url) : []
  );
  const [newGalleryUrl, setNewGalleryUrl] = React.useState("");

  return (
    <form action={action} className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-200">
        <div className="flex flex-col gap-2">
          <Link href="/dashboard/work" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Work List</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/work">
            <Button variant="outline" type="button">Cancel</Button>
          </Link>
          <Button variant="primary" type="submit">
            {initialData ? "Save Changes" : "Publish Project"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        {/* Main Content Column */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Core Details */}
          <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Core Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormInput label="Project Title" name="title" defaultValue={initialData?.title} required />
              <FormInput label="URL Slug" name="slug" defaultValue={initialData?.slug} required helperText="e.g. brand-redesign-2024" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormInput label="Client Name" name="clientName" defaultValue={initialData?.clientName} />
              <FormInput label="Industry" name="industry" defaultValue={initialData?.industry} required />
            </div>
            <FormTextarea label="Executive Summary" name="summary" defaultValue={initialData?.summary} rows={3} helperText="A short paragraph summarizing the project." />
          </div>

          {/* Narrative Section */}
          <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Case Study Narrative</h2>
            <FormTextarea label="The Challenge" name="challenge" defaultValue={(initialData?.narrativeSections as any[])?.find((s:any)=>s.title==="The Challenge")?.body} rows={5} />
            <FormTextarea label="The Strategy" name="strategy" defaultValue={(initialData?.narrativeSections as any[])?.find((s:any)=>s.title==="The Strategy")?.body} rows={5} />
            <FormTextarea label="The Technical Solution" name="solution" defaultValue={(initialData?.narrativeSections as any[])?.find((s:any)=>s.title==="The Technical Solution")?.body} rows={5} />
          </div>

          {/* Results Section */}
          <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-xl shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-lg font-semibold text-gray-900">Business Results & Metrics</h2>
              <button 
                type="button" 
                onClick={() => setResults([...results, { metric: "", value: "" }])}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" /> Add Metric
              </button>
            </div>
            <input type="hidden" name="results" value={JSON.stringify(results)} />
            
            {results.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No metrics added yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {results.map((r, i) => (
                  <div key={i} className="flex flex-col gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg relative group">
                    <button type="button" onClick={() => {
                      const newRes = [...results];
                      newRes.splice(i, 1);
                      setResults(newRes);
                    }} className="absolute -top-2 -right-2 bg-white border border-gray-200 text-gray-500 hover:text-red-600 rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Value</label>
                      <input 
                        type="text" 
                        value={r.value} 
                        onChange={e => {
                          const newRes = [...results];
                          newRes[i].value = e.target.value;
                          setResults(newRes);
                        }}
                        placeholder="e.g. 800+" 
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 text-lg font-bold" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Metric Description</label>
                      <input 
                        type="text" 
                        value={r.metric} 
                        onChange={e => {
                          const newRes = [...results];
                          newRes[i].metric = e.target.value;
                          setResults(newRes);
                        }}
                        placeholder="e.g. Manual hours eliminated" 
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          
          {/* Media Section */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Hero Image</h2>
            <FormInput 
              label="Cover Image URL" 
              name="coverImage" 
              value={coverUrl} 
              onChange={(e) => setCoverUrl(e.target.value)} 
            />
            <div className="w-full aspect-[16/10] relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
              {coverUrl ? (
                <ImageWrapper 
                  src={coverUrl} 
                  alt="Cover Preview" 
                  fill 
                  containerClassName="w-full h-full border-none rounded-none" 
                />
              ) : (
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">No Image</span>
              )}
            </div>
          </div>

          {/* Gallery Section */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Gallery</h2>
            <input type="hidden" name="gallery" value={JSON.stringify(gallery)} />
            
            <div className="flex flex-col gap-3">
              <FormInput 
                label="Add Image URL" 
                name="_gallery_input" 
                value={newGalleryUrl}
                onChange={e => setNewGalleryUrl(e.target.value)}
                placeholder="https://..." 
              />
              <Button type="button" variant="outline" className="w-full text-xs py-2" onClick={() => {
                if (newGalleryUrl) {
                  setGallery([...gallery, newGalleryUrl]);
                  setNewGalleryUrl("");
                }
              }}>Add to Gallery</Button>
            </div>

            {gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mt-4">
                {gallery.map((img, i) => (
                  <div key={i} className="group aspect-square relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                    <button type="button" onClick={() => {
                      const newG = [...gallery];
                      newG.splice(i, 1);
                      setGallery(newG);
                    }} className="absolute top-1 right-1 bg-white border border-gray-200 text-gray-500 rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:text-red-600 shadow-sm">
                      <X className="w-3 h-3" />
                    </button>
                    <ImageWrapper 
                      src={img} 
                      alt={`Gallery ${i}`} 
                      fill 
                      containerClassName="w-full h-full border-none rounded-none" 
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Settings Section */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Settings</h2>
            
            <FormInput label="Testimonial ID" name="testimonialId" defaultValue={initialData?.testimonialId} />
            <FormInput label="Tags (comma separated)" name="tags" defaultValue={initialData?.tags?.join(", ")} />
            
            <div className="flex flex-col gap-4 pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="published" defaultChecked={initialData?.published} className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900" />
                <span className="text-sm font-medium text-gray-700">Published (Live)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="featured" defaultChecked={initialData?.featured} className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900" />
                <span className="text-sm font-medium text-gray-700">Featured on Home</span>
              </label>
            </div>
          </div>

        </div>
      </div>
    </form>
  );
}
