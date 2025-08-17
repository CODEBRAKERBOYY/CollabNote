import React, { useState } from "react";
import ReactQuill from "react-quill";
import debounce from "lodash.debounce";
import "react-quill/dist/quill.snow.css";

export default function Editor({ value, onChange }) {
  const [text, setText] = useState(value || "");

  const handleChange = debounce((content) => {
    setText(content);
    onChange(content);
  }, 500);

  return (
    <ReactQuill
      theme="snow"
      value={text}
      onChange={handleChange}
      placeholder="Write something amazing..."
    />
  );
}
