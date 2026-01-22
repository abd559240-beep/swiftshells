import { Spinner } from "./ui/spinner";
import { Button, ButtonProps } from "./ui/button";

interface ButtonSpinner extends ButtonProps {
  isLoading: boolean;
}

function ButtonSpinner({ children, isLoading, ...props }: ButtonSpinner) {
  return (
    <Button {...props} disabled={isLoading} aria-disabled={isLoading}>
      {isLoading && <Spinner />}
      <span>{children}</span>
    </Button>
  );
}

export { ButtonSpinner };
