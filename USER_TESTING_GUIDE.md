# User Testing Guide - Inversion Analytics Platform

**Production URL:** https://axiom-gzp3hpzmg-somtonweke1s-projects.vercel.app

**Demo Page:** https://axiom-gzp3hpzmg-somtonweke1s-projects.vercel.app/demo

**Date:** November 6, 2025

---

## Quick Start for External Testers

### What You'll Be Testing

This is a scientific platform for modeling PFAS (forever chemicals) treatment using Granular Activated Carbon (GAC). You'll test:
- Interactive geographic maps
- Data upload and validation
- Breakthrough curve predictions
- Statistical analysis results

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No technical knowledge required
- ~15 minutes testing time

---

## Testing Flow

### Phase 1: Explore the Demo Page (5 minutes)

1. **Visit the Demo Page:**
   - URL: https://axiom-gzp3hpzmg-somtonweke1s-projects.vercel.app/demo
   - Read the platform description
   - Understand what the platform does

2. **Download Test Data:**
   - Click "Download demo-hazen-dataset.json" button
   - Save the file to your computer
   - This contains real-world test data from Flint, Michigan

---

### Phase 2: Test the Admin Dashboard (3 minutes)

1. **Navigate to Dashboard:**
   - Click "View Dashboard" or go to `/admin/dashboard`
   - URL: https://axiom-gzp3hpzmg-somtonweke1s-projects.vercel.app/admin/dashboard

2. **What to Check:**
   - [ ] Does the page load without errors?
   - [ ] Are there statistics cards showing project counts?
   - [ ] Is there an interactive map visible?
   - [ ] Are there colored markers on the map?

3. **Test Map Interactions:**
   - [ ] Click on different map markers
   - [ ] Verify popups show project details
   - [ ] Check if you can zoom in/out
   - [ ] Test panning the map around

4. **Expected Markers:**
   You should see 5 markers:
   - 🟡 Denver, CO (Pending)
   - 🔵 Philadelphia, PA (Data Submitted)
   - 🔵 Miami, FL (Data Submitted)
   - 🟢 Flint, MI (Report Generated)
   - 🟢 Seattle, WA (Report Generated)

---

### Phase 3: Test Validation Interface (7 minutes)

This is the core feature - testing model predictions against real data.

1. **Navigate to Validation Page:**
   - Click "Try Validation" or go to `/admin/validation`
   - URL: https://axiom-gzp3hpzmg-somtonweke1s-projects.vercel.app/admin/validation

2. **Download Template (Optional):**
   - [ ] Click "Download Template" button
   - [ ] Verify a JSON file downloads
   - [ ] Open it in a text editor to see the structure

3. **Upload Demo Dataset:**
   - [ ] Click "Upload File" button
   - [ ] Select the demo-hazen-dataset.json you downloaded earlier
   - [ ] Wait for processing (5-10 seconds)
   - [ ] Look for green success message

4. **Verify Analysis Results:**

   **Analysis Summary Card:**
   - [ ] Projected Lifespan: ~18-20 months
   - [ ] P95 Confidence: ~20-23 months
   - [ ] GAC Capacity: ~0.15-0.20 mg/g
   - [ ] Removal Efficiency: ~95-99%

   **Monte Carlo Results:**
   - [ ] Mean: ~18-20 months
   - [ ] Standard Deviation: ~1-2 months
   - [ ] P5-P95 Range displayed
   - [ ] "5,000 iterations" mentioned

5. **Check Breakthrough Curve Visualizations:**
   - [ ] Chart 1: "Effluent Concentration vs Time"
     - Blue line (predicted curve)
     - Green dots (observed data points)
     - Reference lines at 10%, 50%, 95%
   - [ ] Chart 2: "Breakthrough Percentage vs Bed Volumes"
     - Purple area chart
     - Reaches ~95% around 150,000 bed volumes

6. **Verify Validation Metrics:**
   - [ ] R² (Goodness of Fit) displayed
   - [ ] RMSE (Root Mean Square Error) shown
   - [ ] MAE (Mean Absolute Error) shown
   - [ ] MAPE (Mean Absolute Percentage Error) shown
   - [ ] No "NaN" or "Infinity" values

---

## Feedback Checklist

### User Experience

**Navigation:**
- [ ] Easy to find features
- [ ] Clear page layouts
- [ ] Buttons work as expected
- [ ] Links navigate correctly

**Visual Design:**
- [ ] Professional appearance
- [ ] Colors are clear and distinct
- [ ] Text is readable
- [ ] Charts are understandable

**Performance:**
- [ ] Pages load quickly (< 3 seconds)
- [ ] Upload processing is reasonable (< 10 seconds)
- [ ] Map interactions are smooth
- [ ] No noticeable lag or freezing

### Technical Functionality

**Dashboard:**
- [ ] Map loads without errors
- [ ] Markers are clickable
- [ ] Popups display correct information
- [ ] Statistics update correctly

**Validation Page:**
- [ ] File upload works
- [ ] Analysis completes successfully
- [ ] Charts render properly
- [ ] Metrics are calculated correctly

**Demo Page:**
- [ ] File download works
- [ ] Instructions are clear
- [ ] Links work correctly

---

## Common Issues & Solutions

### Issue: Map Doesn't Load

**Symptoms:**
- Blank space where map should be
- Loading message that never completes

**Possible Causes:**
- Database not configured (if testing immediately after deployment)
- Browser blocking Leaflet CDN

**Solution:**
- Wait for database setup (see DEPLOYMENT_GUIDE.md)
- Try different browser
- Check browser console for errors (F12)

---

### Issue: Upload Fails

**Symptoms:**
- Red error message after upload
- "Missing required fields" error

**Possible Causes:**
- Wrong file format
- Corrupted JSON

**Solution:**
- Re-download demo-hazen-dataset.json
- Verify file is valid JSON (use jsonlint.com)
- Try different browser

---

### Issue: Charts Don't Render

**Symptoms:**
- Empty space where charts should be
- Console errors about Recharts

**Possible Causes:**
- JavaScript disabled
- Browser compatibility issue

**Solution:**
- Enable JavaScript
- Use modern browser (Chrome 120+, Firefox 120+, Safari 17+)
- Clear browser cache

---

### Issue: Database Errors

**Symptoms:**
- "PrismaClientInitializationError"
- "Can't reach database server"
- 500 errors on API calls

**Status:**
- This is expected if database hasn't been configured yet
- Not a bug, just incomplete setup
- See DEPLOYMENT_GUIDE.md for database setup instructions

---

## Reporting Issues

When reporting bugs or issues, please include:

1. **What you were trying to do**
   - Example: "I tried to upload the demo dataset"

2. **What happened instead**
   - Example: "Got a red error message saying 'Missing required fields'"

3. **Browser information**
   - Chrome 120.0.6099.109 on macOS 14.1
   - Get this from: About > Chrome or similar

4. **Screenshots (if applicable)**
   - Press Cmd+Shift+4 (Mac) or Win+Shift+S (Windows)

5. **Browser console errors (if applicable)**
   - Press F12 → Console tab
   - Screenshot any red error messages

---

## Test Scenarios

### Scenario 1: First-Time User

**Goal:** Can a new user understand and use the platform?

1. Visit demo page without any prior knowledge
2. Read instructions
3. Download dataset
4. Navigate to validation page
5. Upload dataset
6. Understand results

**Success Criteria:**
- [ ] User can complete flow without external help
- [ ] Instructions are clear
- [ ] Results make sense

---

### Scenario 2: Research Scientist

**Goal:** Can a researcher validate model predictions?

1. Review scientific foundation on demo page
2. Download template to see data structure
3. Upload demo dataset
4. Examine validation metrics (R², RMSE)
5. Evaluate breakthrough curve fit

**Success Criteria:**
- [ ] Citations are present and accurate
- [ ] Metrics are calculated correctly
- [ ] Results are reproducible
- [ ] Data can be exported (if implemented)

---

### Scenario 3: Geographic Exploration

**Goal:** Can user explore project locations?

1. Open dashboard
2. View map of all projects
3. Click markers to see details
4. Understand project statuses

**Success Criteria:**
- [ ] Map displays all projects
- [ ] Markers show correct locations
- [ ] Popups have meaningful information
- [ ] Status colors are distinct

---

## Expected Results

### Validation Page - Demo Dataset

When you upload demo-hazen-dataset.json, you should see:

**Project Information:**
- Project: Flint WTP PFAS Validation Study
- Location: Flint, Michigan, USA

**Analysis Results:**
- Projected Lifespan: 18-20 months
- P95 Confidence: 20-23 months
- GAC Capacity: 0.15-0.20 mg/g
- Removal Efficiency: 95-99%

**Monte Carlo:**
- Mean: 18-20 months
- Std Dev: 1-2 months
- P5: 15-17 months
- P95: 21-23 months

**Validation Metrics:**
- R²: > 0.90 (excellent fit)
- RMSE: Low (< 10% of mean)
- MAE: Reasonable absolute error
- MAPE: Percentage error < 15%

**Charts:**
- Breakthrough curve shows S-shape
- Predicted line closely follows observed points
- 50% breakthrough around day 270-300

---

## Browser Compatibility

**Fully Supported:**
- ✅ Chrome 120+
- ✅ Firefox 120+
- ✅ Safari 17+
- ✅ Edge 120+

**Not Supported:**
- ❌ Internet Explorer (all versions)
- ⚠️ Safari < 15 (may have issues)
- ⚠️ Mobile browsers (responsive but not optimized)

---

## Testing Checklist Summary

Copy this checklist for your testing session:

### Basic Functionality
- [ ] Home page loads
- [ ] Demo page loads
- [ ] Dashboard loads
- [ ] Validation page loads
- [ ] Admin login works (if testing auth)

### Demo Page
- [ ] Demo dataset downloads
- [ ] Links navigate correctly
- [ ] Instructions are clear

### Dashboard
- [ ] Map displays
- [ ] 5 markers visible
- [ ] Markers are clickable
- [ ] Popups show data
- [ ] Statistics cards display

### Validation
- [ ] Template downloads
- [ ] File upload works
- [ ] Analysis completes (5-10s)
- [ ] Success message appears
- [ ] Analysis summary displays
- [ ] Monte Carlo results show
- [ ] Breakthrough charts render
- [ ] Validation metrics display
- [ ] No errors in console

### Performance
- [ ] All pages load < 3s
- [ ] Upload completes < 10s
- [ ] Map interactions smooth
- [ ] No browser freezing

---

## Post-Testing

After completing your testing session:

1. **Rate Overall Experience** (1-10):
   - Ease of use: ___
   - Visual design: ___
   - Feature completeness: ___
   - Would recommend: ___

2. **Most Impressive Feature:**
   - What stood out positively?

3. **Biggest Issue Encountered:**
   - What needs improvement?

4. **Suggestions:**
   - What would make this better?

---

**Thank you for testing!**

Your feedback helps improve the platform for water treatment professionals and researchers worldwide.

---

**Last Updated:** November 6, 2025
**Platform Version:** 1.0
**Status:** Ready for User Testing
