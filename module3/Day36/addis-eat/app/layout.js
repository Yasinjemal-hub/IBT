
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <header><h1>Addis Eats</h1></header>
        {children}
      </body>
    </html>
  );
}