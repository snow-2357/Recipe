export default function NavBar() {
  return (
    <>
      <nav className={` sm:flex sm:justify-center sm:items-center mt-4`}>
        <div className="flex flex-col sm:flex-row">
          <a
            className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
            href="#"
          >
            Home
          </a>
          <a
            className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
            href="#"
          >
            Favorite
          </a>
        </div>
      </nav>
    </>
  );
}
