export const lineCharts={
    labels:[
        "Week-1",
        "Week-2",
        "Week-3",
        "Week-4",
        "Week-5",
      
    ],
    datasets:[
        {
            label:"Amount",
            data:[100,200,300,400,500],
            borderColor:'rgb(75,192,192)'
        },
        {
            label:"No of Users",
            data:[20,15,25,10,30],
            borderColor:'green'
        }
    ]
};


export const barCharts={
    labels:[
        "Week-1",
        "Week-2",
        "Week-3",
        "Week-4",
        "Week-5",
    ],
    datasets:[
        {
            label:"Amount",
            data:[100,200,300,400,500],
            backgroundColor:["#2F3C7E","#8AAAE5","#101820","#FEE715","#F96167","#F9E795","#990011","#FCF6F5"],
            borderColor:'rgb(75,192,192)',
            borderWidth:1
        },
        {
            label:"No of Users",
            data:[20,15,25,10,30],
            backgroundColor:["#2F3C7E","#8AAAE5","#101820","#FEE715","#F96167","#F9E795","#990011","#FCF6F5"],
            borderColor:'yellow'
        }
    ]
};

export const pieCharts={
    labels:[
        "Free",
        "Basic",
        "Standard",
        "Premium",
        "Test",
    ],
    datasets:[
        {
            label:"User Activated",
            data:[88,10,5,4,2],
            backgroundColor:["#F59E0B","#4D7C0F","#FEC702","#FEE715","#50CD89"],
            borderColor:'rgb(75,192,192)',
            borderWidth:1
        },
        // {
        //     label:"No of Users",
        //     data:[20,15,25,10,30,22,34],
        //     backgroundColor:["#2F3C7E","#8AAAE5","#101820","#FEE715","#F96167","#F9E795","#990011","#FCF6F5"],
        //     borderColor:'green'
        // }
    ]
};