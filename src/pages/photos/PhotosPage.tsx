import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { Camera, Trash2, Upload } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Modal } from "../../components/ui/Modal";
import { PageHeader } from "../../components/ui/PageHeader";
import { photos as seedPhotos, projects } from "../../data/mockData";
import type { SitePhoto } from "../../types";
import { formatDate } from "../../utils/format";

export function PhotosPage() {
  const [photos, setPhotos] = useState<SitePhoto[]>(seedPhotos);
  const [projectFilter, setProjectFilter] = useState("All");
  const [preview, setPreview] = useState<SitePhoto | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  const filteredPhotos = useMemo(
    () => photos.filter((photo) => projectFilter === "All" || photo.projectId === projectFilter),
    [photos, projectFilter],
  );

  const deletePhoto = (id: string) => {
    setPhotos((current) => current.filter((photo) => photo.id !== id));
    setPreview(null);
  };

  const uploadPhoto = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const projectId = String(formData.get("projectId"));
    const project = projects.find((item) => item.id === projectId) ?? projects[0];
    const file = formData.get("photoFile");
    const fallbackUrl = String(formData.get("imageUrl") || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80");
    const imageUrl = file instanceof File && file.size > 0 ? URL.createObjectURL(file) : fallbackUrl;

    setPhotos((current) => [
      {
        id: `ph-${Date.now()}`,
        projectId: project.id,
        projectName: project.name,
        title: String(formData.get("title") || "Site photo"),
        date: String(formData.get("date") || "2026-06-15"),
        uploadedBy: String(formData.get("uploadedBy") || "Ateeq Malik"),
        category: String(formData.get("category") || "Structure") as SitePhoto["category"],
        imageUrl,
      },
      ...current,
    ]);
    form.reset();
    setUploadOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Photos"
        description="Upload, filter, preview, and manage site photos for project documentation."
        actions={<Button icon={<Upload size={18} />} onClick={() => setUploadOpen(true)}>Upload Photos</Button>}
      />

      <Card>
        <div className="flex flex-col gap-3 border-b border-line p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-ink">Grid Gallery</p>
            <p className="mt-1 text-sm text-ink-muted">{filteredPhotos.length} photos visible</p>
          </div>
          <select
            className="focus-ring h-10 rounded-md border border-line bg-white px-3 text-sm text-ink"
            value={projectFilter}
            onChange={(event) => setProjectFilter(event.target.value)}
          >
            <option value="All">All Projects</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <article key={photo.id} className="overflow-hidden rounded-lg border border-line bg-white shadow-panel">
              <button type="button" className="block w-full text-left" onClick={() => setPreview(photo)}>
                <img src={photo.imageUrl} alt={photo.title} className="h-48 w-full object-cover" />
              </button>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">{photo.title}</p>
                    <p className="mt-1 text-sm text-ink-muted">{photo.projectName}</p>
                  </div>
                  <Button variant="ghost" className="h-9 w-9 px-0 text-danger" onClick={() => deletePhoto(photo.id)} aria-label={`Delete ${photo.title}`}>
                    <Trash2 size={16} />
                  </Button>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-ink-muted">
                  <Camera size={14} />
                  <span>{photo.category}</span>
                  <span>{formatDate(photo.date)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Card>

      <Modal title={preview?.title ?? "Photo Preview"} isOpen={Boolean(preview)} onClose={() => setPreview(null)}>
        {preview && (
          <div className="space-y-4">
            <img src={preview.imageUrl} alt={preview.title} className="max-h-[60vh] w-full rounded-lg object-cover" />
            <div>
              <p className="font-semibold text-ink">{preview.projectName}</p>
              <p className="mt-1 text-sm text-ink-muted">Uploaded by {preview.uploadedBy} on {formatDate(preview.date)}</p>
            </div>
            <div className="flex justify-end">
              <Button variant="danger" icon={<Trash2 size={16} />} onClick={() => deletePhoto(preview.id)}>Delete Photo</Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal title="Upload Photos" isOpen={uploadOpen} onClose={() => setUploadOpen(false)}>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={uploadPhoto}>
          <label className="block md:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-ink">Photo file</span>
            <input
              className="focus-ring w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink"
              type="file"
              name="photoFile"
              accept="image/*"
            />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-ink">Image URL fallback</span>
            <input
              className="focus-ring w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink"
              name="imageUrl"
              placeholder="https://images.unsplash.com/..."
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Title</span>
            <input className="focus-ring w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink" name="title" required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Date</span>
            <input className="focus-ring w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink" name="date" type="date" defaultValue="2026-06-15" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Project</span>
            <select className="focus-ring w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink" name="projectId">
              {projects.map((project) => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Category</span>
            <select className="focus-ring w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink" name="category">
              <option>Foundation</option>
              <option>Structure</option>
              <option>Electrical</option>
              <option>Plumbing</option>
              <option>Finishing</option>
              <option>Safety</option>
            </select>
          </label>
          <label className="block md:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-ink">Uploaded by</span>
            <input className="focus-ring w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink" name="uploadedBy" defaultValue="Ateeq Malik" />
          </label>
          <div className="flex justify-end gap-2 md:col-span-2">
            <Button type="button" variant="outline" onClick={() => setUploadOpen(false)}>Cancel</Button>
            <Button type="submit" icon={<Upload size={16} />}>Upload</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
