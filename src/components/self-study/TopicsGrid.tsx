
import TopicCard from "./TopicCard";
import EmptyState from "./EmptyState";
import { StudyTopic } from "@/types/study";

interface TopicsGridProps {
  topics: StudyTopic[];
  onClearFilters: () => void;
}

const TopicsGrid = ({ topics, onClearFilters }: TopicsGridProps) => {
  if (topics.length === 0) {
    return <EmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {topics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
};

export default TopicsGrid;
