import { useEffect } from "react";
import PageHeader from "./components/PageHeader";
import PassageContainer from "./components/PassageContainer";
import { useNavigate, Routes, Route } from "react-router-dom";
import { passageApi } from "./utils/api";
import PassageCreate from "./components/PassageSubmit";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";

export default function App() {
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-typey-background text-typey-default">
        <div className="container mx-8 flex h-full w-full flex-col">
          <PageHeader />
          <Routes>
            <Route path="/passage/new" element={<PassageCreate />} />
            <Route path="/passage/:passageId" element={<PassageContainer />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    async function getRandomPassage() {
      const response = await passageApi.getRandom();
      if (response) {
        const newPassage = response.data;
        navigate(`/passage/${newPassage.id}`);
      }
    }
    getRandomPassage();
  }, [navigate]);
  return <></>;
}
