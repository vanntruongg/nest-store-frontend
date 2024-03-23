import Link from "next/link";

interface BreadrumbsProps {
  breadrumbs: Breadrumb[];
  options?: string;
}

const Breadrumbs = ({ breadrumbs, options }: BreadrumbsProps) => {
  return (
    <div className="bg-white h-20 flex justify-center items-center">
      <ol className="flex items-center space-x-2">
        {breadrumbs.map(({ id, name, href }, idx) => (
          <li key={id}>
            <div className="flex items-center text-sm">
              <Link href={href}>
                <div className="font-medium text-sm text-muted-foreground hover:text-gray-900">
                  {name}
                </div>
              </Link>
              {idx !== breadrumbs.length - 1 || options ? (
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="ml-2 size-5 flex-shrink-0 text-gray-300"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
              ) : null}
            </div>
          </li>
        ))}
        {options && (
          <li>
            <div className="flex items-center text-sm">
              <div className="font-medium text-sm text-muted-foreground cursor-default">
                {options}
              </div>
            </div>
          </li>
        )}
      </ol>
    </div>
  );
};

export default Breadrumbs;
