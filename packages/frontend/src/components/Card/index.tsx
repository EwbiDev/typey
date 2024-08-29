export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-typey-default px-6 py-12 shadow sm:rounded-lg sm:px-12">
      {children}
    </div>
  );
}
