"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { CategoriesService } from "@/services/CategoryService";
import type { Category } from "@/types/category";
import { EditCategoryModal } from "./EditCategory";
import { AddCategoryModal } from "./AddCategory";

const categoriesService = new CategoriesService();

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [addingCategory, setAddingCategory] = useState(false);

  async function loadCategories() {
    setLoading(true);
    try {
      const response = await categoriesService.getApiCategories();
      setCategories(response.data ?? []);
    } catch {
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await loadCategories();
    }
    void fetchData();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this category? This cannot be undone.")) return;
    setDeletingId(id);
    setError("");
    try {
      await categoriesService.deleteCategory(id);
      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch {
      setError("Failed to delete category.");
    } finally {
      setDeletingId(null);
    }
  }

  function handleCreated(created: Category) {
    setCategories((prev) => [...prev, created]);
    setAddingCategory(false);
  }

  function handleUpdated(updated: Category) {
    setCategories((prev) =>
      prev.map((category) => (category.id === updated.id ? updated : category)),
    );
    setEditingCategory(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-display font-bold text-white">
            Categories
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {loading ? "Loading categories..." : `${categories.length} records`}
          </p>
        </div>
        <button
          type="button"
          aria-label={`Add category`}
          onClick={() => setAddingCategory(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#00C853] text-black font-bold text-sm rounded-lg hover:bg-[#00A344]">
          <Plus size={14} /> Add Category
        </button>

        {addingCategory && (
          <AddCategoryModal
            onClose={() => setAddingCategory(false)}
            onCreated={handleCreated}
          />
        )}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="bg-[#111] border border-gray-800 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Name
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Slug
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Colour
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t border-gray-800">
                <td className="px-4 py-3 text-gray-200">{category.name}</td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {category.slug}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-2 text-xs text-gray-400">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-gray-700"
                      style={{ backgroundColor: category.colour }}
                    />
                    {category.colour}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      aria-label={`Edit ${category.name}`}
                      onClick={() => setEditingCategory(category)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800">
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${category.name}`}
                      disabled={deletingId === category.id}
                      onClick={() => void handleDelete(category.id)}
                      className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-gray-800 disabled:opacity-50">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && categories.length === 0 && (
          <p className="p-8 text-center text-sm text-gray-500">
            No categories found.
          </p>
        )}
      </div>

      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  );
}
