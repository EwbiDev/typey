export function FailureMessage({ message }: { message: string; }) {
  return (
    <div>
      <h2>Error:</h2>
      <p>{message}</p>
    </div>
  );
}
