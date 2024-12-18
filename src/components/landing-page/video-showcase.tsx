"use client";

export default function VideoShowcase() {
  return (
    <section className="py-12 lg:p-12 ">
      <div className="container mx-auto px-4 w-full ">
        <div className="flex flex-col lg:flex-row justify-center gap-8 items-center ">
          <div className="flex-grow">
            <div className="rounded-lg overflow-hidden shadow-lgw w-full h-full">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source
                  src="https://videos.pexels.com/video-files/3209177/3209177-uhd_2560_1440_25fps.mp4"
                  type="video/mp4"
                />
                Seu navegador não suporta a reprodução de vídeos.
              </video>
            </div>
          </div>

          <div className="w-full ">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full max-h-[410px] object-cover"
              >
                <source
                  src="https://videos.pexels.com/video-files/6127664/6127664-uhd_1440_2732_25fps.mp4"
                  type="video/mp4"
                />
                Seu navegador não suporta a reprodução de vídeos.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
