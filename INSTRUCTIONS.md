# BUILD: Frame Lab Seoul Operations Dashboard

Create a new React app from scratch using Vite + React + Tailwind CSS. This is an internal operations dashboard for a premium medical photography studio in Seoul that serves dental and dermatology clinics on monthly retainers.

## SETUP

```bash
npm create vite@latest framelab-dashboard -- --template react
cd framelab-dashboard
npm install
npm install react-router-dom recharts lucide-react
npm install -D tailwindcss @tailwindcss/vite
```

Configure Tailwind with Vite plugin. Add Google Fonts to index.html:
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,600&family=DM+Sans:wght@400;500;700&family=Cormorant+Garamond:wght@300;400&display=swap" rel="stylesheet">
```

## BRAND SYSTEM

Apply these everywhere. No exceptions. No blue anywhere in the app.

```
Page background: #f8f6f4 (warm cream, NOT white)
Card background: #ffffff
Nav/sidebar background: #1a1a1a
Text primary: #2a2a2a
Text muted: #6a6a6a
Border: rgba(0,0,0,0.08)
Accent teal: #2d5f5d (primary actions, links, key metrics)
Accent gold: #c4a574 (highlights, active nav, secondary badges)
Danger: #b85c5c (muted red)

Headings: 'Fraunces', serif
Body: 'DM Sans', sans-serif
```

The overall aesthetic is premium Japanese stationery — not Silicon Valley SaaS. Clean, quiet, lots of whitespace, no heavy shadows, no rounded-xl cards, no gradients.

## APP STRUCTURE

6 pages with a persistent sidebar nav:

```
/                → Dashboard
/clients         → Clients (grid + detail)
/clients/:id     → Client Detail (tabbed)
/shoots          → Shoots
/deliverables    → Deliverables
/performance     → Performance
/leads           → Leads
```

## SIDEBAR NAV

Fixed left sidebar, 240px wide, background #1a1a1a.

Top of sidebar: Logo block
- "FRAME" in Fraunces 300, #c4a574, letter-spacing 3px, uppercase
- "LAB" in DM Sans 300, #e8e0d4, letter-spacing 3px, uppercase
- Below that: "SEOUL" in DM Sans 400, 9px, #7fb5b0, letter-spacing 4px, uppercase

Nav items below logo, each with a Lucide icon:
```
LayoutDashboard  → Dashboard
Building2        → Clients
Camera           → Shoots
Package          → Deliverables
TrendingUp       → Performance
UserPlus         → Leads
```

Nav item style: text rgba(255,255,255,0.5), padding 12px 24px. Active item: text #c4a574, left border 3px solid #c4a574. Hover: text rgba(255,255,255,0.8).

Bottom of sidebar: small text "Frame Lab Seoul · 2025" in rgba(255,255,255,0.2).

## DATA LAYER

Create a file `src/data/seedData.js` that exports all seed data. The entire app reads from this file. Use React Context to make it available everywhere. Store state in memory (no localStorage needed yet).

### Clients (8 total)
```javascript
export const clients = [
  { id: 1, name: "Gangnam Smile Dental", specialty: "General Dentistry", district: "Gangnam", tier: "growth", monthlyRate: 1500000, contractStart: "2024-06-01", contactPerson: "Dr. Kim Jihye", contactPhone: "010-1234-5678", contactEmail: "kim@gangnamsmile.kr", status: "active" },
  { id: 2, name: "Cheongdam Dermatology", specialty: "Medical Dermatology", district: "Cheongdam", tier: "authority", monthlyRate: 2800000, contractStart: "2024-03-15", contactPerson: "Dr. Park Soojin", contactPhone: "010-2345-6789", contactEmail: "park@cheongdamderm.kr", status: "active" },
  { id: 3, name: "Apgujeong Family Dental", specialty: "Family Dentistry", district: "Apgujeong", tier: "maintenance", monthlyRate: 800000, contractStart: "2025-01-10", contactPerson: "Dr. Lee Minho", contactPhone: "010-3456-7890", contactEmail: "lee@apgufamily.kr", status: "active" },
  { id: 4, name: "Seoul Bright Orthodontics", specialty: "Orthodontics", district: "Seocho", tier: "growth", monthlyRate: 1500000, contractStart: "2024-09-01", contactPerson: "Dr. Choi Eunji", contactPhone: "010-4567-8901", contactEmail: "choi@seoulbright.kr", status: "active" },
  { id: 5, name: "Sinsa Skin Clinic", specialty: "Cosmetic Dermatology", district: "Sinsa", tier: "growth", monthlyRate: 1500000, contractStart: "2024-07-20", contactPerson: "Dr. Yoon Hana", contactPhone: "010-5678-9012", contactEmail: "yoon@sinsaskin.kr", status: "active" },
  { id: 6, name: "Hannam Dental Care", specialty: "General Dentistry", district: "Hannam", tier: "maintenance", monthlyRate: 800000, contractStart: "2025-02-01", contactPerson: "Dr. Jang Wooseok", contactPhone: "010-6789-0123", contactEmail: "jang@hannandental.kr", status: "active" },
  { id: 7, name: "Dosan Aesthetics", specialty: "Aesthetic Medicine", district: "Dosan", tier: "authority", monthlyRate: 2800000, contractStart: "2024-04-01", contactPerson: "Dr. Seo Yuna", contactPhone: "010-7890-1234", contactEmail: "seo@dosanaesthetics.kr", status: "active" },
  { id: 8, name: "Yeoksam Smile Center", specialty: "Cosmetic Dentistry", district: "Yeoksam", tier: "maintenance", monthlyRate: 800000, contractStart: "2024-11-15", contactPerson: "Dr. Baek Joonho", contactPhone: "010-8901-2345", contactEmail: "baek@yeoksamsmile.kr", status: "active" },
];
```

### Tier definitions
```javascript
export const tiers = {
  maintenance: { label: "Brand Maintenance", color: "#e8e0d4", textColor: "#2a2a2a", rate: 800000, shootsPerMonth: 1, shootDuration: "2hr", photos: 15, adCreatives: 2, reels: 0, videos: 0 },
  growth: { label: "Growth Core", color: "#c4a574", textColor: "#1a1a1a", rate: 1500000, shootsPerMonth: 2, shootDuration: "3hr", photos: 30, adCreatives: 4, reels: 1, videos: 0 },
  authority: { label: "Authority Builder", color: "#2d5f5d", textColor: "#ffffff", rate: 2800000, shootsPerMonth: 4, shootDuration: "4hr", photos: 60, adCreatives: 6, reels: 2, videos: 1 },
};
```

### Shoots — generate 30 rows
Generate shoots spanning Dec 2024 through Feb 2025 for all 8 clients. Each client should have shoots matching their tier frequency. Mix of statuses: most past ones "completed", upcoming ones "confirmed" or "scheduled". Include realistic times (9:00, 10:00, 13:00, 14:00). Types: "photo" for maintenance, "photo_video" for growth and authority.

### Deliverables — generate 40 rows
Asset deliveries tied to completed shoots. Types: "Photo Set", "Ad Creative", "Instagram Reel", "Before/After Set", "Google Business Photos". Quantities matching tier specs. Statuses: mostly "delivered" for past months, mix of "production" and "review" for current month.

### Social Posts — generate 60 rows
Posts tracked across clients. Platforms: mostly Instagram, some Naver, some Google. Realistic engagement: likes 50-800, comments 5-40, saves 10-100, shares 2-20. Engagement rates 3-8%. Spread across Dec-Feb.

### Conversions — generate per client per month (Dec, Jan, Feb)
```javascript
// Each entry: { clientId, month: "2025-02", newInquiries: X, appointmentsBooked: Y, newPatients: Z, source: "social"|"google"|"naver"|"referral"|"unknown" }
// Maintenance clients: 5-10 inquiries/month
// Growth clients: 10-18 inquiries/month
// Authority clients: 15-25 inquiries/month
```

### Leads (3 entries)
```javascript
export const leads = [
  { id: 1, clinicName: "Samseong Dental", contactPerson: "Dr. Oh Donghyun", phone: "010-1111-2222", email: "oh@samseongdental.kr", specialty: "General Dentistry", district: "Samseong", source: "website", tierInterest: "growth", status: "new", dateAdded: "2025-02-10", followUpDate: "2025-02-20", notes: "Inquired about social media photography packages" },
  { id: 2, clinicName: "Gangnam K-Derm", contactPerson: "Dr. Na Heeyoung", phone: "010-3333-4444", email: "na@gangnamkderm.kr", specialty: "Cosmetic Dermatology", district: "Gangnam", source: "referral", tierInterest: "authority", status: "consultation", dateAdded: "2025-01-28", followUpDate: "2025-02-22", notes: "Referred by Cheongdam Dermatology. Very interested in video content." },
  { id: 3, clinicName: "Jamsil Bright Dental", contactPerson: "Dr. Shin Taewoo", phone: "010-5555-6666", email: "shin@jamsilbright.kr", specialty: "Pediatric Dentistry", district: "Jamsil", source: "instagram", tierInterest: "maintenance", status: "proposal", dateAdded: "2025-01-15", followUpDate: "2025-02-18", notes: "DM'd on Instagram. Sent Growth Core proposal, awaiting response." },
];
```

---

## PAGE: DASHBOARD ( / )

### Row 1: Four KPI cards in a grid (4 columns)
Calculate these from the seed data:
```
"Active Clients" → count where status=active → "8 / 15" → subtitle: "3 Maintenance · 3 Growth · 2 Authority"
"Shoots This Month" → count Feb shoots completed vs total Feb → "6 / 8" → subtitle: "Next: [name of next upcoming shoot], [date]"
"Assets Delivered (MTD)" → sum Feb deliverables → "[total]" → subtitle: "[X] photos · [Y] videos · [Z] creatives"
"Monthly Revenue" → sum all active client rates → "₩11,200,000" → subtitle: calculated MoM change
```

Card style: white bg, 1px border, 3px left border in teal. Value in Fraunces 2rem #2d5f5d. Subtitle in DM Sans 0.8rem #6a6a6a.

### Row 2: Two charts, equal width

**Left: "Shoot Activity"** — Recharts BarChart
- X: months (Sep through Feb)
- Y: shoot count
- Single bar color: #2d5f5d
- Clean grid lines, no heavy borders

**Right: "Revenue by Tier"** — Recharts PieChart (donut)
- Three segments with tier colors from the tiers object
- Center text: total revenue formatted
- Legend below

### Row 3: Two tables, equal width

**Left: "Upcoming Shoots"** — next 5 shoots that aren't completed
Columns: Date | Client | Tier (badge) | Status (badge)

**Right: "Recent Deliveries"** — last 5 delivered items
Columns: Date | Client | Assets | Status (badge)

Tier badges use the tier colors. Status badges: Confirmed/Delivered = teal bg, Pending/In Review = gold bg, Scheduled/In Production = gray bg. All badges are small pills with rounded corners, 11px text.

---

## PAGE: CLIENTS ( /clients )

### Top: page title "Clients" + subtitle "8 active partnerships" + "Add Client" button (teal)

### Grid of client cards (3 per row on desktop, 2 on tablet, 1 on mobile)

Each card is clickable (links to /clients/:id). Contents:
```
Client name (Fraunces 1.1rem)
Specialty · District (muted text)
Tier badge (pill using tier colors)

Divider line

Monthly Rate: ₩X,XXX,XXX
Since: YYYY.MM.DD

Divider line

This Month (2x2 mini grid):
  Shoots: X/Y
  Photos: XX
  Engagement: X.X%
  Inquiries: XX
```

Card hover: subtle lift (translateY -2px, light shadow).

---

## PAGE: CLIENT DETAIL ( /clients/:id )

### Top: Back arrow + Client name + Tier badge + "Edit" button

### Info bar below title:
```
District · Specialty · Contact: Dr. Name · ₩X,XXX,XXX/mo · Since YYYY.MM.DD
```

### Tabs: Overview | Shoots | Deliverables | Social | Conversions

**Tab: Overview**
- Row of 4 mini KPI cards: Shoots (this month), Photos Delivered (this month), Avg Engagement, Inquiries (this month)
- Line chart: "Engagement Trend" — rolling 3 months, monthly average engagement rate
- Bar chart: "Patient Inquiries" — rolling 3 months, monthly inquiry count

**Tab: Shoots**
- Table: Date | Time | Duration | Type | Photos Taken | Photos Delivered | Status | Notes
- Filtered to this client only
- "Add Shoot" button

**Tab: Deliverables**
- Table: Date | Asset Type | Quantity | Platform | Status | Notes
- Filtered to this client only

**Tab: Social**
- Table: Post Date | Platform | Type | Likes | Comments | Saves | Reach
- Filtered to this client only
- Show calculated engagement rate per post

**Tab: Conversions**
- Table: Month | Inquiries | Appointments | New Patients | Source
- Filtered to this client only
- "Add Entry" button → form with: Month, New Inquiries, Appointments Booked, New Patients, Source dropdown (Social/Google/Naver/Referral/Unknown), Notes

---

## PAGE: SHOOTS ( /shoots )

### Top: "Shoots" title + month/year selector + "Add Shoot" button (teal)

### Table showing all shoots, sorted by date descending
Columns: Date | Time | Client (linked) | Tier (badge) | Duration | Type | Status (badge) | Notes

### "Add Shoot" button opens a modal or slide-out form:
```
Client: dropdown (populated from clients)
Date: date input
Time: time input
Duration: auto-filled from client tier (2hr/3hr/4hr), editable
Location: text (auto-filled from client address if available)
Type: select — Photo | Photo + Video | Video
Status: select — Scheduled | Confirmed
Notes: textarea
```

On save, add to shoots data and re-render.

---

## PAGE: DELIVERABLES ( /deliverables )

### Top: "Deliverables" title + filter by status dropdown + "Add Deliverable" button

### Three-column kanban board:
```
Column 1: "In Production" (gray header)
Column 2: "In Review" (gold header)
Column 3: "Delivered" (teal header)
```

Each card in a column:
```
Client name (bold)
Asset type: quantity (e.g., "Photo Set: 20 images")
Due: YYYY.MM.DD
```

Cards should be draggable between columns using basic drag-and-drop (HTML5 drag API is fine, no library needed).

Below the kanban: a toggle to switch to table view showing all deliverables with columns: Date | Client | Asset Type | Quantity | Platform | Status | Notes

---

## PAGE: PERFORMANCE ( /performance )

### Top: "Performance" title + subtitle "Aggregated client analytics"

### Row 1: Four KPI cards
```
"Posts Tracked (MTD)" → count Feb social posts
"Avg Engagement Rate" → average across all Feb posts
"Total Reach (MTD)" → sum of reach for Feb posts
"Patient Inquiries (MTD)" → sum of Feb conversion inquiries
```

### Row 2: Two charts

**Left: "Engagement by Client"** — Recharts horizontal BarChart
- One bar per client, showing their average engagement rate
- Sorted highest to lowest
- Bar color matches client tier color

**Right: "Inquiries by Source"** — Recharts PieChart
- Segments: Social, Google, Naver, Referral, Unknown
- Colors: teal, gold, #6a6a6a, #e8e0d4, #ddd

### Row 3: Client performance table
Columns: Client | Tier (badge) | Posts | Avg Engagement | Reach | Inquiries | New Patients
Sortable by clicking column headers.

---

## PAGE: LEADS ( /leads )

### Top: "Leads" title + "Add Lead" button

### Pipeline visualization — horizontal row of stage cards:
```
New (1) → Contacted (0) → Consultation (1) → Proposal (1) → Converted (0) → Lost (0)
```
Each stage card shows count. Active stages (with leads) get teal accent, empty stages are muted.

### Table below:
Columns: Clinic | Contact | Specialty | District | Source (badge) | Status (badge) | Tier Interest | Follow-up | Notes

Source badges: Website = teal, Referral = gold, Instagram = muted pink #b85c5c, Cold Outreach = gray

### "Add Lead" button opens form:
```
Clinic Name, Contact Person, Phone, Email, Specialty (Dental/Dermatology/Other), District (dropdown: Gangnam, Apgujeong, Sinsa, Cheongdam, Seocho, Hannam, Dosan, Yeoksam, Samseong, Jamsil, Other), Source (Website/Referral/Instagram/Cold Outreach/Other), Tier Interest (Maintenance/Growth/Authority/Undecided), Notes, Follow-up Date
```

---

## FORMATTING RULES (APPLY EVERYWHERE)

- Currency: ₩X,XXX,XXX (Korean Won, commas, no decimals)
- Dates: YYYY.MM.DD (e.g., 2025.02.18)
- Tables: clean with lots of whitespace, thin bottom borders only (no grid), subtle cream alternating rows
- Cards: white bg, 1px solid rgba(0,0,0,0.08), no heavy box-shadow, optional 3px left accent border
- Badges/pills: small (text-xs), rounded-full, 4px 12px padding
- Page padding: generous (32px+ on sides)
- No blue anywhere. No purple. No bright colors. Only teal, gold, cream, muted red, grays.
- Responsive: sidebar collapses to hamburger on mobile

## BUILD ORDER

Build in this exact order, verify each works before moving on:
1. Vite + React + Tailwind setup with fonts and color variables
2. Sidebar nav with routing (all 6 routes)
3. Seed data file
4. Dashboard page (complete with charts and tables)
5. Clients grid page
6. Client detail page with all 5 tabs
7. Shoots page with table and add form
8. Deliverables page with kanban
9. Performance page with charts
10. Leads page with pipeline and table

Do not skip steps. Do not stub pages. Build each one completely before moving to the next.
