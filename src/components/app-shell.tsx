// Shim to satisfy imports that expect a lowercase path and/or named export.
// Linux is case-sensitive; some pages import "@/components/app-shell".
import AppShellComponent from './AppShell';
export default AppShellComponent;
// Also provide a named export for code using `import { AppShell } ...`
export const AppShell = AppShellComponent;
