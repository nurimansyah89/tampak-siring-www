---
name: chart
description: Generate chart based on `chart.js`
license: MIT
---

# Chart Guidelines
Please use this skill when creating or updating related information about chart.

## References

- [Installation](https://www.chartjs.org/docs/latest/getting-started/installation.html)
- [Getting Started](https://www.chartjs.org/docs/latest/getting-started/)
- [Integration](https://www.chartjs.org/docs/latest/getting-started/integration.html)
- [Step by Step Usage](https://www.chartjs.org/docs/latest/getting-started/usage.html)
- [Server Side Generation](https://www.chartjs.org/docs/latest/getting-started/using-from-node-js.html)
- [Colors](https://www.chartjs.org/docs/latest/general/colors.html)
- [Data Structures](https://www.chartjs.org/docs/latest/general/data-structures.html)
- [Fonts](https://www.chartjs.org/docs/latest/general/fonts.html)
- [Options](https://www.chartjs.org/docs/latest/general/options.html)
- [Padding](https://www.chartjs.org/docs/latest/general/padding.html)
- [Performance](https://www.chartjs.org/docs/latest/general/performance.html)

## Configuration References
- [Configuration](https://www.chartjs.org/docs/latest/configuration/)
- [Animation](https://www.chartjs.org/docs/latest/configuration/animations.html)
- [Canvas Background](https://www.chartjs.org/docs/latest/configuration/canvas-background.html)
- [Data Decimation](https://www.chartjs.org/docs/latest/configuration/decimation.html)
- [Device Pixel Ratio](https://www.chartjs.org/docs/latest/configuration/device-pixel-ratio.html)
- [Elements](https://www.chartjs.org/docs/latest/configuration/elements.html)
- [Interactions](https://www.chartjs.org/docs/latest/configuration/interactions.html)
- [Layout](https://www.chartjs.org/docs/latest/configuration/layout.html)
- [Legend](https://www.chartjs.org/docs/latest/configuration/legend.html)
- [Locale](https://www.chartjs.org/docs/latest/configuration/locale.html)
- [Responsive Charts](https://www.chartjs.org/docs/latest/configuration/responsive.html)
- [Subtitle](https://www.chartjs.org/docs/latest/configuration/subtitle.html)
- [Title](https://www.chartjs.org/docs/latest/configuration/title.html)
- [Tooltip](https://www.chartjs.org/docs/latest/configuration/tooltip.html)

## Chart Types References

- [Area Chart](https://www.chartjs.org/docs/latest/charts/area.html)
- [Bar Chart](https://www.chartjs.org/docs/latest/charts/bar.html)
- [Bubble Chart](https://www.chartjs.org/docs/latest/charts/bubble.html)
- [Doughnut and Pie Charts](https://www.chartjs.org/docs/latest/charts/doughnut.html)
- [Line Chart](https://www.chartjs.org/docs/latest/charts/line.html)
- [Mixed Chart Types](https://www.chartjs.org/docs/latest/charts/mixed.html)
- [Polar Area Chart](https://www.chartjs.org/docs/latest/charts/polar.html)
- [Radar Chart](https://www.chartjs.org/docs/latest/charts/radar.html)
- [Scatter Chart](https://www.chartjs.org/docs/latest/charts/scatter.html)

## Axes References

- [Axes](https://www.chartjs.org/docs/latest/axes/)
- [Cartesian](https://www.chartjs.org/docs/latest/axes/cartesian/)
- [Radial](https://www.chartjs.org/docs/latest/axes/radial/)
- [Labelling Axes](https://www.chartjs.org/docs/latest/axes/labelling.html)
- [Styling Axes](https://www.chartjs.org/docs/latest/axes/styling.html)

---

## Common Issues & Fixes

### Chart.js animation tidak muncul atau chart tidak tampil (SSR / Angular)

**Root cause:** Canvas parent element tidak memiliki height definitif saat Chart.js diinisialisasi. Ini sering terjadi di CSS Grid + `flex-1` combo — grid row height bergantung pada konten, sementara `flex-1` butuh parent height sebagai referensi (circular dependency).

**Solusi:**

1. **Parent card harus punya height minimum:**
   ```html
   <div class="..." style="min-height: 340px;">
   ```

2. **Chart wrapper pakai fixed height (bukan `flex-1`):**
   ```html
   <div style="height: 256px;">
     <canvas id="myChart" class="w-full h-full block"></canvas>
   </div>
   ```

3. **Init chart pakai polling sampai parent punya height:**
   ```typescript
   afterNextRender(() => {
     const tryInit = () => {
       const canvas = document.getElementById('myChart') as HTMLCanvasElement;
       if (canvas && canvas.parentElement && canvas.parentElement.offsetHeight > 0) {
         this.initChart();
       } else {
         requestAnimationFrame(tryInit);
       }
     };
     requestAnimationFrame(tryInit);
   });
   ```

**Pattern lengkap untuk komponen Angular + SSR:**
```typescript
import { Component, OnDestroy, afterNextRender } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({...})
export class MyComponent implements OnDestroy {
  private chart: Chart | null = null;

  constructor() {
    afterNextRender(() => {
      const tryInit = () => {
        const canvas = document.getElementById('myChart') as HTMLCanvasElement;
        if (canvas?.parentElement?.offsetHeight) {
          this.initChart();
        } else {
          requestAnimationFrame(tryInit);
        }
      };
      requestAnimationFrame(tryInit);
    });
  }

  private initChart(): void {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: { ... },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1000, easing: 'easeOutQuart' },
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true, grid: { color: '#d1c4b8' } },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
```

> Use all references to create or update charts.
