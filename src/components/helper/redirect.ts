import { useNavigate } from "react-router-dom";

const handleRedirect = (path: string) => {
  const navigate = useNavigate();
  navigate(path);
};

export default handleRedirect;
