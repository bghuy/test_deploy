'use client'

import { Button } from "@/components/ui/button"
import axiosInstance from "@/setup/axios";
export default function TestPage () {
    const getCookie = async () => {
        const response = await fetch('https://chat-asp-api.vercel.app/auth/test-cookie', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        console.log(response, "response");
        const data = await response.json();
        console.log(data, "data");

        const response2 = await axiosInstance.get('/auth/test-cookie');
        console.log(response2.data, "data2");
    }
    
    return(
        <>
            <div>Hello test</div>
            <Button variant="link" onClick={getCookie}>
                Get test cookie
            </Button>
        </>
    )
}
 