const ResultPlaceholder = () => {
    return (
        <div className='flex flex-col items-center justify-evenly h-full'>
            {
                <div className="relative flex flex-col items-center justify-start w-64 animate-pulse gap-2 p-4">
                    <div className='flex items-center justify-center gap-10'>
                        <div className='w-20 h-10 font-semibold rounded-lg bg-slate-400'></div>
                        <div className='w-20 h-10 font-semibold rounded-lg bg-slate-400'></div>
                    </div>
                    <div className='w-full px-3 py-4 flex justify-start items-center flex-wrap gap-2'>
                        {Array.from({ length: 25 }).map((_, i) => <div className='w-8 h-8 rounded-full bg-slate-400' key={i}></div>)}
                    </div>
                    <div className='rounded-full w-3/4 h-12 mt-auto bg-slate-400'></div>
                </div>
            }
        </div>
    )
}

export default ResultPlaceholder