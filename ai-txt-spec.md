# ai.txt Specification (Draft)

A proposal for a simple, standardized way for websites to describe themselves to AI agents.

## Overview

`ai.txt` is a plain text file at the root of a website that describes the site's purpose, offerings, and key information in human-readable prose. It enables AI agents to quickly understand what a website offers without parsing HTML.

Think of it as `robots.txt` for AI comprehension — while `robots.txt` tells crawlers what to access, `ai.txt` tells AI agents what the site is about.

## Location

```
https://example.com/ai.txt
```

The file MUST be served from the root directory with:
- Content-Type: `text/plain; charset=utf-8`
- UTF-8 encoding

## Format

The format is deliberately simple: **Markdown-flavored plain text**.

- Headings use `#`, `##`, `###`
- No special syntax or schema required
- Human-readable first, machine-parseable second
- Prose paragraphs, not structured data

### Recommended Sections

```markdown
# Site Name - Brief Description

One paragraph summary of what the site/business offers.

## Contact

Essential contact information.

## Services / Products

What the site offers.

## Pricing (if applicable)

Pricing information.

## About

Background, history, credentials.
```

## Example

```markdown
# Acme Widgets - Industrial Widget Manufacturing

Acme Widgets manufactures precision widgets for aerospace and automotive industries. Family-owned since 1952, shipping worldwide from our Melbourne facility.

## Contact

Phone: +61 3 9000 0000
Email: sales@acmewidgets.example
Address: 123 Industrial Ave, Melbourne VIC 3000

## Products

Standard Widgets: Precision-machined steel widgets in 5mm-50mm sizes.
Custom Widgets: Bespoke manufacturing to your specifications.
Widget Kits: Assembly kits for OEM integration.

## Pricing

Standard widgets from $2.50/unit. Volume discounts available.
Custom quotes within 24 hours.

## About

Three generations of widget expertise. ISO 9001 certified.
Trusted by Boeing, Toyota, and 500+ manufacturers worldwide.
```

## Benefits

**For AI Agents:**
- Instant site comprehension without HTML parsing
- Consistent location (`/ai.txt`)
- Small payload (~5-20KB typical)
- Structured enough to extract key info
- Unstructured enough to convey nuance

**For Site Owners:**
- Single source of truth for site content
- Easy to create and maintain
- Human-readable documentation
- Helps AI assistants accurately represent your business
- SEO-adjacent benefits (clear content summary)

**For Users:**
- AI assistants can accurately answer "what does this company do?"
- Better AI-generated summaries and recommendations
- Reduced hallucination from misinterpreted HTML

## Optional: ai.md Symlink

Sites MAY provide a symlink for browser-rendered viewing:

```bash
ln -s ai.txt ai.md
```

This allows:
- `example.com/ai.txt` → plain text (for AI agents)
- `example.com/ai.md` → markdown rendered (for humans in browsers)

## Guidelines

1. **Be concise** — aim for under 200 lines / 10KB
2. **Be accurate** — this is your site's source of truth
3. **Be complete** — include all key information an AI should know
4. **Update regularly** — keep pricing, services, and contact current
5. **No marketing fluff** — straightforward prose, not sales copy
6. **No sensitive data** — public information only

## Discovery

AI agents SHOULD check for `/ai.txt` when:
- Asked about a website or business
- Needing to summarize site content
- Verifying information about an organization

Agents MAY cache `ai.txt` content with standard HTTP caching headers.

## Non-Goals

This specification does NOT:
- Replace structured data (JSON-LD, Schema.org)
- Replace sitemaps or robots.txt
- Provide access control or permissions
- Define a rigid schema

It complements existing standards by providing a human-readable summary layer.

## Comparison

| File | Purpose | Audience |
|------|---------|----------|
| `robots.txt` | Crawl permissions | Search bots |
| `sitemap.xml` | Page discovery | Search bots |
| `humans.txt` | Credits/colophon | Humans |
| `security.txt` | Security contact | Security researchers |
| `ai.txt` | Site description | AI agents |

## Status

This is an informal proposal (January 2025). No governing body or formal standard exists yet. Adoption is voluntary and grassroots.

## Reference Implementation

See: https://renta.net/ai.txt

## License

This specification is released into the public domain (CC0).
