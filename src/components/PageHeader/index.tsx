import { Fragment } from 'react';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

export default function Pageheader({ data }: any) {
  const { currentpage, breadcrumbs } = data;
  const navigate = useNavigate();

  const handleBreadcrumbClick = (e:any, path:any) => {
    e.preventDefault();
    if (path) navigate(path);
  };

  
  return (
    <Fragment>
      <div className="justify-between block mb-2 md:flex px-[4%]">
        <div>
          <p className=" text-[1.125rem] font-semibold">
            {currentpage}
          </p>
        </div>
        <ol className="flex items-center min-w-0 whitespace-nowrap">
          {breadcrumbs.map((breadcrumb:any, index:number) => (
            <li key={index} className="text-[0.813rem] ps-[0.5rem]">
              {index < breadcrumbs.length - 1 ? (
                <Link
                  className="flex items-center justify-center truncate text-primaryColor hover:text-yellow-400 "
                  to={breadcrumb.path || "#"}
                  onClick={(e) => handleBreadcrumbClick(e, breadcrumb.path)}
                >
                  {breadcrumb.label}
                  <MdKeyboardDoubleArrowRight className='w-4 h-4 pt-[2px]' />
                </Link>
              ) : (
                <span
                  className="text-[0.813rem]  font-semibold 0"
                  aria-current="page"
                >
                  {breadcrumb.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </Fragment>
  );
}
