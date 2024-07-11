import { EditorContent, useEditor } from '@tiptap/react'
import 'highlight.js/styles/atom-one-dark.css'
import MenuBar from './MenuBar'
import { extensions } from '~/constants/tiptapExtentions'
function Editor({ onDataChange, content, editable }) {
  const editor = useEditor({
    editable,
    editorProps: {
      attributes: {
        // dark:prose-invert
        class:
          'prose  prose-sm sm:prose-base max-w-none focus:outline-none prose-pre:bg-[#282c34] prose-pre:text-[#abb2bf]'
      }
    },
    onUpdate: ({ editor }) => {
      // console.log(editor.chain().focus().setHardBreak().run())
      const json = editor.getJSON()
      onDataChange(json)
    },
    extensions: extensions,
    content
  })
  return (
    <div className="w-full relative">
      {editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  )
}

export default Editor
