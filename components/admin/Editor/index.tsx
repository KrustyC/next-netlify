import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BubbleMenuExtension from "@tiptap/extension-bubble-menu";
import { BubbleMenu } from "./BubbleMenu";

interface EditorProps {
  value: JSONContent | null;
  onChange: (content: JSONContent) => void;
}

export const Editor: React.FC<EditorProps> = ({ value = "", onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      BubbleMenuExtension.configure({
        element: document.querySelector(".bubble-menu") as any,
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getJSON());
    },
  });

  return (
    <>
      {editor && <BubbleMenu editor={editor} />}

      <div className="min-h-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <EditorContent editor={editor} />
      </div>
    </>
  );
};
