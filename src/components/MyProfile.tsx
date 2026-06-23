import React, { useEffect, useState } from "react";
import { User, FlatWorkflowRecord } from "../types";
import { UserCircle, MapPin, Briefcase, CheckCircle2, Lock, Save, Calendar } from "lucide-react";

interface MyProfileProps {
  currentUser: User;
}

export default function MyProfile({ currentUser }: MyProfileProps) {
  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await fetch(`/api/workflow/history?pin=${encodeURIComponent(currentUser.pin)}&role=${encodeURIComponent(currentUser.role)}`);
        const data = await res.json();
        if (data.success) {
          const userWorkflows = (data.data as FlatWorkflowRecord[]).filter(w => w.pin === currentUser.pin);
          // Count unique dates
          const uniqueDates = new Set(userWorkflows.map(w => w.date));
          setAttendanceCount(uniqueDates.size);
        }
      } catch (e) {
        console.error("Attendance fetch error", e);
      }
    };
    fetchAttendance();
  }, [currentUser.pin]);

  const handleUpdatePassword = async () => {
    setIsSaving(true);
    setActionMessage(null);
    try {
      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: currentUser.pin, password })
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage({ type: "success", text: "Password updated successfully!" });
        setPassword("");
        setTimeout(() => setActionMessage(null), 3000);
      } else {
        setActionMessage({ type: "error", text: data.error || "Failed to update password." });
      }
    } catch (e) {
      setActionMessage({ type: "error", text: "Server error updating password." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 mt-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white text-5xl font-display font-bold shadow-xl shadow-blue-600/20">
              {currentUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[11px] font-bold tracking-widest uppercase">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{currentUser.status} Profile</span>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-1 space-y-6 w-full text-center md:text-left">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-display mb-1">
                {currentUser.name}
              </h1>
              <p className="text-slate-500 text-sm font-medium">
                Personal Information & Profile Settings
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-700">
                  <UserCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                    Role ID (PIN)
                  </p>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">
                    {currentUser.pin}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-700">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                    Authorization Role
                  </p>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">
                    {currentUser.role}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-700">
                  <MapPin className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                    Campus / Location
                  </p>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">
                    {currentUser.campus}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-700">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                    Working Days
                  </p>
                  <p className="font-semibold text-slate-800 dark:text-slate-100 tracking-wide text-sm mt-0.5">
                    Attendance Report P: {attendanceCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Security & Credentials */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Lock className="w-5 h-5 text-slate-400" />
            Security & Authentication
          </h2>
          <p className="text-slate-500 text-xs mt-1">Set or update your login password.</p>
        </div>
        
        {actionMessage && (
          <div className={`p-3 rounded-lg text-xs font-semibold mb-4 ${
            actionMessage.type === "error" 
              ? "bg-rose-50 text-rose-600 border border-rose-200" 
              : "bg-emerald-50 text-emerald-600 border border-emerald-200"
          }`}>
            {actionMessage.text}
          </div>
        )}

        <div className="max-w-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">New Password</label>
            <input 
              type="password" 
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white outline-none focus:ring-2 focus:ring-blue-600/50 transition-all text-slate-800 dark:text-slate-200"
            />
          </div>
          <button 
            onClick={handleUpdatePassword}
            disabled={isSaving || !password}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            {isSaving ? "Saving..." : "Update Password"}
          </button>
        </div>
      </div>
      
    </div>
  );
}
