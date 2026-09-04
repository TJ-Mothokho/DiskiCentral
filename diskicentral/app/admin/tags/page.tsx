"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { TagsService } from "@/services/TagService";
import type { Tag } from "@/types/tag";
import { EditTagModal } from "./EditTag";
import { AddTagModal } from "./AddTag";

const tagsService = new TagsService();

export default function AdminTagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [addingTag, setAddingTag] = useState(false);

  async function loadTags() {
    setLoading(true);
    try {
      const response = await tagsService.getApiTags();
      setTags(response.data ?? []);
    } catch {
      setError("Failed to load tags.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await loadTags();
    }
    void fetchData();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this tag? This cannot be undone.")) return;
    setDeletingId(id);
    setError("");
    try {
      await tagsService.deleteTag(id);
      setTags((prev) => prev.filter((tag) => tag.id !== id));
    } catch {
      setError("Failed to delete tag.");
    } finally {
      setDeletingId(null);
    }
  }

  function handleCreated(created: Tag) {
    setTags((prev) => [...prev, created]);
    setAddingTag(false);
  }

  function handleUpdated(updated: Tag) {
    setTags((prev) =>
      prev.map((tag) => (tag.id === updated.id ? updated : tag)),
    );
    setEditingTag(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-display font-bold text-white">
            Tags
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {loading ? "Loading tags..." : `${tags.length} records`}
          </p>
        </div>
        <button
          type="button"
          aria-label={`Add tag`}
          onClick={() => setAddingTag(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#00C853] text-black font-bold text-sm rounded-lg hover:bg-[#00A344]">
          <Plus size={14} /> Add Tag
        </button>

        {addingTag && (
          <AddTagModal
            onClose={() => setAddingTag(false)}
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
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <tr key={tag.id} className="border-t border-gray-800">
                <td className="px-4 py-3 text-gray-200">{tag.name}</td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {tag.slug}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      aria-label={`Edit ${tag.name}`}
                      onClick={() => setEditingTag(tag)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800">
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${tag.name}`}
                      disabled={deletingId === tag.id}
                      onClick={() => void handleDelete(tag.id)}
                      className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-gray-800 disabled:opacity-50">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && tags.length === 0 && (
          <p className="p-8 text-center text-sm text-gray-500">
            No tags found.
          </p>
        )}
      </div>

      {editingTag && (
        <EditTagModal
          tag={editingTag}
          onClose={() => setEditingTag(null)}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  );
}
