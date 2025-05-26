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
      <hr className="border-0 h-[20px]"></hr>
      <div className="border-0 flex justify-center items-center w-full mt-8">
        <Link href='/'>
          <p className="text-xl">&larr; Return Home</p>
        </Link>
      </div>


      <section className="flex flex-col items-center pt-20 mt-20">
        <hr className="h-[100px]"/>
        <main className="h-full flex flex-col md:flex-row justify-start items-center gap-x-10 w-3/4">


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
          <hr className="h-[5px] md:h-0 border-0"></hr>
          <div className="mt-2 flex flex-col md:justify-start md:items-start justify-center items-center h-full w-full text-center md:text-left gap-y-10">
            <h1 className="text-6xl font-thin"> {candidate.name}</h1>
            <div 
              className="w-[300px] h-[80px] md:w-[549px] md:h-[84px] flex justify-start items-center text-white pl-4"
              style={{ backgroundColor: roleColor }}
            >
              <h2 className="m-4 uppercase text-3xl font-light ml-4">&#8205; {candidate.role} CANDIDATE</h2>
            </div>
            {candidate.poster ? (
              <Link href={candidate.poster} target="_blank">
                <button className="text-2xl font-light hover:cursor-pointer">
                  View Candidate Poster &rarr;
                </button>
              </Link>
            ) : (
              <button
                className="text-2xl font-light bg-gray-200 text-gray-500 cursor-not-allowed"
                disabled
                title="Poster not available"
              >
                Poster Coming Soon
              </button>
            )}
          </div>
        </main>
        <hr className="h-[21px]"></hr>
        {candidate.video ? (
          <div className="mt-[21px] mb-4 w-3/4 aspect-video">
            <iframe
              src={
                // If candidate.video is a Vimeo ID (all digits)
                candidate.video.match(/^\d+$/)
                  ? `${candidate.video}`
                  // If candidate.video is a full Vimeo URL
                  : candidate.video.includes("vimeo.com")
                    ? candidate.video.replace(/vimeo\.com\/(\d+)/, "player.vimeo.com/video/$1") + "?h=9e95efaa31&badge=0&autopause=0&player_id=0&app_id=58479"
                    // Otherwise, assume YouTube
                    : candidate.video.replace("watch?v=", "embed/")
              }
              title={candidate.name + " campaign video"}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              allowFullScreen
              className="border-0 w-full h-full rounded-lg"
            />
          </div>
        ) : (
          <div className="hover:cursor-not-allowed mt-[21px] mb-4 w-3/4 aspect-video flex items-center justify-center bg-gray-100 rounded-lg">
            <span className="text-gray-500 text-xl">Video Unavailable</span>
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