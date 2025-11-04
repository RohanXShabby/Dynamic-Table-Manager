# 🔧 Troubleshooting Guide

Common issues and their solutions for the Dynamic Data Table Manager.

## Hydration Errors

### Issue: "Hydration mismatch" error in console

**Error Message:**
```
Warning: Text content did not match. Server: "..." Client: "..."
Error: Hydration failed because the initial UI does not match what was rendered on the server.
```

**Cause:**
Redux Persist tries to rehydrate state on the client while Next.js does server-side rendering, causing a mismatch.

**Solution:**
✅ **Already Fixed** - The `Providers.tsx` component now handles this by:
1. Detecting client-side mounting with `useState` and `useEffect`
2. Only enabling `PersistGate` after client-side mount
3. Rendering without persistence on server-side

**Code:**
```tsx
export function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Provider store={store}>
      {isClient ? (
        <PersistGate loading={null} persistor={persistor}>
          <ThemeWrapper>{children}</ThemeWrapper>
        </PersistGate>
      ) : (
        <ThemeWrapper>{children}</ThemeWrapper>
      )}
    </Provider>
  );
}
```

---

## Build Errors

### Issue: TypeScript compilation errors

**Error Message:**
```
Type error: Property 'x' does not exist on type 'Y'
```

**Solutions:**

1. **Check type definitions:**
   ```bash
   npx tsc --noEmit
   ```

2. **Update type definitions:**
   - Check `types/table.ts` for correct interfaces
   - Ensure all props are properly typed

3. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run build
   ```

### Issue: Module not found errors

**Error Message:**
```
Module not found: Can't resolve '@/components/...'
```

**Solutions:**

1. **Check path aliases in `tsconfig.json`:**
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./*"]
       }
     }
   }
   ```

2. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

## Runtime Errors

### Issue: Redux state not persisting

**Symptoms:**
- Data disappears on page refresh
- Theme resets to default
- Column visibility not saved

**Solutions:**

1. **Check browser localStorage:**
   - Open DevTools → Application → Local Storage
   - Look for `persist:root` key
   - If missing, check browser settings allow localStorage

2. **Clear and reset:**
   ```javascript
   // In browser console
   localStorage.clear();
   location.reload();
   ```

3. **Check Redux Persist configuration:**
   - Verify `store/store.ts` has correct persist config
   - Ensure `PersistGate` is wrapping the app

### Issue: CSV import fails

**Error Message:**
```
"CSV parsing errors" or "CSV file is empty"
```

**Solutions:**

1. **Check CSV format:**
   ```csv
   Name,Email,Age,Role
   John Doe,john@example.com,28,Developer
   ```

2. **Required columns:**
   - Name (required)
   - Email (required)
   - Age (required)
   - Role (required)

3. **File encoding:**
   - Use UTF-8 encoding
   - No BOM (Byte Order Mark)

4. **Test with sample file:**
   - Use `public/sample-data.csv` to verify import works

### Issue: Table not updating after edit

**Symptoms:**
- Click Save but changes don't persist
- Row stays in edit mode

**Solutions:**

1. **Check Redux DevTools:**
   - Install Redux DevTools extension
   - Verify actions are dispatched
   - Check state updates

2. **Clear editing state:**
   ```javascript
   // In browser console
   localStorage.removeItem('persist:root');
   location.reload();
   ```

3. **Verify data types:**
   - Age must be a number
   - Check validation in `utils/validation.ts`

---

## Performance Issues

### Issue: Slow search/sort operations

**Symptoms:**
- Lag when typing in search
- Delay when sorting columns

**Solutions:**

1. **Check data size:**
   - Large datasets (1000+ rows) may slow down
   - Consider implementing virtual scrolling

2. **Optimize memoization:**
   - Verify `useMemo` is used in `DataTable.tsx`
   - Check dependencies array

3. **Profile performance:**
   ```javascript
   // In browser console
   performance.mark('search-start');
   // ... perform search
   performance.mark('search-end');
   performance.measure('search', 'search-start', 'search-end');
   ```

### Issue: High memory usage

**Symptoms:**
- Browser becomes slow
- Tab crashes

**Solutions:**

1. **Limit data size:**
   - Keep rows under 1000 for client-side
   - Implement pagination properly

2. **Clear localStorage:**
   ```javascript
   localStorage.clear();
   ```

3. **Check for memory leaks:**
   - Use Chrome DevTools Memory profiler
   - Look for detached DOM nodes

---

## Development Issues

### Issue: Port 3000 already in use

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

**Windows:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

**Or use different port:**
```bash
npm run dev -- -p 3001
```

### Issue: Hot reload not working

**Symptoms:**
- Changes don't reflect automatically
- Need to refresh manually

**Solutions:**

1. **Restart dev server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

2. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

3. **Check file watchers (Linux):**
   ```bash
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

### Issue: ESLint errors

**Error Message:**
```
ESLint: <error description>
```

**Solutions:**

1. **Auto-fix:**
   ```bash
   npm run lint -- --fix
   ```

2. **Check configuration:**
   - Verify `eslint.config.mjs` exists
   - Ensure rules are appropriate

3. **Disable specific rules (if needed):**
   ```javascript
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   ```

---

## Browser-Specific Issues

### Issue: Works in Chrome but not Safari

**Solutions:**

1. **Check browser compatibility:**
   - Verify CSS features support
   - Test localStorage availability

2. **Check console for errors:**
   - Safari has stricter security
   - May block localStorage in private mode

3. **Test with polyfills:**
   - Add necessary polyfills for older browsers

### Issue: Mobile layout broken

**Solutions:**

1. **Check responsive breakpoints:**
   - Verify MUI breakpoints: xs, sm, md, lg, xl
   - Test in Chrome DevTools mobile view

2. **Check viewport meta tag:**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   ```

3. **Test touch interactions:**
   - Ensure buttons are 44x44px minimum
   - Check for hover-only interactions

---

## Deployment Issues

### Issue: Build fails on Vercel

**Error Message:**
```
Build failed
```

**Solutions:**

1. **Check build locally:**
   ```bash
   npm run build
   ```

2. **Verify environment:**
   - Node version matches (18+)
   - All dependencies installed

3. **Check Vercel logs:**
   - Look for specific error messages
   - Verify build command: `npm run build`

### Issue: 404 on deployed site

**Solutions:**

1. **Check Next.js configuration:**
   - Verify `next.config.ts` is correct
   - Check output directory

2. **Verify deployment:**
   - Check Vercel dashboard
   - Ensure deployment succeeded

3. **Check routes:**
   - Verify `app/page.tsx` exists
   - Check file naming conventions

---

## Data Issues

### Issue: Sample data not loading

**Solutions:**

1. **Check Redux initial state:**
   - Open `store/tableSlice.ts`
   - Verify `sampleData` array exists

2. **Clear persisted state:**
   ```javascript
   localStorage.removeItem('persist:root');
   location.reload();
   ```

3. **Check Redux DevTools:**
   - Verify initial state is correct
   - Check for errors in reducers

### Issue: Columns not showing

**Solutions:**

1. **Check column visibility:**
   - Open "Manage Columns" modal
   - Ensure columns are checked

2. **Reset column configuration:**
   ```javascript
   // In browser console
   localStorage.removeItem('persist:root');
   location.reload();
   ```

3. **Verify column config:**
   - Check `store/tableSlice.ts`
   - Ensure `defaultColumns` has `visible: true`

---

## Quick Fixes

### Nuclear Option: Reset Everything

If all else fails:

```bash
# 1. Stop dev server (Ctrl+C)

# 2. Clear everything
rm -rf .next node_modules package-lock.json

# 3. Clear browser data
# In browser console:
localStorage.clear();
sessionStorage.clear();

# 4. Reinstall
npm install

# 5. Rebuild
npm run build

# 6. Start fresh
npm run dev
```

---

## Getting Help

### Before Asking for Help

1. **Check console errors:**
   - Browser DevTools (F12)
   - Terminal output
   - Network tab

2. **Try basic troubleshooting:**
   - Clear cache
   - Restart dev server
   - Check this guide

3. **Gather information:**
   - Error messages (full text)
   - Steps to reproduce
   - Browser/OS version
   - Node.js version

### Where to Get Help

1. **Documentation:**
   - [README.md](README.md)
   - [TESTING_GUIDE.md](TESTING_GUIDE.md)
   - [INDEX.md](INDEX.md)

2. **Community:**
   - Next.js Discord
   - Stack Overflow
   - GitHub Issues

3. **Debug Tools:**
   - React DevTools
   - Redux DevTools
   - Chrome DevTools

---

## Prevention Tips

### Best Practices

1. **Regular maintenance:**
   ```bash
   # Update dependencies monthly
   npm update
   
   # Check for security issues
   npm audit
   ```

2. **Version control:**
   - Commit working code frequently
   - Use meaningful commit messages
   - Create branches for experiments

3. **Testing:**
   - Test in multiple browsers
   - Test responsive design
   - Test all features after changes

4. **Documentation:**
   - Document custom changes
   - Keep README updated
   - Comment complex code

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Debugging
npx tsc --noEmit        # Check TypeScript
npm run lint            # Check code style
npm run lint -- --fix   # Auto-fix issues

# Maintenance
npm update              # Update dependencies
npm audit               # Check security
npm audit fix           # Fix security issues

# Clean slate
rm -rf .next            # Clear Next.js cache
rm -rf node_modules     # Remove dependencies
npm install             # Reinstall everything
```

---

**Last Updated**: November 2024

If you encounter an issue not covered here, please:
1. Check the [README.md](README.md)
2. Search existing issues
3. Create a new issue with details
