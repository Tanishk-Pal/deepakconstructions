"use client";

import { useEffect, useRef, useState } from "react";

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import {
    FolderKanban,
    Upload,
    Building2,
    Trash2,
    Pencil,
    ImageIcon,
    Video,
    Star,
    Clock3,
    ChevronUp,
    ChevronDown,
    Film,
} from "lucide-react";

export default function AdminPage() {

    // ─── Projects state ───────────────────────────────────────
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [project, setProject] = useState({
        title: "",
        description: "",
        location: "",
        duration: "",
        client: "",
        category: "projects",
        status: "ongoing",
        featured: false,
        imageUrl: "",
        videoUrl: "",
    });

    // ─── Reels state ──────────────────────────────────────────
    const [reels, setReels] = useState<any[]>([]);
    const [reelLabel, setReelLabel] = useState("");
    const [reelUploading, setReelUploading] = useState(false);
    const [reelProgress, setReelProgress] = useState(0);
    const reelFileRef = useRef<HTMLInputElement>(null);

    // ─── Fetch projects ───────────────────────────────────────
    useEffect(() => {
        fetchProjects();
    }, []);

    // ─── Fetch reels (realtime) ───────────────────────────────
    useEffect(() => {
        const q = query(collection(db, "reels"), orderBy("order", "asc"));
        const unsub = onSnapshot(q, (snap) => {
            setReels(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        });
        return () => unsub();
    }, []);

    const fetchProjects = async () => {
        const snapshot = await getDocs(collection(db, "projects"));
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setProjects(data);
    };

    // ─── Cloudinary upload (projects) ────────────────────────
    const uploadToCloudinary = async (file: File, type: "image" | "video") => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const url =
            type === "image"
                ? `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
                : `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;
        const res = await axios.post(url, formData);
        return res.data.secure_url;
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        toast.loading("Uploading image...");
        try {
            const url = await uploadToCloudinary(e.target.files[0], "image");
            setProject((prev) => ({ ...prev, imageUrl: url }));
            toast.dismiss();
            toast.success("Image uploaded successfully");
        } catch {
            toast.dismiss();
            toast.error("Image upload failed");
        }
    };

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        toast.loading("Uploading video...");
        try {
            const url = await uploadToCloudinary(e.target.files[0], "video");
            setProject((prev) => ({ ...prev, videoUrl: url }));
            toast.dismiss();
            toast.success("Video uploaded successfully");
        } catch {
            toast.dismiss();
            toast.error("Video upload failed");
        }
    };

    // ─── Project CRUD ─────────────────────────────────────────
    const addProject = async () => {
        if (!project.title || !project.description || !project.imageUrl) {
            toast.error("Please fill all required fields");
            return;
        }
        try {
            setLoading(true);
            if (editingId) {
                await updateDoc(doc(db, "projects", editingId), { ...project });
                toast.success("Project updated successfully");
            } else {
                await addDoc(collection(db, "projects"), {
                    ...project,
                    createdAt: new Date(),
                });
                toast.success("Project added successfully");
            }
            setProject({
                title: "", description: "", location: "", duration: "",
                client: "", category: "projects", status: "ongoing",
                featured: false, imageUrl: "", videoUrl: "",
            });
            setEditingId(null);
            fetchProjects();
        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const deleteProject = async (id: string) => {
        if (!confirm("Delete this project permanently?")) return;
        await deleteDoc(doc(db, "projects", id));
        toast.success("Project deleted");
        fetchProjects();
    };

    const editProject = (projectData: any) => {
        setEditingId(projectData.id);
        setProject({
            title: projectData.title || "",
            description: projectData.description || "",
            location: projectData.location || "",
            duration: projectData.duration || "",
            client: projectData.client || "",
            category: projectData.category || "projects",
            status: projectData.status || "ongoing",
            featured: projectData.featured || false,
            imageUrl: projectData.imageUrl || "",
            videoUrl: projectData.videoUrl || "",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ─── Reels CRUD ───────────────────────────────────────────
    const uploadReel = async (file: File) => {
        if (!reelLabel.trim()) {
            toast.error("Enter a label before uploading");
            return;
        }
        setReelUploading(true);
        setReelProgress(0);
        try {
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
            formData.append("folder", "deepak-reels");

            await new Promise<void>((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`);
                xhr.upload.onprogress = (e) => {
                    if (e.lengthComputable)
                        setReelProgress(Math.round((e.loaded / e.total) * 100));
                };
                xhr.onload = async () => {
                    if (xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        await addDoc(collection(db, "reels"), {
                            src: data.secure_url,
                            label: reelLabel.trim(),
                            order: Date.now(),
                            uploadedAt: new Date().toISOString(),
                        });
                        setReelLabel("");
                        setReelProgress(0);
                        toast.success("Reel uploaded & live on mobile!");
                        resolve();
                    } else {
                        reject(new Error("Cloudinary upload failed"));
                    }
                };
                xhr.onerror = () => reject(new Error("Network error"));
                xhr.send(formData);
            });
        } catch {
            toast.error("Reel upload failed. Check Cloudinary settings.");
        } finally {
            setReelUploading(false);
        }
    };

    const deleteReel = async (id: string) => {
        if (!confirm("Delete this reel from mobile homepage?")) return;
        await deleteDoc(doc(db, "reels", id));
        toast.success("Reel deleted");
    };

    const moveReel = async (index: number, direction: "up" | "down") => {
        const swapIndex = direction === "up" ? index - 1 : index + 1;
        if (swapIndex < 0 || swapIndex >= reels.length) return;
        const a = reels[index];
        const b = reels[swapIndex];
        await updateDoc(doc(db, "reels", a.id), { order: b.order });
        await updateDoc(doc(db, "reels", b.id), { order: a.order });
    };

    // ─────────────────────────────────────────────────────────
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative">

            <Toaster position="top-right" />

            {/* GLOW */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#d89b1d]/10 blur-[140px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-white/[0.03] blur-[120px] rounded-full" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

                {/* ── HEADER ── */}
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-14 h-[2px] bg-[#d89b1d]" />
                        <p className="uppercase tracking-[5px] text-[#d89b1d] text-sm font-semibold">
                            Deepak Construction CMS
                        </p>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black leading-[0.95]">
                        Admin
                        <span className="block text-[#d89b1d]">Dashboard</span>
                    </h1>
                    <p className="text-gray-400 text-xl leading-10 mt-10 max-w-4xl">
                        Manage projects, services, hero reels and complete website content.
                    </p>
                </div>

                {/* ── STATS ── */}
                <div className="grid md:grid-cols-4 gap-6 mb-20">
                    {[
                        { icon: FolderKanban, title: "Projects", value: projects.length },
                        { icon: Film, title: "Reels", value: reels.length },
                        { icon: Building2, title: "Website", value: "Dynamic" },
                        { icon: Clock3, title: "Realtime", value: "Live" },
                    ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-[30px] p-8"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-[#d89b1d]/10 flex items-center justify-center mb-8">
                                    <Icon className="text-[#d89b1d]" size={30} />
                                </div>
                                <h3 className="text-4xl font-black text-[#d89b1d]">{item.value}</h3>
                                <p className="text-gray-400 mt-3">{item.title}</p>
                            </div>
                        );
                    })}
                </div>

                {/* ══════════════════════════════════════════════
                    SECTION 1 — ADD / EDIT PROJECT
                ══════════════════════════════════════════════ */}
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-14 h-[2px] bg-[#d89b1d]" />
                    <p className="uppercase tracking-[5px] text-[#d89b1d] text-sm font-semibold">
                        {editingId ? "Edit Project" : "Add New Project"}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-10">

                    {/* LEFT — form fields */}
                    <div className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-[40px] p-10">
                        <h2 className="text-4xl font-black mb-10">
                            {editingId ? "Edit Project" : "Add New Project"}
                        </h2>
                        <div className="space-y-6">
                            <input
                                placeholder="Project Title *"
                                value={project.title}
                                onChange={(e) => setProject({ ...project, title: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 outline-none focus:border-[#d89b1d]"
                            />
                            <textarea
                                placeholder="Project Description"
                                value={project.description}
                                onChange={(e) => setProject({ ...project, description: e.target.value })}
                                rows={5}
                                className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 outline-none focus:border-[#d89b1d]"
                            />
                            <div className="grid md:grid-cols-2 gap-5">
                                <input
                                    placeholder="Location"
                                    value={project.location}
                                    onChange={(e) => setProject({ ...project, location: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 outline-none focus:border-[#d89b1d]"
                                />
                                <input
                                    placeholder="Duration"
                                    value={project.duration}
                                    onChange={(e) => setProject({ ...project, duration: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 outline-none focus:border-[#d89b1d]"
                                />
                            </div>
                            <input
                                placeholder="Client Name"
                                value={project.client}
                                onChange={(e) => setProject({ ...project, client: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 outline-none focus:border-[#d89b1d]"
                            />
                            <select
                                value={project.category}
                                onChange={(e) => setProject({ ...project, category: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 outline-none focus:border-[#d89b1d]"
                            >
                                <option value="projects">Project Page</option>
                                <option value="services">Service Page</option>
                                <option value="hero">Hero Section</option>
                                <option value="contact">Contact Section</option>
                            </select>
                            <select
                                value={project.status}
                                onChange={(e) => setProject({ ...project, status: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 outline-none focus:border-[#d89b1d]"
                            >
                                <option value="ongoing">Ongoing Project</option>
                                <option value="completed">Completed Project</option>
                            </select>
                            <label className="flex items-center gap-4 bg-black/30 border border-white/10 rounded-2xl p-5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={project.featured}
                                    onChange={(e) => setProject({ ...project, featured: e.target.checked })}
                                />
                                <span className="flex items-center gap-3">
                                    <Star size={18} className="text-[#d89b1d]" />
                                    Featured Project
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* RIGHT — media uploads */}
                    <div className="space-y-10">

                        {/* Image upload */}
                        <div className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-[40px] p-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-[#d89b1d]/10 flex items-center justify-center">
                                    <ImageIcon className="text-[#d89b1d]" size={30} />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black">Upload Image</h2>
                                    <p className="text-gray-400 mt-2 text-sm">
                                        Hero image / service image / project image
                                    </p>
                                </div>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="w-full border border-dashed border-white/20 rounded-2xl p-10 cursor-pointer"
                            />
                            {project.imageUrl && (
                                <img
                                    src={project.imageUrl}
                                    className="mt-8 rounded-3xl w-full h-72 object-cover"
                                />
                            )}
                        </div>

                        {/* Video upload */}
                        <div className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-[40px] p-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-[#d89b1d]/10 flex items-center justify-center">
                                    <Video className="text-[#d89b1d]" size={30} />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black">Upload Video</h2>
                                    <p className="text-gray-400 mt-2 text-sm">
                                        Project execution / machinery / drone video
                                    </p>
                                </div>
                            </div>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleVideoUpload}
                                className="w-full border border-dashed border-white/20 rounded-2xl p-10 cursor-pointer"
                            />
                            {project.videoUrl && (
                                <video
                                    src={project.videoUrl}
                                    controls
                                    className="mt-8 rounded-3xl w-full"
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Publish button */}
                <div className="mt-16 text-center">
                    <button
                        onClick={addProject}
                        disabled={loading}
                        className="bg-[#d89b1d] text-black px-14 py-6 rounded-full font-black text-lg hover:scale-105 transition duration-300 shadow-[0_0_60px_rgba(216,155,29,0.3)]"
                    >
                        {loading ? "Processing..." : editingId ? "Update Project" : "Publish Project"}
                    </button>
                </div>

                {/* ══════════════════════════════════════════════
                    SECTION 2 — EXISTING PROJECTS
                ══════════════════════════════════════════════ */}
                <div className="mt-28">
                    <div className="flex items-center gap-3 mb-14">
                        <div className="w-14 h-[2px] bg-[#d89b1d]" />
                        <p className="uppercase tracking-[5px] text-[#d89b1d] text-sm font-semibold">
                            Existing Projects
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white/[0.03] border border-white/10 rounded-[30px] overflow-hidden backdrop-blur-md"
                            >
                                <img
                                    src={project.imageUrl}
                                    className="w-full h-60 object-cover"
                                />
                                <div className="p-8">
                                    <div className="flex justify-between items-start gap-4">
                                        <h2 className="text-2xl font-black leading-tight">
                                            {project.title}
                                        </h2>
                                        {project.featured && (
                                            <Star className="text-[#d89b1d]" fill="#d89b1d" />
                                        )}
                                    </div>
                                    <p className="text-gray-400 mt-5 line-clamp-3 leading-8">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-3 mt-8">
                                        <span className="bg-[#d89b1d]/10 text-[#d89b1d] px-4 py-2 rounded-full text-sm">
                                            {project.status}
                                        </span>
                                        <span className="bg-white/5 text-gray-300 px-4 py-2 rounded-full text-sm">
                                            {project.category}
                                        </span>
                                    </div>
                                    <div className="flex gap-4 mt-10">
                                        <button
                                            onClick={() => editProject(project)}
                                            className="flex-1 bg-[#d89b1d] text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-105 transition duration-300"
                                        >
                                            <Pencil size={18} /> Edit
                                        </button>
                                        <button
                                            onClick={() => deleteProject(project.id)}
                                            className="flex-1 border border-red-500/30 text-red-400 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-red-500/10 transition duration-300"
                                        >
                                            <Trash2 size={18} /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ══════════════════════════════════════════════
                    SECTION 3 — HERO REELS (NEW)
                    Videos shown on mobile homepage (Instagram style)
                ══════════════════════════════════════════════ */}
                <div className="mt-28">

                    <div className="flex items-center gap-3 mb-14">
                        <div className="w-14 h-[2px] bg-[#d89b1d]" />
                        <p className="uppercase tracking-[5px] text-[#d89b1d] text-sm font-semibold">
                            Hero Reels — Mobile Homepage
                        </p>
                    </div>

                    {/* Upload reel card */}
                    <div className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-[40px] p-10 mb-10">

                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-[#d89b1d]/10 flex items-center justify-center">
                                <Film className="text-[#d89b1d]" size={30} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black">Upload Reel Video</h2>
                                <p className="text-gray-400 mt-2 text-sm">
                                    Vertical videos shown on mobile homepage — Instagram style. Changes are live instantly.
                                </p>
                            </div>
                        </div>

                        {/* Label input */}
                        <input
                            placeholder="Reel label — e.g. Pipeline Installation *"
                            value={reelLabel}
                            onChange={(e) => setReelLabel(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 outline-none focus:border-[#d89b1d] mb-5"
                        />

                        {/* Drop zone */}
                        <div
                            onClick={() => reelFileRef.current?.click()}
                            className="w-full border border-dashed border-white/20 rounded-2xl p-12 cursor-pointer hover:border-[#d89b1d]/40 transition-colors text-center"
                        >
                            {reelUploading ? (
                                <div className="max-w-sm mx-auto">
                                    <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                                        <div
                                            className="bg-[#d89b1d] h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${reelProgress}%` }}
                                        />
                                    </div>
                                    <p className="text-gray-400 text-lg">
                                        Uploading to Cloudinary... {reelProgress}%
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <Film className="mx-auto mb-4 text-gray-600" size={44} />
                                    <p className="text-gray-400 text-lg">
                                        Tap to select video
                                    </p>
                                    <p className="text-gray-600 text-sm mt-2">
                                        MP4 or MOV • Vertical 9:16 recommended
                                    </p>
                                </>
                            )}
                        </div>

                        <input
                            ref={reelFileRef}
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) uploadReel(file);
                                e.target.value = "";
                            }}
                        />
                    </div>

                    {/* Reels grid */}
                    {reels.length === 0 ? (
                        <div className="text-center py-16 border border-dashed border-white/10 rounded-[30px]">
                            <Film className="mx-auto mb-4 text-gray-700" size={48} />
                            <p className="text-gray-500 text-lg">No reels uploaded yet.</p>
                            <p className="text-gray-700 text-sm mt-2">
                                Your /public videos show as fallback on mobile automatically.
                            </p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {reels.map((reel, i) => (
                                <div
                                    key={reel.id}
                                    className="bg-white/[0.03] border border-white/10 rounded-[30px] overflow-hidden backdrop-blur-md"
                                >
                                    {/* Hover to preview */}
                                    <video
                                        src={reel.src}
                                        className="w-full h-60 object-cover bg-black"
                                        muted
                                        playsInline
                                        onMouseOver={(e) =>
                                            (e.currentTarget as HTMLVideoElement).play()
                                        }
                                        onMouseOut={(e) => {
                                            const v = e.currentTarget as HTMLVideoElement;
                                            v.pause();
                                            v.currentTime = 0;
                                        }}
                                    />

                                    <div className="p-8">
                                        <div className="flex justify-between items-start gap-3 mb-2">
                                            <h2 className="text-2xl font-black leading-tight">
                                                {reel.label}
                                            </h2>
                                            <span className="bg-[#d89b1d]/10 text-[#d89b1d] px-3 py-1 rounded-full text-sm whitespace-nowrap">
                                                #{i + 1}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-xs truncate mb-8">
                                            {reel.src.split("/").pop()}
                                        </p>

                                        <div className="flex gap-3">
                                            {/* Move up */}
                                            <button
                                                onClick={() => moveReel(i, "up")}
                                                disabled={i === 0}
                                                className="flex-1 border border-white/10 text-gray-400 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition disabled:opacity-20 disabled:cursor-not-allowed"
                                            >
                                                <ChevronUp size={18} /> Up
                                            </button>
                                            {/* Move down */}
                                            <button
                                                onClick={() => moveReel(i, "down")}
                                                disabled={i === reels.length - 1}
                                                className="flex-1 border border-white/10 text-gray-400 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition disabled:opacity-20 disabled:cursor-not-allowed"
                                            >
                                                <ChevronDown size={18} /> Down
                                            </button>
                                            {/* Delete */}
                                            <button
                                                onClick={() => deleteReel(reel.id)}
                                                className="flex-1 border border-red-500/30 text-red-400 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-500/10 transition duration-300"
                                            >
                                                <Trash2 size={18} /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
}