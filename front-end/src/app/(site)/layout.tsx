/* eslint-disable @next/next/no-head-element */

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        { children }
      </main>
    </>
  );
}
