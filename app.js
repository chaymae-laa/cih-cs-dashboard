// === CIH CS Dashboard - Application Logic ===

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initLastUpdated();
    renderDailyDashboard();
    renderWeeklyDashboard();
    renderMonthlyDashboard();
    renderHealthPage();
    renderPipelinePage();
    initC360();
    initMenuToggle();
});

// === Navigation ===
function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            item.classList.add('active');
            document.getElementById('page-' + item.dataset.page).classList.add('active');
        });
    });
}

function initMenuToggle() {
    const toggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
}

function initLastUpdated() {
    document.getElementById('lastUpdated').textContent = new Date().toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

// === Helpers ===
function healthClass(score) { return score >= 80 ? 'green' : score >= 60 ? 'yellow' : 'red'; }
function healthBadge(score) { return `<span class="health-badge ${healthClass(score)}">${score}</span>`; }
function actionBtn(type) {
    const map = { call: ['Call','call'], email: ['Email','email'], investigate: ['Investigate','investigate'], train: ['Train','train'], upsell: ['Upsell','upsell'], celebrate: ['Celebrate','celebrate'] };
    const [label, cls] = map[type] || ['Action','call'];
    return `<button class="action-btn ${cls}">${label}</button>`;
}
function customerLink(name) { return `<span class="customer-link" onclick="openC360('${name}')">${name}</span>`; }
function trendArrow(val) {
    if (val > 0) return `<span class="trend-up"><i class="fas fa-arrow-up"></i> +${val}</span>`;
    if (val < 0) return `<span class="trend-down"><i class="fas fa-arrow-down"></i> ${val}</span>`;
    return `<span class="trend-flat"><i class="fas fa-minus"></i> 0</span>`;
}

// === Daily Dashboard ===
function renderDailyDashboard() {
    // Red alerts
    document.getElementById('redAlerts').innerHTML = RED_ALERTS.map(a =>
        `<tr><td>${customerLink(a.customer)}</td><td>${a.type}</td><td>${a.details}</td><td>${healthBadge(a.health)}</td><td>${a.arr}</td><td>${actionBtn(a.action)}</td></tr>`
    ).join('');

    // Yellow flags
    document.getElementById('yellowFlags').innerHTML = YELLOW_FLAGS.map(a =>
        `<tr><td>${customerLink(a.customer)}</td><td>${a.type}</td><td>${a.details}</td><td>${healthBadge(a.health)}</td><td>${a.arr}</td><td>${actionBtn(a.action)}</td></tr>`
    ).join('');

    // Green lights
    document.getElementById('greenLights').innerHTML = GREEN_LIGHTS.slice(0, 8).map(a =>
        `<tr><td>${customerLink(a.customer)}</td><td>${a.type}</td><td>${a.details}</td><td>${healthBadge(a.health)}</td><td>${a.arr}</td><td>${actionBtn(a.action)}</td></tr>`
    ).join('');

    // Health donut
    const green = CUSTOMERS.filter(c => c.health >= 80).length;
    const yellow = CUSTOMERS.filter(c => c.health >= 60 && c.health < 80).length;
    const red = CUSTOMERS.filter(c => c.health < 60).length;
    new Chart(document.getElementById('healthDonut'), {
        type: 'doughnut',
        data: {
            labels: ['Green (80-100)', 'Yellow (60-79)', 'Red (<60)'],
            datasets: [{ data: [green, yellow, red], backgroundColor: ['#22c55e','#eab308','#ef4444'], borderWidth: 0 }]
        },
        options: { responsive: true, plugins: { legend: { display: false } }, cutout: '65%' }
    });
    document.getElementById('healthLegend').innerHTML = `
        <div class="legend-item"><span class="legend-dot" style="background:#22c55e"></span> Green: ${green}</div>
        <div class="legend-item"><span class="legend-dot" style="background:#eab308"></span> Yellow: ${yellow}</div>
        <div class="legend-item"><span class="legend-dot" style="background:#ef4444"></span> Red: ${red}</div>
    `;

    // Priorities
    const callList = [
        { name: "Alfresco Systems", reason: "Health 38, critical findings ignored" },
        { name: "OmniShield", reason: "Zero logins 12 days, champion departed" },
        { name: "Demizz Solutions", reason: "API cap reached, single-user account" }
    ];
    document.getElementById('callPriorities').innerHTML = callList.map(p =>
        `<div class="priority-item"><span class="name">${p.name}</span><span class="reason">${p.reason}</span></div>`
    ).join('');

    const emailList = [
        { name: "DataGuard Pro", reason: "Share DAU recovery tips, renewal prep" },
        { name: "Dominos Pizza", reason: "Report generation examples" },
        { name: "NovaTech", reason: "Onboarding check-in, integration help" }
    ];
    document.getElementById('emailPriorities').innerHTML = emailList.map(p =>
        `<div class="priority-item"><span class="name">${p.name}</span><span class="reason">${p.reason}</span></div>`
    ).join('');

    const qbrList = [
        { name: "Sentinel Group", reason: "Due for Q1 QBR — renewal in 68 days" },
        { name: "MASA Security", reason: "Quarterly check-in overdue by 2 weeks" }
    ];
    document.getElementById('qbrSchedule').innerHTML = qbrList.map(p =>
        `<div class="priority-item"><span class="name">${p.name}</span><span class="reason">${p.reason}</span></div>`
    ).join('');
}

// === Weekly Dashboard ===
function renderWeeklyDashboard() {
    // Health trend line
    const weeks = ['W46','W47','W48','W49','W50','W51','W52','W1'];
    new Chart(document.getElementById('weeklyHealthTrend'), {
        type: 'line',
        data: {
            labels: weeks,
            datasets: [
                { label: 'Avg Health', data: [78,79,78,80,81,80,82,82], borderColor: '#4a6cf7', backgroundColor: 'rgba(74,108,247,0.1)', fill: true, tension: 0.3 },
                { label: 'Green Count', data: [72,73,72,74,76,75,77,78], borderColor: '#22c55e', borderDash: [5,5], tension: 0.3, fill: false },
                { label: 'Red Count', data: [22,21,22,20,19,20,19,18], borderColor: '#ef4444', borderDash: [5,5], tension: 0.3, fill: false }
            ]
        },
        options: chartOpts('Health Score / Count')
    });

    // Churn forecast
    new Chart(document.getElementById('churnForecast'), {
        type: 'bar',
        data: {
            labels: ['30 Days','60 Days','90 Days'],
            datasets: [
                { label: 'Safe', data: [18,24,32], backgroundColor: '#22c55e' },
                { label: 'At Risk', data: [3,5,8], backgroundColor: '#eab308' },
                { label: 'Critical', data: [1,2,3], backgroundColor: '#ef4444' }
            ]
        },
        options: { ...chartOpts('Customers'), scales: { x: { stacked: true, ticks: { color: '#8b8fa3' }, grid: { color: '#2a2e3a' } }, y: { stacked: true, ticks: { color: '#8b8fa3' }, grid: { color: '#2a2e3a' } } } }
    });

    // Movers
    const improved = [
        { name: "DataGuard Pro", delta: +8 }, { name: "Sentinel Group", delta: +5 },
        { name: "Yotz Security", delta: +4 }, { name: "MASA Security", delta: +3 }
    ];
    document.getElementById('weeklyImproved').innerHTML = improved.map(m =>
        `<div class="mover-item"><span>${customerLink(m.name)}</span><span class="mover-delta text-green">+${m.delta} pts</span></div>`
    ).join('');

    const declined = [
        { name: "Alfresco Systems", delta: -12 }, { name: "OmniShield", delta: -8 },
        { name: "NovaTech", delta: -5 }, { name: "Nexus Cyber", delta: -3 }
    ];
    document.getElementById('weeklyDeclined').innerHTML = declined.map(m =>
        `<div class="mover-item"><span>${customerLink(m.name)}</span><span class="mover-delta text-red">${m.delta} pts</span></div>`
    ).join('');

    // Feature funnel
    document.getElementById('featureFunnel').innerHTML = FEATURE_FUNNEL.map(f => {
        const bar = (val, target, color) => {
            const c = val >= target ? '#22c55e' : val >= target * 0.7 ? '#eab308' : '#ef4444';
            return `<div class="funnel-bar" style="width:${val}%;background:${c}">${val}%</div>`;
        };
        return `<tr>
            <td><strong>${f.name}</strong></td>
            <td>${bar(f.access, 100)}</td>
            <td>${bar(f.tried, 80)}</td>
            <td>${bar(f.regular, 60)}</td>
            <td>${bar(f.power, 30)}</td>
        </tr>`;
    }).join('');

    // Cohort chart
    new Chart(document.getElementById('cohortChart'), {
        type: 'bar',
        data: {
            labels: ['Enterprise','Mid-Market','SMB','MSSP'],
            datasets: [
                { label: 'Avg Health', data: [86,78,62,85], backgroundColor: '#4a6cf7' },
                { label: 'Avg DAU %', data: [89,72,48,82], backgroundColor: '#14b8a6' }
            ]
        },
        options: chartOpts('Score / %')
    });
}

// === Monthly Dashboard ===
function renderMonthlyDashboard() {
    // ARR Trend
    const months = ['Aug','Sep','Oct','Nov','Dec','Jan'];
    new Chart(document.getElementById('arrTrend'), {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'ARR ($M)', data: [12.8,13.1,13.5,13.9,14.2,14.55],
                borderColor: '#a855f7', backgroundColor: 'rgba(168,85,247,0.1)', fill: true, tension: 0.3
            }]
        },
        options: chartOpts('ARR ($M)')
    });

    // Renewal/Churn
    new Chart(document.getElementById('renewalChurn'), {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                { label: 'Renewals ($K)', data: [820,950,1100,880,1050,920], backgroundColor: '#22c55e' },
                { label: 'Expansions ($K)', data: [120,85,210,150,180,130], backgroundColor: '#4a6cf7' },
                { label: 'Churn ($K)', data: [-45,-60,-30,-80,-25,-40], backgroundColor: '#ef4444' }
            ]
        },
        options: chartOpts('Revenue ($K)')
    });

    // Adoption Radar
    new Chart(document.getElementById('adoptionRadar'), {
        type: 'radar',
        data: {
            labels: ['DAU Rate','Feature Adoption','API Usage','Integrations','Power Users','Reporting'],
            datasets: [{
                label: 'Current', data: [78,65,72,55,35,68],
                borderColor: '#4a6cf7', backgroundColor: 'rgba(74,108,247,0.2)'
            },{
                label: 'Target', data: [85,80,80,70,50,80],
                borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)', borderDash: [5,5]
            }]
        },
        options: {
            responsive: true,
            scales: { r: { angleLines: { color: '#2a2e3a' }, grid: { color: '#2a2e3a' }, pointLabels: { color: '#8b8fa3', font: { size: 11 } }, ticks: { display: false }, suggestedMin: 0, suggestedMax: 100 } },
            plugins: { legend: { labels: { color: '#e4e6eb' } } }
        }
    });

    // Strategic Insights
    document.getElementById('strategicInsights').innerHTML = STRATEGIC_INSIGHTS.map(s =>
        `<div class="insight-card"><h4><i class="fas ${s.icon} insight-icon"></i>${s.title}</h4><p>${s.text}</p></div>`
    ).join('');
}

// === Health Page ===
function renderHealthPage() {
    const filter = document.getElementById('healthFilter');
    const render = () => {
        let list = [...CUSTOMERS];
        const val = filter.value;
        if (val === 'green') list = list.filter(c => c.health >= 80);
        if (val === 'yellow') list = list.filter(c => c.health >= 60 && c.health < 80);
        if (val === 'red') list = list.filter(c => c.health < 60);
        list.sort((a, b) => b.health - a.health);

        document.getElementById('healthTable').innerHTML = list.map(c => {
            const adoption = Math.min(100, Math.round(c.dau * 1.1));
            const engagement = Math.min(100, Math.round(c.dau * 0.95));
            const outcomes = Math.min(100, Math.round((c.findings / 50) + 40));
            const sentiment = c.nps * 10;
            const relationship = c.execSponsor !== 'None' ? 85 : 45;
            const delta = Math.round((Math.random() - 0.4) * 10);
            return `<tr>
                <td>${customerLink(c.name)}</td>
                <td>${healthBadge(c.health)}</td>
                <td>${healthBadge(adoption)}</td>
                <td>${healthBadge(engagement)}</td>
                <td>${healthBadge(outcomes)}</td>
                <td>${healthBadge(sentiment)}</td>
                <td>${healthBadge(relationship)}</td>
                <td>${trendArrow(delta)}</td>
                <td><span style="font-size:12px">${c.stage}</span></td>
            </tr>`;
        }).join('');
    };
    filter.addEventListener('change', render);
    render();
}

// === Pipeline Page ===
function renderPipelinePage() {
    const expansions = [
        { customer: "TrustVault", arr: "$980K", type: "Upgrade Tier", value: "$120K", readiness: 92 },
        { customer: "SecureNet MSSP", arr: "$890K", type: "Add Users", value: "$95K", readiness: 88 },
        { customer: "Fortis Cyber", arr: "$720K", type: "Add Services", value: "$80K", readiness: 85 },
        { customer: "CyberShield Corp", arr: "$320K", type: "Upgrade Tier", value: "$65K", readiness: 82 },
        { customer: "SafeHarbor", arr: "$260K", type: "Add Users", value: "$45K", readiness: 78 },
        { customer: "Starbucks", arr: "$115K", type: "Cross-Sell", value: "$35K", readiness: 75 },
        { customer: "Pinnacle Ops", arr: "$620K", type: "Professional Services", value: "$55K", readiness: 80 }
    ];
    document.getElementById('expansionTable').innerHTML = expansions.map(e =>
        `<tr><td>${customerLink(e.customer)}</td><td>${e.arr}</td><td>${e.type}</td><td>${e.value}</td><td>${healthBadge(e.readiness)}</td></tr>`
    ).join('');

    const renewals = CUSTOMERS.filter(c => {
        const d = new Date(c.renewalDate);
        const diff = (d - new Date()) / (1000*60*60*24);
        return diff <= 90 && diff > 0;
    }).sort((a,b) => new Date(a.renewalDate) - new Date(b.renewalDate));

    document.getElementById('renewalTable').innerHTML = renewals.map(c => {
        const likelihood = c.health >= 80 ? 95 : c.health >= 60 ? 75 : 40;
        return `<tr><td>${customerLink(c.name)}</td><td>$${(c.arr/1000).toFixed(0)}K</td><td>${c.renewalDate}</td><td>${healthBadge(c.health)}</td><td>${healthBadge(likelihood)}</td></tr>`;
    }).join('');

    // Renewal forecast chart
    new Chart(document.getElementById('renewalForecast'), {
        type: 'bar',
        data: {
            labels: ['Feb','Mar','Apr','May','Jun','Jul'],
            datasets: [
                { label: 'Safe ($K)', data: [420,680,850,520,390,710], backgroundColor: '#22c55e' },
                { label: 'At Risk ($K)', data: [80,175,210,95,0,0], backgroundColor: '#eab308' },
                { label: 'Critical ($K)', data: [0,36,0,48,0,0], backgroundColor: '#ef4444' }
            ]
        },
        options: { ...chartOpts('ARR ($K)'), scales: { x: { stacked: true, ticks: { color: '#8b8fa3' }, grid: { color: '#2a2e3a' } }, y: { stacked: true, ticks: { color: '#8b8fa3' }, grid: { color: '#2a2e3a' } } } }
    });
}

// === Customer 360 ===
function initC360() {
    const select = document.getElementById('c360CustomerSelect');
    CUSTOMERS.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = c.name;
        select.appendChild(opt);
    });
    select.addEventListener('change', () => {
        if (select.value) renderC360(CUSTOMERS.find(c => c.id == select.value));
    });

    // Tab switching
    document.querySelectorAll('.c360-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.c360-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.c360-tab-content').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
        });
    });
}

function openC360(name) {
    // Navigate to C360 page
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelector('[data-page="c360"]').classList.add('active');
    document.getElementById('page-c360').classList.add('active');

    const customer = CUSTOMERS.find(c => c.name === name);
    if (customer) {
        document.getElementById('c360CustomerSelect').value = customer.id;
        renderC360(customer);
    }
}

function renderC360(c) {
    document.getElementById('c360Content').classList.remove('hidden');

    // Header
    const initials = c.name.split(' ').map(w => w[0]).join('').slice(0,2);
    document.getElementById('c360Header').innerHTML = `
        <div class="c360-company-logo">${initials}</div>
        <div class="c360-company-info">
            <div class="c360-company-name">${c.name}</div>
            <div class="c360-company-meta">
                <span class="c360-meta-item"><strong>Industry:</strong> ${c.industry}</span>
                <span class="c360-meta-item"><strong>Tier:</strong> ${c.tier}</span>
                <span class="c360-meta-item"><strong>ARR:</strong> $${(c.arr/1000).toFixed(0)}K</span>
                <span class="c360-meta-item"><strong>Stage:</strong> ${c.stage}</span>
                <span class="c360-meta-item"><strong>Health:</strong> ${healthBadge(c.health)}</span>
            </div>
        </div>
        <div class="c360-quick-actions">
            <button class="c360-quick-btn"><i class="fas fa-plus"></i> Create CTA</button>
            <button class="c360-quick-btn"><i class="fas fa-pen"></i> Log Activity</button>
            <button class="c360-quick-btn"><i class="fas fa-calendar"></i> Schedule QBR</button>
            <button class="c360-quick-btn"><i class="fas fa-envelope"></i> Send Email</button>
        </div>
    `;

    // Summary Tab
    const adoption = Math.min(100, Math.round(c.dau * 1.1));
    const engagement = Math.min(100, Math.round(c.dau * 0.95));
    const outcomes = Math.min(100, Math.round((c.findings / 50) + 40));
    const sentiment = c.nps * 10;
    const relationship = c.execSponsor !== 'None' ? 85 : 45;

    document.getElementById('tab-summary').innerHTML = `
        <div class="c360-widgets">
            <div class="c360-widget">
                <div class="c360-widget-label">Health Score</div>
                <div class="c360-widget-value" style="color:var(--${healthClass(c.health)})">${c.health}</div>
                <div class="c360-widget-sub">18-week trend: ${c.health > 70 ? 'Improving' : 'Declining'}</div>
            </div>
            <div class="c360-widget">
                <div class="c360-widget-label">NPS Score</div>
                <div class="c360-widget-value" style="color:var(--${c.nps >= 9 ? 'green' : c.nps >= 7 ? 'yellow' : 'red'})">${c.nps}</div>
                <div class="c360-widget-sub">Last survey: Jan 2026</div>
            </div>
            <div class="c360-widget">
                <div class="c360-widget-label">ARR</div>
                <div class="c360-widget-value">$${(c.arr/1000).toFixed(0)}K</div>
                <div class="c360-widget-sub">Growth: +${Math.round(Math.random()*15+5)}% vs initial</div>
            </div>
            <div class="c360-widget">
                <div class="c360-widget-label">DAU Rate</div>
                <div class="c360-widget-value" style="color:var(--${c.dau >= 80 ? 'green' : c.dau >= 60 ? 'yellow' : 'red'})">${c.dau}%</div>
                <div class="c360-widget-sub">${c.users}/${c.licensedUsers} users active</div>
            </div>
            <div class="c360-widget">
                <div class="c360-widget-label">API Calls (Monthly)</div>
                <div class="c360-widget-value">${(c.apiCalls).toLocaleString()}</div>
                <div class="c360-widget-sub">${c.integrations.length} active integrations</div>
            </div>
            <div class="c360-widget">
                <div class="c360-widget-label">Open CTAs</div>
                <div class="c360-widget-value">${Math.floor(Math.random()*5+1)}</div>
                <div class="c360-widget-sub">High: ${Math.floor(Math.random()*2+1)} | Med: ${Math.floor(Math.random()*2)} | Low: ${Math.floor(Math.random()*2)}</div>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><h3>Customer Journey</h3></div>
            <div class="card-body">
                <div class="journey-bar">
                    ${['Onboarding','Adoption','Value Realization','Renewal & Growth'].map(s => {
                        const stages = ['Onboarding','Adoption','Value Realization','Renewal & Growth'];
                        const idx = stages.indexOf(s);
                        const currentIdx = stages.indexOf(c.stage);
                        const cls = idx < currentIdx ? 'completed' : idx === currentIdx ? 'current' : 'upcoming';
                        return `<div class="journey-stage ${cls}">${s}</div>`;
                    }).join('')}
                </div>
            </div>
        </div>
    `;

    // Attributes Tab
    document.getElementById('tab-attributes').innerHTML = `
        <div class="attr-grid">
            <div class="attr-section">
                <h4>Basic Information</h4>
                <div class="attr-row"><span class="attr-label">Company</span><span class="attr-value">${c.name}</span></div>
                <div class="attr-row"><span class="attr-label">Industry</span><span class="attr-value">${c.industry}</span></div>
                <div class="attr-row"><span class="attr-label">Tier</span><span class="attr-value">${c.tier}</span></div>
                <div class="attr-row"><span class="attr-label">Stage</span><span class="attr-value">${c.stage}</span></div>
            </div>
            <div class="attr-section">
                <h4>Contract Details</h4>
                <div class="attr-row"><span class="attr-label">ARR</span><span class="attr-value">$${(c.arr/1000).toFixed(0)}K</span></div>
                <div class="attr-row"><span class="attr-label">Renewal Date</span><span class="attr-value">${c.renewalDate}</span></div>
                <div class="attr-row"><span class="attr-label">Licensed Users</span><span class="attr-value">${c.licensedUsers}</span></div>
                <div class="attr-row"><span class="attr-label">Active Users</span><span class="attr-value">${c.users}</span></div>
            </div>
            <div class="attr-section">
                <h4>Team Structure</h4>
                <div class="attr-row"><span class="attr-label">Champion</span><span class="attr-value">${c.champion}</span></div>
                <div class="attr-row"><span class="attr-label">Exec Sponsor</span><span class="attr-value">${c.execSponsor}</span></div>
            </div>
            <div class="attr-section">
                <h4>Platform Usage</h4>
                <div class="attr-row"><span class="attr-label">DAU Rate</span><span class="attr-value">${c.dau}%</span></div>
                <div class="attr-row"><span class="attr-label">API Calls</span><span class="attr-value">${c.apiCalls.toLocaleString()}</span></div>
                <div class="attr-row"><span class="attr-label">Integrations</span><span class="attr-value">${c.integrations.join(', ') || 'None'}</span></div>
                <div class="attr-row"><span class="attr-label">Findings</span><span class="attr-value">${c.findings.toLocaleString()}</span></div>
                <div class="attr-row"><span class="attr-label">False Positive Rate</span><span class="attr-value">${c.falsePositives}%</span></div>
            </div>
        </div>
    `;

    // Scorecards Tab
    document.getElementById('tab-scorecards').innerHTML = `
        <div class="card">
            <div class="card-body" style="text-align:center">
                <div class="score-big" style="color:var(--${healthClass(c.health)})">${c.health}</div>
                <p style="color:var(--text-secondary);margin-bottom:20px">Overall Health Score</p>
                <div class="score-breakdown">
                    <div class="score-component">
                        <div class="score-component-value" style="color:var(--${healthClass(adoption)})">${adoption}</div>
                        <div class="score-component-label">Product Adoption</div>
                        <div class="score-component-weight">Weight: 30%</div>
                    </div>
                    <div class="score-component">
                        <div class="score-component-value" style="color:var(--${healthClass(engagement)})">${engagement}</div>
                        <div class="score-component-label">Engagement</div>
                        <div class="score-component-weight">Weight: 25%</div>
                    </div>
                    <div class="score-component">
                        <div class="score-component-value" style="color:var(--${healthClass(outcomes)})">${outcomes}</div>
                        <div class="score-component-label">Outcomes</div>
                        <div class="score-component-weight">Weight: 20%</div>
                    </div>
                    <div class="score-component">
                        <div class="score-component-value" style="color:var(--${healthClass(sentiment)})">${sentiment}</div>
                        <div class="score-component-label">Sentiment</div>
                        <div class="score-component-weight">Weight: 15%</div>
                    </div>
                    <div class="score-component">
                        <div class="score-component-value" style="color:var(--${healthClass(relationship)})">${relationship}</div>
                        <div class="score-component-label">Relationship</div>
                        <div class="score-component-weight">Weight: 10%</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Timeline Tab
    document.getElementById('tab-timeline').innerHTML = `
        <div class="card"><div class="card-body">
            <div class="timeline-list">${TIMELINE_EVENTS.map(e => `
                <div class="timeline-entry">
                    <div class="timeline-icon ${e.type}"><i class="fas ${e.icon}"></i></div>
                    <div class="timeline-body">
                        <div class="timeline-title">${e.title}</div>
                        <div class="timeline-desc">${e.desc}</div>
                        <div class="timeline-date">${e.date}</div>
                    </div>
                </div>
            `).join('')}</div>
        </div></div>
    `;

    // CTAs Tab
    document.getElementById('tab-ctas').innerHTML = `
        <div class="card"><div class="card-body">
            ${CTAS.map(cta => `
                <div class="cta-item">
                    <div class="cta-priority ${cta.priority}"></div>
                    <div class="cta-info">
                        <div class="cta-title">${cta.title}</div>
                        <div class="cta-meta">${cta.type} · ${cta.owner} · Due: ${cta.due}</div>
                    </div>
                    <span class="cta-status ${cta.status}">${cta.status.replace('-',' ')}</span>
                </div>
            `).join('')}
        </div></div>
    `;

    // Usage Tab
    document.getElementById('tab-usage').innerHTML = `
        <div class="grid-2">
            <div class="card">
                <div class="card-header"><h3>Usage Metrics</h3></div>
                <div class="card-body">
                    <div class="attr-row"><span class="attr-label">Active Users</span><span class="attr-value">${c.users}/${c.licensedUsers} (${Math.round(c.users/c.licensedUsers*100)}%)</span></div>
                    <div class="attr-row"><span class="attr-label">DAU Rate</span><span class="attr-value">${c.dau}%</span></div>
                    <div class="attr-row"><span class="attr-label">API Calls (Monthly)</span><span class="attr-value">${c.apiCalls.toLocaleString()}</span></div>
                    <div class="attr-row"><span class="attr-label">Findings Investigated</span><span class="attr-value">${c.findings.toLocaleString()}</span></div>
                    <div class="attr-row"><span class="attr-label">False Positive Rate</span><span class="attr-value">${c.falsePositives}%</span></div>
                    <div class="attr-row"><span class="attr-label">Integrations</span><span class="attr-value">${c.integrations.join(', ') || 'None'}</span></div>
                </div>
            </div>
            <div class="card">
                <div class="card-header"><h3>Feature Adoption</h3></div>
                <div class="card-body">
                    <canvas id="c360UsageChart" height="250"></canvas>
                </div>
            </div>
        </div>
    `;
    // Usage chart
    setTimeout(() => {
        const ctx = document.getElementById('c360UsageChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Threat Detection','SIEM','SOAR','Custom Rules','API','Reporting'],
                    datasets: [{ label: 'Adoption %', data: [
                        Math.min(100, c.dau + 10),
                        c.integrations.includes('SIEM') ? 80 : 10,
                        c.integrations.includes('SOAR') ? 70 : 5,
                        c.dau > 70 ? 60 : 20,
                        Math.min(100, Math.round(c.apiCalls / 300)),
                        c.dau > 50 ? 65 : 25
                    ], backgroundColor: '#4a6cf7' }]
                },
                options: chartOpts('Adoption %')
            });
        }
    }, 100);

    // Surveys Tab
    document.getElementById('tab-surveys').innerHTML = `
        <div class="card"><div class="card-body">
            <div class="nps-big">
                <div class="nps-label">Net Promoter Score</div>
                <div class="nps-score" style="color:var(--${c.nps >= 9 ? 'green' : c.nps >= 7 ? 'yellow' : 'red'})">${c.nps}</div>
            </div>
            <div class="nps-breakdown">
                <div class="nps-segment"><div class="nps-segment-value" style="color:var(--green)">${c.nps >= 9 ? '67%' : c.nps >= 7 ? '33%' : '10%'}</div><div class="nps-segment-label">Promoters</div></div>
                <div class="nps-segment"><div class="nps-segment-value" style="color:var(--yellow)">${c.nps >= 7 ? '22%' : '30%'}</div><div class="nps-segment-label">Passives</div></div>
                <div class="nps-segment"><div class="nps-segment-value" style="color:var(--red)">${c.nps < 7 ? '60%' : '11%'}</div><div class="nps-segment-label">Detractors</div></div>
            </div>
        </div></div>
    `;

    // Reset to summary tab
    document.querySelectorAll('.c360-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.c360-tab-content').forEach(t => t.classList.remove('active'));
    document.querySelector('.c360-tab[data-tab="summary"]').classList.add('active');
    document.getElementById('tab-summary').classList.add('active');
}

// === Chart defaults ===
function chartOpts(yLabel) {
    return {
        responsive: true,
        plugins: { legend: { labels: { color: '#e4e6eb', font: { size: 11 } } } },
        scales: {
            x: { ticks: { color: '#8b8fa3' }, grid: { color: '#2a2e3a' } },
            y: { ticks: { color: '#8b8fa3' }, grid: { color: '#2a2e3a' }, title: { display: true, text: yLabel, color: '#8b8fa3' } }
        }
    };
}
