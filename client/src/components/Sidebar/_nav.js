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
      category: 'admin',
      children: [
        {
          name: 'Student',
          url: '/course',
          icon: 'fa fa-folder-open fa-2x',
          children: [
            {
              name: 'Class/Course',
              url: '/addCourse',
            },
            {
              name: 'Course Materials',
              url: '/courseMaterials',
            },
          ],
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
          name: 'New Intake',
          url: '/newIntake',
        },
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
    {
      name: 'Academic',
      url: '/academics',
      icon: 'fa fa-book fa-2x',
      category: 'teacher',
      children: [
        {
          name: 'Assignment/Test',
          url: '/assignment',
        },
        {
          name: 'Attendance',
          url: '/attendance',
        },
        {
          name: 'Lesson Planning',
          url: '/lessonPlanning',
        },
      ],
    },
    {
      name: 'Leave Application',
      url: '/leaveApplication',
      icon: 'fa fa-bathtub fa-2x',
      category: 'teacher',
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

          children: [
            {
              name: 'Add Department',
              url: '/department',
            },
            {
              name: 'Add Employee',
              url: '/addEmployee',
            },
            {
              name: 'Employee List',
              url: '/employeeList',
            },
          ],
        },
        {
          name: 'Leave Management',
          url: '/academic',
          category: 'admin',
          children: [
            {
              name: 'Leave Category',
              url: '/leaveCategory',
            },
            {
              name: 'Leave Approvals',
              url: '/leaveApprovals',
            },
            {
              name: 'Leave Application',
              url: '/leaveApplication',
            },
          ],
        },
        {
          name: 'User Management',
          url: '/userManagement',
          category: 'admin',
          children: [
            {
              name: 'Add Designation',
              url: '/addDesignation',
            },
            {
              name: 'Pay Roll',
              url: '/payRoll',
            },
          ],
        },
      ],
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
      name: 'Visitors',
      url: '/visitors',
      category: 'admin teacher',
      icon: 'fa fa-male fa-2x',
    },
  ],
};
