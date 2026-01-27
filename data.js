// === CIH CS Dashboard - Sample Data ===

const CUSTOMERS = [
    { id: 1, name: "Albatross Inc.", industry: "Financial Services", tier: "Platinum", arr: 542000, health: 82, nps: 8, dau: 88, stage: "Value Realization", renewalDate: "2026-06-15", champion: "Emily Burns", execSponsor: "David Chen", users: 24, licensedUsers: 30, apiCalls: 12400, integrations: ["SIEM","SOAR"], findings: 1240, falsePositives: 8 },
    { id: 2, name: "CyberShield Corp", industry: "Technology", tier: "Gold", arr: 320000, health: 91, nps: 9, dau: 94, stage: "Renewal & Growth", renewalDate: "2026-04-20", champion: "Sarah Kim", execSponsor: "Mark Liu", users: 18, licensedUsers: 20, apiCalls: 9800, integrations: ["SIEM"], findings: 890, falsePositives: 5 },
    { id: 3, name: "Demizz Solutions", industry: "Healthcare", tier: "Platinum", arr: 144000, health: 55, nps: 5, dau: 42, stage: "Adoption", renewalDate: "2026-03-10", champion: "Tom Wright", execSponsor: "Lisa Park", users: 6, licensedUsers: 15, apiCalls: 2100, integrations: [], findings: 320, falsePositives: 22 },
    { id: 4, name: "Yotz Security", industry: "Government", tier: "Gold", arr: 48400, health: 67, nps: 7, dau: 61, stage: "Adoption", renewalDate: "2026-05-01", champion: "Alex Reyes", execSponsor: "Janet Moore", users: 8, licensedUsers: 12, apiCalls: 4500, integrations: ["SIEM"], findings: 560, falsePositives: 14 },
    { id: 5, name: "Alfresco Systems", industry: "Finance", tier: "Platinum", arr: 133000, health: 38, nps: 3, dau: 28, stage: "Onboarding", renewalDate: "2026-08-22", champion: "Chris Evans", execSponsor: "None", users: 3, licensedUsers: 20, apiCalls: 800, integrations: [], findings: 90, falsePositives: 35 },
    { id: 6, name: "SecureNet MSSP", industry: "MSSP", tier: "Platinum", arr: 890000, health: 95, nps: 10, dau: 97, stage: "Renewal & Growth", renewalDate: "2026-07-30", champion: "Maria Santos", execSponsor: "James O'Brien", users: 45, licensedUsers: 50, apiCalls: 28000, integrations: ["SIEM","SOAR","Ticketing"], findings: 4200, falsePositives: 3 },
    { id: 7, name: "Sentinel Group", industry: "Retail", tier: "Gold", arr: 210000, health: 73, nps: 7, dau: 68, stage: "Value Realization", renewalDate: "2026-04-15", champion: "Rachel Green", execSponsor: "Mike Ross", users: 12, licensedUsers: 15, apiCalls: 6200, integrations: ["SIEM"], findings: 780, falsePositives: 11 },
    { id: 8, name: "Fortis Cyber", industry: "Defense", tier: "Platinum", arr: 720000, health: 88, nps: 9, dau: 91, stage: "Renewal & Growth", renewalDate: "2026-09-01", champion: "Daniel Kim", execSponsor: "Patricia Wells", users: 38, licensedUsers: 40, apiCalls: 21000, integrations: ["SIEM","SOAR"], findings: 3100, falsePositives: 4 },
    { id: 9, name: "NovaTech", industry: "Technology", tier: "Basic", arr: 36000, health: 44, nps: 4, dau: 35, stage: "Onboarding", renewalDate: "2026-03-28", champion: "None", execSponsor: "None", users: 2, licensedUsers: 10, apiCalls: 600, integrations: [], findings: 45, falsePositives: 18 },
    { id: 10, name: "MASA Security", industry: "MSSP", tier: "Gold", arr: 450000, health: 76, nps: 7, dau: 72, stage: "Value Realization", renewalDate: "2026-05-18", champion: "Yuki Tanaka", execSponsor: "Robert Zhang", users: 22, licensedUsers: 30, apiCalls: 14500, integrations: ["SIEM","SOAR"], findings: 2100, falsePositives: 9 },
    { id: 11, name: "DataGuard Pro", industry: "Insurance", tier: "Gold", arr: 175000, health: 62, nps: 6, dau: 55, stage: "Adoption", renewalDate: "2026-04-05", champion: "Laura White", execSponsor: "Steven Black", users: 9, licensedUsers: 15, apiCalls: 3800, integrations: ["SIEM"], findings: 420, falsePositives: 16 },
    { id: 12, name: "Pinnacle Ops", industry: "Energy", tier: "Platinum", arr: 620000, health: 85, nps: 8, dau: 86, stage: "Value Realization", renewalDate: "2026-10-12", champion: "Omar Hassan", execSponsor: "Catherine Lee", users: 32, licensedUsers: 35, apiCalls: 18000, integrations: ["SIEM","SOAR","Ticketing"], findings: 2800, falsePositives: 6 },
    { id: 13, name: "Nexus Cyber", industry: "Consulting", tier: "Basic", arr: 28000, health: 50, nps: 5, dau: 40, stage: "Onboarding", renewalDate: "2026-06-30", champion: "Amy Chen", execSponsor: "None", users: 4, licensedUsers: 8, apiCalls: 1200, integrations: [], findings: 110, falsePositives: 20 },
    { id: 14, name: "TrustVault", industry: "Banking", tier: "Platinum", arr: 980000, health: 92, nps: 9, dau: 93, stage: "Renewal & Growth", renewalDate: "2026-08-15", champion: "Sophie Martin", execSponsor: "William Harris", users: 48, licensedUsers: 50, apiCalls: 32000, integrations: ["SIEM","SOAR","Ticketing"], findings: 5100, falsePositives: 2 },
    { id: 15, name: "Dominos Pizza", industry: "Food & Beverage", tier: "Gold", arr: 95000, health: 71, nps: 7, dau: 65, stage: "Adoption", renewalDate: "2026-03-20", champion: "Jake Thompson", execSponsor: "Nicole Brown", users: 7, licensedUsers: 10, apiCalls: 3200, integrations: ["SIEM"], findings: 380, falsePositives: 12 },
    { id: 16, name: "Vigilant Security", industry: "MSSP", tier: "Gold", arr: 380000, health: 79, nps: 8, dau: 75, stage: "Value Realization", renewalDate: "2026-05-25", champion: "Carlos Diaz", execSponsor: "Helen Wu", users: 20, licensedUsers: 25, apiCalls: 11000, integrations: ["SIEM","SOAR"], findings: 1900, falsePositives: 7 },
    { id: 17, name: "Starbucks", industry: "Retail", tier: "Gold", arr: 115000, health: 84, nps: 8, dau: 82, stage: "Value Realization", renewalDate: "2026-07-10", champion: "Megan Fox", execSponsor: "Tyler James", users: 14, licensedUsers: 15, apiCalls: 5600, integrations: ["SIEM"], findings: 650, falsePositives: 8 },
    { id: 18, name: "OmniShield", industry: "Technology", tier: "Basic", arr: 42000, health: 33, nps: 2, dau: 20, stage: "Onboarding", renewalDate: "2026-04-01", champion: "None", execSponsor: "None", users: 1, licensedUsers: 10, apiCalls: 200, integrations: [], findings: 15, falsePositives: 40 },
    { id: 19, name: "SafeHarbor", industry: "Maritime", tier: "Gold", arr: 260000, health: 87, nps: 9, dau: 89, stage: "Renewal & Growth", renewalDate: "2026-06-05", champion: "Nina Patel", execSponsor: "George Adams", users: 16, licensedUsers: 18, apiCalls: 8900, integrations: ["SIEM","SOAR"], findings: 1100, falsePositives: 5 },
    { id: 20, name: "Apex Defend", industry: "Defense", tier: "Platinum", arr: 850000, health: 90, nps: 9, dau: 92, stage: "Renewal & Growth", renewalDate: "2026-11-20", champion: "Brian Foster", execSponsor: "Diana Prince", users: 42, licensedUsers: 45, apiCalls: 25000, integrations: ["SIEM","SOAR","Ticketing"], findings: 3800, falsePositives: 3 }
];

const RED_ALERTS = [
    { customer: "OmniShield", type: "Zero Logins", details: "0 logins for 12 consecutive days", health: 33, arr: "$42K", action: "call" },
    { customer: "Alfresco Systems", type: "Critical Findings Ignored", details: "18 high-severity findings unchecked for 72+ hrs", health: 38, arr: "$133K", action: "investigate" },
    { customer: "NovaTech", type: "API/Integration Failure", details: "SIEM connection down for 3 days", health: 44, arr: "$36K", action: "investigate" },
    { customer: "Demizz Solutions", type: "Usage Limit Reached", details: "API cap hit — blocking new scans", health: 55, arr: "$144K", action: "call" },
    { customer: "Nexus Cyber", type: "Zero Logins", details: "0 logins for 9 consecutive days", health: 50, arr: "$28K", action: "call" },
    { customer: "Alfresco Systems", type: "Support Escalation", details: "Ticket #4821 escalated, 5 days without resolution", health: 38, arr: "$133K", action: "investigate" },
    { customer: "OmniShield", type: "Champion Departure", details: "Primary contact left organization", health: 33, arr: "$42K", action: "call" }
];

const YELLOW_FLAGS = [
    { customer: "DataGuard Pro", type: "Declining DAU", details: "DAU dropped 22% over 3 weeks", health: 62, arr: "$175K", action: "call" },
    { customer: "Yotz Security", type: "Unused Features", details: "SOAR integration available but unused", health: 67, arr: "$48K", action: "train" },
    { customer: "Dominos Pizza", type: "Reporting Inactivity", details: "No reports generated in 35 days", health: 71, arr: "$95K", action: "email" },
    { customer: "Sentinel Group", type: "Renewal Approaching", details: "68 days to renewal, health at 73", health: 73, arr: "$210K", action: "call" },
    { customer: "Demizz Solutions", type: "Single-User Account", details: "1 active user on 15-user license", health: 55, arr: "$144K", action: "train" },
    { customer: "MASA Security", type: "Declining DAU", details: "DAU dropped 16% over 2 weeks", health: 76, arr: "$450K", action: "call" },
    { customer: "Vigilant Security", type: "Unused Features", details: "Custom rules engine unused", health: 79, arr: "$380K", action: "train" },
    { customer: "DataGuard Pro", type: "Renewal Approaching", details: "62 days to renewal, health at 62", health: 62, arr: "$175K", action: "call" },
    { customer: "NovaTech", type: "Single-User Account", details: "2 users on 10-user license", health: 44, arr: "$36K", action: "email" },
    { customer: "Dominos Pizza", type: "Renewal Approaching", details: "52 days to renewal, health at 71", health: 71, arr: "$95K", action: "call" },
    { customer: "Nexus Cyber", type: "Unused Features", details: "API automation not configured", health: 50, arr: "$28K", action: "train" },
    { customer: "Yotz Security", type: "Renewal Approaching", details: "88 days to renewal, health at 67", health: 67, arr: "$48K", action: "call" }
];

const GREEN_LIGHTS = [
    { customer: "SecureNet MSSP", type: "High Engagement", details: "97% DAU, all features adopted", health: 95, arr: "$890K", action: "celebrate" },
    { customer: "TrustVault", type: "Usage Limits", details: "Hitting API cap 3rd time this month", health: 92, arr: "$980K", action: "upsell" },
    { customer: "CyberShield Corp", type: "Advanced Features", details: "Using API automation + custom rules", health: 91, arr: "$320K", action: "upsell" },
    { customer: "Apex Defend", type: "Deep Integration", details: "Integrated with SIEM, SOAR & Ticketing", health: 90, arr: "$850K", action: "celebrate" },
    { customer: "Fortis Cyber", type: "Immediate Response", details: "Avg critical finding response: 4 min", health: 88, arr: "$720K", action: "celebrate" },
    { customer: "SafeHarbor", type: "High Engagement", details: "89% DAU, strong adoption growth", health: 87, arr: "$260K", action: "upsell" },
    { customer: "Pinnacle Ops", type: "Deep Integration", details: "3 active integrations, high utilization", health: 85, arr: "$620K", action: "celebrate" },
    { customer: "Starbucks", type: "Advanced Features", details: "Active SIEM integration + reporting", health: 84, arr: "$115K", action: "upsell" }
];

const FEATURE_FUNNEL = [
    { name: "Threat Detection", access: 100, tried: 95, regular: 82, power: 45 },
    { name: "SIEM Integration", access: 85, tried: 70, regular: 55, power: 28 },
    { name: "SOAR Automation", access: 60, tried: 42, regular: 30, power: 12 },
    { name: "Custom Rules", access: 75, tried: 55, regular: 38, power: 18 },
    { name: "API Automation", access: 90, tried: 68, regular: 48, power: 22 },
    { name: "Reporting & Analytics", access: 100, tried: 88, regular: 65, power: 35 },
    { name: "Multi-Tenant Mgmt", access: 40, tried: 32, regular: 24, power: 10 }
];

const TIMELINE_EVENTS = [
    { type: "call", icon: "fa-phone", title: "QBR Call Completed", desc: "Discussed expansion plans and Q2 goals. Champion very engaged.", date: "2026-01-27 10:30 AM" },
    { type: "system", icon: "fa-chart-line", title: "Health Score Changed", desc: "Score improved from 78 to 82 (+4 points)", date: "2026-01-26 08:00 AM" },
    { type: "email", icon: "fa-envelope", title: "Training Follow-up Sent", desc: "Shared SOAR integration guide and use case examples.", date: "2026-01-25 02:15 PM" },
    { type: "support", icon: "fa-ticket", title: "Support Ticket #4756 Resolved", desc: "API rate limiting issue fixed. Customer confirmed.", date: "2026-01-24 11:45 AM" },
    { type: "alert", icon: "fa-exclamation-triangle", title: "Critical Finding Detected", desc: "High-severity vulnerability found — customer acknowledged in 6 min.", date: "2026-01-23 09:20 AM" },
    { type: "system", icon: "fa-milestone", title: "Milestone: 1000th Finding Checked", desc: "Customer reached 1,000 findings investigated milestone.", date: "2026-01-22 04:00 PM" },
    { type: "call", icon: "fa-phone", title: "Check-in Call", desc: "Discussed DAU trends and upcoming feature rollout.", date: "2026-01-20 03:00 PM" },
    { type: "email", icon: "fa-envelope", title: "NPS Survey Sent", desc: "Quarterly NPS survey delivered to 3 contacts.", date: "2026-01-18 10:00 AM" }
];

const CTAS = [
    { title: "Renewal Risk - Low Usage Alert", priority: "high", type: "Risk", owner: "CSM User", due: "2026-02-01", status: "open", desc: "Usage dropped 22% — schedule recovery call" },
    { title: "Executive Business Review", priority: "high", type: "Renewal", owner: "CSM User", due: "2026-02-05", status: "in-progress", desc: "Prepare QBR deck for upcoming renewal" },
    { title: "New Customer Onboarding", priority: "medium", type: "Onboarding", owner: "CSM User", due: "2026-02-10", status: "in-progress", desc: "Complete Day 30 onboarding checklist" },
    { title: "Feature Training - SOAR", priority: "medium", type: "Training", owner: "CSM User", due: "2026-02-15", status: "open", desc: "Schedule SOAR training for power users" },
    { title: "Expansion Opportunity Review", priority: "low", type: "Expansion", owner: "CSM User", due: "2026-02-20", status: "open", desc: "Customer hitting API limits — prepare upsell proposal" },
    { title: "Detractor NPS Survey Response", priority: "high", type: "Risk", owner: "CSM User", due: "2026-01-30", status: "open", desc: "NPS score 3 — immediate outreach required" }
];

const STRATEGIC_INSIGHTS = [
    { icon: "fa-crosshairs", title: "Top Focus: Alfresco Systems", text: "Health score 38, critical findings ignored, support escalation pending. ARR at risk: $133K. Immediate save plan needed." },
    { icon: "fa-lightbulb", title: "Product Gap: SOAR Adoption", text: "Only 30% of eligible customers using SOAR regularly. Training investment could improve retention by ~5%." },
    { icon: "fa-trophy", title: "Saved This Month: DataGuard Pro", text: "Intervention call reversed declining DAU. Health improved from 54 to 62. Renewal conversation started." },
    { icon: "fa-expand", title: "Top Expansion: TrustVault", text: "Hitting API cap repeatedly. Ready for Platinum+ tier upgrade worth estimated $120K incremental ARR." }
];
