function ArticleCardSkeleton({ className }) {
  return (
    <div className={`${className} shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-xl overflow-hidden animate-pulse`}>
      {/* image */}
      <div className="w-full aspect-video bg-slate-300"></div>
      <div className="p-4">
        {/* title */}
        <div className="w-56 h-2 bg-slate-300 mt-4"></div>
        {/* caption */}
        <div className="h-4 bg-slate-300 mt-4"></div>
        <div className="flex justify-between items-center my-4">
          <div className="flex">
            {/* avatar */}
            <div className="w-9 h-9 bg-slate-300 rounded-full"></div>
            <div className="ml-3">
              {/* name user */}
              <div className="w-12 h-3 bg-slate-300 mb-2"></div>
              {/* verified */}
              <div className="w-12 h-3 bg-slate-300"></div>
            </div>
          </div>
          {/* date */}
          <div className="w-6 h-2 bg-slate-300"></div>
        </div>
      </div>
    </div>
  )
}

export default ArticleCardSkeleton
