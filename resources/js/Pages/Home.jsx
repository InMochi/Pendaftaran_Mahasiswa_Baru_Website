import Layout from "../Layouts/Layout";

const Home = ({}) => {
return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
    <p className="text-lg text-gray-700">This is a simple React component served with Inertia.js and Vite.</p>
</div>
)
}

Home.layout = page =>
<Layout children={page} title="Home" />;

export default Home








































































// Reminder aja ini cara penulisan komponen React biasa yang lama dlu gw pake 

// export default function Home() {
// return (
// <>
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//         <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
//         <p className="text-lg text-gray-700">This is a simple React component served with Inertia.js and Vite.</p>
//         </div>
//     </>
// );
// }

