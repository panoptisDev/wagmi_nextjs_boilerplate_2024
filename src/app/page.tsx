import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/bg22.webp')" }}>
      <h1 className="text-white text-6xl font-bold">panoptisDev Boilerplate</h1>
    </main>
  );
}