export default function BookPdfLink({ url }) {
  if (!url) return null;

  return (
    <div className="max-w-xs overflow-hidden">
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700 underline"
      >
        {url}
      </a>
    </div>
  );
}