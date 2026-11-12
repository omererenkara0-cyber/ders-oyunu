import pathlib
root = pathlib.Path(__file__).parent
src = root/'src'
order = ['match.js','svg.js','data/tyt-turkce.js','data/tyt-matematik.js','data/tyt-geometri.js','data/tyt-fizik.js','data/tyt-kimya.js','data/tyt-biyoloji.js','data/tyt-tarih.js','data/tyt-cografya.js','data/tyt-felsefe.js','data/tyt-din.js','data/tyt-deneme.js','data/tyt-denemeler.js','data/subjects.js','weak.js','anim.js','engine.js']
js = '\n'.join((src/f).read_text() for f in order)
html = (src/'index.template.html').read_text().replace('/*CSS*/', (src/'style.css').read_text()).replace('/*JS*/', js)
out = root/'dist'/'ders-oyunu.html'
out.parent.mkdir(exist_ok=True)
out.write_text(html)
print(out, len(html))
