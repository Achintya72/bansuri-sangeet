"use client";

import React, { createContext, useEffect, useState } from "react";
import { Profile, Song } from "./types";
import { onAuthStateChanged, User, UserCredential } from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import Loader from "@/components/loader";
import { usePathname, useRouter } from "next/navigation";

let DataContext = createContext<Data>({
    user: null,
    authUser: null,
    loggedIn: null,
    populated: null,
    songs: null
});

interface Data {
    user: Profile | null,
    authUser: User | null,
    loggedIn: boolean | null,
    populated: boolean | null,
    songs: Song[] | null
}


const DataContextProvider = ({ children }: React.PropsWithChildren) => {
    const [authUser, changeAuth] = useState<User | null>(null);
    const [user, changeUser] = useState<Profile | null>(null);
    const [loggedIn, changeLoggedIn] = useState<boolean | null>(null);
    const [populated, changePopulated] = useState<boolean | null>(null);
    const [songs, changeSongs] = useState<Song[] | null>(null);
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        return onSnapshot(collection(db, "music"), (data) => {
            changeSongs(data.docs.map(doc => ({ ...doc.data(), id: doc.id } as Song)));
        });
    }, []);

    useEffect(() => {
        return onAuthStateChanged(auth, (newUser) => {
            if (newUser) {
                changeAuth(newUser);
                changeLoggedIn(true);
            } else {
                changeAuth(null);
                changeLoggedIn(false);
            }
        })
    }, []);

    useEffect(() => {
        if (loggedIn != null) {
            if (authUser) {
                return onSnapshot(doc(db, "users", authUser.uid), (doc) => {
                    let data = doc.data();
                    changeUser(data as Profile);
                    changePopulated(true);
                    if (pathName == "/login") {

                        router.push("/dashboard");
                    }
                })
            } else {
                changeUser(null);
                changePopulated(false);
            }
        }
    }, [loggedIn, authUser, pathName, router])

    const value = {
        authUser,
        user,
        loggedIn,
        populated,
        songs
    };
    return (
        <DataContext.Provider value={value}>
            {(loggedIn == null || populated == null) ? <div className="w-full h-screen flex items-center justify-center"><Loader /></div> : children}
        </DataContext.Provider>
    )
}

export {
    DataContext as default,
    DataContextProvider
}