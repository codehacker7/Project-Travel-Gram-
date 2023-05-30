const initialTimeline = {
    activities: {
        'activity_1': {
            id: 'activity_1',
            title: 'Go To Beach',
            description: 'Temp Desc 1',
            time: '09:00'
        },
        'activity_2': {
            id: 'activity_2',
            title: 'Go To Mall',
            description: 'Temp Desc 2',
            time: '17:00'
        },
        'activity_3': {
            id: 'activity_3',
            title: 'Go To Sleep',
            description: 'Temp Desc 3',
            time: '22:00'
        },
        'activity_4': {
            id: 'activity_4',
            title: 'Go To Code',
            description: 'Temp Desc 4',
            time: '12:00'
        },
        'activity_5': {
            id: 'activity_5',
            title: 'Go To Class',
            description: 'Temp Desc 5',
            time: '09:00'
        },
    },
    days: [
        {
            id: 'day_1',
            description: 'first day',
            activities: ['activity_1', 'activity_2', 'activity_3']
        },
        {
            id: 'day_2',
            description: 'middle day',
            activities: ['activity_4', 'activity_5']
        },
        {
            id: 'day_3',
            description: 'last day',
            activities: []
        }
    ],
}

const initialCardList = [
    {
        title: 'First title',
        description: 'description',
        startTime: '2021-06-26T10:30',
    },
    {
        title: 'Second title',
        description: 'description',
        startTime: '2021-06-26T10:30',
    },
    {
        title: 'Third title',
        description: 'description',
        startTime: '2021-06-26T10:30',
    },
    {
        title: 'Fourth title',
        description: 'description',
        startTime: '2021-06-26T10:30',
    },
    {
        title: 'Fifth title',
        description: 'description',
        startTime: '2021-06-26T10:30',
    },
];

export default { initialTimeline, initialCardList };