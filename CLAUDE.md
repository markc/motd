# CLAUDE.md

Project guidance for Claude Code when working with this repository.

## Project Overview

MOTD (Message Of The Day) is a static marketing website for an AI-by-email service (motd.com). Users email ai@motd.com to get AI responses without apps, accounts, or tracking.

## File Structure

```
motd/
├── index.html              # Homepage
├── base.css                # Generic reusable framework styles
├── site.css                # Site-specific theming (Stone color scheme)
├── base.js                 # Generic framework JavaScript
├── site.js                 # Site-specific JavaScript
├── Server_Room_Dark.webp   # Hero background image
├── favicon.ico             # Site favicon
├── how-it-works/index.html # How It Works page
├── pricing/index.html      # Pricing page
├── ai.txt                  # Complete site content in prose (for AI agents)
├── base.txt                # Generic site structure specification
├── site.txt                # Site-specific configuration values
├── deploy.php              # Webhook handler for auto-deploy
└── .env.example            # Webhook secret template
```

## Framework Files (base.* and site.*)

The site uses a modular architecture separating generic framework from site-specific customization:

| Generic (reusable)  | Site-specific        | Purpose              |
|---------------------|----------------------|----------------------|
| `base.css`          | `site.css`           | Styles               |
| `base.js`           | `site.js` (optional) | JavaScript           |
| `base.txt`          | `site.txt`           | AI specifications    |
| —                   | `ai.txt`             | Content              |

### base.css (~1300 lines)
Generic CSS framework with layout patterns, components, animations, and responsive breakpoints. Uses CSS custom properties with sensible defaults that site.css overrides.

### site.css (~900 lines)
Site-specific theming: Stone (neutral) default color scheme with Crimson, Ocean, Forest, Sunset alternatives. Background images and typography.

### base.js (~180 lines)
Generic JavaScript: theme toggle, particles, navbar scroll effect, mobile menu, scroll reveal animations. Uses `SITE_CONFIG` object for site-specific values.

### site.js
Site-specific JavaScript customizations.

### base.txt
Describes the HTML structure patterns: section types, navigation, footer, card layouts, utility classes.

### site.txt
Site-specific configuration: MOTD brand, Stone color scheme, navigation structure (Home, How It Works, Pricing), page metadata.

### ai.txt
Complete textual content in prose form describing the AI-by-email service, pricing tiers, authentication system, and use cases.

## Key Content

### Service Description
- Free tier: Email ai@motd.com, 1 message/day, no signup
- Pro tier: Personal token address (e.g., 7086-3612@motd.com), unlimited messages, $9/month or $79/year

### Technical Architecture
The email service runs on:
- Postfix/Dovecot mail stack
- Sieve filtering for routing
- Claude AI for responses
- Token-based authentication with sender verification

See `~/.ns/mmc/vhosts/motd.com/notes.md` for full technical documentation.

## CSS Variables

Stone color scheme (H=60 warm neutral) is the default. All sizing, spacing, and colors use custom properties.

## Key Patterns

### Theming
- Dark mode default (`html.dark` class)
- Stone color scheme as default (neutral tones)
- Theme persisted to localStorage
- CSS custom properties for all colors
- Respects `prefers-color-scheme` when no stored preference

### Styling
- Glass morphism via `backdrop-filter`
- Responsive breakpoints: 1024px, 900px, 768px, 600px
- No build step — vanilla HTML/CSS/JS

### Shared Components
- Navigation, footer, particles duplicated in each HTML file
- All pages link to `base.css`, `site.css`, and `base.js` (relative paths)

## Development

```bash
# Local dev server
php -S localhost:8000
```

## Preferences

- **Never suggest Python** - this is a PHP shop
- Use `php -S`, `artisan serve`, or nginx + php-fpm for local servers

## Relative Path Strategy

The site uses relative paths throughout, allowing it to work correctly when served from:
1. **Directly** at `~/Dev/motd/` (e.g., `localhost:8080/`)
2. **As a subdirectory** from `~/Dev/` (e.g., `localhost:8000/motd/`)

### Root Level (index.html)

```html
<link rel="stylesheet" href="base.css">
<a href="./">Home</a>
<a href="how-it-works/">How It Works</a>
<a href="pricing/">Pricing</a>
```

### Subpages (how-it-works/, pricing/)

```html
<link rel="stylesheet" href="../base.css">
<a href="../">Home</a>
<a href="../how-it-works/">How It Works</a>
<a href="../pricing/">Pricing</a>
```

## Deployment

Push to `main` branch triggers GitHub webhook to `https://motd.com/deploy.php` which runs `git pull`.

Server path: `mmc:/srv/motd.com/web/`
