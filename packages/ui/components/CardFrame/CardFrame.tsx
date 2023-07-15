interface CardFrameProps {
  children?: React.ReactNode;
}
const CardFrame = ({ children }: CardFrameProps) => {
  return (
    <div className="border-border border rounded-lg px-3 py-2">{children}</div>
  );
};

export default CardFrame;
