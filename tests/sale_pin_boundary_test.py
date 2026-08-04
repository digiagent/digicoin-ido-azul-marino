"""
Playwright probe used in iteration_2 to verify the #agentnomics <-> #sale pin boundary.

Run the body of `probe_pin_boundary` inside the browser-automation tool (async page).
Key findings recorded in /app/test_reports/iteration_2.json:
  * #sale has an opaque background (rgb(14,32,20) == --page-bg) and z-index 10 -> no
    text-over-incinerator bleed-through (original bug is fixed).
  * ScrollTrigger pin start for #sale is STALE: the pin engages/releases at scrollY ~8105
    while the section's real document offset (pin-spacer top) is 8495 -> ~390px snap/gap
    at both pin boundaries. A ScrollTrigger.refresh() (triggered via viewport resize)
    aligns them exactly (engage at 8500).
"""

PROBE_JS = """() => {
  const sale = document.querySelector('#sale');
  const spacer = sale.parentElement && sale.parentElement.classList.contains('pin-spacer')
    ? sale.parentElement : null;
  const r = sale.getBoundingClientRect();
  return {
    y: Math.round(window.scrollY),
    pos: getComputedStyle(sale).position,
    bg: getComputedStyle(sale).backgroundColor,
    saleTop: Math.round(r.top),
    spacerTop: spacer ? Math.round(spacer.getBoundingClientRect().top + window.scrollY) : null,
    docH: document.documentElement.scrollHeight,
  };
}"""


async def probe_pin_boundary(page):
    await page.set_viewport_size({"width": 1920, "height": 800})
    await page.wait_for_load_state("networkidle")
    await page.wait_for_timeout(2500)

    rows = []
    for y in range(7900, 8760, 60):
        await page.evaluate(f"window.scrollTo(0,{y})")
        await page.wait_for_timeout(260)
        rows.append(await page.evaluate(PROBE_JS))

    first_fixed = next((r for r in rows if r["pos"] == "fixed"), None)
    spacer_top = rows[0]["spacerTop"]
    print("pin engages at", first_fixed and first_fixed["y"], "expected", spacer_top)
    assert first_fixed is not None, "sale section never pinned"
    # This assertion FAILS today (engages ~390px early) - see iteration_2 report.
    assert abs(first_fixed["y"] - spacer_top) <= 80, (
        f"stale ScrollTrigger start: pin engaged at {first_fixed['y']} but layout offset is {spacer_top}"
    )
