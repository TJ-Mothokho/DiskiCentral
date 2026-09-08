"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import Input from "@/components/ui/Input";
import { AuthorsService } from "@/services/AuthorService";
import { UsersService } from "@/services/UserService";
import type { Author, AddAuthor, UpdateAuthor } from "@/types/author";
import type { User } from "@/types/user";

const authorsService = new AuthorsService();
const usersService = new UsersService();

type FormProps = { author?: Author; users: User[]; onClose: () => void; onSaved: (author: Author) => void };

export default function AdminAuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formAuthor, setFormAuthor] = useState<Author | null | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [authorResponse, userResponse] = await Promise.all([authorsService.getApiAuthors(), usersService.getApiUsers()]);
      setAuthors(authorResponse.data ?? []);
      setUsers(userResponse.data ?? []);
    } catch {
      setError("Failed to load authors and users.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, []);

  async function handleDelete(author: Author) {
    if (!window.confirm(`Delete ${author.name}? This cannot be undone.`)) return;
    setDeletingId(author.id);
    setError("");
    try {
      await authorsService.deleteAuthor(author.id);
      setAuthors((current) => current.filter((item) => item.id !== author.id));
    } catch {
      setError("Failed to delete author.");
    } finally {
      setDeletingId(null);
    }
  }

  function handleSaved(saved: Author) {
    setAuthors((current) => current.some((author) => author.id === saved.id) ? current.map((author) => author.id === saved.id ? saved : author) : [...current, saved]);
    setFormAuthor(undefined);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div><h1 className="text-lg font-display font-bold text-white">Authors</h1><p className="mt-1 text-xs text-gray-500">{loading ? "Loading authors..." : `${authors.length} author profiles`}</p></div>
        <button type="button" onClick={() => setFormAuthor(null)} className="flex items-center gap-1.5 rounded-lg bg-[#00C853] px-4 py-2 text-sm font-bold text-black hover:bg-[#00A344]"><Plus size={15} /> Add Author</button>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#111]">
        <table className="w-full text-sm"><thead className="bg-gray-900/50"><tr>{["Author", "User", "Slug", "Social", "Actions"].map((heading) => <th key={heading} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">{heading}</th>)}</tr></thead>
          <tbody>{authors.map((author) => { const user = users.find((item) => item.id === author.userId); return <tr key={author.id} className="border-t border-gray-800"><td className="px-4 py-3"><div className="flex items-center gap-3">{author.avatar ? <img src={author.avatar} alt="" className="h-9 w-9 rounded-full object-cover" /> : <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00C853]/15 text-sm font-bold text-[#00C853]">{author.name.charAt(0).toUpperCase()}</div>}<div><p className="font-medium text-gray-200">{author.name}</p><p className="text-xs text-gray-500">{author.bio || "No bio"}</p></div></div></td><td className="px-4 py-3 text-xs text-gray-400">{user?.email ?? author.userId}</td><td className="px-4 py-3 text-xs text-gray-400">{author.slug}</td><td className="px-4 py-3 text-xs text-gray-400">{author.twitter || "—"}</td><td className="px-4 py-3"><div className="flex justify-end gap-2"><button type="button" aria-label={`Edit ${author.name}`} onClick={() => setFormAuthor(author)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-800 hover:text-white"><Pencil size={14} /></button><button type="button" aria-label={`Delete ${author.name}`} disabled={deletingId === author.id} onClick={() => void handleDelete(author)} className="rounded-lg p-1.5 text-red-400 hover:bg-gray-800 hover:text-red-300 disabled:opacity-50"><Trash2 size={14} /></button></div></td></tr>; })}</tbody>
        </table>
        {!loading && authors.length === 0 && <p className="p-8 text-center text-sm text-gray-500">No authors found.</p>}
      </div>
      {formAuthor !== undefined && <AuthorModal author={formAuthor ?? undefined} users={users} onClose={() => setFormAuthor(undefined)} onSaved={handleSaved} />}
    </div>
  );
}

function AuthorModal({ author, users, onClose, onSaved }: FormProps) {
  const editing = Boolean(author);
  const [userId, setUserId] = useState(author?.userId ?? "");
  const [name, setName] = useState(author?.name ?? "");
  const [slug, setSlug] = useState(author?.slug ?? "");
  const [bio, setBio] = useState(author?.bio ?? "");
  const [twitter, setTwitter] = useState(author?.twitter ?? "");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(author?.avatar ?? null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const saved = editing && author
        ? await authorsService.updateAuthor(author.id, { name, slug, bio: bio || null, avatar, twitter: twitter || null } satisfies UpdateAuthor)
        : await authorsService.addAuthor({ userId, name, slug, bio: bio || null, avatar, twitter: twitter || null } satisfies AddAuthor);
      onSaved(saved.data);
    } catch (reason) {
      setError(typeof reason === "string" ? reason : `Failed to ${editing ? "update" : "add"} author.`);
    } finally {
      setSubmitting(false);
    }
  }

  function chooseAvatar(file: File | null) { setAvatar(file); if (file) setPreview(URL.createObjectURL(file)); }

  return <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-8" onClick={onClose}><div className="w-full max-w-xl rounded-xl border border-gray-800 bg-[#111] p-5" onClick={(event) => event.stopPropagation()}><div className="mb-5 flex items-center justify-between"><h2 className="text-sm font-semibold text-white">{editing ? "Edit Author" : "Add Author"}</h2><button type="button" aria-label="Close" onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-800 hover:text-white"><X size={16} /></button></div><form onSubmit={submit} className="space-y-4"><div className="grid gap-4 sm:grid-cols-2"><Input label="Name" name="name" value={name} onChange={(event) => setName(event.target.value)} required /><Input label="Slug" name="slug" value={slug} onChange={(event) => setSlug(event.target.value)} required /></div>{!editing && <div className="space-y-1.5"><label htmlFor="userId" className="block text-xs font-medium text-gray-400">User <span className="ml-1 text-[#00C853]">*</span></label><select required id="userId" value={userId} onChange={(event) => setUserId(event.target.value)} className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"><option value="">Select a user</option>{users.map((user) => <option key={user.id} value={user.id}>{user.name} — {user.email}</option>)}</select></div>}<div className="space-y-1.5"><label htmlFor="bio" className="block text-xs font-medium text-gray-400">Bio</label><textarea id="bio" value={bio} onChange={(event) => setBio(event.target.value)} rows={3} className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]" /></div><Input label="Twitter / X" name="twitter" value={twitter} onChange={(event) => setTwitter(event.target.value)} placeholder="@username" /><div className="space-y-2"><label className="block text-xs font-medium text-gray-400">Avatar</label><div className="flex items-center gap-4">{preview ? <img src={preview} alt="Avatar preview" className="h-16 w-16 rounded-full object-cover" /> : <div className="h-16 w-16 rounded-full bg-gray-800" />}<input type="file" accept="image/*" onChange={(event) => chooseAvatar(event.target.files?.[0] ?? null)} className="text-xs text-gray-400 file:mr-3 file:rounded-lg file:border-0 file:bg-gray-800 file:px-3 file:py-2 file:text-xs file:text-gray-200" /></div></div>{error && <p className="text-sm text-red-400">{error}</p>}<div className="flex justify-end gap-2 pt-2"><button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white">Cancel</button><button type="submit" disabled={submitting} className="rounded-lg bg-[#00C853] px-4 py-2 text-sm font-bold text-black hover:bg-[#00A344] disabled:opacity-50">{submitting ? "Saving..." : editing ? "Save Changes" : "Add Author"}</button></div></form></div></div>;
}
