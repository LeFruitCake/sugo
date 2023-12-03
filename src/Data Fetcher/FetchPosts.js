import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db} from '../config/firebase';

const fetchData = async ()=>{
    try {
        const data = await getDocs(
          query(collection(db, "Posts"), orderBy("postDate", "desc"))
        );
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        return filteredData;
      } catch (err) {
        console.error(err);
      }
}

export default fetchData;