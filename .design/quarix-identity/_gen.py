from math import cos, sin, radians

INK, PAPER, MUTED = "#0A0A0A", "#FFFFFF", "#8E8E88"
HAIR = "rgba(10,10,10,0.10)"
HAIR_D = "rgba(250,250,250,0.14)"

def pt(cx, cy, r, deg):
    a = radians(deg)
    return (round(cx + r * cos(a), 3), round(cy + r * sin(a), 3))

def sector(cx, cy, R, Ri, a1, a2):
    span = (a2 - a1) % 360
    large = 1 if span > 180 else 0
    o1, o2 = pt(cx, cy, R, a1), pt(cx, cy, R, a2)
    i2, i1 = pt(cx, cy, Ri, a2), pt(cx, cy, Ri, a1)
    return (f"M{o1[0]} {o1[1]} A{R} {R} 0 {large} 1 {o2[0]} {o2[1]} "
            f"L{i2[0]} {i2[1]} A{Ri} {Ri} 0 {large} 0 {i1[0]} {i1[1]} Z")

C, R, RI, OFF = 50, 38, 20, 7

def sym_quarter(fill, off=OFF, ri=RI):
    return (f'<path d="{sector(C, C, R, ri, 90, 360)}" fill="{fill}"/>'
            f'<path d="{sector(C+off, C+off, R, ri, 0, 90)}" fill="{fill}"/>')

def sym_corner(fill):
    def ring(r):
        b, right = pt(C, C, r, 90), pt(C, C, r, 0)
        return (f"M{b[0]} {b[1]} L{C+r} {C+r} L{right[0]} {right[1]} "
                f"A{r} {r} 0 1 0 {b[0]} {b[1]} Z")
    return f'<path d="{ring(R)} {ring(RI)}" fill="{fill}" fill-rule="evenodd"/>'

def sym_module(fill):
    cell, gap = 18.4, 2.0
    keep = [(1,0),(2,0),(3,0),(0,1),(4,1),(0,2),(4,2),(0,3),(4,3),
            (1,4),(2,4),(3,4),(4,4)]
    return "".join(
        f'<rect x="{round(4+c*(cell+gap),2)}" y="{round(4+r*(cell+gap),2)}" '
        f'width="{cell}" height="{cell}" rx="2" fill="{fill}"/>' for c, r in keep)

def sym_handle(fill):
    hx, hy = pt(C, C, R-2, 45); s = 27
    return (f'<circle cx="{C}" cy="{C}" r="{(R+RI)/2}" fill="none" stroke="{fill}" stroke-width="{R-RI}"/>'
            f'<rect x="{round(hx-s/2,2)}" y="{round(hy-s/2,2)}" width="{s}" height="{s}" rx="2.5" fill="{fill}"/>')

def sym_chord(fill):
    w = R - RI
    x1, y1 = pt(C, C, RI-4, 45); x2, y2 = pt(C, C, R+9, 45)
    return (f'<circle cx="{C}" cy="{C}" r="{(R+RI)/2}" fill="none" stroke="{fill}" stroke-width="{w}"/>'
            f'<path d="M{x1} {y1} L{x2} {y2}" stroke="{fill}" stroke-width="{w}"/>')

SYMBOLS = {"quarter": lambda f: sym_quarter(f), "corner": sym_corner,
           "module": sym_module, "handle": sym_handle, "chord": sym_chord,
           # tuned for 16-32px: wider gap, heavier ring
           "quarter-micro": lambda f: sym_quarter(f, off=10, ri=16)}

def svg(kind, size, fill=INK, style=""):
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 100 100" fill="none" '
            f'xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:block;{style}">'
            f'{SYMBOLS[kind](fill)}</svg>')

def wordmark(size, fill=INK, weight=600, ls="-0.005em"):
    return (f'<span style="font-size:{size}px;font-weight:{weight};line-height:1;'
            f'letter-spacing:{ls};color:{fill};white-space:nowrap;">QUARIX</span>')

def lockup(sym, word, fill=INK, kind="quarter", gap=None):
    gap = gap if gap is not None else round(sym * 0.36)
    return (f'<div style="display:flex;align-items:center;gap:{gap}px;">'
            f'{svg(kind, sym, fill)}{wordmark(word, fill)}</div>')

def label(text, fill=MUTED):
    return (f'<span style="font-family:\'Geist Mono\',ui-monospace,SFMono-Regular,Menlo,monospace;'
            f'font-size:10px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;'
            f'color:{fill};">{text}</span>')

def board(width, bg, ink, body, pad="64px"):
    return f'''<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap">
  <style>
    body {{
      margin: 0;
      background: {bg};
      color: {ink};
      font-family: "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }}
    a {{ color: {ink}; text-decoration: none; }}
    p {{ margin: 0; }}
    h1, h2, h3 {{ margin: 0; font-weight: 600; }}
  </style>
</helmet>
<div style="width:{width}px;background:{bg};padding:{pad};box-sizing:border-box;">
{body}
</div>
</x-dc>
</body>
</html>
'''
