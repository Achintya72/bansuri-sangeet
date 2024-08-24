interface Profile {
    uid?: string,
    email?: string,
    role?: "admin" | "student",
    name?: string,
    unpaidClasses?: number,
    paymentReminder?: boolean,
    paymentRequestSent?: boolean,
    songs?: StudentSong[],
    starredSongs?: StudentSong[],
    joinDate?: Date
};

interface StudentSong {
    songId?: string,
    status?: "completed" | "assigned" | "unset"
    notes?: string
}

interface Song {
    id?: string,
    name?: string,
    aaroha?: string,
    avroha?: string,
    thaat?: string,
    samay?: string,
    jaati?: string,
    files?: SongFile[],
    vaadi?: string,
    samvaadi?: string
}

interface SongFile {
    type: "document" | "sheet",
    name?: string,
    url?: string
}

export type {
    SongFile,
    Song,
    StudentSong,
    Profile
}