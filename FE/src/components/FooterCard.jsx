function FooterCard({ item }) {
  return (
    <>
      <h3 className="text-dark-light text-base font-bold">{item.title}</h3>
      {item.links.map((link) => (
        <li className="py-1 list-none text-[#959EAD]" key={link.name}>
          <a className="text-sm leading-5" href={link.link}>{link.name}</a>
        </li>
      ))}
    </>
  )
}

export default FooterCard
