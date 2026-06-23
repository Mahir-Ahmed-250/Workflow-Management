# 🚀 Workflow ESM — Enterprise Role-Based Log & Management Portal

**Workflow ESM** is a professional, modern, and Role-Based Access Control (RBAC) enterprise portal designed for real-time, bi-directional data synchronization with Google Sheets (via Google Apps Script). It features a dedicated interface with dark/light mode support and a hydration-resilient memory architecture.

Below is a detailed overview of the key features:

---

## 🔑 1. Robust Role-Based Authentication & Security
*   **PIN-Based Security**: Dedicated Employee PIN system for every staff member.
*   **First-Time Login Guide**: Built-in in-app directions for new users. After an initial PIN login, users can set their custom password.
*   **Secondary Authentication**: Requires both PIN and user-defined passwords for subsequent logins to ensure account security.
*   **Session Management**: Secure session management synchronized within the browser window to maintain user authentication.

---

## 📊 2. Real-Time Automatic Google Sheets Sync
*   **Active Sync Mode**: Seamless, automatic background synchronization with Google Sheets.
*   **Fail-Safe Resilience**: Designed with automatic fallbacks and memory-database caching to prevent disruptions from server downtime or API errors.
*   **Easy Configuration**: Admin panel allows updating/changing the Apps Script Web App URL instantly.

---

## 🧑‍💻 3. Dynamic Workflow Log Entry
*   **Daily Work Logs**: Employees can input detailed work descriptions and responsibility records for any selected date.
*   **Automated Monthly Grouping**: Automatically timestamps and organizes work records into structured JSON objects pushed to specific columns (e.g., `Jan-26`, `Feb-26`) in Google Sheets.

---

## 🕒 4. Personal Profile & History Tracking
*   **Personal Profile**: Centralized view for campus assignment, role, and comprehensive data access.
*   **Log Management**: Ability to filter previous work history by month to review, manage, or delete entries, with real-time updates reflected in Google Sheets.

---

## 🔎 5. Advanced Filter & Search Engine
*   **Smart Filtering**: Instantly locate records by username, specific campus, month, or custom date ranges.
*   **Quick Export**: Optimized layout for printing or exporting filtered data.

---

## 👥 6. Admin Panel & User Directory (CRUD Operations)
*   **Comprehensive CRUD**: Admins can create new employee profiles, edit information (name, PIN, campus, status), and securely manage the user database.
*   **Live Status Updates**: Instant control to toggle employee status between Active and Inactive.

---

## 🛡️ 7. Granular Role Permission Matrix (RBAC)
*   **Access Control**: Admins can dynamically manage access to specific tabs or modules via one-click checkboxes in the Admin Panel.
*   **Instant Restriction**: Real-time enforcement to block or hide modules based on updated user permissions.

---

## 📁 8. Device Resource Management
*   **Hardware Tracking**: Integrated system for managing office equipment, including:
    *   Device type and configuration.
    *   Serial numbers and procurement cost.
    *   Condition tracking (Active, Damaged, Repairable).
    *   Room coordinate tracking.
    *   Servicing status and movement history.

---

## 📉 9. Productivity & Attendance Reports
*   **Visual Dashboard**: Graphic interface for admins to review campus-wide activity and individual performance trends.
*   **Attendance Grid Layout**: Monthly calendar view to visualize work log submission frequency, helping identify and support irregular patterns.

---

## 🎨 10. Premium Design & Responsive Layout
*   **Dark/Light Theme**: One-click theme switcher for optimal comfort.
*   **Responsive Sidebar**: Intuitive side drawer menu for smooth navigation on mobile and desktop.
*   **Polished UI**: Utilization of `lucide-react` iconography and clean status badges for a professional user experience.

