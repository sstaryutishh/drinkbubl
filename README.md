# drinkbubl

The repository contains a Shopify theme at its root and a separate static preview in `dist/`.

## Connect to Shopify

Push the root theme files to GitHub, then choose this repository's `main` branch under **Online Store → Themes → Add theme → Connect from GitHub**. Shopify reads `layout/`, `config/`, `templates/`, `snippets/`, and `assets/` from the branch root.

The home page displays the current placeholder product copy until you choose a real product in **Theme settings → Product featured on the home page**. The Shopify Add to Bag button stays disabled until a product is selected. After selection, the button uses that product's actual Shopify price and adds its selected variant to the Shopify cart. Replace the placeholder toothpaste copy and subscription claims before publishing the theme.

## Deploy to Vercel

Import this repository into Vercel and deploy from the repository root. `vercel.json` selects the **Other** framework preset and serves `dist/` as the output directory. The page, styles, script, and images are all in that folder.

The static preview's shopping bag works in the browser and saves its count locally. The Shopify theme uses Shopify's cart and checkout.
