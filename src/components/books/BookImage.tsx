export default function BookImage({ src, alt }) {
  if (!src) return null;
  
  return (
    <div className="space-y-2">
      <img 
        src={src} 
        alt={alt} 
        className="h-24 object-contain border rounded p-1" 
      />
    </div>
  );
}