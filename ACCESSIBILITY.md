# ♿ Accessibility & Keyboard Navigation Guide

## Overview

The Dynamic Data Table Manager is built with accessibility in mind, using Material UI components that follow WAI-ARIA guidelines.

## Keyboard Navigation

### Global Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move to next interactive element |
| `Shift + Tab` | Move to previous interactive element |
| `Enter` / `Space` | Activate button or control |
| `Esc` | Close modal dialogs |

### Table Navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate through table cells and controls |
| `Enter` | Activate sort on column header |
| `Space` | Activate buttons (Edit, Delete) |
| `Arrow Keys` | Navigate within input fields (edit mode) |

### Search Bar

| Key | Action |
|-----|--------|
| `Ctrl/Cmd + F` | Focus search bar (browser default) |
| `Type` | Filter results in real-time |
| `Esc` | Clear search (when focused) |

### Modals

| Key | Action |
|-----|--------|
| `Tab` | Navigate through modal controls |
| `Esc` | Close modal |
| `Enter` | Submit/confirm (on buttons) |

### Pagination

| Key | Action |
|-----|--------|
| `Tab` | Navigate to pagination controls |
| `Enter` / `Space` | Change page or rows per page |
| `Arrow Keys` | Navigate dropdown options |

## Screen Reader Support

### ARIA Labels

All interactive elements include appropriate ARIA labels:
- Buttons have descriptive labels
- Table has `aria-label="data table"`
- Sort indicators announce direction
- Form inputs have associated labels

### Semantic HTML

- Proper heading hierarchy (h1, h2, h3)
- Semantic table structure (thead, tbody, tr, td)
- Form elements properly labeled
- Buttons vs links used appropriately

### Announcements

Screen readers will announce:
- Sort direction changes
- Page navigation
- Row count updates
- Success/error messages (via snackbar)
- Modal open/close states

## Visual Accessibility

### Color Contrast

- **Light Mode**: WCAG AA compliant contrast ratios
- **Dark Mode**: Optimized for low-light viewing
- **Focus Indicators**: Clear blue outline on focused elements
- **Active States**: Visual feedback on all interactions

### Text Readability

- **Font Size**: Minimum 14px for body text
- **Line Height**: 1.5 for comfortable reading
- **Font Family**: System fonts for optimal rendering
- **Text Spacing**: Adequate padding and margins

### Visual Indicators

- **Sort Direction**: Arrow icons + text labels
- **Active Filters**: Search query visible
- **Edit Mode**: Different background color
- **Loading States**: Visual feedback during operations

## Motor Accessibility

### Touch Targets

- **Minimum Size**: 44x44px for all interactive elements
- **Spacing**: Adequate gaps between buttons
- **Large Click Areas**: Entire row clickable for selection
- **Mobile Optimized**: Touch-friendly on all devices

### Interaction Patterns

- **Single Click**: Primary actions
- **No Double-Click Required**: All actions accessible with single interaction
- **Confirmation Dialogs**: Prevent accidental actions
- **Undo Options**: Cancel buttons available

## Cognitive Accessibility

### Clear Labeling

- Descriptive button text ("Import CSV" not just "Import")
- Icon + text labels for clarity
- Consistent terminology throughout
- Help text where needed

### Predictable Behavior

- Consistent navigation patterns
- Standard UI conventions
- Clear feedback for all actions
- No unexpected page changes

### Error Prevention

- Confirmation dialogs for destructive actions
- Input validation with clear messages
- Cancel options always available
- Persistent data (auto-save)

## Assistive Technology Testing

### Recommended Testing Tools

1. **Screen Readers**
   - NVDA (Windows) - Free
   - JAWS (Windows) - Commercial
   - VoiceOver (macOS/iOS) - Built-in
   - TalkBack (Android) - Built-in

2. **Keyboard Navigation**
   - Test all features without mouse
   - Verify focus indicators visible
   - Check tab order is logical

3. **Browser Extensions**
   - axe DevTools
   - WAVE Evaluation Tool
   - Lighthouse (Chrome DevTools)

### Testing Checklist

- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators clearly visible
- [ ] Screen reader announces all content
- [ ] Color contrast meets WCAG AA
- [ ] Text resizable up to 200%
- [ ] No keyboard traps
- [ ] Skip links available (if needed)
- [ ] Forms properly labeled
- [ ] Error messages clear and helpful
- [ ] Time limits adjustable (N/A for this app)

## Accessibility Features by Component

### DataTable Component
- ✅ Semantic table structure
- ✅ Column headers with sort buttons
- ✅ ARIA labels on action buttons
- ✅ Keyboard navigation support
- ✅ Focus management in edit mode

### TableToolbar Component
- ✅ Search input properly labeled
- ✅ Button groups with clear labels
- ✅ Icon + text for clarity
- ✅ Keyboard shortcuts supported

### ManageColumnsModal Component
- ✅ Modal focus trap
- ✅ Escape key to close
- ✅ Checkbox labels clear
- ✅ Form inputs accessible

### Providers Component
- ✅ Theme respects system preferences
- ✅ Color contrast in both themes
- ✅ Smooth transitions (not jarring)

## Known Limitations

1. **Column Reordering**: Not implemented (would require drag-and-drop accessibility)
2. **Bulk Selection**: Not implemented (would need checkbox column)
3. **Advanced Filtering**: Not implemented (would need accessible filter UI)

## Improvement Opportunities

### Short Term
- Add skip navigation links
- Implement focus restoration after modal close
- Add keyboard shortcuts reference (? key)
- Improve error message specificity

### Long Term
- Add high contrast mode
- Implement reduced motion preferences
- Add text-to-speech for table data
- Create keyboard shortcuts customization

## WCAG 2.1 Compliance

### Level A (Minimum)
- ✅ Keyboard accessible
- ✅ Text alternatives
- ✅ Adaptable content
- ✅ Distinguishable content
- ✅ Navigable
- ✅ Input assistance

### Level AA (Recommended)
- ✅ Color contrast (4.5:1 minimum)
- ✅ Resize text (up to 200%)
- ✅ Multiple ways to navigate
- ✅ Focus visible
- ✅ Error identification
- ✅ Labels or instructions

### Level AAA (Enhanced)
- ⚠️ Color contrast (7:1) - Partial
- ⚠️ Low/no background audio - N/A
- ⚠️ Visual presentation - Partial

## User Preferences

### Respects System Settings
- ✅ Prefers color scheme (light/dark)
- ✅ Prefers reduced motion (MUI default)
- ✅ System fonts
- ✅ Browser zoom levels

### Persistent Preferences
- ✅ Theme choice saved
- ✅ Column visibility saved
- ✅ Rows per page saved
- ✅ Data persisted locally

## Feedback & Reporting

If you encounter accessibility issues:

1. **Describe the issue**: What doesn't work?
2. **Your setup**: OS, browser, assistive technology
3. **Steps to reproduce**: How to encounter the issue
4. **Expected behavior**: What should happen
5. **Actual behavior**: What actually happens

## Resources

### Learn More
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material UI Accessibility](https://mui.com/material-ui/guides/accessibility/)
- [WebAIM Resources](https://webaim.org/resources/)
- [A11y Project](https://www.a11yproject.com/)

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Pa11y](https://pa11y.org/)

## Commitment

We are committed to making this application accessible to all users. Accessibility is an ongoing process, and we welcome feedback and contributions to improve the experience for everyone.

---

**Last Updated**: November 2024
**WCAG Level**: AA (Target)
**Testing**: Manual keyboard and screen reader testing completed
