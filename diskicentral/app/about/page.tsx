import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | DiskiCentral",
  description: "Learn about DiskiCentral and our editorial mission.",
};

const teamMembers = [
  {
    name: "Lebo Mokoena",
    role: "Editor-in-Chief",
    bio: "Leads editorial direction across PSL, national team and commentary.",
  },
  {
    name: "Aphiwe Ndlovu",
    role: "Football Writer",
    bio: "Covers club form, tactical analysis, and the wider South African game.",
  },
  {
    name: "Mpho Senekal",
    role: "Transfer Analyst",
    bio: "Tracks moves, rumours and the market pulse around domestic and overseas clubs.",
  },
];

export default function AboutPage() {
  const darkMode = false;

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-6">
      <div className="bg-[#0A0A0A] rounded-2xl p-10 sm:p-16 text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-[#00C853] rounded flex items-center justify-center">
            <span className="text-black font-bold text-lg font-display">
              DC
            </span>
          </div>
          <span className="font-display font-bold text-2xl text-white">
            Diski<span className="text-[#00C853]">Central</span>
          </span>
        </div>

        <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
          South African Football.
          <br />
          Every Day.
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          DiskiCentral is South Africa’s most trusted digital football media
          platform, providing authoritative coverage of the PSL, Bafana Bafana,
          CAF competitions, and South Africans performing on the world stage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div
          id="mission"
          className={`rounded-xl border p-8 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
          <div className="w-10 h-10 bg-[#00C853]/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-[#00C853] text-lg">🎯</span>
          </div>
          <h2
            className={`font-display font-bold text-2xl mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Our Mission
          </h2>
          <p
            className={`leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            To be the definitive voice of South African football — providing
            accurate, insightful, and engaging coverage that respects the
            intelligence of our audience and elevates the discourse around the
            beautiful game in South Africa.
          </p>
        </div>

        <div
          id="vision"
          className={`rounded-xl border p-8 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
          <div className="w-10 h-10 bg-[#00C853]/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-[#00C853] text-lg">🌍</span>
          </div>
          <h2
            className={`font-display font-bold text-2xl mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Our Vision
          </h2>
          <p
            className={`leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            A South Africa where football stories are told with the same
            quality, depth, and journalistic rigour as the world’s leading
            sports publications — and where every South African fan feels truly
            represented.
          </p>
        </div>
      </div>

      <section className="mb-12">
        <h2
          className={`font-display font-bold text-3xl mb-5 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Our Story
        </h2>
        <div
          className={`rounded-xl border p-8 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
          <div className="max-w-3xl space-y-4">
            <p
              className={`text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              DiskiCentral began with a simple idea: South African football
              deserved a platform that treated its stories with the same depth,
              urgency, and intelligence as the biggest leagues in the world.
            </p>
            <p
              className={`text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              We set out to build a home for fans who want more than matchday
              headlines — people who want context, insight, analysis, and the
              voices behind the biggest moments in local football.
            </p>
            <p
              className={`text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              From PSL debates to Bafana Bafana calls, from African club action
              to the stories of players abroad, we aim to give football culture
              in South Africa a stronger, louder, and more informed platform.
            </p>
          </div>
        </div>
      </section>

      <section id="editorial" className="mb-12">
        <h2
          className={`font-display font-bold text-3xl mb-5 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Editorial Principles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: "✅",
              title: "Accuracy First",
              body: "Every fact is verified before publication. Corrections are published promptly and transparently.",
            },
            {
              icon: "🔒",
              title: "Independence",
              body: "Our editorial decisions are never influenced by advertisers, sponsors, or clubs. Our readers come first.",
            },
            {
              icon: "⚖️",
              title: "Fairness",
              body: "We cover all 16 PSL clubs with equal rigour, regardless of their size or commercial value.",
            },
            {
              icon: "🔍",
              title: "Transparency",
              body: "Sources are disclosed where possible. When we use anonymous sources, we explain why.",
            },
            {
              icon: "📊",
              title: "Data-Driven",
              body: "We use statistics and data to support — not replace — quality journalism and original reporting.",
            },
            {
              icon: "🎙️",
              title: "Diverse Voices",
              body: "We actively commission writers from across South Africa’s diverse communities and backgrounds.",
            },
          ].map(({ icon, title, body }) => (
            <div
              key={title}
              className={`rounded-xl border p-5 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
              <div className="text-2xl mb-3">{icon}</div>
              <h3
                className={`font-display font-bold text-lg mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                {title}
              </h3>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="team" className="mb-12">
        <h2
          className={`font-display font-bold text-3xl mb-5 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className={`rounded-xl border p-5 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
              <div className="w-12 h-12 bg-[#00C853]/10 rounded-full flex items-center justify-center mb-3">
                <span className="text-[#00C853] font-bold text-lg">
                  {member.name.charAt(0)}
                </span>
              </div>
              <h3
                className={`font-display font-bold text-xl mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                {member.name}
              </h3>
              <p className="text-sm text-[#00C853] font-semibold mb-2">
                {member.role}
              </p>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="advertise" className="mb-8">
        <div className="bg-[#0A0A0A] rounded-2xl p-8 text-center">
          <h2 className="font-display font-bold text-3xl text-white mb-3">
            Advertise with DiskiCentral
          </h2>
          <p className="text-gray-400 text-base mb-6 max-w-xl mx-auto">
            Reach South African football fans through premium storytelling,
            brand visibility, and campaigns designed to connect with passionate,
            highly engaged audiences.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00C853] text-black font-bold rounded-xl hover:bg-[#00A344] transition-colors">
            Enquire Today
          </a>
        </div>
      </section>
    </main>
  );
}
