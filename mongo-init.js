// mongo-init.js
db.createUser({
    user: 'root',
    pwd: 'example',
    roles: [
        {
            role: 'readWrite',
            db: 'todoDB',
        },
    ],
});

db = new Mongo().getDB('todoDB');

db.createCollection('todos', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'dueDate', 'category', 'label'],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                },
                dueDate: {
                    bsonType: 'date',
                    description: 'must be a date and is required',
                },
                category: {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                },
                label: {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                },
            },
        },
    },
});

db.todos.insert({ name: 'Initial ToDo', dueDate: new Date(), category: 'General', label: 'Green' });

