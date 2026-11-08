import pathlib
root = pathlib.Path(__file__).parent
src = root/'src'
order = ['match.js','svg.js','data/biyoloji.js','data/fizik.js','data/inkilap.js','data/din.js','data/edebiyat.js','data/subjects.js','engine.js']
js = '\n'.join((src/f).read_text() for f in order)
html = (src/'index.template.html').read_text().replace('/*CSS*/', (src/'style.css').read_text()).replace('/*JS*/', js)
out = root/'dist'/'ders-oyunu.html'
out.write_text(html)
print(out, len(html))
