import classes from './page.module.css';
export default function MiniCard ({title,icon,number,footerNum}) {
    return (<>
        <div className={classes.card}>
            <div className='flex items-start justify-between'>
                <h1 className='text-[#f5f5f5] text-lg font-semibold tracking-wide'>{title}</h1>
                <button className={`${title === 'Total Earnings '? "bg-[#02ca31]": "bg-[#f6b100]"} p-3 rounded-lg text-[#f5f5f5] text-lg`}>{icon}</button>
            </div>

            <div className='text-[#f5f5f5] text-1xl font-bold mt-5 '>
              
                <h1 className='text-[#f5f5f5] text-4xl mt-2'>{number}</h1>
                <h1><span className='text-[#02ca3a]'>{footerNum}%</span> than yesterday</h1>
            </div>

        </div>
    </>);
}