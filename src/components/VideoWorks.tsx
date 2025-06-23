import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause } from 'lucide-react';

const VideoWorks = () => {
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    videoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      videoRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Convert Instagram and Vimeo URLs to embeddable format
  const getEmbedUrl = (url: string) => {
    if (url.includes('instagram.com')) {
      // Instagram embed URL format
      const postId = url.match(/\/p\/([^\/]+)/)?.[1];
      return postId ? `https://www.instagram.com/p/${postId}/embed/` : url;
    } else if (url.includes('vimeo.com')) {
      // Vimeo embed URL format
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
    }
    return url;
  };

  const videos = [
    {
      title: "3D Animation Project",
      description: "A stunning 3D animation showcasing modern design principles with fluid motion graphics.",
      url: "https://www.instagram.com/reel/DLClJ_8zbIb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      type: "Instagram",
      orientation: "vertical",
      category: "Animation"
    },
    {
      title: "Product Visualization",
      description: "Interactive 3D product showcase with realistic lighting and material rendering.",
      url: "https://vimeo.com/123456789",
      type: "Vimeo", 
      orientation: "horizontal",
      category: "Product Design"
    },
    {
      title: "Motion Graphics Reel",
      description: "Creative motion graphics combining typography, shapes, and dynamic transitions.",
      url: "https://www.instagram.com/p/sample2/",
      type: "Instagram",
      orientation: "vertical", 
      category: "Motion Graphics"
    },
    {
      title: "Architectural Walkthrough",
      description: "Immersive 3D architectural visualization with photorealistic rendering.",
      url: "https://vimeo.com/987654321",
      type: "Vimeo",
      orientation: "horizontal",
      category: "Architecture"
    }
  ];

  const handleVideoClick = (index: number) => {
    if (playingVideo === index) {
      setPlayingVideo(null);
    } else {
      setPlayingVideo(index);
    }
  };

  return (
    <section id="3d-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">3D Works</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-center mb-12">
          Explore my collection of 3D animations, product visualizations, and motion graphics projects.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {videos.map((video, index) => (
            <div
              key={index}
              ref={(el) => (videoRefs.current[index] = el)}
              className="reveal"
            >
              <Card className={`overflow-hidden transition-all duration-500 hover:shadow-xl h-full transform hover:scale-105 group ${
                video.orientation === 'vertical' ? 'md:col-span-1' : 'md:col-span-2 lg:col-span-1'
              }`}>
                <div className={`relative overflow-hidden ${
                  video.orientation === 'vertical' ? 'h-80' : 'h-48'
                }`}>
                  {playingVideo === index ? (
                    <iframe
                      src={getEmbedUrl(video.url)}
                      className="w-full h-full"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; encrypted-media"
                      title={video.title}
                    />
                  ) : (
                    <div 
                      className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center cursor-pointer group-hover:scale-110 transition-transform duration-700"
                      onClick={() => handleVideoClick(index)}
                    >
                      <div className="text-center text-white">
                        <Play className="h-16 w-16 mx-auto mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                        <p className="text-sm font-medium">Click to Play</p>
                        <Badge variant="secondary" className="mt-2 bg-white/20 text-white border-white/30">
                          {video.type}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold">{video.title}</CardTitle>
                    <Badge variant="outline" className="text-xs bg-blue-50">{video.category}</Badge>
                  </div>
                  <CardDescription className="line-clamp-2 mt-1">
                    {video.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="secondary" 
                      className="bg-gray-100 text-gray-800"
                    >
                      {video.orientation}
                    </Badge>
                    <button
                      onClick={() => handleVideoClick(index)}
                      className="text-theme-blue hover:text-theme-indigo flex items-center transition-colors"
                    >
                      {playingVideo === index ? (
                        <>
                          <Pause className="h-4 w-4 mr-1" /> Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-1" /> Play
                        </>
                      )}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Have a project in mind? Let's bring your ideas to life with stunning 3D visuals.
          </p>
          <a 
            href="#contact" 
            className="inline-block bg-theme-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-theme-indigo transition-colors transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoWorks;
