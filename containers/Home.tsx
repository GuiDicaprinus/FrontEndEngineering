import { NextPage } from "next";
import { Header } from "../components/Header";
import {Footer} from "../components/Footer";
import {Filter} from "../components/Filter";

type HomeProps = {
    setToken(s: string) : void
}

export const Home : NextPage<HomeProps> = ({setToken}) => {

    const sair = () =>{
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        setToken('');
    }

    return (
        <>
            <Header sair={sair}/>
            <Filter/>
            <Footer/>
        </>);
}