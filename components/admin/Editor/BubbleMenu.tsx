import { BubbleMenu as TipTapBubbleMenu } from "@tiptap/react";

interface BubbleMenuProps {
  editor: any;
}

interface BubbleMenuButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const Button: React.FC<BubbleMenuButtonProps> = ({
  isActive,
  onClick,
  children,
}) => (
  <button
    className={`text-white h-8 w-8 border-r-2 rounded-l-lg border-white px-2 hover:bg-gray-600 ${
      isActive ? "text-emerald-500" : ""
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export const BubbleMenu: React.FC<BubbleMenuProps> = ({ editor }) => {
  return (
    <TipTapBubbleMenu
      editor={editor}
      className="bubble-menu flex relative items-center bg-gray-800 rounded-lg py-4 h-8"
    >
      <Button
        isActive={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        B
      </Button>

      <Button
        isActive={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        i
      </Button>

      <Button
        isActive={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        S
      </Button>
    </TipTapBubbleMenu>
  );
};
