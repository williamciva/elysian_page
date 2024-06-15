import Script from "next/script";
import React, { useImperativeHandle, forwardRef, useEffect, useState } from "react"

export type GetCaptchaToken = () => Promise<string>

export type CaptchaV3Props = {
    sitekey: string
}

const GoogleCaptchaV3 = forwardRef<GetCaptchaToken, CaptchaV3Props>((props, ref) => {


    const getToken = async () => {
        const token = await window.grecaptcha.execute(props.sitekey, { action: 'login' })
        // window.grecaptcha.reset()
        return token;
    }

    useImperativeHandle(ref, () => getToken);


    const destroy = () => {
        document.querySelector('.grecaptcha-badge')?.parentElement?.remove();
        document.getElementById('google-captcha-scprit')?.remove()
    }


    var destroyed = true;
    useEffect(() => {
        destroyed  = !destroyed;

        return () => {
            if (destroyed) {
                destroy();
            }
        };

    }, []);


    return (
        <div id="google-captcha-container">
            <Script id="google-captcha-scprit" src={`https://www.google.com/recaptcha/api.js?render=${props.sitekey}`} async defer ></Script>
        </div>
    )
})

GoogleCaptchaV3.displayName = "GoogleCaptchaV3";

export default GoogleCaptchaV3;