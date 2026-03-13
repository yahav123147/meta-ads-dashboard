# Meta Ads Dashboard — Skills Hub

## Description
AI-powered Meta Ads performance dashboard with 3 integrated skills for data collection, analysis, and reporting across up to 5 ad accounts.

## Available Skills

| # | Skill | Folder | Description |
|---|-------|--------|-------------|
| 1 | **Meta Ads Data Collector** | `skills/meta-ads-collector/` | Pull daily data from Meta Ads Manager → fill dashboard |
| 2 | **Ad Performance Analyzer** | `skills/ad-performance-analyzer/` | Analyze data → diagnose problems → give recommendations |
| 3 | **Weekly Report Generator** | `skills/weekly-report-generator/` | Generate formatted reports (WhatsApp / Email / PDF) |

## Quick Start

### Collect Data
Say: "עדכן את הדשבורד" or "Pull data from Meta"
→ Runs **Meta Ads Data Collector**
→ Fills `public/ad-data/accounts.json`

### Analyze Performance
Say: "תנתח את הקמפיינים" or "What's working and what's not?"
→ Runs **Ad Performance Analyzer**
→ Returns diagnostics + actionable recommendations in Hebrew

### Generate Report
Say: "תייצר דו"ח שבועי" or "Generate weekly report"
→ Runs **Weekly Report Generator**
→ Returns formatted report (WhatsApp / Email / PDF / Quick Summary)

## Data File
All skills share one data file:
```
public/ad-data/accounts.json
```

## Dashboard
The visual dashboard is at the root of this project — a Next.js app that reads `accounts.json` and displays:
- KPI cards (spend, revenue, profit, ROAS)
- Daily data table with calculated metrics
- Funnel visualization
- Trend charts
- Automatic diagnostics
- Multi-account tabs + summary view
- Daily / Weekly / Monthly time period toggle

## Skill Details
See each skill's `SKILL.md` for full documentation:
- [Meta Ads Data Collector](skills/meta-ads-collector/SKILL.md)
- [Ad Performance Analyzer](skills/ad-performance-analyzer/SKILL.md)
- [Weekly Report Generator](skills/weekly-report-generator/SKILL.md)
