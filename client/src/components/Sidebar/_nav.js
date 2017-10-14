export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'fa fa-line-chart fa-2x',
      category: 'admin teacher',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Academics',
      url: '/academic',
      icon: 'fa fa-graduation-cap fa-2x',
      category: 'admin teacher',
      children: [
        {
          name: 'Student',
          url: '/course',
          icon: 'fa fa-folder-open fa-2x',
          category: 'admin',
          children: [
            {
              name: 'Class/Course',
              url: '/addCourse',
              category: 'admin',
            },
            {
              name: 'Course Materials',
              url: '/courseMaterials',
              category: 'admin teacher',
            },
          ],
        },
      ],
    },
    {
      name: 'HR/Payroll',
      url: '/academic',
      icon: 'fa fa-eye fa-2x',
      category: 'admin',
      children: [
        {
          name: 'Employee Management',
          url: '/academic',
          category: 'admin',
          children: [
            {
              name: 'Add Department',
              url: '/department',
              category: 'admin',
            },
            {
              name: 'Add Employee',
              url: '/addEmployee',
              category: 'admin',
            },
            {
              name: 'Employee List',
              url: '/staff',
              category: 'admin',
            },
          ],
        },
        {
          name: 'Leave Management',
          url: '/academic',
          category: 'admin teacher',
          children: [
            {
              name: 'Leave Category',
              url: '/academic',
              category: 'admin',
            },
            {
              name: 'Leave Application',
              url: '/academic',
              category: 'admin teacher',
            },
            {
              name: 'Leave Approvals',
              url: '/academic',
              category: 'admin',
            },
          ],
        },
      ],
    },
    {
      name: 'Visitors',
      url: '/visitors',
      category: 'admin teacher',
      icon: 'fa fa-male fa-2x',
    },
    {
      name: 'Settings',
      url: '/adminSettings',
      category: 'admin',
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
        {
          name: 'Assign Course',
          url: '/assignCourse',
        },
      ],
    },
    {
      name: 'Admissions',
      url: '/admission',
      icon: 'fa fa-lock fa-2x',
      category: 'admin',
      children: [
        {
          name: 'Applicants',
          url: '/applicants',
        },
        {
          name: 'Pending Applications',
          url: '/applicants',
        },
      ],
    },
  ],
};
