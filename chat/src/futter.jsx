import React from 'react';

const Futter = () => {
  return (
    <div>


<div className="bg-cover bg-center bg-[url('https://dbot7h6zuj3cx.cloudfront.net/9/1/images/catalog/i/m_3811-4045314_super.jpg')] text-white py-10">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-around items-start gap-8 px-6 md:px-16">
          {/* About Us */}
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-bold mb-2">About Us</h2>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod voluptas adipisci nostrum doloribus commodi quaerat, consectetur earum magni obcaecati quasi voluptate fugiat eos sapiente modi saepe voluptates assumenda harum hic. Ea odio voluptatibus dolorem!
            </p>
          </div>

          {/* Partners */}
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-bold mb-2">Our Partners</h2>
            <div className="flex gap-2">
              <img src="" alt="Partner 1" className="w-16 h-16" />
              <img src="" alt="Partner 2" className="w-16 h-16" />
              <img src="" alt="Partner 3" className="w-16 h-16" />
            </div>
          </div>

          {/* Important Links */}
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-bold mb-2">Important Links</h2>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-sm hover:underline">Link 1</a>
              <a href="#" className="text-sm hover:underline">Link 2</a>
              <a href="#" className="text-sm hover:underline">Link 3</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs mt-8 border-t border-white pt-4">
          &copy; 2024 Your Company. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Futter;
