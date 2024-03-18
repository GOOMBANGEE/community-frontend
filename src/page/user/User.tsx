import { Route, Routes } from "react-router-dom";
import Register from "./Register.tsx";
import Login from "./Login.tsx";
import Modal from "../../component/Modal.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";

export default function User() {
  const { globalState } = useGlobalStore();
  
  return (
    <>
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
      {globalState.modalMessage ? <Modal /> : null}
    </>
  );
}
