import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import JobBoard from "./components/JobBoard";
import './styles/index.css';

export default function App() {
  return (
    <div className="container">
      <h1>JobWise AI</h1>
      <JobForm />
      <JobList />
      <JobBoard />
    </div>
  );
}