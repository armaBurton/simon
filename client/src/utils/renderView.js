// renderView.js
import Loading from "../components/Loading/Loading";

export const renderView = ({ children, error, loading }) => {
  if (loading) return <Loading />;

  if (error) return <p>An error occurred when loading.</p>;

  return children;
};
