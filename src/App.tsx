import { useEffect, useState } from 'react'
import { choose, loadConfig, type PageConfig } from './config'
import { posts } from './posts'
import heroImage from './assets/bamboo-hero.webp'
import adventureImage from './assets/bamboo-adventure.webp'
import adventureSmall from './assets/bamboo-adventure-small.webp'
import { Reader } from './Reader'
import { ArtworkViewer } from './ArtworkViewer'
import './style.css'
import './upgrade.css'

const names = ['Martin&林知远']
const cities = ['杭州', '成都', '厦门', '南京', '深圳']
const categories = ['全部', '随笔', '创作', '技术']
const dateLabel = (date: string) => date.replaceAll('-', '.')
const readTime = (text: string[]) => Math.max(1, Math.ceil(text.join('').length / 300))
const postFromHash = () => posts.find(post => `#article/${post.id}` === window.location.hash) ?? null

function Blog({ config }: { config: PageConfig }) {
  const name = config.name || choose(names, config.seed, 'name')
  const city = config.city || choose(cities, config.seed, 'city')
  const [category, setCategory] = useState('全部')
  const [query, setQuery] = useState('')
  const [activePost, setActivePost] = useState(postFromHash)
  const [artworkOpen, setArtworkOpen] = useState(false)
  const filtered = posts.filter(post => (category === '全部' || post.category === category) && `${post.title}${post.excerpt}${post.paragraphs.join('')}`.toLowerCase().includes(query.trim().toLowerCase()))
  useEffect(() => {
    const update = () => { setActivePost(postFromHash()); setArtworkOpen(false) }
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])
  useEffect(() => {
    document.title = activePost ? `${activePost.title} · ${name}的博客` : `${name}的博客 · 心有旷野，落笔成林`
  }, [activePost, name])
  function closeArticle() {
    history.replaceState(null, '', `${location.pathname}${location.search}#posts`)
    setActivePost(null)
  }
  return <main className="blog-shell" id="top">
    <a className="skip-link" href="#posts">跳到文章列表</a>
    <section className="hero cinematic-hero">
      <div className="hero-art" aria-hidden="true"><img src={adventureImage} srcSet={`${adventureSmall} 800w, ${adventureImage} 1670w`} sizes="(max-width: 760px) 100vw, 75vw" alt="" width="1670" height="941" fetchPriority="high"/></div>
      <nav aria-label="主导航"><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">林</span><span>{name}<small>PERSONAL JOURNAL</small></span></a><div><a href="#posts">文章 <span>Journal</span></a><a href="#about">关于 <span>About</span></a><a className="nav-index" href="#posts" aria-label="浏览全部文章">↗</a></div></nav>
      <div className="hero-copy"><p className="eyebrow"><span /> {city} · 生活与创作的随行记录</p><h1>心有旷野，<br/>落笔成<span className="hero-last">林<span className="gold-dot">。</span></span></h1><p className="hero-description">在日常里寻找灵感，在文字里自由远行。<br/>关于技术、阅读，和一点不设限的想象。</p><div className="hero-actions"><a className="read-button" href="#posts">翻开最近的记录 <span>↗</span></a><button className="artwork-trigger" onClick={() => setArtworkOpen(true)}><span aria-hidden="true">⤢</span> 看完整画面</button></div><div className="hero-note"><span>VOL. 01</span><span>竹林奇遇 · 想象不设边界</span></div></div>
      <div className="hero-bottom"><span>保持好奇，允许缓慢。</span><a href="#posts">向下探索 <span>↓</span></a><span className="hero-coordinate">A LITTLE SPACE, A WIDER WORLD.</span></div>
    </section>
    <div className="intro-strip"><span className="tiny-label">THE QUIET JOURNAL</span><p>观察生活的细节，也记录思考的过程。</p><span className="strip-mark" aria-hidden="true">✳</span></div>
    <section className="content" id="posts">
      <div className="section-head"><div><span className="eyebrow">01 / THE JOURNAL</span><h2>一些记录<span className="heading-dot">.</span></h2></div><p>不追赶热点，只收藏值得留下的片刻。<br/><span>随笔 / 创作 / 技术</span></p></div>
      <div className="journal-tools"><div className="filters" role="group" aria-label="文章分类">{categories.map(item => <button key={item} className={category === item ? 'selected' : ''} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}<span>{item === '全部' ? posts.length : posts.filter(post => post.category === item).length}</span></button>)}</div><label className="search"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="寻找一段文字…" aria-label="搜索文章"/></label></div>
      <p className="result-count" role="status">{query || category !== '全部' ? `找到 ${filtered.length} 篇记录` : `共 ${posts.length} 篇记录 · 示例内容`}</p>
      <div className="post-grid">{filtered.map((post) => <article key={post.id} className={post.id === posts[0].id ? 'post-card featured' : 'post-card'}><a className="post-link" href={`#article/${post.id}`} aria-label={`阅读：${post.title}`}>
        {post.id === posts[0].id && <div className="post-image"><img src={heroImage} alt="暖阳竹林中的斗笠小侠客" loading="lazy" width="1536" height="1024"/><span>编辑精选 / FEATURED</span></div>}
        <div className="post-body"><div className="post-meta"><span>{post.category}</span><time dateTime={post.date}>{dateLabel(post.date)}</time></div><h3>{post.title}</h3><p>{post.excerpt}</p><div className="post-bottom"><span>{readTime(post.paragraphs)} 分钟阅读</span><span className="article-arrow" aria-hidden="true">↗</span></div></div>
      </a></article>)}</div>
      {filtered.length === 0 && <div className="empty-state"><span aria-hidden="true">⌕</span><h3>还没有找到这段文字</h3><p>换个关键词，或回到全部记录看看。</p><button onClick={() => { setCategory('全部'); setQuery('') }}>查看全部文章 ↗</button></div>}
      <div className="journal-end"><span/>记录还在继续<span/></div>
    </section>
    <section className="visual-note" aria-labelledby="visual-note-title"><button className="visual-note-image" onClick={() => setArtworkOpen(true)} aria-label="放大欣赏竹林奇遇"><img src={adventureSmall} alt="竹林里挥剑的黄色小侠客与伙伴" width="800" height="451" loading="lazy"/><span>打开画面 ⤢</span></button><div><span className="eyebrow">02 / A LITTLE IMAGINATION</span><h2 id="visual-note-title">给日常，<br/>留一点想象。</h2><p>文字之外，也收藏让人停下来的画面。<br/>让好奇心带路，走进下一个故事。</p><button onClick={() => setArtworkOpen(true)}>走进这片竹林 <span>↗</span></button></div></section>
    <section className="about" id="about"><div className="about-label"><span className="eyebrow">03 / BEHIND THE WORDS</span><span className="about-emblem" aria-hidden="true">林</span></div><div className="about-copy"><p className="eyebrow">很高兴，在这里遇见你。</p><h2>你好，我是{name}。<br/><span>一个生活的观察者。</span></h2><p>我在{city}生活与工作，用文字保存灵感，也分享正在实践的工具和方法。相信微小的积累，也珍惜偶尔的停顿。</p><div className="about-tags"><span>⌘ 独立探索</span><span>↗ 持续学习</span><span>☼ 认真生活</span></div><a href="#posts">从一篇文章开始认识我 <span>↗</span></a></div></section>
    <footer><a className="footer-brand" href="#top">{name}的博客<span>保持好奇，慢慢生长。</span></a><div><span>© {new Date().getFullYear()} {name} · Written with curiosity.</span><a href="#top">回到顶部 ↑</a></div></footer>
    {activePost && <Reader post={activePost} name={name} onClose={closeArticle}/>}
    {artworkOpen && !activePost && <ArtworkViewer onClose={() => setArtworkOpen(false)}/>}
  </main>
}

export default function App() {
  const [config, setConfig] = useState<PageConfig | null>(null)
  useEffect(() => { loadConfig().then(setConfig) }, [])
  return config ? <Blog config={config} /> : <div className="loading" role="status">正在翻开手记…</div>
}
