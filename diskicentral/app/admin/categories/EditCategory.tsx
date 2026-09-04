"use client";
import { Category } from "@/types/category";
import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import { CategoriesService } from "@/services/CategoryService";

const categoriesService = new CategoriesService();

export function EditCategoryModal({
  category,
  onClose,
  onUpdated,
}: {
  category: Category;
  onClose: () => void;
  onUpdated: (updated: Category) => void;
}) {
  const [name, setName] = useState(category.name);
  const [slug, setSlug] = useState(category.slug);
  const [colour, setColour] = useState(category.colour);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setFormError("");
    try {
      const response = await categoriesService.updateCategory(category.id, {
        name,
        slug,
        colour,
      });
      onUpdated(response.data);
    } catch {
      setFormError("Failed to update category.");
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
          <h2 className="text-sm font-semibold text-white">Edit Category</h2>
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
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Colour
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={colour}
                onChange={(e) => setColour(e.target.value)}
                className="h-9 w-11 rounded border border-gray-700 bg-gray-900 p-1"
              />
              <input
                value={colour}
                onChange={(e) => setColour(e.target.value)}
                required
                className="flex-1 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"
              />
            </div>
          </div>
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