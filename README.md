# SKDLA Configuration Management

ClearPath OS **Configuration Management Module** — a single-page document &
configuration management app for Spectrum Killian, backed by Supabase.

It manages controlled documents (SOPs, engineering drawings, specifications,
work instructions, templates), quality & safety alerts, training packages, and a
document approval workflow — all under one branded interface.

---

## Tech stack

- **Frontend:** a single self-contained `index.html` (vanilla JS + CSS, no build step).
- **Backend:** [Supabase](https://supabase.com) — data lives in the `config_mgmt`
  schema; uploaded document files live in the `config-docs` Storage bucket.
- **Branding:** ClearPath OS standard header (Montserrat) + the Spectrum Killian
  brand palette (Killian Blue `#1882C7`, Spectrum Blue `#052030`, Lab Gold `#B3A369`).
- **Icons:** [Tabler Icons](https://tabler.io/icons) (web font).

---

## Running it locally

The app needs a `config.local.js` with the Supabase connection details. This file
is **git-ignored** so secrets are never committed.

1. Copy the template:
   ```bash
   cp config.example.js config.local.js
   ```
2. Fill in your Supabase URL, anon/publishable key, and bucket name in
   `config.local.js`.
3. Open the app:
   - Double-click `index.html`, **or**
   - Serve it (recommended if your browser blocks local file access):
     ```bash
     python3 -m http.server 8080
     # then open http://localhost:8080
     ```

If `config.local.js` is missing, the page shows a "Missing configuration" notice
instead of loading.

---

## Features & functions

Everything is organized under the three header dropdowns.

### 📁 Library
| Feature | What it does |
|---|---|
| **SOP Library** | Standard Operating Procedures — the primary document table. Each record has an ID, title, version, status, category/tag, owner, linked specs, and attached files. |
| **Engineering Drawings** | Technical drawings using the same versioned-document model. |
| **Work Instructions** | Step-level instructions. |
| **Specifications** | Spec documents that SOPs and drawings link to. |
| **Standard Templates** | Reusable document templates. |
| **Training Packages** | Bundles of SOPs grouped into a training plan, with completion progress. |
| **Training Alerts** | Quality-related training notifications. |

### 🔔 Alerts
- **Quality Alerts** & **Safety Alerts** — log issues with priority, status
  (Open / Monitoring / Closed), area, root cause, corrective & preventive actions,
  linked SOPs/specs, and media/attachments. Safety alerts also record whether an
  injury occurred.
- **New Quality / Safety Alert** — forms to create them.

### ⚙️ Configuration Operations
- **Approvals** — pending document sign-off queue. Uploading a new document version
  creates a `pending` record here; approvers **Preview → Approve / Reject**. Approving
  publishes the new version. The header badge shows how many documents are awaiting
  sign-off (blank when there are none).
- **Approval Workflows** — defines the approval routing.
- **Change History** — version timeline for documents.
- **Roles & Access** — user roles (Admin / Approver / Author / Viewer), shown as
  colored badges.

### Cross-cutting functions
- **Search** — filters the current table live.
- **Filter chips** — All / Safety / Environmental / Quality / Operations / Maintenance.
- **Stat cards** — per-section summary counts (totals, open, monitoring, closed).
- **Upload** — drag-and-drop or browse; files attach to a document and create a new
  version that enters the Approvals queue.
- **Status pills** — Active / Draft / Under Review / Archived, color-coded throughout.
- **Persistence** — every create / edit / delete writes back to Supabase; a reload
  always reflects the latest database state.

---

## Data model (Supabase `config_mgmt` schema)

| Table | Holds |
|---|---|
| `sops` | Standard Operating Procedures |
| `drawings` | Engineering drawings |
| `work_instructions` | Work instructions |
| `specifications` | Specifications |
| `templates` | Standard templates |
| `quality_alerts` | Quality alerts |
| `safety_alerts` | Safety alerts |
| `training_packages` | Training packages |
| `roles` | Users & access roles |
| `workflows` | Approval workflows |
| `document_files` | Uploaded file versions + approval status (`pending` / `approved` / `rejected`) |

Uploaded file content is stored in the `config-docs` Storage bucket.
