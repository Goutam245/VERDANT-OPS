// Centralized mock data for Verdant Ops — realistic, internally consistent

export const productionLines = [
  { line: "Cold-Press A", product: "Refined Avocado Oil", batch: "B-0711", progress: 84, output: "4,200 / 5,000 L", operator: "Samuel Akena", status: "Running" as const, time: "3h 21m" },
  { line: "Cold-Press B", product: "Virgin Avocado Oil", batch: "B-0712", progress: 53, output: "1,590 / 3,000 L", operator: "Grace Namukasa", status: "Slow" as const, time: "1h 48m" },
  { line: "Bottling L-1", product: "500ml Refined Bottles", batch: "B-0713", progress: 97, output: "9,700 / 10,000 u", operator: "Felix Otieno", status: "Running" as const, time: "4h 52m" },
  { line: "Refinery A", product: "Crude → Refined", batch: "B-0714", progress: 28, output: "840 / 3,000 L", operator: "Patrick Mwenda", status: "Fault" as const, time: "0h 44m" },
  { line: "Paste Line", product: "Avocado Paste Export", batch: "B-0715", progress: 67, output: "536 / 800 kg", operator: "Aisha Walugembe", status: "Running" as const, time: "2h 10m" },
];

export const alerts = [
  { sev: "critical", title: "Sealing Film Roll (10m)", body: "380m remaining — Reorder: 1,000m", sub: "Est. runout in 2.1 hours", action: "Raise PO" },
  { sev: "critical", title: "Glass Bottles 750ml", body: "920 units — Reorder: 2,500 units", sub: "", action: "Raise PO" },
  { sev: "warning", title: "Cardboard Outer Box (Large)", body: "640 units — Reorder: 1,000 units", sub: "", action: "View" },
  { sev: "warning", title: "Crude Avocado Oil — Tank 3", body: "68% capacity — 2 orders pending", sub: "", action: "View" },
  { sev: "info", title: "Refinery A — Maintenance Ticket", body: "MT-558 raised · Eng. B. Ssali notified", sub: "", action: "View" },
] as const;

export const yieldSeries = [
  { day: "Mon", actual: 88, target: 90 }, { day: "Tue", actual: 91, target: 90 },
  { day: "Wed", actual: 89, target: 90 }, { day: "Thu", actual: 93, target: 90 },
  { day: "Fri", actual: 92, target: 90 }, { day: "Sat", actual: 90, target: 90 },
  { day: "Sun", actual: 87, target: 90 },
];

export const procurementByGroup = [
  { name: "Rift Valley Agri Co-op", value: 42 },
  { name: "Central Kenya Highlands Union", value: 31 },
  { name: "Western Smallholders Network", value: 18 },
  { name: "Nakuru Farmers Association", value: 9 },
];

export const activityFeed = [
  { t: "14:52", type: "ok", text: "Batch B-0711 reached 84% completion — ETA completion: 16:20" },
  { t: "14:30", type: "danger", text: "FAULT: Refinery Unit A — vibration sensor triggered. Ticket MT-558 opened. Engineer B. Ssali dispatched. Est. repair: 45 min." },
  { t: "14:15", type: "warn", text: "QC Check QC-0558: Batch B-0709 — DM 87.2% (threshold: 88%). Flagged for review." },
  { t: "14:00", type: "info", text: "Shift B handover complete. 5 active batches transferred. Shift A: 18,340 kg produced." },
  { t: "13:45", type: "ok", text: "Gate Pass GP-3012 issued — Truck UBJ-889K (Rift Valley Co-op) — 5,200 kg Hass" },
  { t: "13:30", type: "ok", text: "Purchase Order PO-1044 approved — Central Highlands — 7,000 kg @ KES 49/kg" },
  { t: "13:10", type: "warn", text: "Low stock alert triggered — Sealing Film Roll below critical threshold" },
  { t: "12:55", type: "ok", text: "GRN-1122 generated — Batch B-0709 passed QC — moved to Bay C-02" },
];

export const workOrders = [
  ["WO-0881","Refined Avocado Oil","5,000 L","4,200 L","Cold-Press A","06:00","18:00","In Progress","HIGH"],
  ["WO-0882","Virgin Avocado Oil","3,000 L","1,590 L","Cold-Press B","06:30","16:30","Slow","HIGH"],
  ["WO-0883","500ml Bottled Refined","10,000 u","9,700 u","Bottling L-1","05:30","15:00","Near Done","HIGH"],
  ["WO-0884","Crude → Refined Process","3,000 L","840 L","Refinery A","08:00","20:00","Fault Hold","URGENT"],
  ["WO-0885","Export Paste Pack 5kg","800 kg","536 kg","Paste Line","10:00","18:00","In Progress","MEDIUM"],
  ["WO-0886","Virgin Oil 1L Bottles","2,000 u","0 u","Bottling L-2","16:00","22:00","Scheduled","MEDIUM"],
  ["WO-0887","Biomass Pellet Press","400 kg","400 kg","Biomass Unit","08:00","12:00","Completed","LOW"],
  ["WO-0888","Drum Fill — Crude Oil","1,200 L","1,200 L","Fill Station","09:30","11:00","Completed","MEDIUM"],
];

export const batches = [
  ["B-0711","Rift Valley Agri Co-op","Hass","5,000 kg","4,200 L","84.0%","Pass","Extraction","Today","Tank 01"],
  ["B-0712","Central Kenya Highlands","Fuerte","3,000 kg","1,590 L","53.0%","Review","Pre-heating","Today","—"],
  ["B-0713","Western Smallholders Net.","Hass","5,200 kg","4,850 u","93.3%","Pass","Bottling","Today","Bay D-01"],
  ["B-0714","Nakuru Farmers Assoc.","Mixed","3,200 kg","840 L","26.3%","Hold","FAULT","Today","Quarantine"],
  ["B-0715","Rift Valley Agri Co-op","Hass","800 kg","536 kg","67.0%","Pass","Mixing","Today","Paste Bay"],
  ["B-0710","Central Kenya Highlands","Hass","4,800 kg","4,416 L","92.0%","Pass","Completed","Yesterday","Tank 02"],
  ["B-0709","Western Smallholders Net.","Fuerte","3,600 kg","3,240 L","90.0%","Pass","Completed","Yesterday","Tank 03"],
  ["B-0708","Rift Valley Agri Co-op","Hass","5,100 kg","4,743 L","93.0%","Pass","Completed","2 days ago","Tank 01"],
];

export const requirements = [
  ["REQ-141","Hass Avocado","10,000","46 – 54","14 May 2026","Rift Valley + Central Kenya","18","Open"],
  ["REQ-142","Fuerte Avocado","5,500","39 – 46","16 May 2026","Western Smallholders","9","Open"],
  ["REQ-143","Hass Avocado","15,000","46 – 54","21 May 2026","All Registered Groups","28","Open"],
  ["REQ-140","Mixed Variety","4,000","40 – 48","11 May 2026","Nakuru Farmers Assoc.","6","Closing"],
  ["REQ-139","Hass Avocado","7,000","48","8 May 2026","Central Kenya Highlands","12","Confirmed"],
  ["REQ-138","Fuerte Avocado","3,200","42","7 May 2026","Rift Valley Agri Co-op","8","Confirmed"],
  ["REQ-137","Hass Avocado","9,500","47","6 May 2026","All Groups","19","Completed"],
];

export const farmerResponses = [
  ["Rift Valley Agri Co-op","KES 49/kg","8,500 kg","11 May 2026","Grade A",5,97],
  ["Central Kenya Highlands","KES 47/kg","10,000 kg","12 May 2026","Grade A",4.5,94],
  ["Highland Premium Farms","KES 53/kg","4,200 kg","10 May 2026","Grade AA",4,88],
  ["Western Smallholders Net.","KES 45/kg","6,800 kg","13 May 2026","Grade B",3.5,79],
  ["Nakuru Indep. Farmers","KES 54/kg","2,100 kg","16 May 2026","Grade A",3,71],
  ["Meru Highlands Co-op","KES 44/kg","3,400 kg","18 May 2026","Grade B",2.5,62],
] as const;

export const purchaseOrders = [
  ["PO-1044","Central Kenya Highlands","Hass Avocado","7,000","49","343,000","13 May 2026","Pending","Approved"],
  ["PO-1043","Rift Valley Agri Co-op","Hass Avocado","8,500","49","416,500","11 May 2026","Paid","In Transit"],
  ["PO-1042","Western Smallholders Net.","Fuerte Avocado","5,500","45","247,500","12 May 2026","Pending","Confirmed"],
  ["PO-1041","Highland Premium Farms","Hass Avocado","4,200","53","222,600","10 May 2026","Paid","Delivered"],
  ["PO-1040","Nakuru Farmers Assoc.","Mixed","4,000","44","176,000","9 May 2026","Paid","Delivered"],
  ["PO-1039","Rift Valley Agri Co-op","Hass Avocado","6,000","47","282,000","8 May 2026","Paid","Completed"],
];

export const farmers = [
  ["FRM-001","Rift Valley Agri Co-op","Nakuru, Rift Valley","Hass",5,"48,200 kg",2,"Active"],
  ["FRM-002","Central Kenya Highlands Union","Nyeri, Central Kenya","Hass/Fuerte",4.5,"36,800 kg",1,"Active"],
  ["FRM-003","Western Smallholders Network","Bungoma, Western Kenya","Fuerte",4,"28,400 kg",1,"Active"],
  ["FRM-004","Highland Premium Farms Ltd","Meru, Eastern","Hass",4,"19,600 kg",0,"Active"],
  ["FRM-005","Nakuru Farmers Association","Nakuru, Rift Valley","Mixed",3,"14,200 kg",0,"Active"],
  ["FRM-006","Meru Highlands Co-op","Meru, Eastern","Hass/Fuerte",2.5,"8,900 kg",0,"Inactive"],
] as const;

export const inventory = [
  ["INV-001","Sealing Film Roll 10m","Packaging","380 m","380 m","0 m","1,000 m","45,600","Critical","20 min ago",12],
  ["INV-002","Glass Bottles 750ml","Packaging","920 u","0 u","920 u","2,500 u","36,800","Critical","35 min ago",8],
  ["INV-003","Cardboard Outer Box (L)","Packaging","640 u","200 u","440 u","1,000 u","19,200","Warning","1h ago",64],
  ["INV-004","Refined Avocado Oil 500ml","Finished Good","21,400 u","4,200 u","17,200 u","5,000 u","2,996,000","Healthy","2h ago",91],
  ["INV-005","Labels — Refined Gold","Packaging","24,800 u","8,000 u","16,800 u","5,000 u","12,400","Healthy","3h ago",98],
  ["INV-006","Avocado Paste Raw","Raw Material","2,340 kg","800 kg","1,540 kg","3,500 kg","210,600","Watch","1h ago",39],
  ["INV-007","Crude Avocado Oil","WIP","8,800 L","3,000 L","5,800 L","2,000 L","704,000","Healthy","1h ago",80],
  ["INV-008","Virgin Avocado Oil 1L","Finished Good","4,100 u","1,200 u","2,900 u","2,000 u","820,000","Healthy","2h ago",75],
  ["INV-009","Tamper Seals — Round","Packaging","18,400 u","6,000 u","12,400 u","5,000 u","9,200","Healthy","4h ago",92],
  ["INV-010","Biomass Pellets","By-product","6,800 kg","0 kg","6,800 kg","1,000 kg","272,000","Healthy","3h ago",88],
] as const;

export const qcChecks = [
  ["QC-0558","B-0711","Rift Valley Agri Co-op","92.4","0.16","3.1","Green A","Pass","PASS","Dr. N. Kimani","14:00"],
  ["QC-0557","B-0712","Central Kenya Highlands","87.2","0.29","4.4","Yellow B","Borderline","FAIL","Dr. N. Kimani","13:30"],
  ["QC-0556","B-0713","Western Smallholders Net.","91.8","0.21","3.3","Green A","Pass","PASS","S. Namusisi","12:45"],
  ["QC-0555","B-0714","Nakuru Farmers Assoc.","78.4","0.61","6.2","Brown C","Fail","FAIL","S. Namusisi","12:20"],
  ["QC-0554","B-0715","Rift Valley Agri Co-op","90.6","0.18","3.0","Green A","Pass","PASS","Dr. N. Kimani","11:55"],
  ["QC-0553","B-0710","Central Kenya Highlands","93.1","0.14","2.8","Green A","Pass","PASS","Dr. N. Kimani","10:30"],
];

export const grns = [
  ["GRN-1122","PO-1043","Rift Valley Agri Co-op","Hass Avocado","5,680 kg","480 kg","5,200 kg","Pass","Bay A-01","13:50 Today"],
  ["GRN-1121","PO-1042","Western Smallholders Net.","Fuerte Avocado","6,010 kg","510 kg","5,500 kg","Pass","Bay A-03","12:00 Today"],
  ["GRN-1120","PO-1041","Highland Premium Farms","Hass Avocado","4,620 kg","420 kg","4,200 kg","Pass","Bay A-02","10:30 Today"],
  ["GRN-1119","PO-1040","Nakuru Farmers Assoc.","Mixed","3,520 kg","320 kg","3,200 kg","Rejected","Quarantine","09:45 Today"],
  ["GRN-1118","PO-1039","Rift Valley Agri Co-op","Hass Avocado","6,600 kg","600 kg","6,000 kg","Pass","Bay A-02","Yesterday"],
];

export const bays = [
  { section: "Section A — Raw Material", items: [
    ["Bay A-01", 82, "4,100/5,000 kg", "Hass Avocado — B-0711"],
    ["Bay A-02", 100, "5,000/5,000 kg", "FULL — Hass Avocado B-0710"],
    ["Bay A-03", 62, "3,100/5,000 kg", "Fuerte — B-0712"],
    ["Bay A-04", 18, "900/5,000 kg", "Mixed — B-0714 (Quarantine)"],
  ]},
  { section: "Section B — WIP", items: [
    ["Bay B-01", 80, "Crude Oil in process", ""],
    ["Bay B-02", 54, "Paste intermediate", ""],
  ]},
  { section: "Section C — Finished Goods", items: [
    ["Bay C-01", 91, "Refined Oil 500ml — 19,400 units", ""],
    ["Bay C-02", 44, "Virgin Oil 1L — 4,100 units", ""],
    ["Bay C-03", 28, "Biomass Pellets — 6,800 kg", ""],
  ]},
  { section: "Cold Storage", items: [
    ["Cold-1", 84, "Refined Crude Oil 8,800 L", ""],
    ["Cold-2", 62, "Virgin Oil stock 5,400 L", ""],
  ]},
] as const;

export const gateLog = [
  ["GP-3014","UBJ-889K","James Omondi","Rift Valley Agri Co-op","PO-1043","13:45","5,680 kg","14:55","1h 10m","Cleared"],
  ["GP-3013","KAA-224M","Samuel Wekesa","Central Kenya Highlands","PO-1042","13:00","—","—","—","Inside (QC)"],
  ["GP-3012","KBK-517C","Peter Ogola","Western Smallholders Net.","PO-1041","12:10","4,620 kg","13:20","1h 10m","Cleared"],
  ["GP-3011","UGA-338F","Joseph Ssebugwawo","Nakuru Farmers Assoc.","—","11:30","3,520 kg","—","—","Alert — No PO"],
  ["GP-3010","KCA-002B","David Muchiri","Highland Premium Farms","PO-1040","10:20","4,620 kg","11:40","1h 20m","Cleared"],
  ["GP-3009","KDA-776T","Francis Kiprono","Rift Valley Agri Co-op","PO-1039","09:10","6,600 kg","10:30","1h 20m","Cleared"],
];

export const buyerOrders = [
  ["ORD-2241","Nairobi Premium Foods Ltd","Refined Avocado Oil 500ml","3,000 btl","540,000","14 May 2026","TNK-01","Processing"],
  ["ORD-2240","Uganda Export Traders","Crude Avocado Oil (Bulk)","8,000 L","720,000","16 May 2026","TNK-03","Confirmed"],
  ["ORD-2239","Dubai Health Foods (Export)","Virgin Oil 1L","1,500 btl","375,000","20 May 2026","TNK-02","Booked"],
  ["ORD-2238","Kampala Organic Markets","Avocado Paste 5kg Pack","400 kg","180,000","12 May 2026","Paste Bay","Dispatched"],
  ["ORD-2237","Mombasa Wellness Co.","Refined Avocado Oil 500ml","1,200 btl","216,000","11 May 2026","TNK-01","Dispatched"],
  ["ORD-2236","East Africa Grocery Chain","Mixed Pack (Assorted)","800 u","112,000","10 May 2026","Bay C-01","Delivered"],
  ["ORD-2235","Local Market — Kisumu","Crude Oil (20L Drums)","400 L","36,000","9 May 2026","TNK-03","Delivered"],
];

export const tanks = [
  ["TNK-01","Refined Avocado Oil","12,000 L","9,200 L","3,000 L","6,200 L","ORD-2241, ORD-2237",77],
  ["TNK-02","Virgin Avocado Oil","8,000 L","5,400 L","1,800 L","3,600 L","ORD-2239",68],
  ["TNK-03","Crude Avocado Oil","18,000 L","12,400 L","8,000 L","4,400 L","ORD-2240, ORD-2235",69],
  ["TNK-04","Dry Waste / Biomass","25,000 kg","6,800 kg","0 kg","6,800 kg","—",27],
] as const;

export const incidents = [
  ["MT-558","Refinery Unit A","HIGH","Vibration sensor fault — halted production","14:30","Eng. B. Ssali","15:15","In Progress"],
  ["MT-557","Sealing Machine S-2","MEDIUM","Seal film feed jam — manual override active","13:00","Eng. C. Nanteza","14:30","In Progress"],
  ["MT-556","Cold-Press B Gearbox","MEDIUM","Speed variance — requires oil check","11:20","Eng. C. Nanteza","—","Resolved"],
  ["MT-555","Bottling Nozzle #4","LOW","Slow drip — nozzle seal replacement needed","09:00","Eng. D. Mwangi","—","Scheduled"],
];

export const spareParts = [
  ["SP-001","Centrifuge Belt Type-A",4,2,"OK","3 days ago","8,400"],
  ["SP-002","Filler Nozzle Seal Kit",1,3,"Critical","Today","2,200"],
  ["SP-003","Pressure Gauge 0–10 bar",9,2,"OK","1 week ago","4,800"],
  ["SP-004","Temperature Sensor RTD",3,2,"OK","2 days ago","6,100"],
  ["SP-005","Bearing Assembly Type-B",2,2,"Watch","Today","14,200"],
  ["SP-006","Drive Belt — Bottling L1",1,2,"Warning","4 days ago","3,600"],
  ["SP-007","Hydraulic Filter — Refinery",5,3,"OK","Yesterday","1,900"],
  ["SP-008","Pump Seal Kit Universal",6,2,"OK","2 weeks ago","5,500"],
] as const;

export const users = [
  ["Nkechi Jabari","Operations Director","Management","All Factories","Today 13:58","Active"],
  ["Dr. N. Kimani","QC Lab Manager","Quality","Kakira Plant","Today 14:00","Active"],
  ["Samuel Akena","Line Operator A","Production","Kakira Plant","Today 06:00","Active"],
  ["Grace Namukasa","Line Operator B","Production","Kakira Plant","Today 06:30","Active"],
  ["Aisha Walugembe","Procurement Officer","Procurement","Kakira Plant","Today 08:15","Active"],
  ["James Omondi","Gate Operator","Logistics","Kakira Plant","Today 13:45","Active"],
  ["Eng. B. Ssali","Senior Engineer","Maintenance","Kakira Plant","Today 14:32","Active"],
  ["Fatima Osei","Sales Manager","Sales","Kakira Plant","Today 09:00","Active"],
  ["S. Namusisi","QC Inspector","Quality","Kakira Plant","Today 11:55","Active"],
  ["Patrick Mwenda","Line Operator C","Production","Kakira Plant","Today 08:00","Active"],
  ["HQ Admin","Super Administrator","IT / System","HQ","Yesterday 17:20","Active"],
];

export const revenueByProduct = [
  { name: "Refined Oil", value: 22.4 },
  { name: "Virgin Oil", value: 14.8 },
  { name: "Crude Oil", value: 9.6 },
  { name: "Paste", value: 5.2 },
  { name: "Biomass", value: 2.2 },
];
