# Protocolo 360 - Development Rules

## Tech Stack
- Front-end: Angular 21
- Back-end: Java 25 (LTS)
- Framework: Spring Boot 4
- Build Tool: Maven (standard)
- ORM: Spring Data JPA
- Database: PostgreSQL (Neon.tech)
- Security: Spring Security + JWT
- Validations: Hibernate Validator (Bean Validation)

# 🎨 Protocolo 360 - Frontend Development Rules (Angular 21)

## 🏗️ Architecture & Component Design
- **Strict Standalone:** All components, directives, and pipes MUST be `standalone: true`.
- **Signals-First Data Flow:** - Use modern Signal APIs: `input()`, `output()`, `model()`, and `computed()`.
  - Avoid `BehaviorSubject` or `Observable` for local component state.
  - Prefer `toSignal()` when converting API calls from `HttpClient`.
- **Modern Control Flow:** Use `@if`, `@for`, `@empty`, and `@switch`. Standard directives (`*ngIf`, `*ngFor`) are forbidden.
- **Performance:** Always set `changeDetection: ChangeDetectionStrategy.OnPush`.
- **Lifecycle Management:** Prefer `effect()` for side effects and `computed()` for derived state over `ngOnChanges` or manual subscriptions.

## 💅 Styling & UI (Tailwind 4 + Spartan NG)
- **Frameworks:** Use **Tailwind 4** for layout/spacing and **Spartan NG** for complex widgets (Steppers, Tables, Charts).
- **Theme (Dark Mode):** - Primary Background: `#0F172A` (Slate 950).
  - Primary Accent: `#4ADE80` (Emerald 400).
  - Use `dark:` variants for all custom classes.
- **Accessibility:** Use semantic HTML tags (`<main>`, `<nav>`, `<article>`) and ARIA labels where Spartan NG components don't provide them automatically.

## 🛠️ State Management & Services
- **Signal Services:** Shared state must be exposed as `readonly` Signals.
  - *Pattern:* `private readonly _user = signal<User | null>(null); public readonly user = this._user.asReadonly();`
- **Functional Interceptors:** Use functional `provideHttpClient(withInterceptors([...]))` for JWT injection and error handling.
- **Strict Typing:** `any` is strictly forbidden. Define `interface` or `type` for every API payload and component property.

## 📝 Coding Patterns & File Structure
- **Naming Convention:**
  - Components: `feature-name.component.ts`
  - Services: `feature-name.service.ts`
  - Models: `feature-name.model.ts`
- **Forms:** Use **Reactive Forms** with strict internal types. Ensure forms are synchronized with signals where necessary.
- **DRY Logic:** Extract calculations (TDEE, Macronutrient math) into `src/app/shared/utils`.

## 🔒 Security & RBAC
- **Guards:** Use functional `canActivate` guards.
- **Role Validation:** Implement access control by checking the `user.roles` array against the `RBAC` requirements in a centralized `PermissionService`.

## 🤖 Code Generation Preferences
- When generating components, include the boilerplate for `OnPush` and `standalone: true`.
- Prefer `const` and `readonly` whenever possible.
- Use `inject(Service)` instead of constructor injection for cleaner standalone components.