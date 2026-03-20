import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./User/userPages/Home";
import Racquet from "./User/userPages/Racquet";
import Shuttle from "./User/userPages/Shuttle";
import Strings from "./User/userPages/Strings";
import Login from "./User/userPages/Login";
import Acc from "./User/userPages/Acc";
import Cart from "./User/userPages/Cart";
import Orders from "./Admin/adminPages/Orders";
import Logout from "./Admin/adminPages/Logout";
import UploadShuttle from "./Admin/adminPages/UploadShuttle";
import UploadRacquets from "./Admin/adminPages/UploadRacquets";
import UploadAcc from "./Admin/adminPages/UploadAcc";
import UploadStrings from "./Admin/adminPages/UploadStrings";
import UserLayout from "./User/Userlayout";
import Adminlayout from "./Admin/Adminlayout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
         <Route path="/" element={<Home/>} />
        <Route path="/Racquet" element={<Racquet />} />
        <Route path="/Shuttle" element={<Shuttle />} />
        <Route path="/Strings" element={<Strings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Acc" element={<Acc />} />
        <Route path="/Cart" element={<Cart />} />
        </Route>

       <Route path="/admin" element={<Adminlayout />}>
          <Route path="shuttle" element={<UploadShuttle />} />
          <Route path="racquet" element={<UploadRacquets />} />
          <Route path="Acc" element={<UploadAcc />} />
          <Route path="strings" element={<UploadStrings />} />
          <Route path="orders" element={<Orders />} />
          <Route path="logout" element={<Logout />} />  
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;