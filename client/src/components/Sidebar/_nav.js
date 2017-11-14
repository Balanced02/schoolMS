export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'fa fa-line-chart fa-2x',
      category: 'admin teacher super',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'User Management',
      url: '/schoolManagement',
      icon: 'fa fa-users fa-2x',
      category: 'super',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
      children: [
        {
          name: 'Add School',
          url: '/addSchool',
        },
        {
          name: 'View Schools',
          url: '/viewSchools',
        },
      ],
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
              name: 'Pay Head',
              url: '/payHead',
            },
          ],
        },
      ],
    },

    {
      name: 'Library',
      url: '/library',
      category: 'admin',
      icon: 'fa fa-sliders fa-2x',
      children: [
        {
          name: 'Add Category',
          url: '/addCategory',
        },
        {
          name: 'Add Books',
          url: '/addBooks',
        },
        {
          name: 'Issue Book',
          url: '/issueBook',
        },
        {
          name: 'Return Book',
          url: '/returnBook',
        },
        {
          name: 'Reports',
          url: '/bookReports',
        },
      ],
    },
    {
      name: 'Transport',
      url: '/transport',
      category: 'admin',
      icon: 'fa fa-sliders fa-2x',
      children: [
        {
          name: 'Add Vehicle',
          url: '/addVehicle',
        },
        {
          name: 'Add Driver',
          url: '/addDriver',
        },
        {
          name: 'Add Route',
          url: '/addRoute',
        },
        {
          name: 'Fee Collection',
          url: '/feeCollection',
        },
      ],
    },
    {
      name: 'Store Management',
      url: '/storeManagement',
      category: 'admin',
      icon: 'fa fa-sliders fa-2x',
      children: [
        {
          name: 'Inventory',
          url: '/addCategory',
        },
      ],
    },
    {
      name: 'Reports',
      url: '/reports',
      category: 'admin',
      icon: 'fa fa-sliders fa-2x',
      children: [
        {
          name: 'Student Reports',
          url: '/studentReports',
        },
        {
          name: 'Student Details',
          url: '/studentDetails',
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
