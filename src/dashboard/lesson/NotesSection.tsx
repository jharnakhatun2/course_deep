import { useState, useRef, useEffect } from "react";
import FormattingTolls from "./FormattingTolls";
import DisplayNotes from "./DisplayNotes";
import { LuNotebookText } from "react-icons/lu";

interface EditorState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
}

interface SavedNote {
  id: string;
  title: string;
  content: string;
  timestamp: string;
}

const NOTES_STORAGE_KEY = "user_notes";

// Data validation function
const isValidSavedNote = (note: any): note is SavedNote => {
  return (
    note &&
    typeof note.id === 'string' &&
    typeof note.title === 'string' &&
    typeof note.content === 'string' &&
    typeof note.timestamp === 'string'
  );
};

const NotesSection: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([]);
  const [formatState, setFormatState] = useState<EditorState>({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
  });

  const editorRef = useRef<HTMLDivElement>(null);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const loadSavedNotes = () => {
      try {
        console.log('📥 Loading notes from localStorage...');
        const storedNotes = localStorage.getItem(NOTES_STORAGE_KEY);
        
        if (storedNotes) {
          const parsedNotes = JSON.parse(storedNotes);
          console.log('Parsed notes from storage:', parsedNotes);
          
          if (Array.isArray(parsedNotes)) {
            // Validate each note and filter out invalid ones
            const validNotes = parsedNotes.filter(isValidSavedNote);
            console.log('Valid notes after filtering:', validNotes);
            
            setSavedNotes(validNotes);
          } else {
            console.log('Stored data is not an array, resetting...');
            setSavedNotes([]);
          }
        } else {
          console.log('No notes found in localStorage');
          setSavedNotes([]);
        }
      } catch (error) {
        console.error('Error loading notes from localStorage:', error);
        setSavedNotes([]);
      }
    };

    loadSavedNotes();
  }, []);

  // Save notes to localStorage whenever savedNotes changes
  useEffect(() => {
    const saveToStorage = () => {
      try {
        console.log('💾 Saving notes to localStorage:', savedNotes);
        localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(savedNotes));
        console.log('✅ Save successful');
      } catch (error) {
        console.error('Error saving notes to localStorage:', error);
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
          alert('Storage is full. Please delete some notes.');
        }
      }
    };

    saveToStorage();
  }, [savedNotes]);

  // Command Execution formatting tools
  const executeCommand = (command: string, value: string = "") => {
    editorRef.current?.focus();
    if (command === "insertUnorderedList" || command === "insertOrderedList") {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        let node: Node | null = selection.getRangeAt(0).commonAncestorContainer;
        while (node && node.nodeType !== Node.ELEMENT_NODE) {
          node = node.parentNode;
        }

        const element = node as Element;
        if (element) {
          if (command === "insertUnorderedList" && element.closest("ol")) {
            document.execCommand("insertOrderedList", false, undefined);
          } else if (command === "insertOrderedList" && element.closest("ul")) {
            document.execCommand("insertUnorderedList", false, undefined);
          }
        }
      }
    }
    document.execCommand(command, false, value);
    updateFormatState();
  };

  const handleListInsert = (type: "ul" | "ol") => {
    editorRef.current?.focus();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    let listItem = range.commonAncestorContainer as Element;
    while (listItem && listItem.nodeName !== "LI" && listItem.parentNode) {
      listItem = listItem.parentNode as Element;
    }

    if (listItem && listItem.nodeName === "LI") {
      const currentList = listItem.parentNode as Element;
      if (currentList.nodeName === type.toUpperCase()) {
        document.execCommand("insertUnorderedList", false, undefined);
        document.execCommand("insertOrderedList", false, undefined);
      } else {
        if (type === "ul") {
          document.execCommand("insertOrderedList", false, undefined);
          document.execCommand("insertUnorderedList", false, undefined);
        } else {
          document.execCommand("insertUnorderedList", false, undefined);
          document.execCommand("insertOrderedList", false, undefined);
        }
      }
    } else {
      if (type === "ul") {
        document.execCommand("insertUnorderedList", false, undefined);
      } else {
        document.execCommand("insertOrderedList", false, undefined);
      }
    }
    updateFormatState();
  };

  const updateFormatState = () => {
    setFormatState({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikethrough: document.queryCommandState("strikethrough"),
    });
  };

  const handleInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      executeCommand("createLink", url);
    }
  };

  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const saveNote = () => {
    if (!title && !content) {
      alert("Please add a title or content before saving!");
      return;
    }

    const noteData: SavedNote = {
      id: generateId(),
      title: title || "Untitled Note",
      content: content || "Empty note",
      timestamp: new Date().toISOString(),
    };

    setSavedNotes(prevNotes => [noteData, ...prevNotes]);
    clearEditor();
  };

  const clearEditor = () => {
    setTitle("");
    setContent("");
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      updateFormatState();
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  const handleEditNote = (index: number) => {
    const noteToEdit = savedNotes[index];
    setTitle(noteToEdit.title);
    setContent(noteToEdit.content);
    if (editorRef.current) {
      editorRef.current.innerHTML = noteToEdit.content;
    }
    setSavedNotes(prevNotes => prevNotes.filter((_, i) => i !== index));
  };

  const handleDeleteNote = (index: number) => {
    setSavedNotes(prevNotes => prevNotes.filter((_, i) => i !== index));
  };

  const clearAllNotes = () => {
    if (window.confirm("Are you sure you want to delete all notes? This action cannot be undone.")) {
      setSavedNotes([]);
      localStorage.removeItem(NOTES_STORAGE_KEY);
    }
  };

  const inputStyle =
    "transition-smooth border border-gray-200 rounded p-3 w-full focus:outline-none focus:shadow-[0_0_15px_#c1c1c1] backdrop-blur-lg bg-white/50";

  return (
    <div>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Editor Card */}
        <div className="w-full bg-gray-300/50 border border-gray-300/50 overflow-hidden">
          <div className="px-6 pt-6 space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note Title"
              className={inputStyle}
            />
            <div
              ref={editorRef}
              contentEditable
              onInput={handleInput}
              onKeyUp={updateFormatState}
              className={`${inputStyle} h-40 overflow-y-auto`}
              data-placeholder="Write Something Awesome..."
              suppressContentEditableWarning={true}
            />
          </div>

          <div className="px-6 pb-6 flex items-center justify-between gap-4 flex-wrap">
            <FormattingTolls
              executeCommand={executeCommand}
              formatState={formatState}
              handleListInsert={handleListInsert}
              insertLink={insertLink}
            />
            <button
              onClick={saveNote}
              className="px-6 py-2 mt-3 cursor-pointer font-semibold uppercase text-sm shadow transition-smooth bg-yellow-500 hover:bg-yellow-600 text-zinc-800 hover:text-white/70"
            >
              Save Note
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LuNotebookText className="text-yellow-500" />
            <h3 className="text-xl text-zinc-700">Saved Notes ({savedNotes.length})</h3>
          </div>
          {savedNotes.length > 0 && (
            <button
              onClick={clearAllNotes}
              className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition-smooth cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>

        <DisplayNotes
          handleEditNote={handleEditNote}
          handleDeleteNote={handleDeleteNote}
          savedNotes={savedNotes}
        />
      </div>
    </div>
  );
};

export default NotesSection;