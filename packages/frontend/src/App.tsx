import PageHeader from "./components/PageHeader";
import PassageContainer from "./components/PassageContainer";

export default function App() {
  return (
    <>
      <div className="bg-typey-background text-typey-default flex h-screen w-screen items-center justify-center">
        <div className="container mx-8 flex h-full w-full flex-col">
          <PageHeader />
          <PassageContainer />
        </div>
      </div>
    </>
  );
}
