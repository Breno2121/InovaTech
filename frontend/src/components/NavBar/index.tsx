'use client'
import Link from "next/link"
import styles from "./styles.module.css"
import { usePathname } from "next/navigation"
import { FaHome } from "react-icons/fa";
import logo from '../../app/assets/inovatech.png'
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
            page: '/'
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