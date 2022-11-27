import { BASE_STORAGE_API_URL } from '@/assets/config';
import React from 'react';

export default function Comments({user,message,time}) {
    const createdTime = new Date(Date.parse(time));
    return (
        <div className=" w-full border px-4 py-2 rounded">
            <div className="grid">
                <div className="flex space-x-4">
                    <img className="w-10 h-10 rounded-full" src={`${BASE_STORAGE_API_URL}/${user.media.path}`} />
                    <div className="font-medium">
                        <div>{user.name} <span className="text-sm text-gray-500">@{user.username}</span></div>
                        <div className="text-xs text-gray-400">{new Intl.DateTimeFormat("id-ID", {day:"numeric",month:"long",year:"numeric"}).format(createdTime)}</div>
                    </div>
                </div>
                <div className="text-sm text-gray-500 mt-4 mb-2">
                    <p>
                        {message}
                    </p>
                </div>
            </div>
        </div>
    )
}