# Testing Guide for Dynamic Data Table Manager

## Quick Start Testing

1. **Start the application**
   ```bash
   npm run dev
   ```

2. **Open browser**
   - Navigate to http://localhost:3000
   - You should see the Dynamic Data Table Manager with sample data

## Feature Testing Checklist

### 1. Table Display ✅
- [ ] Verify table displays with 12 sample rows
- [ ] Check default visible columns: Name, Email, Age, Role
- [ ] Confirm Department and Location are hidden by default
- [ ] Verify pagination shows "1-10 of 12"

### 2. Search Functionality ✅
**Test Cases:**
- [ ] Type "john" → Should show only John Doe
- [ ] Type "developer" → Should show all developers
- [ ] Type "30" → Should show rows with age 30 or containing "30"
- [ ] Clear search → All rows should reappear
- [ ] Search is case-insensitive

### 3. Sorting ✅
**Test Cases:**
- [ ] Click "Name" header → Sort A-Z
- [ ] Click "Name" again → Sort Z-A
- [ ] Click "Age" header → Sort ascending (26, 27, 28...)
- [ ] Click "Age" again → Sort descending (50, 45, 42...)
- [ ] Sort indicator shows active column and direction

### 4. Pagination ✅
**Test Cases:**
- [ ] Default shows 10 rows per page
- [ ] Click "Next" → Shows rows 11-12
- [ ] Click "Previous" → Back to rows 1-10
- [ ] Change to "5 rows per page" → Shows 5 rows
- [ ] Change to "25 rows per page" → Shows all 12 rows
- [ ] Page resets to 1 when searching

### 5. Column Management ✅
**Test Cases:**
- [ ] Click "Columns" button → Modal opens
- [ ] Uncheck "Department" → Column disappears (already hidden)
- [ ] Check "Department" → Column appears in table
- [ ] Try to uncheck "Name" → Should be disabled (required)
- [ ] Add new column: "Salary" (Number type)
- [ ] Verify new column appears in table
- [ ] Close modal → Changes persist

### 6. CSV Import ✅
**Test Cases:**

**Valid Import:**
- [ ] Click "Import" button
- [ ] Select `public/sample-data.csv`
- [ ] Success message appears
- [ ] Table updates with imported data
- [ ] Verify all 10 rows imported correctly

**Invalid Import:**
- [ ] Create CSV without required columns
- [ ] Try to import → Error message shows
- [ ] Table data remains unchanged

**Custom Fields:**
- [ ] Create CSV with extra columns (e.g., "Salary", "Team")
- [ ] Import → New columns added automatically
- [ ] Verify data in new columns

### 7. CSV Export ✅
**Test Cases:**
- [ ] Click "Export" button
- [ ] File downloads as `table-export-YYYY-MM-DD.csv`
- [ ] Open CSV → Verify only visible columns exported
- [ ] Hide "Age" column → Export again
- [ ] Verify "Age" not in exported CSV
- [ ] Check data accuracy in exported file

### 8. Inline Editing ✅
**Test Cases:**

**Edit Single Row:**
- [ ] Click Edit icon on first row
- [ ] Row enters edit mode with input fields
- [ ] Change name to "Test User"
- [ ] Change age to "99"
- [ ] Click Save → Changes persist
- [ ] Verify data updated in table

**Edit Multiple Rows:**
- [ ] Click Edit on rows 1 and 2
- [ ] Both rows in edit mode simultaneously
- [ ] Edit both rows
- [ ] Save row 1 → Only row 1 exits edit mode
- [ ] Cancel row 2 → Changes discarded

**Validation:**
- [ ] Edit age field → Enter "abc"
- [ ] Should convert to 0 or show validation
- [ ] Edit email → Enter invalid format
- [ ] Save should work (validation can be enhanced)

### 9. Row Deletion ✅
**Test Cases:**
- [ ] Click Delete icon on any row
- [ ] Confirmation dialog appears
- [ ] Click "Cancel" → Row remains
- [ ] Click Delete again → Confirm
- [ ] Row removed from table
- [ ] Row count updates
- [ ] Pagination adjusts if needed

### 10. Theme Toggle ✅
**Test Cases:**
- [ ] Default theme is light mode
- [ ] Click sun/moon icon → Switches to dark mode
- [ ] Verify all components update (table, buttons, text)
- [ ] Click again → Back to light mode
- [ ] Refresh page → Theme preference persists

### 11. Responsive Design ✅
**Test Cases:**

**Desktop (>960px):**
- [ ] Toolbar items in single row
- [ ] Table displays all columns comfortably
- [ ] Actions column visible

**Tablet (600-960px):**
- [ ] Toolbar may wrap to two rows
- [ ] Table scrolls horizontally if needed
- [ ] All features remain accessible

**Mobile (<600px):**
- [ ] Toolbar stacks vertically
- [ ] Table scrolls horizontally
- [ ] Buttons remain touch-friendly
- [ ] Modal dialogs fit screen

### 12. Data Persistence ✅
**Test Cases:**
- [ ] Add a new column
- [ ] Edit some rows
- [ ] Change theme to dark
- [ ] Hide some columns
- [ ] Refresh page → All changes persist
- [ ] Close browser → Reopen
- [ ] All preferences and data still there

## Edge Cases & Error Handling

### Empty States
- [ ] Delete all rows → "No data found" message
- [ ] Search with no results → "No data found"
- [ ] Import empty CSV → Error message

### Large Datasets
- [ ] Import CSV with 100+ rows
- [ ] Verify pagination works correctly
- [ ] Test search performance
- [ ] Test sorting performance

### Invalid Operations
- [ ] Try to add column with empty name → Button disabled
- [ ] Try to add duplicate column name → Error alert
- [ ] Import CSV with missing required fields → Error message

## Performance Testing

### Load Time
- [ ] Initial page load < 2 seconds
- [ ] Theme toggle instant
- [ ] Search results instant (<100ms)
- [ ] Sort operation instant (<100ms)

### Memory
- [ ] No memory leaks on repeated operations
- [ ] Redux state size reasonable
- [ ] LocalStorage usage < 5MB

## Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] Screen reader compatible (basic)
- [ ] Color contrast sufficient

## Sample Test Data

### Valid CSV Format
```csv
Name,Email,Age,Role,Department,Location
Test User,test@example.com,25,Tester,QA,Remote
```

### Invalid CSV Format (Missing Required Fields)
```csv
Name,Email
Test User,test@example.com
```

### CSV with Custom Fields
```csv
Name,Email,Age,Role,Salary,Team
Test User,test@example.com,25,Developer,75000,Frontend
```

## Automated Testing (Future)

Consider adding:
- Unit tests with Jest
- Component tests with React Testing Library
- E2E tests with Playwright or Cypress
- Visual regression tests

## Bug Reporting Template

If you find issues:

```
**Bug Description:**
[Clear description of the issue]

**Steps to Reproduce:**
1. [First step]
2. [Second step]
3. [...]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Environment:**
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Screen Size: [e.g., 1920x1080]

**Screenshots:**
[If applicable]
```

## Success Criteria

All features working:
- ✅ Core features (Table, Columns, Import/Export)
- ✅ Bonus features (Editing, Actions, Theme, Responsive)
- ✅ No console errors
- ✅ Smooth user experience
- ✅ Data persistence working
- ✅ Mobile-friendly

## Notes

- Test with real-world data when possible
- Try to break the application intentionally
- Report any unexpected behavior
- Suggest improvements based on usage
