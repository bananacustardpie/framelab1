# ADMIN DASHBOARD ADDITIONS — Client Portal Support

The client portal is now live. These features let you manage portal interactions from your admin dashboard. Build all 4 in order.

---

## 1. Set Client PIN

Each clinic needs a PIN to log into the portal. You set it from your dashboard.

### On ClientDetailPage (or ClinicDashboardPage)
Add a "Portal Access" section or tab with:

**Set PIN button** — opens a modal:
- "Set Portal PIN for [Clinic Name]"
- 6-digit PIN input (same style as your lock screen)
- Confirm PIN input (must match)
- Save: hash with SHA-256 (Web Crypto API), upsert into `client_pins` table (insert if no row exists, update if it does)
- Success toast: "Portal PIN set for [Clinic Name]"

**PIN status indicator** on the client card and detail page:
- If `client_pins` row exists for this client: green dot + "Portal access: Active"
- If no row: gray dot + "Portal access: Not set"

### On ClientsPage
Add a small icon/badge on each client card showing portal access status (green dot = PIN set, gray = not set).

---

## 2. Shoot Requests Panel

Clients can request shoots from the portal. You approve or decline them here.

### On ShootsPage (or DashboardPage)
Add a "Shoot Requests" section above the shoots table:

**Collapsible panel** (open by default if pending requests exist):
- Header: "Shoot Requests" + count badge (e.g., "3 pending")

**Table columns:** Date Requested | Client | Preferred Date | Time Preference | Type | Notes | Status | Actions

**Status badges:**
- Pending (gold)
- Approved (teal)
- Declined (muted red)
- Scheduled (teal, after you create the actual shoot)

**Actions for Pending requests:**
- **Approve** button — opens a mini form:
  - Confirmed Date (pre-filled with their preferred date, editable)
  - Confirmed Time (time input)
  - Duration (number, hours, pre-filled from their tier default)
  - Location (text)
  - Notes (textarea)
  - On save: create a real Shoot entry in the `shoots` table linked to this client, update shoot_request status to 'scheduled', success toast: "Shoot scheduled for [Client] on [Date]"
- **Decline** button — opens a modal:
  - Reason textarea: "Why are you declining this request?"
  - On save: update shoot_request status to 'declined', save reason in `admin_notes`, success toast

**Sidebar badge:** Add a notification badge on "Shoots" nav item showing count of pending shoot requests (in addition to existing upcoming shoots badge).

### Data
Fetch from `shoot_requests` table. Pull client name by joining on `client_id`.

---

## 3. Deliverable Approval Status

Clients approve or request revisions on deliverables from the portal. Show this status in your dashboard.

### On DeliverablesPage (Kanban and Table view)
Each deliverable card/row that has an entry in `deliverable_approvals` should show:

**Status badge on the card:**
- "Awaiting approval" — gold badge (status = 'pending')
- "Client approved" — teal badge (status = 'approved')  
- "Revision requested" — muted red badge (status = 'revision_requested')

**For "Revision requested":**
- Show the client's feedback text below the badge (or on hover/click)
- Add a "Mark Addressed" button that:
  - Moves the deliverable back to "In Production" or "In Review" (your choice)
  - Resets the approval status to 'pending' so the client can re-review
  - Toast: "Revision addressed. Awaiting client re-approval."

### On ClinicDashboardPage
In the Deliverables tab, show approval status next to each deliverable for that client.

### Sending items for approval
Add a "Send for Approval" button on deliverables in "In Review" status:
- Clicking it: inserts a row into `deliverable_approvals` with status 'pending' for this deliverable + client
- Toast: "Sent to [Client Name] for approval"
- The client will see this in their portal's Deliverables page

### Data
Fetch from `deliverable_approvals` table. Join on `deliverable_id` to match with deliverables.

---

## 4. Conversion Data from Clients

Clients report their conversion data (new inquiries, appointments, patients) from the portal. Show this in your dashboard.

### On PerformancePage
Add an indicator showing which clients have submitted conversion data for the current month:

**"Client Reports" mini table or section:**
| Client | Status | Inquiries | Appointments | New Patients | Revenue |
|--------|--------|-----------|--------------|--------------|---------|
| Gangnam Smile | ✓ Submitted | 12 | 8 | 5 | ₩15,000,000 |
| Cheongdam Derm | ⏳ Awaiting | — | — | — | — |
| Apgujeong Smile | ✓ Submitted | 8 | 6 | 3 | ₩9,000,000 |

"Submitted" = conversion row exists for this client + current month
"Awaiting" = no conversion row for this client + current month

### On ClinicDashboardPage
In the Conversions tab or Overview, show:
- If conversion data exists for this month: display the numbers
- If not: show "이번 달 데이터 대기 중 (Awaiting this month's report)" with a muted style

### On DashboardPage (main)
Add a KPI or note: "Client Reports: 5 of 8 submitted for [Month]" — gives you a quick sense of who hasn't reported yet.

---

## ALL MODALS CLOSE ON ESCAPE KEY
Every modal built here must close on Escape.

## FORMATTING
- Currency: ₩X,XXX,XXX
- Dates: YYYY.MM.DD
- Colors: teal #2d5f5d, gold #c4a574, muted red #b85c5c
- No blue anywhere

## BUILD ORDER
1. Set Client PIN (feature 1)
2. Shoot Requests panel (feature 2)
3. Deliverable Approval status (feature 3)
4. Conversion data indicators (feature 4)

Complete each feature fully before starting the next.
