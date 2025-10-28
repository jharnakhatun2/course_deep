import { BsTypeBold } from "react-icons/bs";
import { CgFormatItalic, CgFormatUnderline } from "react-icons/cg";
import { GrStrikeThrough } from "react-icons/gr";
import { IoIosList } from "react-icons/io";
import { VscListOrdered } from "react-icons/vsc";
import {
  PiCodeSimpleThin,
  PiLinkSimpleLight,
  PiTextAlignCenterThin,
  PiTextAlignLeftThin,
  PiTextAlignRightThin,
} from "react-icons/pi";
import type { FC } from "react";

interface FormattingTollsProps {
  executeCommand: (command: string, value?: string) => void;
  formatState: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strikethrough: boolean;
  };
  handleListInsert: (type: "ul" | "ol") => void;
  insertLink: () => void;
}

const FormattingTolls: FC<FormattingTollsProps> = ({
  executeCommand,
  formatState,
  handleListInsert,
  insertLink,
}) => {

  const toolStyle = "p-1 hover:text-zinc-700 transition-smooth cursor-pointer";
  
  return (
    <div className="flex items-center gap-1 p-1">
      {/* Text Formatting */}
      <button
        onClick={() => executeCommand("bold")}
        className={`${toolStyle} ${
          formatState.bold ? "bg-yellow-400/30 text-zinc-500" : "text-slate-400"
        }`}
        title="Bold"
      >
        <BsTypeBold size={18} />
      </button>
      <button
        onClick={() => executeCommand("italic")}
        className={`${toolStyle} ${
          formatState.italic
            ? "bg-yellow-400/30 text-zinc-500"
            : "text-slate-400"
        }`}
        title="Italic"
      >
        <CgFormatItalic size={18} />
      </button>
      <button
        onClick={() => executeCommand("underline")}
        className={`${toolStyle} ${
          formatState.underline
            ? "bg-yellow-400/30 text-zinc-500"
            : "text-slate-400"
        }`}
        title="Underline"
      >
        <CgFormatUnderline size={18} />
      </button>
      <button
        onClick={() => executeCommand("strikeThrough")}
        className={`${toolStyle} ${
          formatState.strikethrough
            ? "bg-yellow-400/30 text-zinc-500"
            : "text-slate-400"
        }`}
        title="Strikethrough"
      >
        <GrStrikeThrough size={18} />
      </button>

      <div className="w-px h-6 bg-slate-700 mx-1" />

      {/* Lists */}
      <button
        onClick={() => handleListInsert("ul")}
        className={`text-slate-400 ${toolStyle}`}
        title="Bullet List"
      >
        <IoIosList size={18} />
      </button>
      <button
        onClick={() => handleListInsert("ol")}
        className={`text-slate-400 ${toolStyle}`}
        title="Numbered List"
      >
        <VscListOrdered size={18} />
      </button>

      <div className="w-px h-6 bg-slate-700 mx-1" />

      {/* Alignment */}
      <button
        onClick={() => executeCommand("justifyLeft")}
        className={`text-slate-400 ${toolStyle}`}
        title="Align Left"
      >
        <PiTextAlignLeftThin size={18} />
      </button>
      <button
        onClick={() => executeCommand("justifyCenter")}
        className={`text-slate-400 ${toolStyle}`}
        title="Align Center"
      >
        <PiTextAlignCenterThin size={18} />
      </button>
      <button
        onClick={() => executeCommand("justifyRight")}
        className={`text-slate-400 ${toolStyle}`}
        title="Align Right"
      >
        <PiTextAlignRightThin size={18} />
      </button>

      <div className="w-px h-6 bg-slate-700 mx-1" />

      {/* Link and Code */}
      <button
        onClick={insertLink}
        className={`text-slate-400 ${toolStyle}`}
        title="Insert Link"
      >
        <PiLinkSimpleLight size={18} />
      </button>
      <button
        onClick={() => executeCommand("formatBlock", "<pre>")}
        className={`text-zinc-400 ${toolStyle}`}
        title="Code Block"
      >
        <PiCodeSimpleThin size={18} />
      </button>
    </div>
  );
};

export default FormattingTolls;
