import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { Extension } from '@tiptap/core';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

// Custom extension for font family
const FontFamily = Extension.create({
  name: 'fontFamily',
  addAttributes() {
    return {
      fontFamily: {
        default: 'Arial',
        parseHTML: (element: HTMLElement) => element.style.fontFamily?.replace(/['"]/g, ''),
        renderHTML: (attributes: { fontFamily: string }) => {
            if (!attributes.fontFamily) return {};
          return { style: `font-family: ${attributes.fontFamily}` };
        },
      },
    };
  },
});

const FONTS = [
  { name: 'Arial', value: 'Arial' },
  { name: 'Times New Roman', value: 'Times New Roman' },
  { name: 'Courier New', value: 'Courier New' },
  { name: 'Georgia', value: 'Georgia' },
  { name: 'Verdana', value: 'Verdana' },
];

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50 dark:bg-gray-800">
      <select
        onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
        value={editor.getAttributes('textStyle').fontFamily}
        className="p-1 border rounded bg-white dark:bg-gray-700"
      >
        <option value="">Font...</option>
        {FONTS.map((font) => (
          <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
            {font.name}
          </option>
        ))}
      </select>

      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
          title="Bold (Ctrl+B)"
        >
          <span className="font-bold">B</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
          title="Italic (Ctrl+I)"
        >
          <span className="italic">I</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('underline') ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
          title="Underline (Ctrl+U)"
        >
          <span className="underline">U</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('highlight') ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
          title="Highlight"
        >
          <span className="bg-yellow-200 dark:bg-yellow-300 px-1">H</span>
        </button>
      </div>

      <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1" />

      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
        >
          H3
        </button>
      </div>

      <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1" />

      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
          title="Bullet List"
        >
          •
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
          title="Numbered List"
        >
          1.
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${
            editor.isActive('blockquote') ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
          title="Quote"
        >
          "
        </button>
      </div>

      <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1" />

      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
          title="Undo (Ctrl+Z)"
        >
          ↩
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
          title="Redo (Ctrl+Shift+Z)"
        >
          ↪
        </button>
      </div>
    </div>
  );
};

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      FontFamily,
      Placeholder.configure({
        placeholder: placeholder || 'Start writing...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full h-full border rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      <MenuBar editor={editor} />
      <EditorContent 
        editor={editor} 
        className="h-[calc(100%-48px)] overflow-auto p-4 prose dark:prose-invert max-w-none"
      />
    </div>
  );
}