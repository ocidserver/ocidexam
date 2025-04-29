
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TopicTag } from "../types/question-types";
import { Plus, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface TagsManagementProps {
  tags: TopicTag[];
  loading: boolean;
  createTag: (name: string, description?: string) => Promise<TopicTag | null>;
  deleteTag: (id: string) => Promise<boolean>;
}

export const TagsManagement: React.FC<TagsManagementProps> = ({
  tags,
  loading,
  createTag,
  deleteTag,
}) => {
  const [open, setOpen] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [newTagDescription, setNewTagDescription] = useState("");
  const { toast } = useToast();

  const handleCreateTag = async () => {
    if (!newTagName) {
      toast({
        title: "Error",
        description: "Tag name is required",
        variant: "destructive",
      });
      return;
    }

    const result = await createTag(newTagName, newTagDescription);
    if (result) {
      setNewTagName("");
      setNewTagDescription("");
      setOpen(false);
    }
  };

  const handleDeleteTag = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the tag "${name}"?`)) {
      await deleteTag(id);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Topic Tags</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="gap-1">
              <Plus className="h-4 w-4" /> Add Tag
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Topic Tag</DialogTitle>
              <DialogDescription>
                Add a new topic tag for categorizing questions.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tag Name</label>
                <Input
                  placeholder="E.g., Grammar, Vocabulary, Academic"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description (Optional)</label>
                <Input
                  placeholder="Brief description"
                  value={newTagDescription}
                  onChange={(e) => setNewTagDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTag}>Create Tag</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-sm text-muted-foreground">Loading tags...</div>
        ) : tags.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            No topic tags added yet. Create some to categorize your questions.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center justify-between py-2 px-3 border rounded-md"
              >
                <div>
                  <div className="font-medium">{tag.name}</div>
                  {tag.description && (
                    <div className="text-xs text-muted-foreground">
                      {tag.description}
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteTag(tag.id, tag.name)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
