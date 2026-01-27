import React, { useState, useEffect, useRef } from 'react';
import { Play, X, Send, ArrowRight, Sparkles, Video, Zap, Star } from 'lucide-react';

const PROFILE = {
  name: "Muzammil",
  tagline: "Video Editor",
  hook: "I edit videos people actually finish.",
  email: "youremail@gmail.com",
  
  showreel: {
    type: "gdrive",
    url: "https://drive.google.com/file/d/1f1akSYT63I1XpSf7HffiplLIQLW0gwXr/preview",
  }
};

const WORK = [
  { 
    title: "Brock Lesnar's Son BREAKS Everyone in MMA!",
    video: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=k2KHOi7BX-U",
    },
    impact: "200k+ views week 1",
  },
  { 
    title: "10 Most Reliable Diesel Engines of All Time",
    video: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=xBllZ0KDuwc"
    },
    impact: "150k+ views in 5 days",
  },
  { 
    title: "How To Be Rich Even If You're LAZY",
    video: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=fEdUpmaAwXw",
    },
    impact: "Client Was Extremely Impressed",
  },
  { 
    title: "Iman Gadzhi edit format",
    video: {
      type: "gdrive",
      url: "https://drive.google.com/file/d/1m41QCjModFpOjEpilLIkSrpa_BtA1MC-/preview",
    },
  },
  { 
    title: "Premium Social Media Content",
    video: {
      type: "gdrive",
      url: "https://drive.google.com/file/d/1gVpeS8_NqhmERk9v0TgfZfMEJt2yeoBo/preview",
    },
  },
  { 
    title: "Dynamic Brand Video",
    video: {
      type: "gdrive",
      url: "https://drive.google.com/file/d/1bvSz_pd5JOPdXaQnOWuzxutbCinLrXTf/preview",
    },
  },
  { 
    title: "Engaging Story Edit",
    video: {
      type: "gdrive",
      url: "https://drive.google.com/file/d/1zs0_QmhewL2uJEGsT0Ti9bSmKrRw37Wy/preview",
    },
  },
  { 
    title: "Podcast Edit",
    video: {
      type: "gdrive",
      url: "https://drive.google.com/file/d/1zRF5ko5tTiNgXObDJV4u3cjMzu2y9woe/preview",
    },
  },
  { 
    title: "How YOU Can Make Six Figures While Still In High School",
    video: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=gWS2jhnGmhM",
    },
  },
  { 
    title: "These 15 Amazon Desk Gadgets Will Blow Your Mind!",
    video: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=0h1lWL0Qpm4",
    },
  },
  { 
    title: "Best Tech UNDER $100",
    video: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=W_9s9tEc1rY",
    },
  },
  { 
    title: "The 9 Best Keychain Multi-Tools For EDC",
    video: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=tv-4g9zny0o",
    },
  },
  { 
    title: "Billionaires That Went To Jail...",
    video: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=FWK6oN6OnTw",
    },
  },
  { 
    title: "RECENT SNEAKER PICKUPS 2024 | I SPENT OVER 15K 🔥",
    video: {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=rCl4VdEIr-g",
    },
  },
];

const Portfolio = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVideo, setModalVideo] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const getYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/);
    return match ? match[1] : null;
  };

  const getVideoThumbnail = (videoConfig) => {
    if (!videoConfig) {
      return "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800";
    }

    switch (videoConfig.type) {
      case "youtube": {
        const ytId = getYouTubeId(videoConfig.url);
        return ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : null;
      }

      case "gdrive": {
        const match = videoConfig.url.match(/\/d\/([^/]+)/);
        return match ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000` : null;
      }

      case "local":
        return videoConfig.thumbnail || videoConfig.localPath;

      default:
        return "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800";
    }
  };

  const getVideoEmbedUrl = (videoConfig) => {
    if (!videoConfig) return null;

    switch (videoConfig.type) {
      case "youtube": {
        const ytId = getYouTubeId(videoConfig.url);
        return ytId ? `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0` : null;
      }

      case "gdrive":
        return videoConfig.url;

      case "local":
        return videoConfig.localPath;

      default:
        return null;
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const openModal = (videoConfig) => {
    setModalVideo(videoConfig);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalVideo(null);
  };

  const parallaxX = (mousePos.x / window.innerWidth - 0.5) * 20;
  const parallaxY = (mousePos.y / window.innerHeight - 0.5) * 20;

  const renderVideoPlayer = (videoConfig) => {
    if (!videoConfig) return null;
    
    const embedUrl = getVideoEmbedUrl(videoConfig);
    
    if (videoConfig.type === "local") {
      return (
        <video 
          className="w-full h-full" 
          controls 
          autoPlay
          src={embedUrl}
        >
          Your browser does not support the video tag.
        </video>
      );
    }
    
    return (
      <iframe
        src={embedUrl}
        className="w-full h-full"
        title="Video player"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgb(139, 92, 246) 0%, transparent 70%)',
            left: `calc(20% + ${parallaxX}px)`,
            top: `calc(10% + ${parallaxY}px)`,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgb(59, 130, 246) 0%, transparent 70%)',
            right: `calc(10% - ${parallaxX}px)`,
            top: `calc(30% - ${parallaxY}px)`,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div 
          className="absolute w-[700px] h-[700px] rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgb(236, 72, 153) 0%, transparent 70%)',
            left: `calc(60% + ${parallaxX * 0.5}px)`,
            bottom: `calc(10% + ${parallaxY * 0.5}px)`,
            transition: 'all 0.3s ease-out'
          }}
        />
      </div>

      <div className="fixed inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
      </div>

      <header className="fixed top-0 w-full z-50 px-6 py-6">
        <nav className="max-w-7xl mx-auto backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl px-6 py-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-violet-500 rounded-full blur-md opacity-50 animate-pulse" />
                <div className="relative w-2 h-2 bg-violet-400 rounded-full" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {PROFILE.name}
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#work" className="text-white/60 hover:text-white transition-all duration-300 hover:scale-105">Work</a>
              <a href="#about" className="text-white/60 hover:text-white transition-all duration-300 hover:scale-105">About</a>
              <a href="#contact" className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50">
                Let's Talk
              </a>
            </div>
          </div>
        </nav>
      </header>

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-16 items-center">
            
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full backdrop-blur-xl">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-medium text-violet-300">Available for projects</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
                  <span className="bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
                    Hi, I'm
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                    {PROFILE.name}
                  </span>
                </h1>

                <p className="text-3xl md:text-4xl font-bold text-white/80 leading-tight">
                  {PROFILE.hook}
                </p>

                <p className="text-violet-300 font-semibold text-lg mb-4">
                  If you're a Coach, Solopreneur, CEO, Founder, Consultant, Community Builder, or Business Owner
                </p>

                <p className="text-xl text-white/50 max-w-xl leading-relaxed">
                  My video editing goes beyond visuals. I help you turn social media attention into real leads and sales.
                  Whether you need real estate video editing, high-converting ads for your personal brand, talking-head videos, or any other content. I deliver exactly what your content needs to perform.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="#contact" 
                  className="group px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-2xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/50 flex items-center gap-3"
                >
                  Start a Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#work"
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all duration-300 hover:scale-105 backdrop-blur-xl"
                >
                  View Work
                </a>
              </div>

              <div className="flex gap-8 pt-8">
                <div>
                  <div className="text-3xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">590+</div>
                  <div className="text-sm text-white/40">Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">84+</div>
                  <div className="text-sm text-white/40">Repeated Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">100%</div>
                  <div className="text-sm text-white/40">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-5 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-violet-400" />
                    <div>
                      <div className="text-sm font-bold">Meet Muzammil</div>
                      <div className="text-xs text-white/40">Click to watch</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                </div>

                <div 
                  className="relative aspect-video bg-black cursor-pointer overflow-hidden group/video"
                  onClick={() => openModal(PROFILE.showreel)}
                >
                  <img 
                    src={getVideoThumbnail(PROFILE.showreel)}
                    alt="Showreel"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/video:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-20 animate-pulse" />
                      <div className="relative w-20 h-20 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center transition-all duration-300 group-hover/video:scale-110 group-hover/video:bg-white/30">
                        <Play className="w-10 h-10 fill-white text-white ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="work" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full backdrop-blur-xl mb-6">
              <Star className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-300">Featured Work</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
              Recent Projects
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Every project tells a story. Here's how I help creators turn views into engaged audiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WORK.map((project, idx) => (
              <div
                key={idx}
                onClick={() => openModal(project.video)}
                className="group relative cursor-pointer"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden transition-all duration-500 group-hover:scale-[1.02] h-full flex flex-col">
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={getVideoThumbnail(project.video)}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
                    
                    {project.impact && (
                      <div className="absolute top-4 right-4">
                        <div className="px-3 py-1.5 bg-violet-500/90 backdrop-blur-xl rounded-full text-xs font-bold">
                          {project.impact}
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 fill-white text-white ml-1" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-black mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-fuchsia-400 group-hover:bg-clip-text transition-all line-clamp-2">
                      {project.title}
                    </h3>
                    {project.role && (
                      <p className="text-sm text-white/50 mt-auto">{project.role}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full backdrop-blur-xl mb-6">
              <Zap className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-300">What I Do</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
              Services
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Video,
                title: "YouTube Editing",
                desc: "Talking heads, vlogs, story edits. Clean pacing that keeps viewers hooked.",
                features: ["Structure & flow", "B-roll integration", "Audio polish", "Export optimization"]
              },
              {
                icon: Zap,
                title: "Short-form Content",
                desc: "Reels, TikToks, Shorts. Hook-first edits that stop the scroll.",
                features: ["3-second hooks", "Fast-cut rhythm", "Vertical optimization", "Platform trends"]
              },
              {
                icon: Sparkles,
                title: "Polish & Delivery",
                desc: "Color grading, audio mixing, motion graphics. Premium finish.",
                features: ["Color correction", "Sound design", "Smooth transitions", "Final touches"]
              }
            ].map((service, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 transition-all duration-500 group-hover:scale-[1.02]">
                  <service.icon className="w-12 h-12 text-violet-400 mb-6" />
                  <h3 className="text-2xl font-black mb-4">{service.title}</h3>
                  <p className="text-white/60 mb-6">{service.desc}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl blur-2xl opacity-20" />
            
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-12">
              <h2 className="text-4xl md:text-5xl font-black mb-8 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                How it works
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <p className="text-lg text-white/80 leading-relaxed mb-6">
                    I'm a video editor focused on clean storytelling and strong pacing. If your footage is good, I'll make it feel tight and professional.
                  </p>
                  <p className="text-white/60 leading-relaxed">
                    If something is unclear, I'll ask fast. If something looks off, I'll fix it. Simple as that.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { num: "01", title: "Send footage", desc: "Drive/Dropbox link" },
                    { num: "02", title: "First cut", desc: "Structure & pacing" },
                    { num: "03", title: "Revisions", desc: "You point, I fix" },
                    { num: "04", title: "Final export", desc: "Ready to upload" }
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4 items-start">
                      <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center font-black flex-shrink-0">
                        {step.num}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold mb-1">{step.title}</div>
                        <div className="text-sm text-white/50">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="text-white/60 text-center">
                  Send 1-2 reference videos you like. I can match that style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full backdrop-blur-xl mb-6">
            <Send className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium text-violet-300">Get in Touch</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-xl text-white/50 mb-12">
            Have a project in mind? Book a call and let's discuss how I can help bring your vision to life.
          </p>

          <a 
            href="https://calendly.com/nexuscore"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/50"
          >
            <Send className="w-6 h-6" />
            Book a call
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-sm text-white/40 mt-4">Click to schedule a meeting</p>
        </div>
      </section>

      <footer className="relative border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/40">
          <div>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</div>
          <a href="#top" className="hover:text-white transition-colors">Back to top ↑</a>
        </div>
      </footer>

      {modalOpen && modalVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6" onClick={closeModal}>
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />
          <div className="relative w-full max-w-6xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute -top-14 right-0 w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl flex items-center justify-center transition-all backdrop-blur-xl"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative bg-black rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
              <div className="aspect-video">
                {renderVideoPlayer(modalVideo)}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
