import toast, { Toaster } from 'react-hot-toast';
function Home(){
    toast.success('Successfully Logged In!!')
    return(<p> Welcome to the app</p>)
}
export default Home;