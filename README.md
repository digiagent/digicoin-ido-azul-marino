# DigiAgent Prime

Build a premium, cinematic Next.js landing page for DigiAgent.

You are designing and building a dark-mode investor-grade token sale page for a crypto / AI product. The result must feel editorial, elegant, and high-trust — not like a generic Web3 template.

Use Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Recharts.

Primary reference:

- use the provided DigiCoin / DigiAgent reference image as the main visual truth for composition, mood, hierarchy, and density

Creative direction:

- dark, cinematic, data-rich, premium

- restrained green accents, deep black / charcoal surfaces

- investor-deck credibility, not hype

- strong typography, generous negative space, subtle depth

- polished motion, but never flashy or noisy

- avoid generic cyberpunk, purple gradients, random glowing blobs, or overdesigned glassmorphism

Core objective:

Recreate the DigiAgent token sale page as a polished, production-quality Next.js experience that feels alive, expensive, and interactive.

Required sections:

1. Hero

2. Summary

3. Two platforms / one cryptocurrency

4. Dual utility across environments

5. Tokenomics

6. Distribution details

7. Agent-nomics

8. Sale details

9. Runway breakdown

10. Team

11. Footer

Hero requirements:

- cinematic hero with DigiAgent title and strong visual anchor

- subtle orbital / circular motion around the hero visual

- restrained ambient depth, grain, glow, and parallax

- premium stats strip / data rail

- clear token sale CTA presence

- use Framer Motion for reveal and scroll-linked hero behavior

Section behavior:

- use scroll-based page composition, not a single-page tabbed shell for all content

- keep the page editorial and vertically paced

- use motion to support hierarchy and reveal, not as decoration

- use whileInView and scroll-linked motion where appropriate

- respect prefers-reduced-motion

Important tabbed module:

The Sale Details section must include a premium tabbed container for four rounds:

- Bridge Sale

- Private Sale

- Pre-Seed

- Seed

This tabbed container should:

- live inside the Sale Details section

- feel like a core high-value module

- switch smoothly with AnimatePresence or equivalent

- show different metrics, pricing, and round information per tab

- feel polished, tactile, and premium

- not look like a default dashboard tab component

Tokenomics / chart interaction:

- build the tokenomics visualization and data presentation with Recharts + custom table UI

- chart and table must feel tightly linked

- hovering chart segments should highlight the related row

- hovering rows should highlight the related chart segment

- use a shared hover / active interaction model compatible with current Recharts behavior

- interaction must feel precise and seamless

Visual system:

- dark palette based on deep black / charcoal with restrained green accents

- cards and modules may use subtle translucent surfaces, but only selectively

- typography should feel premium and intentional

- spacing should preserve editorial rhythm and readability even in data-dense sections

Implementation rules:

- build this in Next.js App Router with TypeScript

- use Tailwind CSS for layout and styling

- use Framer Motion for cinematic motion and scroll reveals

- use Recharts for charts

- componentize cleanly

- production-quality responsive behavior

- excellent mobile adaptation without losing the premium feel

Avoid:

- generic SaaS section patterns

- overbright neon styling

- placeholder-feeling layout

- excessive blur everywhere

- gimmicky motion

- simplistic hero treatment

Deliver:

- complete runnable Next.js page

- modular components

- polished interactions

- premium visual hierarchy

- strong fidelity to the provided reference image, while improving sophistication where appropriate

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3ea4c027-262f-4a98-855a-ffc10aedf9ac).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
