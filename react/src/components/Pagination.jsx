export default function Pagination({ links, onPageClick }) {

  // Vérifier que links est défini avant d'essayer de le mapper
  if (!links) return null

  return (
    <nav className="text-center">
      {links.map((link, index) => (
        <button
          key={index}
          onClick={() => onPageClick(link.url)}
          dangerouslySetInnerHTML={{ __html: link.label === '&laquo; Previous' ? 'Précédent' : link.label === 'Next &raquo;' ? 'Suivant' : link.label }}
          disabled={!link.url}
          className={"btn-pagination " + (link.active ? 'active' : '')}
        >
        </button>
      ))}
    </nav>
  )
}
