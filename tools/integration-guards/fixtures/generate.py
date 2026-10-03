"""Original geometric font fixture; requires fontTools only to regenerate."""
from pathlib import Path
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen

builder = FontBuilder(1000, isTTF=True)
builder.setupGlyphOrder([".notdef", "space", "A"])
builder.setupCharacterMap({32: "space", 65: "A"})
glyphs = {}
for name in [".notdef", "space", "A"]:
    pen = TTGlyphPen(None)
    if name != "space":
        pen.moveTo((100, 0))
        pen.lineTo((500, 0))
        pen.lineTo((500, 700))
        pen.lineTo((100, 700))
        pen.closePath()
    glyphs[name] = pen.glyph()
builder.setupGlyf(glyphs)
builder.setupHorizontalMetrics({name: (600, 0) for name in glyphs})
builder.setupHorizontalHeader(ascent=800, descent=-200)
builder.setupNameTable({"familyName": "Beast Loader Test Fixture", "styleName": "Regular", "uniqueFontIdentifier": "BeastLoaderTestFixture-1.0", "fullName": "Beast Loader Test Fixture", "psName": "BeastLoaderTestFixture", "version": "Version 1.0"})
builder.setupOS2(sTypoAscender=800, sTypoDescender=-200, usWinAscent=800, usWinDescent=200)
builder.setupPost()
builder.setupMaxp()
builder.font["head"].created = builder.font["head"].modified = 2082844800
builder.font.recalcTimestamp = False
builder.font.flavor = "woff"
builder.font.save(Path(__file__).with_name("loader-test.woff"))
