import { Link } from 'react-router-dom';

function BreadCrumbsCard({ data }) {
  return (
    <div className="flex items-center my-5">
      {data.map((item, index) => (
        <div key={index} className="opacity-50">
          <Link to={item.path}>
            {item.name}
            {index !== data.length - 1 && <span className="mx-2">/</span>}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BreadCrumbsCard;
