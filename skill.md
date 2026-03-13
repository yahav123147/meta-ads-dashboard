# Meta Ads Dashboard — Data Collection Skill

## Description
Fill a Meta Ads performance dashboard with daily data from multiple ad accounts. The dashboard tracks spend, impressions, clicks, conversions, revenue, and profitability across 5 Meta ad accounts.

## Your Task
Update the file `public/ad-data/accounts.json` with daily ad performance data.

---

## Data File Location
```
public/ad-data/accounts.json
```

## Data Sources

### From Meta Ads Manager (per account, per day)
| Field | Meta Ads Column | Description |
|-------|----------------|-------------|
| `adSpend` | Amount Spent | Daily spend in ₪ |
| `impressions` | Impressions | Total impressions |
| `uniqueClicks` | Unique Link Clicks | Unique clicks on the link |
| `landingPageViews` | Landing Page Views | People who actually reached the page |

### From CRM / Website (per day)
| Field | Source | Description |
|-------|--------|-------------|
| `registrations` | CRM / opt-in forms | Number of signups |
| `purchases` | CRM / checkout | Number of purchases |
| `orderBumps` | Checkout | Order bump purchases |
| `upsells` | Post-checkout | Upsell purchases |
| `revenue` | Accounting | **Gross revenue INCLUDING VAT** (all: sale + OB + upsells) |

### From Accounting (per day)
| Field | Source | Description |
|-------|--------|-------------|
| `productCost` | Accounting | Product cost + shipping ₪ |
| `commissions` | Accounting | Payment processing + affiliate commissions ₪ |

### Optional
| Field | Description |
|-------|-------------|
| `adName` | Name of the ad running that day (for ad leaderboard) |
| `notes` | Changes made that day (new creative, new audience, price change, etc.) |

---

## JSON Structure

The file `public/ad-data/accounts.json` must follow this exact structure:

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
      "name": "Account Name From Meta",
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
    },
    {
      "id": "2",
      "name": "Second Account",
      "days": []
    }
  ],
  "_lastUpdated": "2026-03-13T10:30:00Z",
  "_updatedBy": "manus"
}
```

---

## Rules

1. **One entry per day** — Do NOT aggregate into weeks. Each day is a separate object.
2. **Date format**: `"day.month"` — e.g., `"1.3"` for March 1st, `"15.3"` for March 15th.
3. **Revenue = gross including VAT**. The dashboard calculates net automatically.
4. **Skip inactive days** — Only include days with actual ad spend or revenue.
5. **Each account = separate Meta ad account**. Use ids `"1"` through `"5"`.
6. **Update `_lastUpdated`** with ISO timestamp when you write the file.
7. **Update `_updatedBy`** with `"manus"`.
8. **All numbers are plain numbers** — no currency symbols, no commas. Just `500`, not `"₪500"`.
9. **Account names** — Use the actual Meta ad account names.

---

## Workflow

1. Open Meta Ads Manager
2. For each ad account:
   a. Set date range to the current month
   b. Set breakdown to "Day"
   c. Collect: Amount Spent, Impressions, Unique Link Clicks, Landing Page Views
   d. Map each day's data to the correct account in `accounts.json`
3. Get CRM/revenue data (from CRM dashboard, Stripe, or provided spreadsheet)
4. Fill in `revenue`, `registrations`, `purchases`, `orderBumps`, `upsells`
5. Fill in `productCost` and `commissions` from accounting
6. Save `public/ad-data/accounts.json`
7. Commit and push

---

## What the Dashboard Calculates Automatically

You do NOT need to calculate these:
- CTR % (clicks / impressions)
- CPC ₪ (spend / clicks)
- CPM ₪ (cost per 1,000 impressions)
- Landing page view rate %
- Registration rate %
- Purchase rate %
- Order Bump & Upsell rates %
- CPA ₪ (cost per acquisition)
- Net profit ₪
- ROAS (return on ad spend)
- Automatic diagnostics (what's working, what's not)

---

## Validation Checklist

Before saving, verify:
- [ ] `month` and `year` in settings match the data period
- [ ] All `date` fields use `"day.month"` format
- [ ] `revenue` includes VAT
- [ ] Each account has the correct `id` ("1" through "5")
- [ ] No duplicate days in any account
- [ ] `_lastUpdated` is set
