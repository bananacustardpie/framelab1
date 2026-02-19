// ============================================================
// FrameLab Dashboard - Seed Data
// Hard-coded realistic data for 8 medical/dental clinic clients
// Spanning December 2024 through February 2025
// ============================================================

// --------------------------------------------------
// 1. CLIENTS
// --------------------------------------------------
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

// --------------------------------------------------
// 2. TIERS
// --------------------------------------------------
export const tiers = {
  maintenance: { label: "Brand Maintenance", color: "#e8e0d4", textColor: "#2a2a2a", rate: 800000, shootsPerMonth: 1, shootDuration: "2hr", photos: 15, adCreatives: 2, reels: 0, videos: 0 },
  growth: { label: "Growth Core", color: "#c4a574", textColor: "#1a1a1a", rate: 1500000, shootsPerMonth: 2, shootDuration: "3hr", photos: 30, adCreatives: 4, reels: 1, videos: 0 },
  authority: { label: "Authority Builder", color: "#2d5f5d", textColor: "#ffffff", rate: 2800000, shootsPerMonth: 4, shootDuration: "4hr", photos: 60, adCreatives: 6, reels: 2, videos: 1 },
};

// --------------------------------------------------
// 3. SHOOTS (30 rows)
// --------------------------------------------------
// Maintenance clients (3, 6, 8): 1 shoot/month x 3 months = 3 each = 9
// Growth clients (1, 4, 5): 2 shoots/month x 3 months = 6 each = 18
// Authority clients (2, 7): We need 3 total to reach 30. Client 2: 2 in Dec, 1 in Jan = 3. But let's do:
//   Client 2: 1 Dec + 1 Jan + 0 Feb (ramp-down) = 2
//   Client 7: 1 Dec + 0 Jan + 0 Feb = 1  --> 9+18+3 = 30
// Actually let's just make authority have a realistic but trimmed schedule to hit 30 exactly:
//   Authority client 2: 1 in Dec, 1 in Jan, 0 in Feb = 2 extra beyond 27, total = 29
//   Authority client 7: 1 in Dec = 1 extra, total = 30
// Recalculating: maintenance=9, growth=18, authority client 2 gets 2 shoots, authority client 7 gets 1 shoot = 30

export const shoots = [
  // --- Client 1: Gangnam Smile Dental (growth, 2/month) ---
  { id: 1, clientId: 1, date: "2024-12-03", time: "10:00", duration: "3hr", type: "photo_video", status: "completed", notes: "Monthly brand shoot - reception and treatment rooms", photosDelivered: 28 },
  { id: 2, clientId: 1, date: "2024-12-17", time: "14:00", duration: "3hr", type: "photo_video", status: "completed", notes: "Staff portraits and patient testimonial video", photosDelivered: 32 },
  { id: 3, clientId: 1, date: "2025-01-07", time: "10:00", duration: "3hr", type: "photo_video", status: "completed", notes: "New Year campaign shoot - whitening promo", photosDelivered: 30 },
  { id: 4, clientId: 1, date: "2025-01-21", time: "13:00", duration: "3hr", type: "photo_video", status: "completed", notes: "Before/after cases and equipment showcase", photosDelivered: 26 },
  { id: 5, clientId: 1, date: "2025-02-04", time: "10:00", duration: "3hr", type: "photo_video", status: "confirmed", notes: "Valentine smile campaign shoot", photosDelivered: null },
  { id: 6, clientId: 1, date: "2025-02-18", time: "14:00", duration: "3hr", type: "photo_video", status: "scheduled", notes: "Lunar New Year follow-up content", photosDelivered: null },

  // --- Client 2: Cheongdam Dermatology (authority, trimmed to 2 shoots) ---
  { id: 7, clientId: 2, date: "2024-12-10", time: "09:00", duration: "4hr", type: "photo_video", status: "completed", notes: "Full clinic shoot - new laser treatment room feature", photosDelivered: 58 },
  { id: 8, clientId: 2, date: "2025-01-14", time: "09:00", duration: "4hr", type: "photo_video", status: "completed", notes: "Doctor profile video and skincare routine reel", photosDelivered: 62 },

  // --- Client 3: Apgujeong Family Dental (maintenance, 1/month) ---
  { id: 9, clientId: 3, date: "2024-12-12", time: "10:00", duration: "2hr", type: "photo", status: "completed", notes: "Clinic interior refresh photos", photosDelivered: 15 },
  { id: 10, clientId: 3, date: "2025-01-16", time: "10:00", duration: "2hr", type: "photo", status: "completed", notes: "Kids dental health month - family-friendly content", photosDelivered: 14 },
  { id: 11, clientId: 3, date: "2025-02-13", time: "10:00", duration: "2hr", type: "photo", status: "confirmed", notes: "Valentine kids event candid shots", photosDelivered: null },

  // --- Client 4: Seoul Bright Orthodontics (growth, 2/month) ---
  { id: 12, clientId: 4, date: "2024-12-05", time: "13:00", duration: "3hr", type: "photo_video", status: "completed", notes: "Invisalign showcase and patient journey", photosDelivered: 30 },
  { id: 13, clientId: 4, date: "2024-12-19", time: "09:00", duration: "3hr", type: "photo_video", status: "completed", notes: "Year-end smile transformation compilation", photosDelivered: 34 },
  { id: 14, clientId: 4, date: "2025-01-09", time: "14:00", duration: "3hr", type: "photo_video", status: "completed", notes: "New braces technology feature", photosDelivered: 28 },
  { id: 15, clientId: 4, date: "2025-01-23", time: "10:00", duration: "3hr", type: "photo_video", status: "completed", notes: "Teen braces testimonial and before/after", photosDelivered: 31 },
  { id: 16, clientId: 4, date: "2025-02-06", time: "13:00", duration: "3hr", type: "photo_video", status: "confirmed", notes: "February ortho awareness campaign", photosDelivered: null },
  { id: 17, clientId: 4, date: "2025-02-20", time: "09:00", duration: "3hr", type: "photo_video", status: "scheduled", notes: "Spring smile prep shoot", photosDelivered: null },

  // --- Client 5: Sinsa Skin Clinic (growth, 2/month) ---
  { id: 18, clientId: 5, date: "2024-12-04", time: "14:00", duration: "3hr", type: "photo_video", status: "completed", notes: "Winter skincare routine content", photosDelivered: 29 },
  { id: 19, clientId: 5, date: "2024-12-18", time: "10:00", duration: "3hr", type: "photo_video", status: "completed", notes: "Holiday glow treatment showcase", photosDelivered: 33 },
  { id: 20, clientId: 5, date: "2025-01-08", time: "14:00", duration: "3hr", type: "photo_video", status: "completed", notes: "New year skin reset campaign", photosDelivered: 27 },
  { id: 21, clientId: 5, date: "2025-01-22", time: "10:00", duration: "3hr", type: "photo_video", status: "completed", notes: "Hydrafacial procedure walkthrough", photosDelivered: 30 },
  { id: 22, clientId: 5, date: "2025-02-05", time: "14:00", duration: "3hr", type: "photo_video", status: "confirmed", notes: "Valentine glow-up special", photosDelivered: null },
  { id: 23, clientId: 5, date: "2025-02-19", time: "10:00", duration: "3hr", type: "photo_video", status: "scheduled", notes: "Spring sensitive skin series", photosDelivered: null },

  // --- Client 6: Hannam Dental Care (maintenance, 1/month) ---
  { id: 24, clientId: 6, date: "2024-12-11", time: "13:00", duration: "2hr", type: "photo", status: "completed", notes: "Clinic exterior and waiting area update", photosDelivered: 16 },
  { id: 25, clientId: 6, date: "2025-01-15", time: "13:00", duration: "2hr", type: "photo", status: "completed", notes: "New hygienist intro and team photo", photosDelivered: 15 },
  { id: 26, clientId: 6, date: "2025-02-12", time: "13:00", duration: "2hr", type: "photo", status: "confirmed", notes: "Dental health awareness month content", photosDelivered: null },

  // --- Client 7: Dosan Aesthetics (authority, trimmed to 1 shoot) ---
  { id: 27, clientId: 7, date: "2024-12-06", time: "09:00", duration: "4hr", type: "photo_video", status: "completed", notes: "Premium treatment room reveal and doctor interview", photosDelivered: 55 },

  // --- Client 8: Yeoksam Smile Center (maintenance, 1/month) ---
  { id: 28, clientId: 8, date: "2024-12-09", time: "10:00", duration: "2hr", type: "photo", status: "completed", notes: "Holiday smile campaign photos", photosDelivered: 15 },
  { id: 29, clientId: 8, date: "2025-01-13", time: "10:00", duration: "2hr", type: "photo", status: "completed", notes: "New year new smile - cosmetic veneer showcase", photosDelivered: 14 },
  { id: 30, clientId: 8, date: "2025-02-10", time: "10:00", duration: "2hr", type: "photo", status: "scheduled", notes: "February cosmetic dentistry feature", photosDelivered: null },
];

// --------------------------------------------------
// 4. DELIVERABLES (40 rows)
// --------------------------------------------------
export const deliverables = [
  // --- Client 1 deliverables (growth tier: 30 photos, 4 ad creatives, 1 reel per month) ---
  { id: 1, clientId: 1, shootId: 1, date: "2024-12-06", type: "Photo Set", quantity: 28, platform: "Instagram", status: "delivered", notes: "Reception and treatment room photos delivered" },
  { id: 2, clientId: 1, shootId: 1, date: "2024-12-08", type: "Ad Creative", quantity: 2, platform: "Instagram", status: "delivered", notes: "Carousel ads for winter whitening promo" },
  { id: 3, clientId: 1, shootId: 2, date: "2024-12-20", type: "Photo Set", quantity: 32, platform: "Instagram", status: "delivered", notes: "Staff portraits processed and delivered" },
  { id: 4, clientId: 1, shootId: 2, date: "2024-12-22", type: "Ad Creative", quantity: 2, platform: "Naver", status: "delivered", notes: "Naver blog ad banners" },
  { id: 5, clientId: 1, shootId: 2, date: "2024-12-24", type: "Instagram Reel", quantity: 1, platform: "Instagram", status: "delivered", notes: "Patient testimonial reel - 45sec" },
  { id: 6, clientId: 1, shootId: 3, date: "2025-01-10", type: "Photo Set", quantity: 30, platform: "Instagram", status: "delivered", notes: "New Year whitening campaign photos" },
  { id: 7, clientId: 1, shootId: 3, date: "2025-01-12", type: "Ad Creative", quantity: 4, platform: "Instagram", status: "delivered", notes: "January promotion ad creatives" },
  { id: 8, clientId: 1, shootId: 4, date: "2025-01-25", type: "Before/After Set", quantity: 6, platform: "Google", status: "delivered", notes: "Whitening before/after comparison shots" },
  { id: 9, clientId: 1, shootId: 4, date: "2025-01-27", type: "Instagram Reel", quantity: 1, platform: "Instagram", status: "delivered", notes: "Equipment showcase reel - 30sec" },

  // --- Client 2 deliverables (authority tier: 60 photos, 6 ad creatives, 2 reels, 1 video) ---
  { id: 10, clientId: 2, shootId: 7, date: "2024-12-13", type: "Photo Set", quantity: 58, platform: "Instagram", status: "delivered", notes: "Full clinic photo set including new laser room" },
  { id: 11, clientId: 2, shootId: 7, date: "2024-12-15", type: "Ad Creative", quantity: 6, platform: "Instagram", status: "delivered", notes: "Premium ad creatives for laser treatment launch" },
  { id: 12, clientId: 2, shootId: 7, date: "2024-12-18", type: "Instagram Reel", quantity: 2, platform: "Instagram", status: "delivered", notes: "Treatment room tour and laser demo reels" },
  { id: 13, clientId: 2, shootId: 8, date: "2025-01-17", type: "Photo Set", quantity: 62, platform: "Instagram", status: "delivered", notes: "Doctor profile and skincare photos" },
  { id: 14, clientId: 2, shootId: 8, date: "2025-01-20", type: "Ad Creative", quantity: 4, platform: "Naver", status: "delivered", notes: "Naver smart store ad banners" },
  { id: 15, clientId: 2, shootId: 8, date: "2025-01-22", type: "Instagram Reel", quantity: 2, platform: "Instagram", status: "production", notes: "Skincare routine reel - in editing" },

  // --- Client 3 deliverables (maintenance: 15 photos, 2 ad creatives) ---
  { id: 16, clientId: 3, shootId: 9, date: "2024-12-15", type: "Photo Set", quantity: 15, platform: "Google", status: "delivered", notes: "Clinic interior photos for Google Business" },
  { id: 17, clientId: 3, shootId: 9, date: "2024-12-17", type: "Ad Creative", quantity: 2, platform: "Instagram", status: "delivered", notes: "Family dentistry ad banners" },
  { id: 18, clientId: 3, shootId: 10, date: "2025-01-19", type: "Photo Set", quantity: 14, platform: "Instagram", status: "delivered", notes: "Kids dental health photos" },
  { id: 19, clientId: 3, shootId: 10, date: "2025-01-21", type: "Ad Creative", quantity: 2, platform: "Instagram", status: "delivered", notes: "January kids dental health creatives" },

  // --- Client 4 deliverables (growth: 30 photos, 4 ad creatives, 1 reel) ---
  { id: 20, clientId: 4, shootId: 12, date: "2024-12-08", type: "Photo Set", quantity: 30, platform: "Instagram", status: "delivered", notes: "Invisalign showcase photos" },
  { id: 21, clientId: 4, shootId: 13, date: "2024-12-22", type: "Before/After Set", quantity: 8, platform: "Instagram", status: "delivered", notes: "Year-end smile transformation comparisons" },
  { id: 22, clientId: 4, shootId: 13, date: "2024-12-24", type: "Instagram Reel", quantity: 1, platform: "Instagram", status: "delivered", notes: "Smile transformation compilation reel" },
  { id: 23, clientId: 4, shootId: 14, date: "2025-01-12", type: "Photo Set", quantity: 28, platform: "Instagram", status: "delivered", notes: "New braces technology feature photos" },
  { id: 24, clientId: 4, shootId: 14, date: "2025-01-14", type: "Ad Creative", quantity: 4, platform: "Instagram", status: "delivered", notes: "January ortho promo creatives" },
  { id: 25, clientId: 4, shootId: 15, date: "2025-01-26", type: "Before/After Set", quantity: 6, platform: "Google", status: "delivered", notes: "Teen braces journey before/after" },

  // --- Client 5 deliverables (growth: 30 photos, 4 ad creatives, 1 reel) ---
  { id: 26, clientId: 5, shootId: 18, date: "2024-12-07", type: "Photo Set", quantity: 29, platform: "Instagram", status: "delivered", notes: "Winter skincare product and treatment photos" },
  { id: 27, clientId: 5, shootId: 18, date: "2024-12-09", type: "Ad Creative", quantity: 2, platform: "Instagram", status: "delivered", notes: "Winter hydration treatment ads" },
  { id: 28, clientId: 5, shootId: 19, date: "2024-12-21", type: "Photo Set", quantity: 33, platform: "Instagram", status: "delivered", notes: "Holiday glow treatment feature photos" },
  { id: 29, clientId: 5, shootId: 19, date: "2024-12-23", type: "Instagram Reel", quantity: 1, platform: "Instagram", status: "delivered", notes: "Holiday glow transformation reel - 40sec" },
  { id: 30, clientId: 5, shootId: 20, date: "2025-01-11", type: "Photo Set", quantity: 27, platform: "Instagram", status: "delivered", notes: "New year skin reset photos" },
  { id: 31, clientId: 5, shootId: 21, date: "2025-01-25", type: "Ad Creative", quantity: 4, platform: "Naver", status: "delivered", notes: "Hydrafacial campaign Naver ads" },
  { id: 32, clientId: 5, shootId: 21, date: "2025-01-28", type: "Instagram Reel", quantity: 1, platform: "Instagram", status: "production", notes: "Hydrafacial procedure walkthrough reel - editing" },

  // --- Client 6 deliverables (maintenance: 15 photos, 2 ad creatives) ---
  { id: 33, clientId: 6, shootId: 24, date: "2024-12-14", type: "Photo Set", quantity: 16, platform: "Google", status: "delivered", notes: "Updated Google Business photos" },
  { id: 34, clientId: 6, shootId: 24, date: "2024-12-16", type: "Google Business Photos", quantity: 10, platform: "Google", status: "delivered", notes: "Exterior and waiting area for Google listing" },
  { id: 35, clientId: 6, shootId: 25, date: "2025-01-18", type: "Photo Set", quantity: 15, platform: "Instagram", status: "delivered", notes: "Team photo and hygienist introduction" },
  { id: 36, clientId: 6, shootId: 25, date: "2025-01-20", type: "Ad Creative", quantity: 2, platform: "Instagram", status: "delivered", notes: "Meet the team ad creatives" },

  // --- Client 7 deliverables (authority tier) ---
  { id: 37, clientId: 7, shootId: 27, date: "2024-12-09", type: "Photo Set", quantity: 55, platform: "Instagram", status: "delivered", notes: "Premium treatment room and facility photos" },
  { id: 38, clientId: 7, shootId: 27, date: "2024-12-12", type: "Ad Creative", quantity: 6, platform: "Instagram", status: "delivered", notes: "Premium aesthetic treatment ad suite" },
  { id: 39, clientId: 7, shootId: 27, date: "2024-12-15", type: "Instagram Reel", quantity: 2, platform: "Instagram", status: "delivered", notes: "Doctor interview and treatment room reveal reels" },

  // --- Client 8 deliverables (maintenance: 15 photos, 2 ad creatives) ---
  { id: 40, clientId: 8, shootId: 28, date: "2024-12-12", type: "Photo Set", quantity: 15, platform: "Instagram", status: "delivered", notes: "Holiday smile campaign photos delivered" },
];

// --------------------------------------------------
// 5. SOCIAL POSTS (60 rows)
// --------------------------------------------------
export const socialPosts = [
  // --- Client 1: Gangnam Smile Dental ---
  { id: 1, clientId: 1, date: "2024-12-05", platform: "Instagram", type: "Feed Post", likes: 245, comments: 18, saves: 42, shares: 8, reach: 4820, engagementRate: 6.5 },
  { id: 2, clientId: 1, date: "2024-12-12", platform: "Instagram", type: "Carousel", likes: 312, comments: 24, saves: 67, shares: 12, reach: 5340, engagementRate: 7.8 },
  { id: 3, clientId: 1, date: "2024-12-20", platform: "Instagram", type: "Reel", likes: 580, comments: 35, saves: 89, shares: 18, reach: 9200, engagementRate: 7.8 },
  { id: 4, clientId: 1, date: "2024-12-28", platform: "Naver", type: "Feed Post", likes: 124, comments: 8, saves: 22, shares: 4, reach: 2800, engagementRate: 5.6 },
  { id: 5, clientId: 1, date: "2025-01-06", platform: "Instagram", type: "Feed Post", likes: 198, comments: 14, saves: 38, shares: 6, reach: 4100, engagementRate: 6.2 },
  { id: 6, clientId: 1, date: "2025-01-15", platform: "Instagram", type: "Carousel", likes: 342, comments: 28, saves: 72, shares: 14, reach: 5780, engagementRate: 7.9 },
  { id: 7, clientId: 1, date: "2025-01-24", platform: "Instagram", type: "Reel", likes: 620, comments: 38, saves: 95, shares: 20, reach: 10400, engagementRate: 7.4 },
  { id: 8, clientId: 1, date: "2025-02-03", platform: "Instagram", type: "Feed Post", likes: 215, comments: 16, saves: 40, shares: 7, reach: 4400, engagementRate: 6.3 },

  // --- Client 2: Cheongdam Dermatology ---
  { id: 9, clientId: 2, date: "2024-12-03", platform: "Instagram", type: "Feed Post", likes: 420, comments: 32, saves: 78, shares: 15, reach: 7200, engagementRate: 7.6 },
  { id: 10, clientId: 2, date: "2024-12-10", platform: "Instagram", type: "Reel", likes: 780, comments: 40, saves: 98, shares: 19, reach: 12500, engagementRate: 7.5 },
  { id: 11, clientId: 2, date: "2024-12-17", platform: "Instagram", type: "Carousel", likes: 510, comments: 36, saves: 85, shares: 16, reach: 8400, engagementRate: 7.7 },
  { id: 12, clientId: 2, date: "2024-12-24", platform: "Naver", type: "Feed Post", likes: 188, comments: 12, saves: 34, shares: 5, reach: 3600, engagementRate: 6.6 },
  { id: 13, clientId: 2, date: "2025-01-07", platform: "Instagram", type: "Feed Post", likes: 445, comments: 30, saves: 82, shares: 14, reach: 7500, engagementRate: 7.6 },
  { id: 14, clientId: 2, date: "2025-01-14", platform: "Instagram", type: "Reel", likes: 800, comments: 38, saves: 100, shares: 18, reach: 13200, engagementRate: 7.2 },
  { id: 15, clientId: 2, date: "2025-01-21", platform: "Instagram", type: "Story", likes: 320, comments: 15, saves: 45, shares: 8, reach: 5800, engagementRate: 6.7 },
  { id: 16, clientId: 2, date: "2025-01-28", platform: "Google", type: "Feed Post", likes: 95, comments: 6, saves: 18, shares: 3, reach: 2200, engagementRate: 5.5 },
  { id: 17, clientId: 2, date: "2025-02-04", platform: "Instagram", type: "Carousel", likes: 475, comments: 34, saves: 88, shares: 16, reach: 7800, engagementRate: 7.9 },
  { id: 18, clientId: 2, date: "2025-02-11", platform: "Instagram", type: "Reel", likes: 690, comments: 36, saves: 92, shares: 17, reach: 11600, engagementRate: 7.2 },

  // --- Client 3: Apgujeong Family Dental ---
  { id: 19, clientId: 3, date: "2024-12-08", platform: "Instagram", type: "Feed Post", likes: 85, comments: 8, saves: 14, shares: 3, reach: 1800, engagementRate: 6.1 },
  { id: 20, clientId: 3, date: "2024-12-22", platform: "Instagram", type: "Feed Post", likes: 92, comments: 10, saves: 18, shares: 4, reach: 2100, engagementRate: 5.9 },
  { id: 21, clientId: 3, date: "2025-01-12", platform: "Google", type: "Feed Post", likes: 52, comments: 5, saves: 10, shares: 2, reach: 1200, engagementRate: 5.8 },
  { id: 22, clientId: 3, date: "2025-01-26", platform: "Instagram", type: "Carousel", likes: 110, comments: 12, saves: 22, shares: 5, reach: 2400, engagementRate: 6.2 },
  { id: 23, clientId: 3, date: "2025-02-09", platform: "Instagram", type: "Feed Post", likes: 78, comments: 7, saves: 12, shares: 3, reach: 1650, engagementRate: 6.1 },

  // --- Client 4: Seoul Bright Orthodontics ---
  { id: 24, clientId: 4, date: "2024-12-04", platform: "Instagram", type: "Feed Post", likes: 198, comments: 15, saves: 35, shares: 7, reach: 3900, engagementRate: 6.5 },
  { id: 25, clientId: 4, date: "2024-12-11", platform: "Instagram", type: "Carousel", likes: 275, comments: 22, saves: 55, shares: 10, reach: 4800, engagementRate: 7.5 },
  { id: 26, clientId: 4, date: "2024-12-18", platform: "Instagram", type: "Reel", likes: 450, comments: 30, saves: 72, shares: 14, reach: 7800, engagementRate: 7.3 },
  { id: 27, clientId: 4, date: "2024-12-26", platform: "Naver", type: "Feed Post", likes: 110, comments: 7, saves: 20, shares: 3, reach: 2400, engagementRate: 5.8 },
  { id: 28, clientId: 4, date: "2025-01-08", platform: "Instagram", type: "Feed Post", likes: 210, comments: 16, saves: 38, shares: 8, reach: 4200, engagementRate: 6.5 },
  { id: 29, clientId: 4, date: "2025-01-16", platform: "Instagram", type: "Carousel", likes: 290, comments: 24, saves: 58, shares: 11, reach: 5100, engagementRate: 7.5 },
  { id: 30, clientId: 4, date: "2025-01-25", platform: "Instagram", type: "Story", likes: 155, comments: 10, saves: 25, shares: 5, reach: 3200, engagementRate: 6.1 },
  { id: 31, clientId: 4, date: "2025-02-06", platform: "Instagram", type: "Feed Post", likes: 188, comments: 14, saves: 32, shares: 6, reach: 3800, engagementRate: 6.3 },

  // --- Client 5: Sinsa Skin Clinic ---
  { id: 32, clientId: 5, date: "2024-12-06", platform: "Instagram", type: "Feed Post", likes: 310, comments: 22, saves: 55, shares: 10, reach: 5400, engagementRate: 7.4 },
  { id: 33, clientId: 5, date: "2024-12-13", platform: "Instagram", type: "Reel", likes: 520, comments: 34, saves: 82, shares: 16, reach: 8600, engagementRate: 7.6 },
  { id: 34, clientId: 5, date: "2024-12-21", platform: "Instagram", type: "Carousel", likes: 380, comments: 26, saves: 64, shares: 12, reach: 6200, engagementRate: 7.8 },
  { id: 35, clientId: 5, date: "2024-12-29", platform: "Naver", type: "Feed Post", likes: 145, comments: 9, saves: 28, shares: 4, reach: 3100, engagementRate: 6.0 },
  { id: 36, clientId: 5, date: "2025-01-09", platform: "Instagram", type: "Feed Post", likes: 295, comments: 20, saves: 50, shares: 9, reach: 5100, engagementRate: 7.3 },
  { id: 37, clientId: 5, date: "2025-01-17", platform: "Instagram", type: "Carousel", likes: 365, comments: 25, saves: 62, shares: 11, reach: 6000, engagementRate: 7.7 },
  { id: 38, clientId: 5, date: "2025-01-26", platform: "Instagram", type: "Reel", likes: 540, comments: 32, saves: 85, shares: 15, reach: 8800, engagementRate: 7.6 },
  { id: 39, clientId: 5, date: "2025-02-05", platform: "Instagram", type: "Feed Post", likes: 280, comments: 19, saves: 48, shares: 8, reach: 4900, engagementRate: 7.2 },

  // --- Client 6: Hannam Dental Care ---
  { id: 40, clientId: 6, date: "2024-12-10", platform: "Instagram", type: "Feed Post", likes: 72, comments: 6, saves: 12, shares: 2, reach: 1500, engagementRate: 6.1 },
  { id: 41, clientId: 6, date: "2024-12-25", platform: "Google", type: "Feed Post", likes: 50, comments: 5, saves: 10, shares: 2, reach: 1100, engagementRate: 6.1 },
  { id: 42, clientId: 6, date: "2025-01-14", platform: "Instagram", type: "Feed Post", likes: 88, comments: 8, saves: 15, shares: 3, reach: 1800, engagementRate: 6.3 },
  { id: 43, clientId: 6, date: "2025-01-30", platform: "Instagram", type: "Carousel", likes: 102, comments: 10, saves: 20, shares: 4, reach: 2100, engagementRate: 6.5 },
  { id: 44, clientId: 6, date: "2025-02-12", platform: "Instagram", type: "Feed Post", likes: 68, comments: 6, saves: 11, shares: 2, reach: 1400, engagementRate: 6.2 },

  // --- Client 7: Dosan Aesthetics ---
  { id: 45, clientId: 7, date: "2024-12-04", platform: "Instagram", type: "Feed Post", likes: 480, comments: 35, saves: 85, shares: 17, reach: 8000, engagementRate: 7.7 },
  { id: 46, clientId: 7, date: "2024-12-11", platform: "Instagram", type: "Reel", likes: 750, comments: 40, saves: 95, shares: 20, reach: 12000, engagementRate: 7.5 },
  { id: 47, clientId: 7, date: "2024-12-18", platform: "Instagram", type: "Carousel", likes: 520, comments: 32, saves: 78, shares: 15, reach: 8500, engagementRate: 7.6 },
  { id: 48, clientId: 7, date: "2024-12-27", platform: "Naver", type: "Feed Post", likes: 195, comments: 11, saves: 35, shares: 5, reach: 3800, engagementRate: 6.5 },
  { id: 49, clientId: 7, date: "2025-01-06", platform: "Instagram", type: "Feed Post", likes: 460, comments: 33, saves: 80, shares: 16, reach: 7600, engagementRate: 7.8 },
  { id: 50, clientId: 7, date: "2025-01-15", platform: "Instagram", type: "Reel", likes: 720, comments: 38, saves: 92, shares: 19, reach: 11800, engagementRate: 7.4 },
  { id: 51, clientId: 7, date: "2025-01-23", platform: "Instagram", type: "Story", likes: 340, comments: 18, saves: 50, shares: 9, reach: 6200, engagementRate: 6.7 },
  { id: 52, clientId: 7, date: "2025-02-03", platform: "Instagram", type: "Carousel", likes: 495, comments: 34, saves: 82, shares: 16, reach: 8200, engagementRate: 7.6 },
  { id: 53, clientId: 7, date: "2025-02-10", platform: "Instagram", type: "Reel", likes: 680, comments: 36, saves: 90, shares: 18, reach: 11200, engagementRate: 7.4 },

  // --- Client 8: Yeoksam Smile Center ---
  { id: 54, clientId: 8, date: "2024-12-07", platform: "Instagram", type: "Feed Post", likes: 68, comments: 6, saves: 11, shares: 2, reach: 1400, engagementRate: 6.2 },
  { id: 55, clientId: 8, date: "2024-12-19", platform: "Instagram", type: "Feed Post", likes: 82, comments: 8, saves: 15, shares: 3, reach: 1750, engagementRate: 6.2 },
  { id: 56, clientId: 8, date: "2024-12-30", platform: "Google", type: "Feed Post", likes: 55, comments: 5, saves: 10, shares: 2, reach: 1200, engagementRate: 6.0 },
  { id: 57, clientId: 8, date: "2025-01-10", platform: "Instagram", type: "Feed Post", likes: 75, comments: 7, saves: 13, shares: 3, reach: 1600, engagementRate: 6.1 },
  { id: 58, clientId: 8, date: "2025-01-22", platform: "Instagram", type: "Carousel", likes: 95, comments: 10, saves: 18, shares: 4, reach: 2000, engagementRate: 6.4 },
  { id: 59, clientId: 8, date: "2025-02-07", platform: "Instagram", type: "Feed Post", likes: 70, comments: 6, saves: 12, shares: 2, reach: 1450, engagementRate: 6.2 },
  { id: 60, clientId: 8, date: "2025-02-14", platform: "Instagram", type: "Feed Post", likes: 88, comments: 9, saves: 16, shares: 3, reach: 1850, engagementRate: 6.3 },
];

// --------------------------------------------------
// 6. CONVERSIONS (24 rows: 8 clients x 3 months)
// --------------------------------------------------
export const conversions = [
  // --- December 2024 ---
  { id: 1, clientId: 1, month: "2024-12", newInquiries: 14, appointmentsBooked: 10, newPatients: 7, source: "social" },
  { id: 2, clientId: 2, month: "2024-12", newInquiries: 22, appointmentsBooked: 16, newPatients: 12, source: "social" },
  { id: 3, clientId: 3, month: "2024-12", newInquiries: 7, appointmentsBooked: 5, newPatients: 3, source: "google" },
  { id: 4, clientId: 4, month: "2024-12", newInquiries: 12, appointmentsBooked: 8, newPatients: 6, source: "social" },
  { id: 5, clientId: 5, month: "2024-12", newInquiries: 16, appointmentsBooked: 12, newPatients: 9, source: "naver" },
  { id: 6, clientId: 6, month: "2024-12", newInquiries: 6, appointmentsBooked: 4, newPatients: 3, source: "google" },
  { id: 7, clientId: 7, month: "2024-12", newInquiries: 24, appointmentsBooked: 18, newPatients: 14, source: "social" },
  { id: 8, clientId: 8, month: "2024-12", newInquiries: 8, appointmentsBooked: 6, newPatients: 4, source: "referral" },

  // --- January 2025 ---
  { id: 9, clientId: 1, month: "2025-01", newInquiries: 16, appointmentsBooked: 12, newPatients: 9, source: "social" },
  { id: 10, clientId: 2, month: "2025-01", newInquiries: 20, appointmentsBooked: 15, newPatients: 11, source: "naver" },
  { id: 11, clientId: 3, month: "2025-01", newInquiries: 8, appointmentsBooked: 6, newPatients: 4, source: "google" },
  { id: 12, clientId: 4, month: "2025-01", newInquiries: 15, appointmentsBooked: 11, newPatients: 8, source: "social" },
  { id: 13, clientId: 5, month: "2025-01", newInquiries: 18, appointmentsBooked: 14, newPatients: 10, source: "social" },
  { id: 14, clientId: 6, month: "2025-01", newInquiries: 5, appointmentsBooked: 3, newPatients: 2, source: "referral" },
  { id: 15, clientId: 7, month: "2025-01", newInquiries: 21, appointmentsBooked: 16, newPatients: 12, source: "social" },
  { id: 16, clientId: 8, month: "2025-01", newInquiries: 9, appointmentsBooked: 7, newPatients: 5, source: "unknown" },

  // --- February 2025 ---
  { id: 17, clientId: 1, month: "2025-02", newInquiries: 13, appointmentsBooked: 9, newPatients: 6, source: "naver" },
  { id: 18, clientId: 2, month: "2025-02", newInquiries: 25, appointmentsBooked: 19, newPatients: 14, source: "social" },
  { id: 19, clientId: 3, month: "2025-02", newInquiries: 6, appointmentsBooked: 4, newPatients: 3, source: "google" },
  { id: 20, clientId: 4, month: "2025-02", newInquiries: 11, appointmentsBooked: 8, newPatients: 5, source: "social" },
  { id: 21, clientId: 5, month: "2025-02", newInquiries: 15, appointmentsBooked: 11, newPatients: 8, source: "social" },
  { id: 22, clientId: 6, month: "2025-02", newInquiries: 7, appointmentsBooked: 5, newPatients: 4, source: "naver" },
  { id: 23, clientId: 7, month: "2025-02", newInquiries: 19, appointmentsBooked: 14, newPatients: 10, source: "social" },
  { id: 24, clientId: 8, month: "2025-02", newInquiries: 10, appointmentsBooked: 7, newPatients: 5, source: "google" },
];

// --------------------------------------------------
// 7. LEADS
// --------------------------------------------------
export const leads = [
  { id: 1, clinicName: "Samseong Dental", contactPerson: "Dr. Oh Donghyun", phone: "010-1111-2222", email: "oh@samseongdental.kr", specialty: "General Dentistry", district: "Samseong", source: "website", tierInterest: "growth", status: "new", dateAdded: "2025-02-10", followUpDate: "2025-02-20", notes: "Inquired about social media photography packages" },
  { id: 2, clinicName: "Gangnam K-Derm", contactPerson: "Dr. Na Heeyoung", phone: "010-3333-4444", email: "na@gangnamkderm.kr", specialty: "Cosmetic Dermatology", district: "Gangnam", source: "referral", tierInterest: "authority", status: "consultation", dateAdded: "2025-01-28", followUpDate: "2025-02-22", notes: "Referred by Cheongdam Dermatology. Very interested in video content." },
  { id: 3, clinicName: "Jamsil Bright Dental", contactPerson: "Dr. Shin Taewoo", phone: "010-5555-6666", email: "shin@jamsilbright.kr", specialty: "Pediatric Dentistry", district: "Jamsil", source: "instagram", tierInterest: "maintenance", status: "proposal", dateAdded: "2025-01-15", followUpDate: "2025-02-18", notes: "DM'd on Instagram. Sent Growth Core proposal, awaiting response." },
];
