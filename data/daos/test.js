exports.students=    [{_id: 123,
username: "alice",
firstName: "Alice",
lastName: "Wonderland",
gradYear: 2020,
scholarShip: 15000},
{
    _id: 234,
username: "bob",
firstName: "Bob",
lastName: "Hope",
gradYear: 2021,
scholarShip: 12000

}]



exports.questions= [{
    _id: 321,
    question: "Is the following schema valid?",
    points: 10,
    questionType: "TRUE_FALSE",
    isTrue: false
},
{
    _id: 432,
    question: "DAO stands for Dynamic Access Object.",
    points: 10,
    questionType: "TRUE_FALSE",
    isTrue: false
},
{
    _id: 543,
    question: "What does JPA stand for?",
    points: 10,
    questionType: "MULTIPLE_CHOICE",
    choices: "Java Persistence API,Java Persisted Application,JavaScript Persistence API,JSON Persistent Associations"
},
{
    _id: 654,
    question: "What does ORM stand for?",
    points: 10,
    questionType: "MULTIPLE_CHOICE",
    choices: "Object Relational Model,Object Relative Markup,Object Reflexive Model,Object Relational Mapping"
}
]

exports.answers = [{
    student:123,
    question:321,
    trueFalseAnswer: true
},
{
    student:123,
    question:432,
    trueFalseAnswer: false,

},
{
    student:123,
    question:543,
    multipleChoiceAnswer: 1

},
{
    student:123,
    question:654,
    multipleChoiceAnswer: 2
},
{
    student:234,
    question:321,
    trueFalseAnswer: false
},
{
    student:234,
    question:432,
    trueFalseAnswer: true,

},
{
    student:234,
    question:543,
    multipleChoiceAnswer: 3

},
{
    student:234,
    question:654,
    multipleChoiceAnswer: 4

}
]