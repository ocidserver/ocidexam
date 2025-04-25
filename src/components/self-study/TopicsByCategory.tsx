
import TopicCard from "./TopicCard";
import EmptyState from "./EmptyState";
import { StudyTopic } from "@/types/study";

interface TopicsByCategoryProps {
  topicsByCategory: Record<string, StudyTopic[]>;
  onClearFilters: () => void;
}

const TopicsByCategory = ({ topicsByCategory, onClearFilters }: TopicsByCategoryProps) => {
  if (Object.keys(topicsByCategory).length === 0) {
    return <EmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <div className="space-y-8">
      {Object.entries(topicsByCategory).map(([category, topics]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">{category}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopicsByCategory;
