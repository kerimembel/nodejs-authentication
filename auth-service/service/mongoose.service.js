class MongooseService {

    constructor(Model) {
        this.model = Model;
    }

    aggregate(pipeline) {
        return this.model.aggregate(pipeline).exec();
    }

    insertMany(bulkData) {
        return this.model.insertMany(bulkData);
    }

    create(body) {
        return this.model.create(body);
    }

    count(query) {
        return this.model.count(query).exec();
    }

    delete(id) {
        return this.model.findByIdAndDelete(id).select({ __v: 0 }).exec();
    }

    deleteOne(query) {
        return this.model.deleteOne(query).exec();
    }

    findDistinct(query, field) {
        return this.model
            .find(query)
            .distinct(field)
            .exec();
    }

    findOneAndUpdate(conditions, update, options = { lean: true, new: true }) {
        return this.model
            .findOneAndUpdate(conditions, update, options)
            .exec();
    }

    findOneAndDelete(conditions, update, options = { lean: true, new: true }) {
        this.model
            .findOneAndDelete(conditions, function (err, docs) {
                if (err) {
                    console.log(err)
                    return null;
                }
                else {
                    return docs;
                }
            })
    };

    find(query, sort = { id: 1 }, projection = { __v: 0 }, options = { lean: true }) {
        return this.model
            .find(query, projection, options)
            .sort(sort)
            .select({ __v: 0 })
            .exec();
    }

    findOne(query, projection = { __v: 0 }, options = { lean: true }) {
        return this.model
            .findOne(query, projection, options)
            .select({ __v: 0 })
            .exec();
    }

    getAll() {
        return this.model.find().select({ __v: 0 }).exec();
    }

    getById(id, projection = { __v: 0 }, options = { lean: true }) {
        return this.model
            .findById(id, projection, options)
            .select({ __v: 0 })
            .exec();
    }

    update(id, body, options = { lean: true, new: true }) {
        return this.model
            .findByIdAndUpdate(id, body, options)
            .select({ __v: 0 })
            .exec();
    }
}

module.exports = MongooseService;