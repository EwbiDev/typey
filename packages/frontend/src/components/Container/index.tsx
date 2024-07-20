export default function Container({ children }) {
  return (
    <div className="flex grow flex-col items-center justify-center gap-8">
      {children}
    </div>
  );
}
