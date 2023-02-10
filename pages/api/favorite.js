import clientPromise from '../../lib/mongodb';


export default function handler(req, res){
    if (req.method == 'POST') {
        const book = JSON.parse(req.body);

        clientPromise.then(client => {
            const db = client.db('gutendex');
            const collection = db.collection('favorite');
            collection.insertOne(book);
        })
        res.status(201);
    } else if (req.method == 'GET') {
        const userUID = req.query.userUID;

        clientPromise.then(async client => {
            const db = client.db('gutendex');
            const collection = db.collection('favorite');
            const books = await collection.find({ userUID: userUID }).toArray();
            res.status(200).json({ books: books });
        })
    } else if (req.method == 'DELETE') {
        const book = JSON.parse(req.body);

        clientPromise.then(client => {
            const db = client.db('gutendex');
            const collection = db.collection('favorite');
            collection.deleteOne({ id: book.id, userUID: book.userUID });
        })
        res.status(204);
    }
}