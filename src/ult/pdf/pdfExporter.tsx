import jsPDF from 'jspdf';

// ... your existing export functions (keep them) ...

// Comprehensive PDF with dashboard summary, enrollments, and users
export const exportComprehensiveAdminPDF = (
  stats: any[], 
  enrollments: any[], 
  users: any[]
) => {
  const pdf = new jsPDF();
  let yPosition = 20;
  const pageHeight = pdf.internal.pageSize.height;

  // 1. Cover Page
  pdf.setFontSize(24);
  pdf.text('Admin Dashboard Comprehensive Report', 14, yPosition);
  yPosition += 15;
  pdf.setFontSize(12);
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, yPosition);
  yPosition += 20;

  // 2. Executive Summary Section
  pdf.setFontSize(18);
  pdf.text('Executive Summary', 14, yPosition);
  yPosition += 15;
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Key Statistics:', 14, yPosition);
  yPosition += 10;
  
  pdf.setFont('helvetica', 'normal');
  stats.forEach((stat) => {
    pdf.text(`• ${stat.label}: ${stat.value}`, 20, yPosition);
    yPosition += 8;
    
    // Check for page break
    if (yPosition > pageHeight - 30) {
      pdf.addPage();
      yPosition = 20;
    }
  });

  yPosition += 10;

  // 3. Enrollment Statistics
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Enrollment Overview', 14, yPosition);
  yPosition += 12;
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Total Enrollments: ${enrollments.length}`, 20, yPosition);
  yPosition += 8;
  pdf.text(`Active Enrollments: ${enrollments.filter(e => e.status === 'active').length}`, 20, yPosition);
  yPosition += 8;
  pdf.text(`Completed Enrollments: ${enrollments.filter(e => e.status === 'completed').length}`, 20, yPosition);
  yPosition += 8;
  pdf.text(`Cancelled Enrollments: ${enrollments.filter(e => e.status === 'cancelled').length}`, 20, yPosition);
  
  yPosition += 15;

  // 4. User Statistics
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('User Overview', 14, yPosition);
  yPosition += 12;
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Total Users: ${users.length}`, 20, yPosition);
  yPosition += 8;
  
  // Role breakdown
  const roleCounts = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  Object.entries(roleCounts).forEach(([role, count]) => {
    pdf.text(`${role.charAt(0).toUpperCase() + role.slice(1)}: ${count}`, 20, yPosition);
    yPosition += 8;
    
    // Check for page break
    if (yPosition > pageHeight - 30) {
      pdf.addPage();
      yPosition = 20;
    }
  });

  yPosition += 15;

  // 5. Detailed Enrollments Table
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Detailed Enrollments', 14, yPosition);
  yPosition += 15;

  if (enrollments.length > 0) {
    const enrollmentColumns = ['courseTitle', 'userName', 'userEmail', 'progress', 'status', 'enrolledAt'];
    const enrollmentLabels = ['Course', 'Student', 'Email', 'Progress', 'Status', 'Enrolled Date'];
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    
    // Table headers
    const colWidth = 180 / enrollmentLabels.length;
    enrollmentLabels.forEach((label, index) => {
      pdf.text(label, 14 + (index * colWidth), yPosition);
    });
    
    yPosition += 8;
    pdf.line(14, yPosition - 3, 194, yPosition - 3);
    
    // Table data
    pdf.setFont('helvetica', 'normal');
    
    enrollments.slice(0, 50).forEach((enrollment) => { // Limit to first 50 enrollments
      // Check for page break
      if (yPosition > pageHeight - 20) {
        pdf.addPage();
        yPosition = 20;
        
        // Redraw headers
        pdf.setFont('helvetica', 'bold');
        enrollmentLabels.forEach((label, index) => {
          pdf.text(label, 14 + (index * colWidth), yPosition);
        });
        yPosition += 8;
        pdf.line(14, yPosition - 3, 194, yPosition - 3);
        pdf.setFont('helvetica', 'normal');
      }
      
      const rowData = {
        courseTitle: enrollment.courseTitle?.substring(0, 20) + (enrollment.courseTitle?.length > 20 ? '...' : ''),
        userName: enrollment.userName?.substring(0, 15) + (enrollment.userName?.length > 15 ? '...' : ''),
        userEmail: enrollment.userEmail?.substring(0, 20) + (enrollment.userEmail?.length > 20 ? '...' : ''),
        progress: `${enrollment.progress}%`,
        status: enrollment.status,
        enrolledAt: new Date(enrollment.enrolledAt).toLocaleDateString()
      };
      
      enrollmentColumns.forEach((col, colIndex) => {
        const cellData = rowData[col as keyof typeof rowData]?.toString() || '';
        pdf.text(cellData, 14 + (colIndex * colWidth), yPosition);
      });
      
      yPosition += 6;
    });

    if (enrollments.length > 50) {
      yPosition += 5;
      pdf.setFont('helvetica', 'italic');
      pdf.text(`... and ${enrollments.length - 50} more enrollments`, 14, yPosition);
      pdf.setFont('helvetica', 'normal');
    }
  } else {
    pdf.text('No enrollments found', 14, yPosition);
  }

  yPosition += 20;

  // 6. Detailed Users Table
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('User Details', 14, yPosition);
  yPosition += 15;

  if (users.length > 0) {
    const userColumns = ['name', 'email', 'role', 'enrolledCourses', 'createdAt'];
    const userLabels = ['Name', 'Email', 'Role', 'Courses', 'Joined Date'];
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    
    // Table headers
    const colWidth = 180 / userLabels.length;
    userLabels.forEach((label, index) => {
      pdf.text(label, 14 + (index * colWidth), yPosition);
    });
    
    yPosition += 8;
    pdf.line(14, yPosition - 3, 194, yPosition - 3);
    
    // Table data
    pdf.setFont('helvetica', 'normal');
    
    users.slice(0, 50).forEach((user) => { // Limit to first 50 users
      // Check for page break
      if (yPosition > pageHeight - 20) {
        pdf.addPage();
        yPosition = 20;
        
        // Redraw headers
        pdf.setFont('helvetica', 'bold');
        userLabels.forEach((label, index) => {
          pdf.text(label, 14 + (index * colWidth), yPosition);
        });
        yPosition += 8;
        pdf.line(14, yPosition - 3, 194, yPosition - 3);
        pdf.setFont('helvetica', 'normal');
      }
      
      const rowData = {
        name: user.name?.substring(0, 15) + (user.name?.length > 15 ? '...' : ''),
        email: user.email?.substring(0, 20) + (user.email?.length > 20 ? '...' : ''),
        role: user.role,
        enrolledCourses: user.enrolledCourses?.toString(),
        createdAt: new Date(user.createdAt).toLocaleDateString()
      };
      
      userColumns.forEach((col, colIndex) => {
        const cellData = rowData[col as keyof typeof rowData]?.toString() || '';
        pdf.text(cellData, 14 + (colIndex * colWidth), yPosition);
      });
      
      yPosition += 6;
    });

    if (users.length > 50) {
      yPosition += 5;
      pdf.setFont('helvetica', 'italic');
      pdf.text(`... and ${users.length - 50} more users`, 14, yPosition);
    }
  } else {
    pdf.text('No users found', 14, yPosition);
  }

  // 7. Footer
  const totalPages = (pdf as any).getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    pdf.text(`Page ${i} of ${totalPages} - Generated on ${new Date().toLocaleDateString()}`, 14, pageHeight - 10);
  }

  pdf.save(`comprehensive_admin_report_${new Date().getTime()}.pdf`);
};