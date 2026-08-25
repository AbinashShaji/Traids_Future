# Project Map (Visual Architecture)

```mermaid
graph TD
    %% Define User Flow
    User((Visitor))
    
    %% Root Layouts
    RootLayout[Root Layout<br/>src/app/layout.tsx]
    GlobalLayout[Global Layout<br/>components/global-layout.tsx]
    Navigation[Navigation Bar]
    Footer[Global Footer]
    
    %% Pages
    Home[Homepage<br/>/]
    About[About Page<br/>/about]
    Solutions[Solutions Page<br/>/solutions]
    Work[Work Directory<br/>/work]
    Insights[Insights Directory<br/>/insights]
    Contact[Contact Page<br/>/contact]
    
    %% Mock Data
    MockData[(Mock Data Layer<br/>src/mock/)]
    
    %% Connections
    User --> RootLayout
    RootLayout --> GlobalLayout
    
    GlobalLayout --> Navigation
    GlobalLayout --> Footer
    
    GlobalLayout --> Home
    GlobalLayout --> About
    GlobalLayout --> Solutions
    GlobalLayout --> Work
    GlobalLayout --> Insights
    GlobalLayout --> Contact
    
    %% Data Flow
    MockData -.-> Home
    MockData -.-> About
    MockData -.-> Solutions
    MockData -.-> Work
    MockData -.-> Insights
    MockData -.-> Contact
```

### Data Flow Explanation
1. **User Request:** A user visits a URL (e.g., `/insights`).
2. **Layout Wrap:** Next.js renders `RootLayout` (applying fonts and global CSS), then mounts `GlobalLayout` (which adds the Navigation and Footer).
3. **Page Render:** The specific page component (e.g., `InsightsPage`) is rendered in the main content slot.
4. **Data Hydration:** The page imports static arrays from `src/mock/` to populate UI components like cards, tags, and text content.
5. **Interactive Client Logic:** Forms and search filters (like on the Insights or Contact pages) execute purely in the browser using React state, providing immediate feedback.
