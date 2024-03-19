import { Route, Routes } from "react-router-dom";
import Register from "./Register.tsx";
import Login from "./Login.tsx";
import Modal from "../../component/Modal.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import Setting from "./Setting.tsx";

export default function User() {
  const { globalState } = useGlobalStore();

  return (
    <>
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="setting" element={<Setting />} />
      </Routes>
      {globalState.modalMessage ? <Modal /> : null}
    </>
  );
}
