// resources/js/Components/TrixEditor.jsx
import { useEffect, useRef } from 'react'
import 'trix/dist/trix.css'
import 'trix'

export default function TrixEditor({ value = '', onChange, inputName = 'note' }) {
  const inputRef = useRef(null)
  const editorRef = useRef(null)

  // listen di <trix-editor>, bukan di <input>
  useEffect(() => {
    const editorEl = editorRef.current
    const handler = () => {
      const html = inputRef.current?.value ?? ''
      onChange && onChange(html)
    }
    editorEl?.addEventListener('trix-change', handler)
    return () => editorEl?.removeEventListener('trix-change', handler)
  }, [onChange])

  // paksa LTR (opsional)
  useEffect(() => {
    const el = editorRef.current
    if (el) {
      el.setAttribute('dir', 'ltr')
      el.style.textAlign = 'left'
    }
  }, [])

  // sinkron prop `value` -> isi editor (penting untuk halaman Edit)
  useEffect(() => {
    const inputEl = inputRef.current
    const editorEl = editorRef.current
    if (!inputEl || !editorEl?.editor) return
    if (inputEl.value !== value) {
      inputEl.value = value || ''
      editorEl.editor.loadHTML(value || '')
    }
  }, [value])

  return (
    <>
      <input id={inputName} name={inputName} type="hidden" defaultValue={value} ref={inputRef} />
      <trix-editor ref={editorRef} input={inputName}></trix-editor>
    </>
  )
}
