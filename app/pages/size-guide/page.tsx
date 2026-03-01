import Link from 'next/link';

export default function SizeGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <nav className="mb-8 text-sm">
        <Link href="/" className="text-neutral-500 hover:text-neutral-900">Home</Link>
        <span className="mx-2 text-neutral-300">/</span>
        <span className="text-neutral-900">Size Guide</span>
      </nav>

      <h1 className="text-4xl font-light text-neutral-900 mb-8">Size Guide</h1>

      <p className="text-neutral-600 mb-8">
        Finding the perfect fit is essential for comfort and confidence. Use our size guide to find your ideal size.
      </p>

      <h2 className="text-xl font-medium text-neutral-900 mt-8 mb-4">Bra Size Guide</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse border border-neutral-200">
          <thead>
            <tr className="bg-neutral-50">
              <th className="border border-neutral-200 px-4 py-3 text-left text-sm font-medium">Band Size</th>
              <th className="border border-neutral-200 px-4 py-3 text-left text-sm font-medium">Underbust (in)</th>
              <th className="border border-neutral-200 px-4 py-3 text-left text-sm font-medium">Underbust (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-neutral-200 px-4 py-3 text-sm">30</td><td className="border border-neutral-200 px-4 py-3 text-sm">26-27</td><td className="border border-neutral-200 px-4 py-3 text-sm">66-69</td></tr>
            <tr><td className="border border-neutral-200 px-4 py-3 text-sm">32</td><td className="border border-neutral-200 px-4 py-3 text-sm">28-29</td><td className="border border-neutral-200 px-4 py-3 text-sm">71-74</td></tr>
            <tr><td className="border border-neutral-200 px-4 py-3 text-sm">34</td><td className="border border-neutral-200 px-4 py-3 text-sm">30-31</td><td className="border border-neutral-200 px-4 py-3 text-sm">76-79</td></tr>
            <tr><td className="border border-neutral-200 px-4 py-3 text-sm">36</td><td className="border border-neutral-200 px-4 py-3 text-sm">32-33</td><td className="border border-neutral-200 px-4 py-3 text-sm">81-84</td></tr>
            <tr><td className="border border-neutral-200 px-4 py-3 text-sm">38</td><td className="border border-neutral-200 px-4 py-3 text-sm">34-35</td><td className="border border-neutral-200 px-4 py-3 text-sm">86-89</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-medium text-neutral-900 mt-8 mb-4">Cup Size Guide</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse border border-neutral-200">
          <thead>
            <tr className="bg-neutral-50">
              <th className="border border-neutral-200 px-4 py-3 text-left text-sm font-medium">Cup Size</th>
              <th className="border border-neutral-200 px-4 py-3 text-left text-sm font-medium">Bust - Band (in)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-neutral-200 px-4 py-3 text-sm">A</td><td className="border border-neutral-200 px-4 py-3 text-sm">1</td></tr>
            <tr><td className="border border-neutral-200 px-4 py-3 text-sm">B</td><td className="border border-neutral-200 px-4 py-3 text-sm">2</td></tr>
            <tr><td className="border border-neutral-200 px-4 py-3 text-sm">C</td><td className="border border-neutral-200 px-4 py-3 text-sm">3</td></tr>
            <tr><td className="border border-neutral-200 px-4 py-3 text-sm">D</td><td className="border border-neutral-200 px-4 py-3 text-sm">4</td></tr>
            <tr><td className="border border-neutral-200 px-4 py-3 text-sm">DD/E</td><td className="border border-neutral-200 px-4 py-3 text-sm">5</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-medium text-neutral-900 mt-8 mb-4">Brief Size Guide</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse border border-neutral-200">
          <thead>
            <tr className="bg-neutral-50">
              <th className="border border-neutral-200 px-4 py-3 text-left text-sm font-medium">Size</th>
              <th className="border border-neutral-200 px-4 py-3 text-left text-sm font-medium">US Size</th>
              <th className="border border-neutral-200 px-4 py-3 text-left text-sm font-medium">Waist (in)</th>
              <th className="border border-neutral-200 px-4 py-3 text-left text-sm font-medium">Hips (in)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-neutral-200 px-4 py-3 text-sm">XS</td><td className="border border-neutral-200 px-4 py-3 text-sm">0-2</td><td className="border border-neutral-200 px-4 py-3 text-sm">24-26</td><td className="border border-neutral-200 px-4 py-3 text-sm">34-36</td></tr>
            <tr><td className="border border-neutral-200 px-4 py-3 text-sm">S</td><td className="border border-neutral-200 px-4 py-3 text-sm">4-6</td><td className="border border-neutral-200 px-4 py-3 text-sm">26-28</td><td className="border border-neutral-200 px-4 py-3 text-sm">36-38</td></tr>
            <tr><td className="border border-neutral-200 px-4 py-3 text-sm">M</td><td className="border border-neutral-200 px-4 py-3 text-sm">8-10</td><td className="border border-neutral-200 px-4 py-3 text-sm">28-30</td><td className="border border-neutral-200 px-4 py-3 text-sm">38-40</td></tr>
            <tr><td className="border border-neutral-200 px-4 py-3 text-sm">L</td><td className="border border-neutral-200 px-4 py-3 text-sm">12-14</td><td className="border border-neutral-200 px-4 py-3 text-sm">30-32</td><td className="border border-neutral-200 px-4 py-3 text-sm">40-42</td></tr>
            <tr><td className="border border-neutral-200 px-4 py-3 text-sm">XL</td><td className="border border-neutral-200 px-4 py-3 text-sm">16-18</td><td className="border border-neutral-200 px-4 py-3 text-sm">32-34</td><td className="border border-neutral-200 px-4 py-3 text-sm">42-44</td></tr>
          </tbody>
        </table>
      </div>

      <div className="bg-neutral-50 p-6 mt-8">
        <h3 className="text-lg font-medium text-neutral-900 mb-2">Need Help?</h3>
        <p className="text-neutral-600">
          If you have any questions about sizing, please contact our customer service team at support@aura-lingerie.com
        </p>
      </div>
    </div>
  );
}
