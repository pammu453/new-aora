import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    projectId: "6713f0f6003d4bbcc8b9",
    platform: "com.pramod.aora",
    databaseId: "6714836800267012e944",
    userCollectionId: "671483b90023df9726d6",
    videoCollectionId: "671483f500267af8373f",
    storageId: "67148781002ea55da219",
}

const client = new Client();
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);
        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await logIn(email, password)

        const newUser = await databases.createDocument(config.databaseId, config.userCollectionId, ID.unique(), {
            email,
            username,
            accountId: newAccount.$id,
            avatarURL: avatarUrl,
            password
        })

        return newUser
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const logIn = async (email, password) => {
    try {

        const session = await account.createEmailPasswordSession(email, password);

        return session

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()

        if (!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if (!createUser) throw new Error()
            
        return currentUser.documents[0]

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const getVideos = async () => {
    try {
        const result = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            []);

        return result.documents
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const getLatestVideos = async () => {
    try {
        const result = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc("$createdAt", Query.limit(5))]);

        return result.documents
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const getSearchVideos = async (query) => {
    try {
        const result = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.search("title", query)])

        return result.documents
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const currentUserPosts = async (userId) => {
    try {
        const result = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.equal("creator", userId)])

        return result.documents
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession("current")
        return session
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}