import { notFound } from "next/navigation";
import { candidates } from "@/utils/candidates";
import Image from "next/image";
import Link from "next/link";

export default async function CandidatePage(
  props: { params: { slug: string }; searchParams?: Record<string, string | string[]> }
) {
  const { slug } = props.params;

  const candidate = candidates.find(
    c => c.name.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!candidate) return notFound();

const getRoleColor = (role: string) => {
  const normalized = role.toLowerCase().replace(/\s+/g, ""); // e.g., "Vice President" → "vicepresident"
  switch (normalized) {
    case "president":
      return "#0073FF";
    case "vicepresident":
      return "#FF4741";
    case "socialconvenor":
      return "#FF7F00";
    case "clubsliason":
      return "#32CD32";
    default:
      return "#0073FF";
  }
};


  const roleColor = getRoleColor(candidate.role);


  return (
    <>
      <hr className="h-[20px]"></hr>
      <div className="border-0 flex justify-center items-center w-full mt-8">
        <Link href='/'>
          <p className="">&larr; Return Home</p>
        </Link>
      </div>
      <section className="flex flex-col items-center pt-20 mt-20">
        <hr className="h-[100px]"/>
        <main className="h-full flex justify-start items-center gap-x-10 w-3/4">
          <div
            className="bg-white shadow-lg flex flex-col items-center p-6 rounded-lg">
            <div className="relative rounded-lg" style={{ width: 312, height: 312 }}>
              <Image
                src={candidate.image}
                alt={candidate.name}
                width={312}
                height={312}
                className="object-cover rounded-lg"
                style={{ width: 312, height: 312 }}
              />
            </div>
          </div>
          <div className="flex flex-col h-full w-full text-left gap-y-10">
            <h1 className="text-6xl font-thin"> {candidate.name}</h1>
            <div 
              className="w-[549px] h-[84px] flex justify-start items-center text-white pl-4"
              style={{ backgroundColor: roleColor }}
            >
              <h2 className="m-4 uppercase text-3xl font-light ml-4">&#8205; {candidate.role} CANDIDATE</h2>
            </div>
            <Link href={candidate.poster ?? "#"}>
              <button className="text-2xl font-light hover:cursor-pointer">
                View Candidate Poster &rarr;
              </button>
            </Link>
          </div>
        </main>
        <hr className="h-[21px]"></hr>
        {candidate.video && (
          <div className="mt-[21px] mb-4 w-3/4 aspect-video">
            <iframe
              src={candidate.video.replace("watch?v=", "embed/")}
              title={candidate.name + " campaign video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="border-0 w-full h-full rounded-lg"
            />
          </div>
        )}
      </section>
      <hr className="h-[20px] border-0"></hr>
      <div className="border-0 flex justify-center items-center w-full">
        <Link href='/'>
          <button className="border-0 text-2xl font-light bg-[#0073FF] text-white rounded-3xl w-[182px] h-[65px] cursor-pointer hover:bg-white hover:border hover:border-[#0073FF] hover:text-[#0073FF] transition duration-700 ease-in-out">Return Home</button>
        </Link>
      </div>
      <hr className="h-[20px] border-0"></hr>
    </>
  );
}