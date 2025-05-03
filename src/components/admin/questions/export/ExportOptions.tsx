
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ExportOptionsProps {
  exportActiveOnly: boolean;
  setExportActiveOnly: (value: boolean) => void;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({
  exportActiveOnly,
  setExportActiveOnly,
}) => {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Export Options</h3>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="activeOnly" 
            checked={exportActiveOnly}
            onCheckedChange={(checked) => setExportActiveOnly(checked === true)}
          />
          <Label htmlFor="activeOnly">Export active questions only</Label>
        </div>
      </div>
    </div>
  );
};
