import { db } from '../firebaseConfig'
import { deleteDoc, doc } from 'firebase/firestore';

export const deleteCatalogue = async (catalogueName, currentUid) => {
    console.log(`Deleting catalogue: ${catalogueName} for user: ${currentUid} from Firestore`);
    try {
        await deleteDoc(doc(db, "users", currentUid, "catalogues", catalogueName));
        console.log("Catalogue successfully deleted!");
    } catch (error) {
        console.error("Error deleting catalogue: ", error);
        throw new Error("Failed to delete catalogue.");
    }
};