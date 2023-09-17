import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <main className="flex flex-col">
        <div className="container flex mx-auto justify-center flex-col text-center w-1/2 ">
          <h2 className="font-bold text-4xl text-fuchsia-800">Movie Mania</h2>
          <p className="py-8">
            Discover the magic of cinema like never before with{" "}
            <span className="text-fuchsia-800">Movie Mania</span>. Our vast
            collection spans genres, eras, and cultures, ensuring there's
            something for everyone. Browse, search, and filter through a
            meticulously curated selection of movies. Your next movie night just
            got a whole lot more exciting!
          </p>
        </div>
        <div className="mt-20 w-auto">
          <Carousel />
        </div>
      </main>
    </div>
  );
}
