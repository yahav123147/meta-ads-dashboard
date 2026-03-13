# Meta Ads Dashboard — Skills

Three AI skills for managing Meta Ads performance data.

## Available Skills

### 1. [Meta Ads Data Collector](./meta-ads-collector/SKILL.md)
Pulls daily ad performance data from Meta Ads Manager and fills the dashboard.
- Connects to up to 5 Meta ad accounts
- Maps spend, impressions, clicks, conversions per day
- Merges with CRM/revenue data
- **Trigger**: "עדכן את הדשבורד" / "Pull data from Meta"

### 2. [Ad Performance Analyzer](./ad-performance-analyzer/SKILL.md)
Analyzes dashboard data and provides actionable recommendations.
- 6 diagnostic checks (CTR, Registration Rate, Purchase Rate, CPM, CPA, ROAS)
- Week-over-week trend analysis
- Funnel bottleneck detection
- Ad leaderboard ranking
- **Trigger**: "תנתח את הקמפיינים" / "What's working?"

### 3. [Weekly Report Generator](./weekly-report-generator/SKILL.md)
Generates formatted performance reports from dashboard data.
- 4 formats: WhatsApp, Email (HTML), PDF (JSON), Quick Summary
- Weekly and monthly report types
- Week-over-week comparison
- Per-account breakdown
- **Trigger**: "תייצר דו"ח שבועי" / "Generate weekly report"

## Data File
All skills read from / write to:
```
public/ad-data/accounts.json
```

## Usage with Manus
Share this repository with Manus. Import individual skills by pointing to the skill folder.
