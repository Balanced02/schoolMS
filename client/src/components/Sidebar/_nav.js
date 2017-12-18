export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'fa fa-line-chart fa-2x',
      category: 'admin teacher super',
      module: 'bronze, silver, gold',
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
      module: 'bronze, silver, gold',
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
        {
          name: 'Module Selection',
          url: '/moduleSelection',
        },
      ],
    },
    {
      name: 'Academics',
      url: '/academic',
      icon: 'fa fa-graduation-cap fa-2x',
      category: 'admin',
      module: 'bronze, silver, gold',
      children: [
        {
          name: 'Student',
          url: '/course',
          icon: 'fa fa-folder-open fa-2x',
          children: [
            {
              name: 'Student Category',
              url: '/studentCategory',
            },
            {
              name: 'Class/Course',
              url: '/addCourse',
            },
            {
              name: 'Course Materials',
              url: '/courseMaterials',
            },
            {
              name: 'Attendance',
              url: '/attendance',
            },
            {
              name: 'Guardian List',
              url: '/guardianList',
            },
            {
              name: 'Student List',
              url: '/studentList',
            },
            {
              name: 'Roll Number',
              url: '/rollNumber',
            },
            {
              name: 'Student Attendance Import',
              url: '/studentAttendanceImport',
            },
            {
              name: 'Student Gate Pass',
              url: '/studentGatePass',
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
      module: 'bronze, silver, gold',
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
        {
          name: 'Academic Year',
          url: '/academicYear',
        },
      ],
    },
    {
      name: 'Academic',
      url: '/academics',
      icon: 'fa fa-book fa-2x',
      category: 'teacher',
      module: 'bronze, silver, gold',
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
      module: 'bronze, silver, gold',
      category: 'teacher',
    },
    {
      name: 'HR/Payroll',
      url: '/academic',
      icon: 'fa fa-eye fa-2x',
      category: 'admin',
      module: 'bronze, silver, gold',
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
      module: 'silver, gold',
      icon: 'fa fa-sliders fa-2x',
      children: [
        {
          name: 'Add Category',
          url: '/libraryCategory',
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
      module: 'silver, gold',
      icon: 'fa fa-bus fa-2x',
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
      module: 'silver, gold',
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
      module: 'gold',
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
      module: 'silver, gold',
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
      module: 'bronze, silver, gold',
      url: '/visitors',
      category: 'admin teacher',
      icon: 'fa fa-male fa-2x',
    },
  ],
};
