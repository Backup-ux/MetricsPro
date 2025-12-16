"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import useUser from "@/utils/useUser";
import { Users, Plus } from "lucide-react";

export default function Clients() {
  const { data: user, loading: userLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand_color: "#3B82F6",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!userLoading && !user) {
      if (typeof window !== "undefined") {
        window.location.href = "/account/signin";
      }
    }
  }, [user, userLoading]);

  useEffect(() => {
    fetchClients();
  }, [user]);

  const fetchClients = async () => {
    if (!user) return;

    try {
      const response = await fetch("/api/clients");
      if (!response.ok) throw new Error("Failed to fetch clients");
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setError("Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create client");
      }

      // Reset form and refresh list
      setFormData({ name: "", brand_color: "#3B82F6" });
      setShowForm(false);
      await fetchClients();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create client");
    } finally {
      setSubmitting(false);
    }
  };

  if (userLoading || !user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-[#F3F3F3] dark:bg-[#0A0A0A]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 transition-transform duration-300
      `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} title="Clients" />

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-black dark:text-white mb-2 font-sora">
                Clients
              </h2>
              <p className="text-[#6F6F6F] dark:text-[#AAAAAA] font-inter">
                Manage your clients
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="h-12 px-6 rounded-xl bg-gradient-to-b from-[#252525] to-[#0F0F0F] dark:from-[#FFFFFF] dark:to-[#E0E0E0] text-white dark:text-black font-semibold transition-all duration-150 hover:from-[#2d2d2d] hover:to-[#171717] active:scale-95 font-inter flex items-center gap-2"
            >
              <Plus size={18} />
              New Client
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400 font-inter">
                {error}
              </p>
            </div>
          )}

          {/* Create Form */}
          {showForm && (
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E6E6E6] dark:border-[#333333] rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4 font-sora">
                Add New Client
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#2B2B2B] dark:text-white mb-2 font-inter">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    placeholder="e.g., Acme Corporation"
                    className="w-full h-12 px-4 rounded-xl bg-white dark:bg-[#262626] border border-[#E5E5E5] dark:border-[#404040] text-black dark:text-white placeholder-[#6E6E6E] dark:placeholder-[#888888] font-inter transition-all duration-200 focus:border-black dark:focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2B2B2B] dark:text-white mb-2 font-inter">
                    Brand Color
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={formData.brand_color}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          brand_color: e.target.value,
                        })
                      }
                      className="w-16 h-12 rounded-xl border border-[#E5E5E5] dark:border-[#404040] cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.brand_color}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          brand_color: e.target.value,
                        })
                      }
                      placeholder="#3B82F6"
                      className="flex-1 h-12 px-4 rounded-xl bg-white dark:bg-[#262626] border border-[#E5E5E5] dark:border-[#404040] text-black dark:text-white placeholder-[#6E6E6E] dark:placeholder-[#888888] font-inter transition-all duration-200 focus:border-black dark:focus:border-white focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setFormData({ name: "", brand_color: "#3B82F6" });
                    }}
                    className="h-12 px-6 rounded-xl bg-[#F3F3F3] dark:bg-[#262626] text-black dark:text-white font-semibold transition-all duration-150 hover:bg-[#E5E5E5] dark:hover:bg-[#303030] active:scale-95 font-inter"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 h-12 rounded-xl bg-gradient-to-b from-[#252525] to-[#0F0F0F] dark:from-[#FFFFFF] dark:to-[#E0E0E0] text-white dark:text-black font-semibold transition-all duration-150 hover:from-[#2d2d2d] hover:to-[#171717] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-inter"
                  >
                    {submitting ? "Creating..." : "Create Client"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Clients List */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-[#6F6F6F] dark:text-[#AAAAAA] font-inter">
                Loading clients...
              </p>
            </div>
          ) : clients.length === 0 ? (
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E6E6E6] dark:border-[#333333] rounded-xl p-12 text-center">
              <Users
                size={48}
                className="mx-auto mb-4 text-[#D0D0D0] dark:text-[#404040]"
              />
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2 font-sora">
                No clients yet
              </h3>
              <p className="text-[#6F6F6F] dark:text-[#AAAAAA] mb-6 font-inter">
                Add your first client to get started
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="h-12 px-6 rounded-xl bg-gradient-to-b from-[#252525] to-[#0F0F0F] dark:from-[#FFFFFF] dark:to-[#E0E0E0] text-white dark:text-black font-semibold transition-all duration-150 hover:from-[#2d2d2d] hover:to-[#171717] active:scale-95 font-inter"
              >
                Add Client
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="bg-white dark:bg-[#1E1E1E] border border-[#E6E6E6] dark:border-[#333333] rounded-xl p-6 hover:border-black dark:hover:border-white transition-all duration-150"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg font-sora"
                      style={{ backgroundColor: client.brand_color }}
                    >
                      {client.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-black dark:text-white font-sora">
                        {client.name}
                      </h3>
                      <p className="text-sm text-[#6F6F6F] dark:text-[#AAAAAA] font-inter">
                        {client.brand_color}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-[#6F6F6F] dark:text-[#888888] font-inter">
                    Added {new Date(client.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
