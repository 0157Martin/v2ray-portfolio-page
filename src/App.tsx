import { useEffect, useState } from 'react'
import { choose, loadConfig, type PageConfig } from './config'
import heroImage from './assets/bamboo-hero.webp'
import './style.css'

const names = ['林知远', '周予安', '陈若川', '许清和', '沈言川']
const cities = ['杭州', '成都', '厦门', '南京', '深圳']
const titles = ['在竹影里，重新理解慢下来', '把日常做成一件长期作品', '独立开发者的工具与秩序', '读书、远行与微小发现']
const excerpts = ['光穿过竹叶时，时间有了可以被看见的形状。', '记录并不需要宏大的理由，持续本身就是答案。', '少一点喧闹，多一点能够反复使用的东西。']
const categories = ['随笔', '创作', '技术']

function Blog({ config }: { config: PageConfig }) {
  const name = choose(names, config.seed, 'name')
  const city = choose(cities, config.seed, 'city')
  const posts = [0, 1, 2].map((index) => ({ title: choose(titles, config.seed, `title-${index}`), excerpt: excerpts[index], category: categories[index] }))
  return <main className="blog-shell">
    <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(8,16,12,.88) 0%, rgba(8,16,12,.55) 42%, rgba(8,16,12,.08) 78%), url(${heroImage})` }}>
      <nav><a className="brand" href="#top">{name}的博客</a><div><a href="#posts">文章</a><a href="#about">关于</a></div></nav>
      <div className="hero-copy" id="top"><p>{city} · PERSONAL JOURNAL</p><h1>在喧闹之外，<br/>记录自己的世界。</h1><span>关于技术、阅读、旅行和那些值得慢慢完成的事。</span><a className="read-button" href="#posts">开始阅读 <b>→</b></a></div>
      <small>{config.domain}</small>
    </section>
    <section className="content" id="posts"><div className="section-head"><div><span>RECENT STORIES</span><h2>最近文章</h2></div><p>偶尔更新，认真记录。</p></div>
      <div className="post-grid">{posts.map((post, index) => <article key={`${post.title}-${index}`}><div className="post-meta"><span>{post.category}</span><time>2026 · 0{index + 1}</time></div><h3>{post.title}</h3><p>{post.excerpt}</p><a href="#top">阅读全文 <span>↗</span></a></article>)}</div>
    </section>
    <section className="about" id="about"><p>ABOUT</p><h2>你好，我是{name}。</h2><div><span>我在{city}生活与工作，用文字保存灵感，也分享正在实践的工具和方法。</span><a href={`https://${config.domain}`}>{config.domain}</a></div></section>
    <footer><span>© {new Date().getFullYear()} {name}</span><span>Written with curiosity.</span></footer>
  </main>
}

export default function App() {
  const [config, setConfig] = useState<PageConfig | null>(null)
  useEffect(() => { loadConfig().then(setConfig) }, [])
  return config ? <Blog config={config} /> : <div className="loading">Loading</div>
}
