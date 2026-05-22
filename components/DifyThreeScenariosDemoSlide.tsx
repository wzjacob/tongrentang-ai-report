"use client";

import { useMemo, useState } from "react";

type DemoTab = {
  id: "medicine" | "data";
  label: string;
  src: string;
};

const demoTabs: DemoTab[] = [
  {
    id: "medicine",
    label: "手机端",
    src: "/dify-demo/medai-prototype-v2.html",
  },
  {
    id: "data",
    label: "Web端",
    src: "/dify-demo/knowledge_base_pro.html",
  },
];

export default function DifyThreeScenariosDemoSlide() {
  const [active, setActive] = useState<DemoTab["id"]>("medicine");
  const current = useMemo(() => demoTabs.find((item) => item.id === active) ?? demoTabs[0], [active]);

  return (
    <div className="min-h-full overflow-y-auto bg-[#fcfcfd] p-4 md:p-6">
      <header className="rounded-2xl border border-[#e5e7eb] bg-white p-4 md:p-5">
        <h3 className="text-2xl font-semibold tracking-tight text-[#111827] md:text-3xl">双端场景演示</h3>
      </header>

      <section className="mt-4 rounded-2xl border border-[#e5e7eb] bg-white p-3 md:p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {demoTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={[
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors md:text-sm",
                tab.id === active
                  ? "border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8]"
                  : "border-[#e5e7eb] bg-white text-[#475569] hover:bg-[#f8fafc]",
              ].join(" ")}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="overflow-hidden rounded-xl border border-[#dbe1e8] bg-[#f8fafc]">
          <iframe
            key={current.id}
            src={current.src}
            title={current.label}
            className="h-[68vh] min-h-[560px] w-full border-0 bg-white"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}
