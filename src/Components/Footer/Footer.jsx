const Footer = () => {
    return (
      <footer className="bg-gray-100 dark:bg-slate-900 dark:text-white text-neutral-content py-8">
        <div className="container w-10/12 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="col-span-1 text-black dark:text-white">
              <h2 className="text-2xl font-bold mb-4">About <span className="text-orange-500">BiteBliss</span></h2>
              <p className="text-sm">BiteBliss is your destination for exquisite flavors and gourmet delights. Explore our curated selection of premium food and beverages.</p>
            </div>
            <div className="col-span-1 text-black dark:text-white">
              <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li><a href="/">Home</a></li>
                <li><a href="/products">Products</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div className="col-span-1 text-black dark:text-white">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-sm">123 BiteBliss Street<br />Foodieville, FV 54321<br />Email: info@bitebliss.com<br />Phone: 555-1234</p>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;  