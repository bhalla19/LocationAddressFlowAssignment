import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddressForm from "./components/AddressForm";
import AddressList from "./components/AddressList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddressForm />} />
        <Route path="/addresses" element={<AddressList />} />
      </Routes>
    </Router>
  );
}

export default App;
