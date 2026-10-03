import { useEffect, useRef, useState } from 'react'
import { posts, type Post } from './posts'
import { useModal } from './useModal'

export function Reader({ post, name, onClose }: { post: Post; name: string; onClose: () => void }) {
  const dialog = useModal()
  const content = useRef<HTMLDivElement>(null)
  const close = useRef<HTMLButtonElement>(null)
  const [message, setMessage] = useState('')
  const [progress, setProgress] = useState(0)
  const [largeType, setLargeType] = useState(() => {
    try { return localStorage.getItem('journal-large-type') === 'true' } catch { return false }
  })
  const index = posts.findIndex(item => item.id === post.id)
  const previous = posts[index - 1]
  const next = posts[index + 1]

  useEffect(() => {
    const element = dialog.current
    if (!element) return
    element.scrollTop = 0
    close.current?.focus({ preventScroll: true })
    setMessage('')
    const update = () => {
      const range = element.scrollHeight - element.clientHeight
      setProgress(range > 0 ? Math.min(100, Math.round(element.scrollTop / range * 100)) : 100)
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    if (content.current) observer.observe(content.current)
    element.addEventListener('scroll', update, { passive: true })
    return () => { observer.disconnect(); element.removeEventListener('scroll', update) }
  }, [post.id, dialog])

  function toggleType() {
    setLargeType(value => !value)
    try { localStorage.setItem('journal-large-type', String(!largeType)) } catch { /* Reading remains available when storage is blocked. */ }
  }
  async function copyLink() {
    try { await navigator.clipboard.writeText(location.href); setMessage('阅读链接已复制') }
    catch { setMessage('请复制浏览器地址栏中的链接') }
  }

  return <dialog ref={dialog} className={`reader${largeType ? ' large-type' : ''}`} aria-labelledby="article-title"
    onCancel={event => { event.preventDefault(); onClose() }}
    onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <div className="reader-toolbar">
      <span>{name}的博客 <span className="reader-toolbar-divider">/ 阅读</span></span>
      <div className="reader-controls"><button onClick={toggleType} aria-pressed={largeType} aria-label="大字号阅读">A<span className="type-large">A</span></button><button ref={close} onClick={onClose} aria-label="关闭文章">关闭 ×</button></div>
      <div className="reading-progress" role="progressbar" aria-label="阅读进度" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${progress}%` }}/></div>
    </div>
    <div ref={content} className="reader-inner">
      <div className="reader-meta">{post.category} · {post.date.replaceAll('-', '.')} · {Math.max(1, Math.ceil(post.paragraphs.join('').length / 300))} 分钟阅读</div>
      <h2 id="article-title">{post.title}</h2><p className="reader-intro">{post.excerpt}</p>
      <div className="reader-text">{post.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>
      <div className="reader-footer"><span>— 示例文章 · 感谢阅读 —</span><button onClick={copyLink}>复制阅读链接 ↗</button><p role="status">{message}</p></div>
      <nav className="reader-pagination" aria-label="相邻文章">
        {previous ? <a href={`#article/${previous.id}`}><small>← 上一篇</small><span>{previous.title}</span></a> : <span className="pagination-boundary">这是第一篇记录</span>}
        {next ? <a href={`#article/${next.id}`}><small>下一篇 →</small><span>{next.title}</span></a> : <span className="pagination-boundary">已读到最后一篇</span>}
      </nav>
    </div>
  </dialog>
}
