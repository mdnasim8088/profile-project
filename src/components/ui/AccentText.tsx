type Props = {
  text: string;
  className?: string;
};

/** Renders text with its last word highlighted in the accent orange. */
export function AccentText({ text, className = "text-gradient-orange" }: Props) {
  const words = text.trim().split(/\s+/);
  if (words.length < 2) return <>{text}</>;
  const last = words.pop();
  return (
    <>
      {words.join(" ")} <span className={className}>{last}</span>
    </>
  );
}
