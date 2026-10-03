import { useModal } from './useModal'
import artwork from './assets/bamboo-adventure.webp'

export function ArtworkViewer({ onClose }: { onClose: () => void }) {
  const dialog = useModal()
  return <dialog ref={dialog} className="artwork-viewer" aria-labelledby="artwork-title"
    onCancel={event => { event.preventDefault(); onClose() }}
    onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <div className="artwork-toolbar"><div><span className="eyebrow">BAMBOO CHRONICLES / 01</span><h2 id="artwork-title">竹林奇遇</h2></div><button onClick={onClose} autoFocus aria-label="关闭图片">关闭 ×</button></div>
    <img src={artwork} alt="金色阳光下，戴着斗笠的黄色小侠客在竹林间挥剑，光轨环绕身旁的伙伴。" width="1670" height="941"/>
    <p>一片竹林，一个充满想象的世界。</p>
  </dialog>
}
