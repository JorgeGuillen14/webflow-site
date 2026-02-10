"use client";

import dynamic from "next/dynamic";

const MeshGradient = dynamic(
  () =>
    import("@paper-design/shaders-react").then((m) => ({ default: m.MeshGradient })),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full h-full bg-gradient-to-br from-black via-neutral-900 to-white/90"
        aria-hidden
      />
    ),
  }
);

type MeshGradientClientProps = React.ComponentProps<typeof MeshGradient>;

export function MeshGradientClient(props: MeshGradientClientProps) {
  return <MeshGradient {...props} />;
}
