import { useState } from "react";
import { Button, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function ImageUpload() {
  const [image, setImage] = useState([]);
  const [filename, setFilename] = useState("");

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setFilename(name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      if (!evt?.target?.result) {
        return;
      }
      const { result } = evt.target;
      setImage(result);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <>
      <Button
        component="label"
        variant="outlined"
        startIcon={<UploadFileIcon />}
        sx={{ marginRight: "1rem" }}
      >
        Upload Image
        <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
      </Button>
    </>
  );
}
