interface CardFrameProps {
  title?: string;
  children?: React.ReactNode;
}
const CardFrame = ({ title, children }: CardFrameProps) => {
  return (
    <div className="border-border border rounded-lg px-6 py-4 bg-background">
      {title && <h4>{title}</h4>}
      {children}
    </div>
  );
};

export default CardFrame;
