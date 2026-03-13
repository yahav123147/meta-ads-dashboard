---
name: Weekly Report Generator
description: Generate formatted weekly and monthly performance reports from Meta Ads data
version: 1.0.0
author: yahav
---

# Weekly Report Generator

## Description
Generate a concise, professional weekly or monthly performance report from the Meta Ads dashboard data. The report can be output as formatted text (for WhatsApp/Telegram), HTML (for email), or structured data (for PDF generation). Designed for business owners who want a quick summary without opening the dashboard.

## Trigger
Use this skill when the user asks to:
- "תייצר דו"ח שבועי" / "Generate a weekly report"
- "שלח לי סיכום" / "Send me a summary"
- "מה קרה השבוע?" / "What happened this week?"
- "תכין דו"ח חודשי" / "Prepare a monthly report"
- "אני צריך דו"ח ללקוח" / "I need a report for my client"
- "תכין הודעה לוואטסאפ" / "Prepare a WhatsApp message"

---

## Input

### Data Source
```
public/ad-data/accounts.json
```

### Parameters
| Parameter | Description | Default |
|-----------|-------------|---------|
| `period` | "weekly" or "monthly" | "weekly" |
| `format` | "whatsapp", "email", "pdf", "summary" | "whatsapp" |
| `accounts` | "all" or specific account IDs | "all" |
| `compareToLastPeriod` | Include week-over-week comparison | true |
| `language` | "he" (Hebrew) or "en" (English) | "he" |

---

## Calculations

### For the Report Period
Aggregate all days in the period and calculate:

```
Total Spend = sum(adSpend)
Total Revenue = sum(revenue)
Revenue Before VAT = Total Revenue / (1 + vatRate/100)
Total Profit = Revenue Before VAT - Total Spend - sum(productCost) - sum(commissions)
ROAS = Total Revenue / Total Spend
Avg CPA = Total Spend / sum(purchases)
Avg CTR = sum(uniqueClicks) / sum(impressions) × 100
Avg CPM = Total Spend / sum(impressions) × 1000
Total Purchases = sum(purchases)
Total Registrations = sum(registrations)
Conversion Rate = sum(purchases) / sum(registrations) × 100
OB Rate = sum(orderBumps) / sum(purchases) × 100
Upsell Rate = sum(upsells) / sum(purchases) × 100
```

### Week-over-Week Change
```
Change% = ((thisWeek - lastWeek) / lastWeek) × 100
```
Show as ↑ or ↓ with percentage.

---

## Output Formats

### Format 1: WhatsApp Message (Default)

Short, emoji-rich, easy to read on mobile. Maximum 2000 characters.

```
📊 דו"ח שבועי — [שם העסק]
📅 [תאריך התחלה] - [תאריך סיום]

💰 סיכום מהיר:
┌─────────────────────┐
│ הוצאה:  ₪[X,XXX]     │
│ הכנסה:  ₪[X,XXX]     │
│ רווח:   ₪[X,XXX] [🟢/🔴] │
│ ROAS:   [X.X]        │
└─────────────────────┘

📈 השוואה לשבוע שעבר:
• הוצאה: [↑/↓ X%]
• הכנסה: [↑/↓ X%]
• רווח: [↑/↓ X%]
• ROAS: [↑/↓ X%]

🎯 מדדים עיקריים:
• CTR: [X.X%] [↑/↓]
• עלות קליק: ₪[X.X] [↑/↓]
• עלות רכישה: ₪[X] [↑/↓]
• רכישות: [X] [↑/↓]
• נרשמו: [X] [↑/↓]
• המרה למכירה: [X%] [↑/↓]

[If multiple accounts:]
📋 לפי חשבון:
• [Account 1]: ₪[spend] → ₪[revenue] | ROAS [X.X]
• [Account 2]: ₪[spend] → ₪[revenue] | ROAS [X.X]
...

🏆 הישגים:
• יום שיא: [date] — ROAS [X.X]
• מודעה מנצחת: [adName] — ROAS [X.X]

[If issues found:]
⚠️ שים לב:
• [issue 1 — one line]
• [issue 2 — one line]

💡 המלצה מרכזית:
[One key action item in 1-2 sentences]
```

### Format 2: Email Report (HTML)

Professional HTML email with:
- Company header with logo placeholder
- KPI cards (spend, revenue, profit, ROAS) with color coding
- Comparison table (this week vs. last week)
- Per-account breakdown (if multiple)
- Funnel visualization (text-based)
- Top 3 recommendations
- Footer with dashboard link

```html
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Assistant', Arial, sans-serif; direction: rtl; background: #f5f5f5; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; }
    .header { background: #060609; color: white; padding: 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .header p { color: #9ca3af; margin: 8px 0 0; }
    .kpi-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #e5e7eb; }
    .kpi-card { background: white; padding: 20px; text-align: center; }
    .kpi-value { font-size: 28px; font-weight: 800; }
    .kpi-label { color: #6b7280; font-size: 14px; }
    .kpi-change { font-size: 13px; margin-top: 4px; }
    .positive { color: #10b981; }
    .negative { color: #ef4444; }
    .section { padding: 20px 24px; }
    .section h2 { font-size: 18px; border-bottom: 2px solid #3b82f6; padding-bottom: 8px; }
    table { width: 100%; border-collapse: collapse; font-size: 14px; }
    th { background: #f9fafb; padding: 10px; text-align: right; }
    td { padding: 10px; border-bottom: 1px solid #f3f4f6; }
    .recommendation { background: #eff6ff; border-right: 4px solid #3b82f6; padding: 12px 16px; margin: 8px 0; border-radius: 0 8px 8px 0; }
    .footer { background: #f9fafb; padding: 16px 24px; text-align: center; color: #9ca3af; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 דו"ח [שבועי/חודשי]</h1>
      <p>[שם העסק] — [תאריכים]</p>
    </div>

    <div class="kpi-grid">
      <!-- KPI cards here -->
    </div>

    <div class="section">
      <h2>📈 השוואה לתקופה קודמת</h2>
      <!-- Comparison table -->
    </div>

    <div class="section">
      <h2>🔧 המלצות</h2>
      <!-- Recommendation cards -->
    </div>

    <div class="footer">
      דו"ח זה נוצר אוטומטית מ"אצבע על הדופק"<br>
      <a href="[dashboard-url]">פתח את הדשבורד המלא →</a>
    </div>
  </div>
</body>
</html>
```

### Format 3: PDF-Ready (Structured JSON)

Output structured JSON that can be fed to a PDF generator:

```json
{
  "reportType": "weekly",
  "businessName": "שם העסק",
  "period": {
    "start": "2026-03-07",
    "end": "2026-03-13",
    "label": "7-13 מרץ 2026"
  },
  "summary": {
    "totalSpend": 3500,
    "totalRevenue": 12000,
    "netProfit": 4200,
    "roas": 3.4,
    "totalPurchases": 28,
    "avgCPA": 125,
    "profitStatus": "positive"
  },
  "comparison": {
    "spend": { "current": 3500, "previous": 3200, "changePercent": 9.4 },
    "revenue": { "current": 12000, "previous": 10500, "changePercent": 14.3 },
    "profit": { "current": 4200, "previous": 3800, "changePercent": 10.5 },
    "roas": { "current": 3.4, "previous": 3.3, "changePercent": 3.0 }
  },
  "accounts": [
    {
      "name": "Account Name",
      "spend": 2000,
      "revenue": 7000,
      "roas": 3.5,
      "purchases": 16
    }
  ],
  "highlights": {
    "bestDay": { "date": "10.3", "metric": "ROAS", "value": 4.8 },
    "bestAd": { "name": "video_v3", "roas": 4.2, "revenue": 5000 }
  },
  "recommendations": [
    {
      "priority": "high",
      "title": "הגדל תקציב למודעה X",
      "reason": "ROAS 4.2 — הכי רווחית",
      "action": "הגדל ב-20% ועקוב 3 ימים"
    }
  ],
  "generatedAt": "2026-03-13T18:00:00Z"
}
```

### Format 4: Quick Summary (One Paragraph)

For Slack, SMS, or quick update:

```
📊 [שם העסק] — שבוע [dates]: הוצאה ₪[X] | הכנסה ₪[X] | רווח ₪[X] [🟢/🔴] | ROAS [X.X] [↑/↓X%]. [One key insight]. [One action item].
```

---

## Report Logic

### Weekly Report
- **Period**: Last 7 days with data (or specific week if requested)
- **Comparison**: Previous 7 days
- **Include**: All metrics, per-account breakdown, top ad, best day

### Monthly Report
- **Period**: Full calendar month
- **Comparison**: Previous month (if data available)
- **Include**: All metrics + monthly trends (week-by-week within month) + cumulative charts data
- **Extra sections**:
  - Week-by-week breakdown within the month
  - Best/worst week
  - Running total progression

---

## Formatting Rules

1. **Money**: Always with ₪ symbol and comma separators: `₪12,500`
2. **Percentages**: One decimal: `1.8%`, `23.5%`
3. **ROAS**: One decimal: `3.4`
4. **Changes**: Arrow + percentage: `↑ 12.3%` or `↓ 8.7%`
5. **Positive = green**: 🟢 or `positive` class
6. **Negative = red**: 🔴 or `negative` class
7. **Hebrew**: All labels and text in Hebrew
8. **RTL**: All HTML is dir="rtl"
9. **Dates**: Hebrew format: `7-13 מרץ 2026`
10. **Round up**: Don't show `₪3,456.78` — show `₪3,457`

---

## Scheduling Hint

Suggest to the user:
- **Weekly report**: Every Sunday morning (covers Sun-Sat or Mon-Sun)
- **Monthly report**: 1st of the following month
- Can be triggered automatically or on-demand

---

## Edge Cases

| Scenario | Action |
|----------|--------|
| Less than 7 days of data | Generate report for available days, note "partial week" |
| No previous period for comparison | Skip comparison section, show absolute numbers only |
| Single account only | Skip per-account breakdown |
| No ad names | Skip ad leaderboard section |
| All zeros | Show "אין נתונים לתקופה זו" |
| Mixed currencies | Always show in ₪ (shekel) |
