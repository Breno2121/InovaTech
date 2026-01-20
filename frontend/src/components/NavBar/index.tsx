'use client'
import Link from "next/link"
import styles from "./styles.module.css"
import { usePathname } from "next/navigation"
import { FaHome } from "react-icons/fa";
import { BsPersonRaisedHand } from "react-icons/bs";
import { MdOutlinePhone } from "react-icons/md";
import logo from '../../assets/inovatech.png'
import Image from 'next/image'

export default function NavMenu() {
    const pathName = usePathname();
    const itens = [
        {
            label: "Tela Principal",
            page: '/dashboard',
            icon: <FaHome />
        },
        {
            label: "Cliente",
            page: '/cliente',
            icon: <BsPersonRaisedHand />
        },
        {
            label: "Chamado",
            page: '/chamado',
            icon: <MdOutlinePhone />
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