import Scene from "./components/Scene";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      {/* 3D Background — fixed behind everything */}
      <Scene />

      {/* Navigation */}
      <Navbar />

      {/* Page Content — scrolls over the 3D scene */}
      <main className="content-layer">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
