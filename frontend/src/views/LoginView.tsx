import { Link } from "react-router-dom";

export default function LoginView() {
  return (
    <>
      <div> Login View</div>

      <nav>
        <Link to="/auth/register">¿No tienes una cuenta? Crea una aquí</Link>
      </nav>
    </>
  );
}
