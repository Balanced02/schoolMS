export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'fa fa-line-chart fa-2x',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Academic',
      url: '/academic',
      icon: 'fa fa-graduation-cap fa-2x',
      children: [
        {
          name: 'Course',
          url: '/course',
          icon: 'fa fa-folder-open fa-2x',
          children: [
            {
              name: 'Add & Edit Course',
              url: '/addCourse',
            },
            {
              name: 'Course Materials',
              url: '/courseMaterials',
            },
          ],
        },
        {
          name: 'Subjects',
          url: '/subjects',
          icon: 'fa fa-folder fa-2x',
          children: [
            {
              name: 'Asign Subjects',
              url: '/assignSubjects',
            },
          ],
        },
      ],
    },
    {
      name: 'HR/Payroll',
      url: '/academic',
      icon: 'fa fa-eye fa-2x',
      children: [
        {
          name: 'Employee Management',
          url: '/academic',
          children: [
            {
              name: 'Add Department',
              url: '/department',
            },
            {
              name: 'Add Employee',
              url: '/assessment',
            },
            {
              name: 'Employee List',
              url: '/staff',
            },
          ],
        },
        {
          name: 'Leave Management',
          url: '/academic',
          children: [
            {
              name: 'Leave Category',
              url: '/academic',
            },
            {
              name: 'Leave Application',
              url: '/academic',
            },
            {
              name: 'Leave Approvals',
              url: '/academic',
            },
          ],
        },
      ],
    },
    {
      name: 'Visitors',
      url: '/visitors',
      icon: 'fa fa-male fa-2x',
    },
    {
      name: 'Settings',
      url: '/adminSettings',
      icon: 'fa fa-sliders fa-2x',
      children: [
        {
          name: 'Institution Details',
          url: '/course',
        },
        {
          name: 'Academic Details',
          url: '/course',
        },
        {
          name: 'Fees Allocation',
          url: '/course',
        },
      ],
    },
  ],
};
