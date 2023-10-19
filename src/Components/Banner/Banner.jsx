
const Banner = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://as2.ftcdn.net/v2/jpg/03/53/68/47/1000_F_353684779_sXaY7PHyX6Xb9okW7qjVfARj96YIJMZ1.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md mx-auto text-white">
                        <h1 className="mb-5 text-5xl font-bold">Welcome to BiteBliss</h1>
                        <p className="mb-5">Discover the finest flavors and indulge in culinary delights. Find joy in every bite!</p>
                        <button className="btn btn-primary bg-orange-500 border-none hover:bg-orange-700">Explore Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;