import "./globals.css";

export const metadata = {
  title: "Onestep Supply",
  description: "Supply Intelligence Console",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
