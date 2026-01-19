# Copilot Instructions

## Project Overview
This is a GitHub Pages site implementing a **Multi-Step Form Calculator** for GTS Franchise Cost of Vacancy. The application uses jQuery for step navigation and form validation, computing franchise position vacancy costs based on salary and duration metrics.

## Architecture & Data Flow

### Page Structure
- **Single-page multi-step form** using `<fieldset>` elements in `index.html`
- Three workflow steps: intro → basic info → advanced info → results screen
- Progress bar (`#progressbar`) tracks user progress through steps
- Results displayed in hidden `.answers` container

### Form Data Lifecycle
1. **Input Collection**: User data captured via jQuery selectors (`.js-postitle`, `.js-vacdays`, `.js-ansal`, `.js-multi`, `.js-fn`, `.js-ln`, `.js-em`)
2. **Scrubbing**: `scrubVals()` function uses regex `/(\d+.\d{2}|\d+)/` to extract numeric values from text inputs
3. **Calculation**: `calculate()` computes financial metrics (currently commented out in display)
4. **Display**: Results rendered to `.js-profit` and `.js-budget` HTML elements

### Key Components
- **Modal System**: Two info modals (`#myModal`, `#myModal2`) with delegated click handlers
- **Animation**: Step transitions use jQuery `.animate()` with `easeInOutBack` easing (requires `jquery.easing` plugin)
- **Navigation**: `.next` and `.previous` buttons with `animating` flag to prevent rapid multi-clicks

## Development Patterns

### jQuery Conventions
- **DOM Selection**: Prefix form inputs with `.js-` in class names (e.g., `.js-ansal` for annual salary)
- **External Dependencies**: jQuery 3.6.0 + jquery.easing plugin loaded via CDN from `index.html` `<head>`
- **Document Ready**: All JavaScript wrapped in `$(document).ready()` and additional `$(function(){})` blocks
- **State Management**: Form state maintained through fieldset visibility and progress bar active state

### Naming Patterns
- `raw_values` object: Original unprocessed form data
- `clean` object: Numeric-only version after regex scrubbing
- `postitle`, `vacdays`, `ansal`, `multi`: Core vacancy calculation inputs
- `fn`, `ln`, `em`: Contact information fields

### Common Gotchas
- Calculate button doesn't send data to server (form submission disabled: `$(".submit").click(function(){ return false; })`)
- Modal handler variable reuse risk: second modal (`span2` reference) uses same `span` variable name—watch for scope issues
- Calculation uses undefined variables `aov`, `aopp`, `arr`, `gpm`, `ar`—these appear to be orphaned from earlier implementation

## File Organization

```
/
├── index.html          # Multi-step form markup with fieldsets & modals
├── javascript.js       # jQuery for navigation, modals, form validation (277 lines)
├── style.css          # Fieldset styling, progress bar, animations (472 lines)
├── README.md          # Minimal (currently empty)
└── .github/
    └── copilot-instructions.md  # This file
```

## When Making Changes

### Adding Form Fields
1. Add `<input>` with class `.js-[fieldname]` in the relevant `<fieldset>`
2. Add selector string to `getVals()` function: `'[fieldname]': $(".js-[fieldname]").val()`
3. Include in `raw_values` object return
4. Update `scrubVals()` if field is numeric

### Styling Updates
- Fieldset base styles: `#msform fieldset` (background, shadow, positioning)
- Progress bar: `#progressbar li` and `.active` state
- Form visibility: `#msform fieldset:not(:first-of-type) { display: none; }`

### Animation Tweaks
- Duration: `duration: 800` in `.next` and `.previous` click handlers (milliseconds)
- Easing: `'easeInOutBack'` requires `jquery.easing` plugin
- Scale/opacity/left properties controlled via `step:` callback during animation

## No Build Process
This is a static site—no build step, no package.json, no transpilation. Edit files directly and commit to main branch for immediate GitHub Pages deployment.
