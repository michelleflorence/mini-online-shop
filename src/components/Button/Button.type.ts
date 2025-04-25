export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: "primary" | "danger" | "success" | "info" | "secondary";
  type?: "submit" | "button" | "reset";
}
