import { Route, Routes } from "react-router-dom";
import Register from "./Register.tsx";
import Login from "./Login.tsx";
import Modal from "../../component/Modal.tsx";
import { useGlobalStore } from "../../store/GlobalStore.ts";
import Setting from "./Setting.tsx";
import Recover from "./Recover.tsx";
import RecoverPassword from "./RecoverPassword.tsx";

export default function User() {
  const { globalState } = useGlobalStore();

  return (
    <>
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="setting" element={<Setting />} />
        <Route path="recover" element={<Recover />} />
        <Route path="recover/:token" element={<RecoverPassword />} />
      </Routes>
      {globalState.modalMessage ? <Modal /> : null}
    </>
  );
}
