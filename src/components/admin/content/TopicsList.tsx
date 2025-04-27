
import { ScrollArea } from "@/components/ui/scroll-area";

interface TopicsListProps {
  topics: any[];
  selectedTopicId: string | null;
  onSelectTopic: (id: string) => void;
}

export const TopicsList = ({ topics, selectedTopicId, onSelectTopic }: TopicsListProps) => {
  return (
    <ScrollArea className="h-[600px] border rounded-md p-4">
      <div className="space-y-2">
        {topics.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No topics available
          </p>
        ) : (
          topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              className={`w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors ${
                selectedTopicId === topic.id ? 'bg-muted font-medium' : ''
              }`}
            >
              <p className="font-medium truncate">{topic.title}</p>
              <p className="text-sm text-muted-foreground truncate">
                {topic.sub_topics?.name} • {topic.sub_topics?.skills?.name}
              </p>
            </button>
          ))
        )}
      </div>
    </ScrollArea>
  );
};
