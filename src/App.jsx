import { Layout } from "antd";
import "./App.scss";
import Routing from "./routing/Routing";
import "./index.css";
import Footer from "./components/ui/widjets/footer/Footer";
import Header from "./components/ui/widjets/header/Header";

function App() {
  return (
    <>
      <div className="app flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routing />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
