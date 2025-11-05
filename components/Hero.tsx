export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
            프론트엔드 개발자
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          안녕하세요,{' '}
          <span className="text-blue-600">개발자</span>입니다
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
          사용자 경험을 중시하며, 현대적인 웹 기술로 의미있는 프로덕트를 만드는
          것을 좋아합니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            프로젝트 보기
          </a>
          <a
            href="#contact"
            className="px-8 py-3 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            연락하기
          </a>
        </div>
      </div>
    </section>
  );
}

