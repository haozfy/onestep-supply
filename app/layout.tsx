import "./globals.css";

export const metadata = {
  title: "Onestep Supply Console",
  description: "Internal supply & ops system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className="min-h-screen bg-[#0a0a0c] text-white antialiased">
        {children}
      </body>
    </html>
  );
}