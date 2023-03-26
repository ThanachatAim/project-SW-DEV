// add bootstrap css
import "bootstrap/dist/css/bootstrap.css";

export const metadata = {
  title: "Restaurant Reservation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
