# 竹林奇遇图片处理

- 输入：用户于本次会话提供的 2048 × 1154 JPG 插画。
- 方式：内置 `image_gen` 编辑工具；非 CLI / API 回退。
- 修改：移除底部白色抖音标识与账号文字，重建遮挡处的地面、前景与光轨。
- 输出：`bamboo-adventure-clean.png`，1670 × 941。AI 编辑尽量保留人物和构图，并非像素完全一致的无损修复。
- 网页资源：`../src/assets/bamboo-adventure.webp`（约 205 KB）和 `../src/assets/bamboo-adventure-small.webp`（800px，约 69 KB）。仅用 Sharp 进行格式压缩与缩小，没有再次改动图像内容。
- 使用位置：首页主视觉、竹林奇遇展示区、完整图片查看窗口。

## 实际编辑提示词

Use case: precise-object-edit. Input image is the edit target. Remove ONLY the white Douyin logo and the white text 抖音号：33909346524 across the bottom. Seamlessly reconstruct the obscured forest floor, foreground blurred ninja clothing and light streaks underneath. Preserve the full original wide 16:9 composition, all yellow cartoon martial-arts characters, faces, hats, bamboo forest, weapons, poses, colors, golden lighting, and visual detail as closely as possible. No cropping, no new text, no watermark. This clean image will be used as an existing personal website's cinematic hero image.
