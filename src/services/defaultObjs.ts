import { Profile } from "./types";

let defaultUser: Profile = {
    name: "",
    email: "",
    joinDate: new Date(),
    paymentReminder: false,
    paymentRequestSent: false,
    role: "student",
    songs: [],
    starredSongs: [],
    uid: "",
    unpaidClasses: 0
}


export {
    defaultUser
};