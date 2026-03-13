---
name: Ad Performance Analyzer
description: Analyze Meta Ads data and provide actionable diagnostics and recommendations
version: 1.0.0
author: yahav
---

# Ad Performance Analyzer

## Description
Analyze Meta Ads performance data from the dashboard and provide actionable diagnostics, recommendations, and optimization insights. This skill reads the dashboard data, calculates KPIs, identifies problems and opportunities, and tells the user exactly what to do.

## Trigger
Use this skill when the user asks to:
- "תנתח את הקמפיינים" / "Analyze my campaigns"
- "מה עובד ומה לא?" / "What's working and what's not?"
- "למה אני מפסיד כסף?" / "Why am I losing money?"
- "תן לי המלצות" / "Give me recommendations"
- "איזו מודעה הכי טובה?" / "Which ad is performing best?"
- "מה צריך לשנות?" / "What should I change?"

---

## Input

### Data Source
Read the dashboard data from:
```
public/ad-data/accounts.json
```

### Settings Context
From `settings` object:
- `vatRate` — For calculating net revenue (default: 18%)
- `breakEvenRoas` — ROAS target to break even (default: 2)

---

## Analysis Framework

### Step 1: Calculate Core Metrics (per account, per day)

```
CTR% = (uniqueClicks / impressions) × 100
CPC₪ = adSpend / uniqueClicks
CPM₪ = (adSpend / impressions) × 1000
Landing Page Rate% = (landingPageViews / uniqueClicks) × 100
Registration Rate% = (registrations / landingPageViews) × 100
Purchase Rate% = (purchases / registrations) × 100
OB Rate% = (orderBumps / purchases) × 100
Upsell Rate% = (upsells / purchases) × 100
CPA₪ = adSpend / purchases
Revenue Before VAT = revenue / (1 + vatRate/100)
Net Profit₪ = revenueBeforeVat - adSpend - productCost - commissions
ROAS = revenue / adSpend
```

**Division by zero = 0** (not error).

### Step 2: Aggregate by Period

Calculate totals and averages for:
- **This week** (last 7 days with data)
- **Last week** (7 days before that)
- **Month to date** (all days this month)
- **Per account** (if multiple accounts)

### Step 3: Run Diagnostic Checks

Apply these **6 diagnostic rules** to the aggregated data:

| # | Metric | Good Threshold | Status if Good | Status if Bad | Recommendation if Bad |
|---|--------|---------------|----------------|---------------|----------------------|
| 1 | **CTR** | >= 1.5% | ✅ "המודעה מושכת קליקים" | ⚠️ "CTR נמוך" | "שנה קריאייטיב או קהל. הוק חזק יותר ב-3 שניות הראשונות" |
| 2 | **Registration Rate** | >= 8% | ✅ "הדף ממיר טוב" | ⚠️ "דף נחיתה חלש" | "שפר כותרת, הצעה, או מהירות טעינה" |
| 3 | **Purchase Rate** | >= 20% | ✅ "תהליך המכירה עובד" | ⚠️ "המרה למכירה נמוכה" | "בדוק מחיר, הצעה, אמון, או תהליך תשלום" |
| 4 | **CPM** | <= ₪40 | ✅ "עלות חשיפה סבירה" | ⚠️ "קהל יקר" | "הרחב קהל יעד או שנה מיקום" |
| 5 | **CPA** | <= breakEvenCPA | ✅ "עלות רכישה בטווח" | 🚨 "עלות רכישה גבוהה!" | "הורד CPC או שפר המרה בדף" |
| 6 | **ROAS** | >= breakEvenRoas | ✅ "רווחי" | 🚨 "מפסיד!" | "בדוק את כל שלבי המשפך" |

**breakEvenCPA** = average revenue per purchase / breakEvenRoas

### Step 4: Identify Trends

Compare **this week vs. last week** for each metric:
- **Improving** (↑ 10%+): Highlight in green
- **Stable** (±10%): Note as stable
- **Declining** (↓ 10%+): Highlight in red with action item

### Step 5: Find Winners & Losers

#### Best Performers
- Day with highest CTR → "🏆 שיא CTR"
- Day with lowest CPA → "🏆 עלות רכישה הכי נמוכה"
- Day with highest registration rate → "🏆 שיא רישום"
- Day with highest ROAS → "🏆 שיא ROAS"

#### Ad Leaderboard (if `adName` data exists)
Group by `adName` and rank by:
1. ROAS (highest first)
2. Total revenue
3. CPA (lowest first)

### Step 6: Funnel Bottleneck Analysis

Identify the **weakest link** in the funnel:
```
חשיפות → קליקים → הגיעו לדף → נרשמו → רכשו → OB → Upsell
```

For each step, calculate the drop-off rate. The step with the **largest drop vs. benchmark** is the bottleneck.

**Benchmarks:**
| Funnel Step | Good Rate | Warning Rate |
|-------------|-----------|-------------|
| Click Rate (CTR) | >= 1.5% | < 0.8% |
| Landing Page Rate | >= 70% | < 50% |
| Registration Rate | >= 8% | < 4% |
| Purchase Rate | >= 20% | < 10% |
| Order Bump Rate | >= 30% | < 15% |
| Upsell Rate | >= 15% | < 5% |

---

## Output Format

### Hebrew Analysis Report

Structure the output as a clear, actionable Hebrew report:

```
## 📊 ניתוח ביצועים — [שם העסק] — [חודש/שנה]

### 🎯 סיכום מהיר
- **הוצאה כוללת**: ₪X
- **הכנסה כוללת**: ₪X
- **רווח נקי**: ₪X (🟢 רווחי / 🔴 הפסד)
- **ROAS**: X.X (🟢 מעל יעד / 🔴 מתחת ליעד)

### 🔍 אבחון — מה עובד ומה לא

#### ✅ עובד טוב
- [metric]: [value] — [explanation]

#### ⚠️ דורש תשומת לב
- [metric]: [value] — [explanation + specific action]

#### 🚨 בעיה קריטית
- [metric]: [value] — [explanation + urgent action]

### 📈 טרנדים (השוואה לשבוע קודם)
- CTR: X.X% → X.X% (↑/↓ X%)
- CPA: ₪X → ₪X (↑/↓ X%)
- ROAS: X.X → X.X (↑/↓ X%)

### 🏆 מובילים
- מודעה מנצחת: [adName] — ROAS X.X, ₪X הכנסה
- יום שיא: [date] — [metric] [value]

### 🔧 המלצות — מה לעשות עכשיו

#### 1. [פעולה ראשונה — הכי דחופה]
**מה**: [תיאור]
**למה**: [הנתון שמראה את הבעיה]
**איך**: [צעדים ספציפיים]

#### 2. [פעולה שנייה]
...

#### 3. [פעולה שלישית]
...

### 📊 צוואר בקבוק במשפך
[שם השלב] — [rate]% (יעד: [benchmark]%)
→ [המלצה ספציפית לשיפור]
```

---

## Recommendation Templates

Use these templates for common scenarios:

### CTR Low (< 1.5%)
```
⚠️ CTR נמוך: X.X%
הקהל רואה את המודעה אבל לא לוחץ.
→ שנה את ה-Hook ב-3 השניות הראשונות של הוידאו
→ נסה קריאייטיב חדש (UGC, Before/After, סטורי)
→ בדוק אם הקהל רלוונטי — שקול Lookalike חדש
```

### Landing Page Rate Low (< 70%)
```
⚠️ רק X% מהמקליקים מגיעים לדף
אנשים לוחצים אבל הדף לא נטען או שהם יוצאים.
→ בדוק מהירות טעינת דף (יעד: < 3 שניות)
→ ודא שהדף מתאים למובייל
→ בדוק התאמה בין המודעה לדף (Message Match)
```

### Registration Rate Low (< 8%)
```
⚠️ רק X% נרשמים מתוך מי שהגיע לדף
הדף לא משכנע מספיק להירשם.
→ שפר את הכותרת הראשית — ההבטחה חייבת להיות ברורה ב-3 שניות
→ הוסף Proof (עדויות, מספרים, לוגואים)
→ פשט את הטופס — שם + טלפון מספיק
```

### Purchase Rate Low (< 20%)
```
⚠️ רק X% רוכשים מתוך הנרשמים
אנשים נרשמים אבל לא קונים.
→ בדוק את המחיר — אולי גבוה מדי לקהל
→ הוסף urgency (מחיר עולה, מקומות מוגבלים)
→ שפר את הצעת הערך — מה הם מקבלים?
→ בדוק את תהליך התשלום — חיכוך מיותר?
```

### CPA Too High
```
🚨 עלות רכישה: ₪X (יעד: ₪X)
אתה משלם יותר מדי על כל לקוח.
→ אם CTR טוב אבל המרה נמוכה → בעיה בדף/משפך
→ אם CTR נמוך → בעיה במודעה/קהל
→ שקול לסגור קהלים שלא ממירים
→ בדוק Frequency — אם > 3, הקהל נשחק
```

### ROAS Below Break-Even
```
🚨 ROAS: X.X (יעד: X.X) — אתה מפסיד!
כל ₪1 שמושקע מחזיר רק ₪X.X
→ בדוק איזה חשבון/מודעה הכי מפסיד — סגור אותם
→ הגדל תקציב למודעות עם ROAS > [breakEvenRoas]
→ אם כל המודעות מפסידות → בעיה במשפך, לא במודעה
```

### Spend Increasing, Results Stable
```
⚠️ ההוצאה עלתה ב-X% אבל התוצאות לא
סימן לשחיקת קהל או עליית מחירי מדיה.
→ בדוק Frequency — אם עולה, הקהל נשחק
→ נסה קהלים חדשים (Lookalike 3-5%, Interest חדש)
→ רענן קריאייטיב — מודעה שרצה > 2 שבועות צריכה חילוף
```

---

## Cross-Account Analysis

When analyzing multiple accounts:

1. **Compare accounts** — Which account has best ROAS? Worst?
2. **Budget allocation** — Suggest moving budget from losing accounts to winning ones
3. **Pattern matching** — Do all accounts have the same bottleneck? (probably a funnel issue, not ad issue)

---

## Rules

1. **Always be specific** — "CTR 0.8% (צריך 1.5%)" not just "CTR נמוך"
2. **Always give actions** — Every problem gets a "מה לעשות" section
3. **Prioritize by impact** — 🚨 first, then ⚠️, then ✅
4. **Use ₪ for money** — ₪500, not 500 שקל
5. **Round smartly** — Percentages: 1 decimal. Money: whole numbers. ROAS: 1 decimal.
6. **Hebrew output** — All analysis in Hebrew, RTL-friendly
7. **Compare to benchmarks** — Always show "you have X, target is Y"
8. **No vanity metrics** — Focus on profit, not impressions
9. **Account for VAT** — Always calculate profit using revenue / (1 + vatRate/100)
