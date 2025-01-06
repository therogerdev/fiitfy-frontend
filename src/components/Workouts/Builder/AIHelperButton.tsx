import { FC, useState } from "react";

interface AIHelperButtonProps {
  onAISuggestions: () => Promise<void>;
}

export const AIHelperButton: FC<AIHelperButtonProps> = ({
  onAISuggestions,
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onAISuggestions();
    setLoading(false);
  };

  return (
    <button
      className="ai-helper-button"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? "Loading..." : "Generate with AI"}
    </button>
  );
};
