import { SignUpLayout } from "./_components/SignUpLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SignUpLayout>{children}</SignUpLayout>;
}
