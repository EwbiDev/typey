export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
