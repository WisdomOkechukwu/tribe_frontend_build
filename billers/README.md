# Biller marks

Seven square brand tiles, used on the customer bills wall, the recurring-bills
mockup and the bulk-run provider chips.

| File            | Used for                                   |
|-----------------|--------------------------------------------|
| `mtn.png`       | bills wall · recurring · bulk run          |
| `airtel.png`    | bills wall                                 |
| `glo.png`       | bills wall · bulk run                      |
| `9mobile.png`   | bills wall                                 |
| `dstv.jpg`      | bills wall · recurring · bulk run          |
| `gotv.jpg`      | recurring                                  |
| `phed.png`      | bills wall · recurring · bulk run          |

## Where they came from, and on what basis

Copied from `assetx/` at the repository root, which the repository owner
supplied and confirmed Tribe has the right to use. Nothing under `assetx/` is
served by Next — only `public/` is — so the files are copied here rather than
referenced in place. `assetx/` holds a much larger set, including every other
Nigerian DisCo (`aedc`, `bedc`, `eedc`, `ekedc`, `ibedc`, `ikedc`, `jed`,
`kaedco`, `kedco`, `yedc`) and `startimes` / `showmax`, if the set here needs
extending.

These are third-party trademarks and the exception to the no-third-party-logos
rule in `CLAUDE.md`, on the same nominative-use footing as the gift card marks
in `components/brand-logos.tsx`: they identify the billers Tribe pays. The
permission is the owner's assertion, recorded here so it is not re-litigated —
and so anyone adding a mark knows a claim is being made on their behalf.

## Shape

Every file is square with the background already baked in — no alpha. That is
why each tile renders the image *as* the tile rather than laying a transparent
mark over a brand colour: doing the latter would double the background on all
of them.

Anything added here should match: square, its own background, 200×200 or
larger. A biller with no file falls back to its name on its brand colour, using
the `hex` and measured `on` values in `components/mockups/billers.tsx`.

**Spectranet is absent** from `assetx/`, which is why the internet row became
GOtv in the recurring mockup and 9mobile joined the bills wall.
