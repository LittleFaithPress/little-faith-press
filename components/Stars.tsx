export default function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ color: "#d4b25f", fontSize: 16 }}>
      {"★★★★★".slice(0, rating)}
    </div>
  );
}