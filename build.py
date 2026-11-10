import pathlib
root = pathlib.Path(__file__).parent
src = root/'src'
order = ['match.js','svg.js','data/formul-svg.js','data/biyoloji.js','data/biyoloji-zor.js','data/fizik.js','data/fizik-zor.js','data/inkilap.js','data/din.js','data/edebiyat.js','data/formuller.js','data/subjects.js','weak.js','anim.js','formulas.js','engine.js']
js = '\n'.join((src/f).read_text() for f in order)
html = (src/'index.template.html').read_text().replace('/*CSS*/', (src/'style.css').read_text()).replace('/*JS*/', js)
out = root/'dist'/'ders-oyunu.html'
out.parent.mkdir(exist_ok=True)
out.write_text(html)
print(out, len(html))
