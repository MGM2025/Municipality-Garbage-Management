const reqCollectionModel = require("../models/reqcollectionModel");

class reqCollectionController {

    // create new request
    async submitReqCollection(req, res) {
        try{
            
            //const username=req.user.fullName;        
            const {userId, fullName, address, quantity, phone_no, garbageType, location , collectionDate } = req.body;
            const reqId = Date.now() + "-" + Math.floor(Math.random() * 1000);
    
            const createdReqest = await reqCollectionModel.create({
                reqId,
                userId,
                fullName,
                address,
                quantity,
                phone_no,
                garbageType,
                location,
                collectionDate
            });

            if(createdReqest){
                return res.status(201).json({ message: "Collection request submitted successfully", createdReqest });
            }
            else{
                return res.status(500).json({ message: "Failed to submit your request" });
            }

        } catch(err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to submit your request", error: err.message });
        }
    }

    // get all collection requests
    async getAllreqCollection(req, res) {
        try {
            const { reqId } = req.params;
            const { userId } = req.query;

            // return particular collection request if id is provided
            if(reqId){
                const reqCollection = await reqCollectionModel.findOne({ reqId }).sort({ createdAt : -1 });

                if(!reqCollection) {
                    return res.status(404).json({ message: "No such request found" });
                }
                return res.status(200).json({ message: "Request fetched successfully", reqCollection });
            }

            if( userId ) {
                const reqCollection = await reqCollectionModel.find({ userId }).sort({ createdAt : -1 });

                if(reqCollection.length == 0) {
                    return res.status(200).json({ message: "No requests yet", reqCollection: [] });
                }
                return res.status(200).json({ message: "Requests fetched successfully", reqCollection });
            }

            // return all the collection requests if id is not provided
            const reqCollections = await reqCollectionModel.find().sort({ createdAt : -1 });

            if(reqCollections.length > 0){
                return res.status(200).json({ message: "All feedbacks fetched successfully", reqCollections });
            }
            else if(reqCollections.length == 0){
                return res.status(200).json({ message: "No collection requests found", reqCollections: [] });
            }
            return res.status(500).json({ message: "Something went wrong" });
        }
        catch (err) {
            console.error('Get collection request error:', err);
            return res.status(500).json({ message: "Failed to fetch collection requests", error: err.message });
        }
    };
}


module.exports = new reqCollectionController();