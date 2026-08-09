import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Image as ImageIcon,
  Video, // ✅ Replaced Youtube with Video
  Heading1,
  Heading2,
  Quote,
  Undo,
  Redo,
  Code,
} from 'lucide-react';
import { useState } from 'react';
import { MediaPickerModal } from './MediaPickerModal';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: 'max-w-full rounded-lg my-2',
        },
      }),
      Youtube.configure({
        width: 640,
        height: 480,
        HTMLAttributes: {
          class: 'rounded-lg my-2',
        },
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'min-h-[200px] max-h-[500px] overflow-y-auto rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white focus:outline-none prose prose-invert max-w-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const insertImage = (url: string) => {
    editor.chain().focus().setImage({ src: url }).run();
  };

  const insertYoutube = () => {
    const url = prompt('Paste YouTube URL:');
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  };

  const ToolbarButton = ({ onClick, icon: Icon, label, isActive = false }: any) => (
    <button
      onClick={onClick}
      className={`rounded-lg p-2 text-sm transition-colors ${
        isActive
          ? 'bg-cyber-500/30 text-cyber-300'
          : 'text-slate-400 hover:bg-white/10 hover:text-white'
      }`}
      title={label}
    >
      <Icon className="h-4 w-4" />
    </button>
  );

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-1 rounded-lg border border-white/10 bg-navy-800/50 p-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          icon={Bold}
          label="Bold"
          isActive={editor.isActive('bold')}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          icon={Italic}
          label="Italic"
          isActive={editor.isActive('italic')}
        />
        <div className="mx-1 h-6 w-px bg-white/10" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          icon={Heading1}
          label="Heading 1"
          isActive={editor.isActive('heading', { level: 1 })}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          icon={Heading2}
          label="Heading 2"
          isActive={editor.isActive('heading', { level: 2 })}
        />
        <div className="mx-1 h-6 w-px bg-white/10" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          icon={List}
          label="Bullet List"
          isActive={editor.isActive('bulletList')}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          icon={ListOrdered}
          label="Numbered List"
          isActive={editor.isActive('orderedList')}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          icon={Quote}
          label="Quote"
          isActive={editor.isActive('blockquote')}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          icon={Code}
          label="Code Block"
          isActive={editor.isActive('codeBlock')}
        />
        <div className="mx-1 h-6 w-px bg-white/10" />
        <ToolbarButton
          onClick={() => setShowMediaPicker(true)}
          icon={ImageIcon}
          label="Insert Image"
        />
        <ToolbarButton
          onClick={insertYoutube}
          icon={Video} // ✅ Updated icon
          label="Insert YouTube"
        />
        <div className="ml-auto flex gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            icon={Undo}
            label="Undo"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            icon={Redo}
            label="Redo"
          />
        </div>
      </div>

      <EditorContent editor={editor} />

      <MediaPickerModal
        open={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelect={insertImage}
      />
    </div>
  );
}