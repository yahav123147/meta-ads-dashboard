# Meta Ads Data Collector

## Description
Collect daily ad performance data from Meta Ads Manager and fill the dashboard's JSON data file. This skill connects to Meta Ads accounts, pulls campaign metrics broken down by day, and maps them into the dashboard format.

## Trigger
Use this skill when the user asks to:
- "עדכן את הדשבורד" / "Update the dashboard"
- "תמשוך נתונים מ-Meta" / "Pull data from Meta"
- "מלא את הנתונים של החודש" / "Fill this month's data"
- "סנכרן את החשבונות" / "Sync the accounts"

---

## Input Required

### From the User
1. **Which accounts?** — All 5 accounts, or specific account IDs (1-5)
2. **Which month?** — Current month (default) or specific month/year
3. **CRM data available?** — Does the user have registrations, purchases, revenue data?

### From Meta Ads Manager
Connect to the user's Meta Ads accounts and pull the following columns **per day**:

| Field | Meta Ads Column | API Field |
|-------|----------------|-----------|
| `adSpend` | Amount Spent | `spend` |
| `impressions` | Impressions | `impressions` |
| `uniqueClicks` | Unique Link Clicks | `unique_inline_link_clicks` |
| `landingPageViews` | Landing Page Views | `actions[landing_page_view]` |

**Breakdown**: By day (`time_increment=1`)
**Date range**: The selected month (1st to last day)

### From CRM / Manual Input
If the user provides CRM data (spreadsheet, CSV, or manual), map these fields:

| Field | Description |
|-------|-------------|
| `registrations` | Number of signups/opt-ins |
| `purchases` | Number of purchases |
| `orderBumps` | Order bump purchases |
| `upsells` | Upsell purchases |
| `revenue` | **Gross revenue INCLUDING VAT** (₪) |
| `productCost` | Product cost + shipping (₪) |
| `commissions` | Payment processing + affiliate commissions (₪) |

### Optional Fields
| Field | Description |
|-------|-------------|
| `adName` | Name of the ad/creative running that day |
| `notes` | Changes made that day (new creative, audience change, price change) |

---

## Output

### File Location
```
public/ad-data/accounts.json
```

### JSON Structure
```json
{
  "settings": {
    "businessName": "שם העסק",
    "month": 3,
    "year": 2026,
    "vatRate": 18,
    "breakEvenRoas": 2
  },
  "accounts": [
    {
      "id": "1",
      "name": "Actual Meta Account Name",
      "days": [
        {
          "date": "1.3",
          "adSpend": 500,
          "impressions": 15000,
          "uniqueClicks": 320,
          "landingPageViews": 250,
          "registrations": 22,
          "purchases": 8,
          "orderBumps": 2,
          "upsells": 1,
          "revenue": 3500,
          "productCost": 600,
          "commissions": 175,
          "adName": "video_march_v2",
          "notes": ""
        }
      ]
    }
  ],
  "_lastUpdated": "2026-03-13T10:30:00Z",
  "_updatedBy": "manus"
}
```

---

## Rules

1. **One entry per day** — Each day is a separate object in the `days` array. Never aggregate.
2. **Date format**: `"day.month"` — e.g., `"1.3"` for March 1st, `"15.3"` for March 15th. No leading zeros.
3. **Revenue = gross INCLUDING VAT**. The dashboard calculates net automatically using `vatRate`.
4. **Skip inactive days** — Only include days where `adSpend > 0` OR `revenue > 0`.
5. **Account IDs** — Use `"1"` through `"5"`. Match each Meta account to its ID.
6. **Account names** — Use the actual Meta Ads account name, not generic "חשבון 1".
7. **Numbers only** — All numeric fields are plain numbers: `500`, not `"₪500"` or `"500.00"`.
8. **Zero = 0** — If a field has no data, use `0`, not `null` or empty string.
9. **Update metadata** — Set `_lastUpdated` to current ISO timestamp, `_updatedBy` to `"manus"`.
10. **Preserve existing data** — When updating, merge new days with existing ones. Don't delete previous days.

---

## Step-by-Step Workflow

### Step 1: Read Current Data
```
Read public/ad-data/accounts.json
Check which accounts exist and which days already have data
```

### Step 2: Connect to Meta Ads Manager
```
For each ad account (up to 5):
  1. Get account name
  2. Set date range: first day of month → today (or last day if past month)
  3. Set breakdown: by day
  4. Pull: spend, impressions, unique_inline_link_clicks, landing_page_view actions
```

### Step 3: Map Meta Data to JSON
```
For each account:
  For each day with data:
    Create day object with Meta fields
    Set CRM fields to 0 (unless user provided CRM data)
```

### Step 4: Merge CRM Data (if available)
```
If user provided CRM data:
  Match by date
  Fill: registrations, purchases, orderBumps, upsells, revenue, productCost, commissions
```

### Step 5: Write and Validate
```
Write updated accounts.json
Run validation checklist
```

---

## Validation Checklist

Before saving, verify:
- [ ] `settings.month` and `settings.year` match the data period
- [ ] All `date` fields use `"day.month"` format (no leading zeros)
- [ ] `revenue` includes VAT
- [ ] Each account has correct `id` ("1" through "5")
- [ ] No duplicate days in any account
- [ ] `_lastUpdated` is set to current ISO timestamp
- [ ] Account names match actual Meta account names
- [ ] All numeric fields are numbers (not strings)
- [ ] No days with all-zero data (skip those)

---

## What the Dashboard Calculates Automatically

You do NOT need to calculate these — the dashboard does it:
- CTR % = uniqueClicks / impressions × 100
- CPC ₪ = adSpend / uniqueClicks
- CPM ₪ = adSpend / impressions × 1000
- Landing Page Rate % = landingPageViews / uniqueClicks × 100
- Registration Rate % = registrations / landingPageViews × 100
- Purchase Rate % = purchases / registrations × 100
- OB Rate % = orderBumps / purchases × 100
- Upsell Rate % = upsells / purchases × 100
- CPA ₪ = adSpend / purchases
- Revenue Before VAT = revenue / (1 + vatRate/100)
- Net Profit ₪ = revenueBeforeVat - adSpend - productCost - commissions
- ROAS = revenue / adSpend

---

## Error Handling

| Scenario | Action |
|----------|--------|
| Meta API unavailable | Tell user, suggest manual entry |
| Account not found | List available accounts, ask user to pick |
| Partial data (some days missing) | Fill what's available, note gaps |
| CRM data format mismatch | Show expected format, ask to re-format |
| Existing data conflict | Keep newer data, warn user about overwrites |
