'use client'
import React from "react";
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { checkValidAccessToken, getNewAccessToken } from "@/utils/auth";
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie'
const ProtectedLayout = ({children}:{children: React.ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    useEffect(() => {
        const checkAuth = async () => {
            try {
                setIsLoading(true);
                const isAuthenticatedUser = await checkValidAccessToken()
                if(!isAuthenticatedUser) {
                    const newAccessToken = await getNewAccessToken()
                    if(!newAccessToken) {
                        router.push('/auth/login')
                    }
                    const decoded = jwt.decode(newAccessToken);
                    const {exp} = decoded as {exp: number};
                    const expirationTime = exp ? new Date(exp * 1000) : Math.floor(Date.now() / 1000) + 3600;
                    Cookies.set('access_token', newAccessToken, { expires: expirationTime });
                    setIsAuthenticated(true)
                }
                setIsAuthenticated(true)
            } catch (error) {
                console.error("Authentication error:", error)
                router.push('/auth/login')
            } finally {
                setIsLoading(false)
            }
        }
    
        checkAuth()
      }, [router])
      if (isLoading) {
        return <div>Loading...</div>
      }
    
      return isAuthenticated ? <>{children}</> : null
}
    
export default ProtectedLayout;