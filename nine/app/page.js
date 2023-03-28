import Navbar from "../components/navbar";
export default function page() {
  return (
    <>
      <Navbar />
      <div className="card text-center">
        <div className="card-body">
          <h1 className="card-title">Nine: A Restaurant</h1>
          <h1 className="caard-title">Resevation System</h1>
          <p className="card-text">Please choose from an option below</p>
          <a href="/create">Create New Restaurant Resevation</a>
          <a href="/view">View My Resevation</a>
        </div>
      </div>
    </>
  );
}
