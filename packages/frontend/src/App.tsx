import PageHeader from "./components/PageHeader";
import PassageContainer from "./components/PassageContainer";
import { Navigate, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-typey-background text-typey-default">
        <div className="container mx-8 flex h-full w-full flex-col">
          <PageHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/passage/:passageId"
              element={<PassageContainer />}
            ></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

function Home() {
  return <Navigate to={"/passage/1"} />;
}
