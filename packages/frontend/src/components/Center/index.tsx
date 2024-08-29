export default function Center({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      {children}
    </div>
  );
}
