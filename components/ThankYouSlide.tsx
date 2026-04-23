export default function ThankYouSlide() {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center bg-[#fcfcfd] px-6 py-12 md:py-20">
      <div className="max-w-2xl text-center">
        <p
          className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-[#94a3b8] md:text-xs"
          aria-hidden
        >
          Thank you
        </p>
        <h2 className="mt-6 font-serif text-4xl font-semibold tracking-[0.2em] text-[#111827] md:text-5xl lg:text-6xl">
          同心致远
        </h2>
        <div className="mx-auto mt-8 h-px w-16 bg-gradient-to-r from-transparent via-[#c81e1e] to-transparent" />
        <p className="mt-8 text-base font-medium leading-relaxed text-[#475569] md:text-lg">
          请领导批评指正，提出宝贵意见。
        </p>
        <p className="mt-3 text-sm text-[#94a3b8]">同仁堂集团算力摸排与AI前瞻规划汇报 · 汇报完毕</p>
      </div>
    </div>
  );
}
