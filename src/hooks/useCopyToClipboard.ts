import { useToast } from "@/hooks/use-toast";

export const useCopyToClipboard = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string | undefined) => {
    if (text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast({
            variant: 'info',
            title: 'Copied!',
            description: `ID ${text} has been copied to clipboard.`,
          });
        })
        .catch((error) => {
          console.error('Failed to copy text to clipboard:', error);
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to copy text to clipboard. Please try again.',
          });
        });
    } else {
      console.warn('No text provided to copy.');
    }
  };

  return { copyToClipboard };
};
