SR HYDRAULIC — MULTI-PAGE WEBSITE (v2)

FILES
-----
index.html      : Home — hero, stats, featured-products carousel, capabilities, about teaser
products.html   : Products — full catalogue grid, each item opens an enquiry popup
about.html      : About — company story, feature list, capabilities
contact.html    : Contact — form + an editable map
style.css       : all styling, shared by every page
script.js       : shared behavior — mobile nav, enquiry popup, carousel (shared by every page)
images/logo-mark.png     : the "S/R" icon, used in every header/footer
images/logo-full.png     : the full logo lockup (icon + wordmark), spare copy
images/products/*.svg    : placeholder product photos (see PRODUCT IMAGES below)

WHAT'S NEW IN THIS VERSION
---------------------------
1. SEPARATE PAGES instead of one long scrolling page. The nav (Home / Products /
   About / Contact) now links to real pages, with the current page highlighted.

2. PRODUCT IMAGES + ENQUIRY POPUP
   - Every product now has a dedicated image slot (images/products/). Right now
     these are branded placeholder graphics so nothing looks broken — swap them
     for real photos whenever you're ready (see PRODUCT IMAGES below).
   - Each product has an "Enquire now" button. Clicking it opens a smooth popup
     (fade + scale-in) with a short form, pre-filled with that product's name.
     Closes via the X button, clicking outside, or the Escape key.
   - The popup form still uses mailto, same as the main contact form — see
     CONTACT FORM note below if you want it to submit without opening email.

3. CONTACT PAGE MAP
   - There's now a "Find us" map on the Contact page using Google's no-API-key
     embed. It currently points to "Delhi NCR, India" as a placeholder.
   - To update it: open contact.html, find the <!-- EDIT ME --> comment just
     above the map <iframe>, and either change the q= value to your address,
     or paste in your own embed code from Google Maps (Share > Embed a map).

4. FEATURED-PRODUCTS CAROUSEL (Home page)
   - Replaces the old static product grid on the homepage. Shows 3 products at
     a time on desktop, 2 on tablets, 1 on phones.
   - Arrows, dot navigation, autoplay (pauses on hover/focus), and swipe
     support on touch devices — all with smooth CSS transitions.
   - Each slide links through to the matching product on products.html and has
     its own Enquire button.

5. Everything re-tested down to a 390px-wide phone: mobile nav, carousel,
   and the enquiry popup all confirmed working on small screens.

PRODUCT IMAGES
---------------
The SVG files in images/products/ are intentional placeholders (dark blue
panel + line icon + "PRODUCT PHOTO PLACEHOLDER" label) so the site looks
complete even before you have real photography. To replace one:
  - Add your photo (jpg/png/webp) to images/products/
  - In products.html AND index.html, find the matching <img src="images/
    products/product-X-....svg"> tag and point it at your new file instead.
Keeping the same aspect ratio (roughly 4:3) will keep the layout looking tidy.

CUSTOMIZE NEXT
--------------
1. Replace the placeholder stats (15+ years, 500+ parts, 24 hr turnaround).
2. Update product names/descriptions to match your real catalogue.
3. Swap +91 99999 99999, info@srhydraulic.com and the social links.
4. Replace the About Us paragraph with your real company story.
5. Point the Contact page map at your real address.

CONTACT FORM & ENQUIRY POPUP
------------------------------
Both still use mailto, so submitting opens the visitor's email app with the
message pre-filled. For true web-based submissions (no email app required),
connect the forms to a service like Formspree or Web3Forms — you'd change the
<form action="mailto:..."> to the service's endpoint in contact.html,
products.html (popup), and index.html (popup).

DEPLOYMENT
----------
Upload all the files and the images/ folder (keeping the same folder
structure) to GitHub Pages, Netlify, Vercel, Hostinger, or any static host.
