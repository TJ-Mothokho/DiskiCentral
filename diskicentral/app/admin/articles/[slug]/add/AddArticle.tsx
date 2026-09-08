"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ImagePlus, Loader2, Save } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import Input from "@/components/ui/Input";
import { ArticlesService } from "@/services/ArticleService";
import { AuthorsService } from "@/services/AuthorService";
import { CategoriesService } from "@/services/CategoryService";
import { TagsService } from "@/services/TagService";
import { TeamsService } from "@/services/TeamService";
import { useAuth } from "@/context/AuthContext";
import type { Article, AddArticle, UpdateArticle } from "@/types/article";
import type { Author } from "@/types/author";
import type { Category } from "@/types/category";
import type { Tag } from "@/types/tag";
import type { Team } from "@/types/team";

const authorsService = new AuthorsService();
const categoriesService = new CategoriesService();
const tagsService = new TagsService();
const teamsService = new TeamsService();

type ArticleFormProps = { article?: Article };
type FormValues = Omit<AddArticle, "heroImage" | "thumbnail"> & { heroImage: File | null; thumbnail: File | null };

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function initialValues(article?: Article): FormValues {
  return {
    title: article?.title ?? "",
    slug: article?.slug ?? "",
    subtitle: article?.subtitle ?? null,
    excerpt: article?.excerpt ?? null,
    body: article?.body ?? "",
    categoryId: article?.categoryId ?? "",
    authorId: article?.authorId ?? "",
    teamId: article?.teamId ?? null,
    tagIds: article?.tagIds ?? [],
    heroImage: null,
    thumbnail: null,
    featured: article?.featured ?? false,
    trending: article?.trending ?? false,
    status: article?.status ?? 0,
    publishedAt: article?.publishedAt ?? null,
  };
}

export default function ArticleForm({ article }: ArticleFormProps) {
  const editing = Boolean(article);
  const router = useRouter();
  const { user } = useAuth();
  const [values, setValues] = useState<FormValues>(() => ({
    ...initialValues(article),
    authorId: article?.authorId ?? user?.authorId ?? "",
  }));
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [heroPreview, setHeroPreview] = useState<string | null>(article?.heroImage ?? null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(article?.thumbnail ?? null);

  useEffect(() => {
    let active = true;
    Promise.all([authorsService.getApiAuthors(), categoriesService.getApiCategories(), tagsService.getApiTags(), teamsService.getApiTeams()])
      .then(([authorResponse, categoryResponse, tagResponse, teamResponse]) => {
        if (!active) return;
        setAuthors(authorResponse.data ?? []);
        setCategories(categoryResponse.data ?? []);
        setTags(tagResponse.data ?? []);
        setTeams(teamResponse.data ?? []);
      })
      .catch(() => setError("Some article options could not be loaded. Please refresh and try again."))
      .finally(() => active && setLoadingOptions(false));
    return () => { active = false; };
  }, []);

  const selectedTagNames = useMemo(() => new Set(values.tagIds), [values.tagIds]);
  const setField = <K extends keyof FormValues>(field: K, value: FormValues[K]) => setValues((current) => ({ ...current, [field]: value }));
  const selectFile = (field: "heroImage" | "thumbnail", file: File | null) => {
    setField(field, file);
    if (file) {
      const preview = URL.createObjectURL(file);
      if (field === "heroImage") setHeroPreview(preview);
      else setThumbnailPreview(preview);
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      if (editing && article) {
        const payload: UpdateArticle = { ...values, title: values.title, slug: values.slug, body: values.body, categoryId: values.categoryId, authorId: values.authorId };
        await ArticlesService.updateArticle(article.id, payload);
      } else {
        await ArticlesService.addArticle(values);
      }
      router.push("/admin/articles");
    } catch (submitError) {
      setError(typeof submitError === "string" ? submitError : `Failed to ${editing ? "update" : "create"} article.`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/articles" className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white" aria-label="Back to articles"><ArrowLeft size={18} /></Link>
        <div><p className="text-xs uppercase tracking-widest text-[#00C853]">Content studio</p><h1 className="text-xl font-display font-bold text-white">{editing ? "Edit article" : "Add article"}</h1></div>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5 rounded-xl border border-gray-800 bg-[#111] p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Title" name="title" value={values.title} onChange={(e) => { setField("title", e.target.value); if (!editing) setField("slug", slugify(e.target.value)); }} required placeholder="Article headline" />
            <Input label="Slug" name="slug" value={values.slug} onChange={(e) => setField("slug", e.target.value)} required placeholder="article-headline" />
          </div>
          <Input label="Subtitle" name="subtitle" value={values.subtitle ?? ""} onChange={(e) => setField("subtitle", e.target.value || null)} placeholder="A short supporting line" />
          <div className="space-y-1.5"><label htmlFor="excerpt" className="block text-xs font-medium text-gray-400">Excerpt</label><textarea id="excerpt" value={values.excerpt ?? ""} onChange={(e) => setField("excerpt", e.target.value || null)} rows={3} className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]" placeholder="A concise summary for cards and search results" /></div>
          <div className="space-y-1.5"><label htmlFor="body" className="block text-xs font-medium text-gray-400">Body <span className="ml-1 text-[#00C853]">*</span></label><textarea id="body" required value={values.body} onChange={(e) => setField("body", e.target.value)} rows={16} className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm leading-6 text-white outline-none focus:border-[#00C853]" placeholder="Write the article body..." /></div>
        </div>
        <aside className="space-y-5">
          <div className="space-y-4 rounded-xl border border-gray-800 bg-[#111] p-5">
            <h2 className="text-sm font-semibold text-white">Publishing</h2>
            <div className="space-y-1.5"><label htmlFor="status" className="block text-xs font-medium text-gray-400">Status</label><select id="status" value={values.status} onChange={(e) => setField("status", Number(e.target.value))} className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"><option value={0}>Draft</option><option value={1}>Published</option></select></div>
            <Input label="Published at" name="publishedAt" type="datetime-local" value={values.publishedAt ? values.publishedAt.slice(0, 16) : ""} onChange={(e) => setField("publishedAt", e.target.value || null)} />
            <label className="flex items-center gap-2 text-sm text-gray-300"><input type="checkbox" checked={values.featured} onChange={(e) => setField("featured", e.target.checked)} className="accent-[#00C853]" /> Featured article</label>
            <label className="flex items-center gap-2 text-sm text-gray-300"><input type="checkbox" checked={values.trending} onChange={(e) => setField("trending", e.target.checked)} className="accent-[#00C853]" /> Trending article</label>
          </div>
          <div className="space-y-4 rounded-xl border border-gray-800 bg-[#111] p-5">
            <h2 className="text-sm font-semibold text-white">Classification</h2>
            <div className="space-y-1.5"><label htmlFor="categoryId" className="block text-xs font-medium text-gray-400">Category <span className="ml-1 text-[#00C853]">*</span></label><select required id="categoryId" value={values.categoryId} onChange={(e) => setField("categoryId", e.target.value)} disabled={loadingOptions} className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"><option value="">Select category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></div>
            <div className="space-y-1.5"><label htmlFor="authorId" className="block text-xs font-medium text-gray-400">Author <span className="ml-1 text-[#00C853]">*</span></label><select required id="authorId" value={values.authorId} onChange={(e) => setField("authorId", e.target.value)} disabled={loadingOptions} className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"><option value="">Select author</option>{authors.map((author) => <option key={author.id} value={author.id}>{author.name}</option>)}</select></div>
            <div className="space-y-1.5"><label htmlFor="teamId" className="block text-xs font-medium text-gray-400">Team</label><select id="teamId" value={values.teamId ?? ""} onChange={(e) => setField("teamId", e.target.value || null)} disabled={loadingOptions} className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-[#00C853]"><option value="">No team</option>{teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}</select></div>
            <div className="space-y-1.5"><p className="text-xs font-medium text-gray-400">Tags</p><div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto">{tags.map((tag) => <label key={tag.id} className={`cursor-pointer rounded-full border px-2.5 py-1 text-xs ${selectedTagNames.has(tag.id) ? "border-[#00C853] bg-[#00C853]/10 text-[#00C853]" : "border-gray-700 text-gray-400"}`}><input type="checkbox" className="sr-only" checked={selectedTagNames.has(tag.id)} onChange={(e) => setField("tagIds", e.target.checked ? [...values.tagIds, tag.id] : values.tagIds.filter((id) => id !== tag.id))} />{tag.name}</label>)}</div></div>
          </div>
          <ImageField label="Hero image" preview={heroPreview} onChange={(file) => selectFile("heroImage", file)} />
          <ImageField label="Thumbnail" preview={thumbnailPreview} onChange={(file) => selectFile("thumbnail", file)} />
          {error && <p className="rounded-lg border border-red-900/60 bg-red-950/30 p-3 text-sm text-red-300">{error}</p>}
          <div className="flex gap-3"><Link href="/admin/articles" className="flex-1 rounded-lg border border-gray-700 px-4 py-2.5 text-center text-sm font-semibold text-gray-300 hover:border-gray-500 hover:text-white">Cancel</Link><button type="submit" disabled={submitting || loadingOptions} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#00C853] px-4 py-2.5 text-sm font-bold text-black hover:bg-[#00A344] disabled:cursor-not-allowed disabled:opacity-50">{submitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}{submitting ? "Saving..." : editing ? "Save changes" : "Create article"}</button></div>
        </aside>
      </form>
    </div>
  );
}

function ImageField({ label, preview, onChange }: { label: string; preview: string | null; onChange: (file: File | null) => void }) {
  return <div className="rounded-xl border border-gray-800 bg-[#111] p-5"><label className="block text-xs font-medium text-gray-400">{label}</label><label className="mt-2 flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-gray-700 bg-gray-900/60 text-center hover:border-[#00C853]">{preview ? <img src={preview} alt={`${label} preview`} className="h-36 w-full object-cover" /> : <span className="flex h-28 flex-col items-center justify-center gap-2 text-xs text-gray-500"><ImagePlus size={22} />Choose image</span>}<input type="file" accept="image/*" className="sr-only" onChange={(e) => onChange(e.target.files?.[0] ?? null)} /></label></div>;
}
