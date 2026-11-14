#!/usr/bin/env python3
"""Deterministic raster exports from the vector AI Capacity × Judgement identity.

Requires: pip install 'CairoSVG>=2.7,<3' 'Pillow>=10,<13'
Run from any directory: python scripts/build_brand_assets.py
Vector sources are authoritative. Never manually retouch the generated PNGs.
"""
from __future__ import annotations
from io import BytesIO
from pathlib import Path
import cairosvg
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
ASSETS=ROOT/"assets"/"brand"
INK=(20,35,57,255)

def export(source:str,filename:str,w:int,h:int,opaque=False)->None:
    data=cairosvg.svg2png(url=str(ASSETS/source),output_width=w,output_height=h)
    image=Image.open(BytesIO(data)).convert("RGBA")
    if opaque:
        backing=Image.new("RGBA",image.size,INK)
        backing.alpha_composite(image)
        image=backing.convert("RGB")
    image.save(ASSETS/filename,"PNG",optimize=True)
    final=Image.open(ASSETS/filename)
    assert final.size==(w,h),filename
    print(f"{filename}: {w}×{h}; {(ASSETS/filename).stat().st_size:,} bytes")

def main():
    export("mark.svg","favicon-16.png",16,16)
    export("mark.svg","favicon-32.png",32,32)
    export("mark.svg","apple-touch-icon.png",180,180,opaque=True)
    export("mark.svg","icon-192.png",192,192)
    export("mark.svg","icon-512.png",512,512)
    export("mark.svg","icon-maskable-512.png",512,512,opaque=True)
    export("social-preview.svg","social-preview.png",1200,630,opaque=True)

if __name__=="__main__":main()
