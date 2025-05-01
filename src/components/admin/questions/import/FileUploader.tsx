
import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload } from "lucide-react";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ 
  onFileSelect,
  disabled = false 
}) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileSelect(selectedFile);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
            disabled ? "opacity-50 cursor-not-allowed" : "bg-muted/50 hover:bg-muted"
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="mb-1 text-sm text-muted-foreground">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">CSV file with questions</p>
          </div>
          <input 
            ref={fileInputRef}
            type="file" 
            accept=".csv" 
            className="hidden"
            onChange={handleFileChange} 
            disabled={disabled}
          />
        </label>
      </div>
      
      {file && (
        <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium truncate">{file.name}</span>
          <Badge variant="outline" className="ml-auto">
            {(file.size / 1024).toFixed(1)} KB
          </Badge>
        </div>
      )}
    </div>
  );
};
