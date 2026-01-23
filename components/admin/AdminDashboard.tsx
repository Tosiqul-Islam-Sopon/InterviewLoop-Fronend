"use client";

import { useState } from "react";
import { Sidebar, TabType } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import { UsersManagement } from "./UsersManagement";
import { CompaniesManagement } from "./CompaniesManagement";
import { JobRolesManagement } from "./JobRolesManagement";
import { InterviewTypesManagement } from "./InterviewTypesManagement";
import { TagsManagement } from "./TagsManagement";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("users");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UsersManagement />;
      case "companies":
        return <CompaniesManagement />;
      case "jobRoles":
        return <JobRolesManagement />;
      case "interviewTypes":
        return <InterviewTypesManagement />;
      case "tags":
        return <TagsManagement />;
      default:
        return <UsersManagement />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case "users":
        return "User Management";
      case "companies":
        return "Company Management";
      case "jobRoles":
        return "Job Roles";
      case "interviewTypes":
        return "Interview Types";
      case "tags":
        return "Tags Management";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <TopNavbar
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          title={getTitle()}
        />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}
