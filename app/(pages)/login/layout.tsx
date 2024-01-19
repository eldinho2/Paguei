export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className="p-2 flex flex-col justify-center items-center h-screen">{children}</section>
}