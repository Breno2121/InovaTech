'use client'
import Link from "next/link"
import styles from "./styles.module.css"
import { usePathname } from "next/navigation"
import { FaHome } from "react-icons/fa";
import { BsPersonRaisedHand } from "react-icons/bs";
import { LuTicketSlash } from "react-icons/lu";
import logo from '../../assets/inovatech.png'
import Image from 'next/image'

export default function NavMenu() {
    const pathName = usePathname();

    
    const itens = [
        {
            label: "Dashboard",
            page: '/dashboard',
            icon: <FaHome />
        },
        {
            label: "Atendimento",
            page: '/atendimento',
            icon: <LuTicketSlash />
        },
        {
            label: "Cliente",
            page: '/cliente',
            icon: <BsPersonRaisedHand />
        }
    ]



    return (
        <div className={styles.container}>
            <div className={styles.logoArea}>
                <Image src={ logo } alt=""/>
        </div>
            <div className={styles.content}>
                {itens.map(item => (
                    <Link 
                        key={item.label} 
                        className={`item ${pathName === item.page ? styles.selected : ""}`}
                        href={item.page}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}