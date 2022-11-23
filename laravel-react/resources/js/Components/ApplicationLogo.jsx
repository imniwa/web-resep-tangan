import React from 'react';
import Icon from '../assets/logo.png'

export default function ApplicationLogo({ className }) {
    return (
        <img src={Icon} className={className} />
    );
}
