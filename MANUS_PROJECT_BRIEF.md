# Meta Ads Dashboard — Manus Project Brief

## Project Type: `web-db-user`

## Overview
דשבורד מעקב פרסום ממומן ב-Meta Ads לבעלי עסקים.
כל יוזר מתחבר, מוסיף את חשבונות הפרסום שלו, ורואה תמונה מלאה: כמה הוציא, כמה הרוויח, ואיפה הבעיה.

---

## Features

### 1. User Authentication
- כל יוזר נכנס עם "התחבר עם Manus"
- כל יוזר רואה רק את הנתונים שלו

### 2. Multi-Account Support
- כל יוזר יכול להוסיף עד 10 חשבונות Meta Ads
- כל חשבון = שם + נתונים יומיים
- אפשרות להוסיף / למחוק / לשנות שם חשבון

### 3. Navigation — Tabs
- **טאב "סיכום"** — צבירה של כל החשבונות יחד
- **טאב לכל חשבון** — נתונים של החשבון הספציפי
- Tab bar עם אייקון + שם + הוצאה חודשית בכל טאב

### 4. Settings (per user)
- שם העסק
- חודש + שנה (בחירה)
- אחוז מע"מ (ברירת מחדל: 18%)
- ROAS Break-Even (ברירת מחדל: 2)

### 5. Daily Data Entry — Table
טבלה עם שורה לכל יום בחודש. העמודות:

**קלט מ-Meta Ads Manager (4 עמודות):**
| Field | Label | Type |
|-------|-------|------|
| adSpend | הוצאה ₪ | number |
| impressions | חשיפות | number |
| uniqueClicks | קליקים יחודיים | number |
| landingPageViews | הגיעו לדף | number |

**קלט מה-CRM (4 עמודות):**
| Field | Label | Type |
|-------|-------|------|
| registrations | נרשמו | number |
| purchases | רכשו | number |
| orderBumps | OB | number |
| upsells | אפסייל | number |

**קלט כספי (3 עמודות):**
| Field | Label | Type |
|-------|-------|------|
| revenue | הכנסה ₪ | number (ברוטו כולל מע"מ) |
| productCost | עלות ₪ | number |
| commissions | עמלות ₪ | number |

**שדות אופציונליים:**
| Field | Label | Type |
|-------|-------|------|
| adName | שם מודעה | text |
| notes | מה השתנה? | text |

### 6. Calculated Metrics (AUTO — per day row)
המערכת מחשבת אוטומטית לכל שורה:

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

חלוקה ב-0 = מחזיר 0 (לא error).

### 7. KPI Cards (top of dashboard)
4 כרטיסים בראש הדשבורד:

1. **הוצאה כוללת** — סה"כ adSpend
2. **הכנסה כוללת** — סה"כ revenue
3. **רווח נקי** — סה"כ net profit (ירוק אם חיובי, אדום אם שלילי)
4. **ROAS** — revenue / adSpend (ירוק אם >= breakEvenRoas)

### 8. Time Period Toggle
3 כפתורים מעל הטבלה:
- **יומי** — שורה לכל יום (ברירת מחדל, עריכה)
- **שבועי** — צבירה ל-7 ימים (קריאה בלבד)
- **חודשי** — שורה אחת מסכמת (קריאה בלבד)

### 9. Best Day Highlights
- סימון 🏆 ליום עם ה-CTR הכי גבוה
- סימון 🏆 ליום עם עלות/צפייה בדף הכי נמוכה
- סימון 🏆 ליום עם אחוז רישום הכי גבוה
- באנר "שיאי החודש" מעל הטבלה

### 10. Today Marker
- השורה של היום מסומנת בצבע כחול + אייקון נקודה
- Sticky column לתאריך

### 11. Funnel Visualization
בר ויזואלי שמראה את המשפך:
```
חשיפות → קליקים → הגיעו לדף → נרשמו → רכשו → OB → Upsell
```
עם אחוזי המרה בין כל שלב.

### 12. Daily Trend Chart
גרף קו של הוצאה יומית + הכנסה (כחול + ירוק).

### 13. Diagnostics — Automatic Analysis
6 כרטיסי אבחון:

| Metric | Threshold | Good | Bad |
|--------|-----------|------|-----|
| CTR | >= 1.5% | "המודעה מושכת קליקים" | "שנה קריאייטיב / קהל" |
| Registration Rate | >= 8% | "הדף ממיר טוב" | "שפר כותרת / הצעה" |
| Purchase Rate | >= 20% | "תהליך המכירה עובד" | "בדוק מחיר / הצעה" |
| CPM | <= 40₪ | "עלות חשיפה סבירה" | "הקהל יקר" |
| CPA | <= breakEvenCPA | "עלות רכישה בטווח" | "עלות גבוהה!" |
| ROAS | >= breakEvenRoas | "רווחי" | "מפסיד!" |

כל כרטיס כולל progress bar.

### 14. Ad Leaderboard
טבלת מובילי מודעות — מקבצת לפי שדה `adName`:
- שם מודעה
- מספר ימים שרצה
- סה"כ הוצאה
- סה"כ הכנסה
- ROAS
- CPA
- מספר תוצאות (לפי campaign goal)

### 15. Summary Tab — Cross-Account View
כשנבחר טאב "סיכום":
- KPI cards מצטברים מכל החשבונות
- כרטיסי פירוט לכל חשבון (הוצאה + רווח + ROAS)
- טבלה מצטברת (כל היומים מחוברים)
- לחיצה על כרטיס חשבון → מעבר לטאב שלו

### 16. JSON Import/Export
- כפתור ייצוא — מוריד JSON עם כל הנתונים
- כפתור ייבוא — מקבל JSON ומעדכן
- תומך בפורמט חשבון בודד וגם מרובה חשבונות

---

## Design

### Theme: Dark Glassmorphism
- רקע: `#060609`
- כרטיסים: `rgba(255,255,255,0.03)` + `border: 1px solid rgba(255,255,255,0.06)` + `backdrop-blur`
- טקסט ראשי: לבן
- טקסט משני: `#9ca3af`
- אקסנט: כחול (`#3b82f6`)
- חיובי: ירוק (`#10b981`)
- שלילי: אדום (`#ef4444`)

### Table Theme: Light (for readability)
- הטבלה עצמה על רקע **לבן** עם טקסט כהה
- Header: `#f9fafb`
- Alternating rows: white / `#f9fafb`
- Group headers: כחול / סגול / ירוק / סגול בהיר

### Typography
- Font: "Assistant" (Hebrew)
- כותרת ראשית: 4xl-5xl bold
- כרטיסי KPI: 3xl bold
- טבלה: sm (14px)

### Layout
- RTL (dir="rtl")
- Max width: 1700px
- Mobile responsive
- Horizontal scroll on table for mobile

---

## Database Schema

### Users table
```
id, email, name, created_at
```

### Settings table
```
id, user_id, business_name, month, year, vat_rate, break_even_roas, campaign_goal
```

### Accounts table
```
id, user_id, name, sort_order, created_at
```

### DailyData table
```
id, account_id, date, ad_spend, impressions, unique_clicks, landing_page_views,
registrations, purchases, order_bumps, upsells, revenue, product_cost, commissions,
ad_name, notes, created_at, updated_at
```

---

## Language
- כל הממשק בעברית
- RTL layout
- Font: Assistant from Google Fonts
