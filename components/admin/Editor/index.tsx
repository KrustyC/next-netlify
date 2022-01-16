import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BubbleMenuExtension from "@tiptap/extension-bubble-menu";
import { BubbleMenu } from "./BubbleMenu";

export const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      BubbleMenuExtension.configure({
        element: document.querySelector(".bubble-menu") as any,
      }),
    ],
    content: `
      <p>
        Hey, try to select some text here. There will popup a menu for selecting some inline styles. Remember: you have full control about content and styling of this menu.
      </p>
    `,
  });

  return (
    <>
      {editor && <BubbleMenu editor={editor} />}

      <div className="h-full">
        <EditorContent editor={editor} />
      </div>
    </>
  );
};
