"use client";
import { Tag } from "@/types/tag";
import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import { TagsService } from "@/services/TagService";

const tagsService = new TagsService();

export function EditTagModal({
  tag,
  onClose,
  onUpdated,
}: {
  tag: Tag;
  onClose: () => void;
  onUpdated: (updated: Tag) => void;
}) {
  const [name, setName] = useState(tag.name);
  const [slug, setSlug] = useState(tag.slug);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setFormError("");
    try {
      const response = await tagsService.updateTag(tag.id, {
        name,
        slug,
      });
      onUpdated(response.data);
    } catch {
      setFormError("Failed to update tag.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}>
      <div
        className="w-full max-w-md rounded-xl border border-gray-800 bg-[#111] p-5"
        onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">Edit Tag</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800">
            <X size={16} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Slug
            </label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"
            />
          </div>
          {/* Colour field removed as it's not part of the Tag entity */}
          {formError && <p className="text-sm text-red-400">{formError}</p>}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-[#00C853] text-black font-bold text-sm rounded-lg hover:bg-[#00A344] disabled:opacity-50">
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
