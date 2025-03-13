"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  File,
  FileText,
  Folder,
  Grid,
  Home,
  ImageIcon,
  List,
  Plus,
  Share,
  Star,
  Clock,
  Trash,
  Upload,
  MoreVertical,
  Search,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

// Mock data for folders and files
const mockData = {
  root: {
    name: "My Drive",
    folders: ["documents", "images", "projects"],
    files: [
      {
        id: "file1",
        name: "Budget 2024.xlsx",
        type: "spreadsheet",
        size: "45 KB",
        modified: "Mar 10, 2024",
      },
      {
        id: "file2",
        name: "Meeting Notes.docx",
        type: "document",
        size: "28 KB",
        modified: "Mar 8, 2024",
      },
      {
        id: "file3",
        name: "Presentation.pptx",
        type: "presentation",
        size: "2.3 MB",
        modified: "Mar 5, 2024",
      },
    ],
  },
  documents: {
    name: "Documents",
    folders: ["work", "personal"],
    files: [
      {
        id: "file4",
        name: "Resume.pdf",
        type: "pdf",
        size: "215 KB",
        modified: "Feb 28, 2024",
      },
      {
        id: "file5",
        name: "Contract.docx",
        type: "document",
        size: "78 KB",
        modified: "Feb 25, 2024",
      },
    ],
  },
  images: {
    name: "Images",
    folders: [],
    files: [
      {
        id: "file6",
        name: "Vacation.jpg",
        type: "image",
        size: "3.2 MB",
        modified: "Feb 20, 2024",
      },
      {
        id: "file7",
        name: "Profile Picture.png",
        type: "image",
        size: "1.8 MB",
        modified: "Feb 15, 2024",
      },
      {
        id: "file8",
        name: "Screenshot.png",
        type: "image",
        size: "856 KB",
        modified: "Feb 10, 2024",
      },
    ],
  },
  projects: {
    name: "Projects",
    folders: ["website", "app"],
    files: [
      {
        id: "file9",
        name: "Project Plan.pdf",
        type: "pdf",
        size: "1.2 MB",
        modified: "Feb 5, 2024",
      },
    ],
  },
  work: {
    name: "Work",
    folders: [],
    files: [
      {
        id: "file10",
        name: "Annual Report.pdf",
        type: "pdf",
        size: "4.5 MB",
        modified: "Jan 28, 2024",
      },
      {
        id: "file11",
        name: "Team Structure.docx",
        type: "document",
        size: "65 KB",
        modified: "Jan 25, 2024",
      },
    ],
  },
  personal: {
    name: "Personal",
    folders: [],
    files: [
      {
        id: "file12",
        name: "Tax Documents.pdf",
        type: "pdf",
        size: "2.8 MB",
        modified: "Jan 20, 2024",
      },
      {
        id: "file13",
        name: "Recipes.docx",
        type: "document",
        size: "120 KB",
        modified: "Jan 15, 2024",
      },
    ],
  },
  website: {
    name: "Website",
    folders: [],
    files: [
      {
        id: "file14",
        name: "Homepage Design.fig",
        type: "design",
        size: "8.5 MB",
        modified: "Jan 10, 2024",
      },
      {
        id: "file15",
        name: "Content Plan.xlsx",
        type: "spreadsheet",
        size: "95 KB",
        modified: "Jan 5, 2024",
      },
    ],
  },
  app: {
    name: "App",
    folders: [],
    files: [
      {
        id: "file16",
        name: "App Wireframes.pdf",
        type: "pdf",
        size: "3.7 MB",
        modified: "Dec 28, 2023",
      },
      {
        id: "file17",
        name: "User Flow.png",
        type: "image",
        size: "2.1 MB",
        modified: "Dec 25, 2023",
      },
    ],
  },
};

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState("root");
  const [viewMode, setViewMode] = useState("grid");
  const [breadcrumbPath, setBreadcrumbPath] = useState([
    { id: "root", name: "My Drive" },
  ]);

  // Function to navigate to a folder
  const navigateToFolder = (folderId) => {
    const folder = mockData[folderId];
    setCurrentFolder(folderId);

    // Update breadcrumb
    if (folderId === "root") {
      setBreadcrumbPath([{ id: "root", name: "My Drive" }]);
    } else {
      // Find if folder already exists in breadcrumb
      const existingIndex = breadcrumbPath.findIndex(
        (item) => item.id === folderId,
      );

      if (existingIndex !== -1) {
        // If exists, truncate breadcrumb to that point
        setBreadcrumbPath(breadcrumbPath.slice(0, existingIndex + 1));
      } else {
        // Add to breadcrumb
        setBreadcrumbPath([
          ...breadcrumbPath,
          { id: folderId, name: folder.name },
        ]);
      }
    }
  };

  // Function to navigate via breadcrumb
  const navigateViaBreadcrumb = (index) => {
    const targetFolder = breadcrumbPath[index];
    navigateToFolder(targetFolder.id);
  };

  // Function to get file icon based on type
  const getFileIcon = (type) => {
    switch (type) {
      case "document":
        return <FileText className="h-6 w-6 text-blue-500" />;
      case "spreadsheet":
        return <FileText className="h-6 w-6 text-green-500" />;
      case "presentation":
        return <FileText className="h-6 w-6 text-orange-500" />;
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />;
      case "image":
        return <ImageIcon className="h-6 w-6 text-purple-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  // Mock upload function
  const handleUpload = () => {
    alert("Upload functionality would open a file picker here");
  };

  const currentFolderData = mockData[currentFolder];

  return (
    <div className="bg-background flex h-screen">
      {/* Sidebar */}
      <div className="hidden w-64 border-r p-4 md:block">
        <div className="mb-6">
          <Button
            className="mb-6 w-full justify-start gap-2"
            variant="outline"
            onClick={handleUpload}
          >
            <Plus className="h-4 w-4" />
            New
          </Button>
        </div>

        <nav className="space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigateToFolder("root")}
          >
            <Home className="mr-2 h-4 w-4" />
            My Drive
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Share className="mr-2 h-4 w-4" />
            Shared with me
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Clock className="mr-2 h-4 w-4" />
            Recent
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Star className="mr-2 h-4 w-4" />
            Starred
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Trash className="mr-2 h-4 w-4" />
            Trash
          </Button>
        </nav>

        <div className="mt-6 border-t pt-6">
          <div className="text-muted-foreground mb-2 text-sm font-medium">
            Storage
          </div>
          <div className="bg-muted h-2.5 w-full rounded-full">
            <div className="h-2.5 w-[45%] rounded-full bg-blue-600"></div>
          </div>
          <div className="text-muted-foreground mt-2 text-xs">
            4.5 GB of 15 GB used
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="border-b p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex w-full max-w-md items-center">
              <div className="relative w-full">
                <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search in Drive"
                  className="w-full pl-9 pr-4"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
              >
                {viewMode === "grid" ? (
                  <List className="h-5 w-5" />
                ) : (
                  <Grid className="h-5 w-5" />
                )}
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Breadcrumb navigation */}
          <Breadcrumb className="py-1">
            <BreadcrumbList>
              {breadcrumbPath.map((item, index) => (
                <>
                  <BreadcrumbItem key={item.id}>
                    <BreadcrumbLink
                      onClick={() => navigateViaBreadcrumb(index)}
                      className={
                        index === breadcrumbPath.length - 1
                          ? "font-semibold"
                          : "cursor-pointer"
                      }
                    >
                      {item.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < breadcrumbPath.length - 1 && (
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                  )}
                </>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-auto p-6">
          {/* Upload button for mobile */}
          <div className="mb-4 md:hidden">
            <Button onClick={handleUpload} className="gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </div>

          {/* Folders */}
          {currentFolderData.folders.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-lg font-semibold">Folders</h2>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                    : "space-y-2"
                }
              >
                {currentFolderData.folders.map((folderId) => (
                  <div
                    key={folderId}
                    onClick={() => navigateToFolder(folderId)}
                    className={`group cursor-pointer ${
                      viewMode === "grid"
                        ? "hover:bg-muted rounded-lg border p-4 transition-colors"
                        : "hover:bg-muted flex items-center rounded border p-2 transition-colors"
                    } `}
                  >
                    <div className="flex items-center gap-3">
                      <Folder
                        className={`${viewMode === "grid" ? "h-10 w-10" : "h-6 w-6"} text-blue-500`}
                      />
                      <div className="overflow-hidden">
                        <div className="truncate font-medium">
                          {mockData[folderId].name}
                        </div>
                      </div>
                    </div>

                    {viewMode === "list" && (
                      <div className="ml-auto flex items-center gap-4">
                        <span className="text-muted-foreground text-sm">-</span>
                        <span className="text-muted-foreground text-sm">
                          Folder
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 opacity-0 group-hover:opacity-100"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Rename</DropdownMenuItem>
                            <DropdownMenuItem>Move to</DropdownMenuItem>
                            <DropdownMenuItem>Share</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Files */}
          {currentFolderData.files.length > 0 && (
            <div>
              <h2 className="mb-4 text-lg font-semibold">Files</h2>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                    : "space-y-2"
                }
              >
                {currentFolderData.files.map((file) => (
                  <Link
                    key={file.id}
                    href={`#file-${file.id}`}
                    className={`group block ${
                      viewMode === "grid"
                        ? "hover:bg-muted rounded-lg border p-4 transition-colors"
                        : "hover:bg-muted flex items-center rounded border p-2 transition-colors"
                    } `}
                  >
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <div className="overflow-hidden">
                        <div className="truncate font-medium">{file.name}</div>
                        {viewMode === "grid" && (
                          <div className="text-muted-foreground mt-1 text-xs">
                            {file.modified} • {file.size}
                          </div>
                        )}
                      </div>
                    </div>

                    {viewMode === "list" && (
                      <div className="ml-auto flex items-center gap-4">
                        <span className="text-muted-foreground text-sm">
                          {file.modified}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {file.size}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 opacity-0 group-hover:opacity-100"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Download</DropdownMenuItem>
                            <DropdownMenuItem>Rename</DropdownMenuItem>
                            <DropdownMenuItem>Move to</DropdownMenuItem>
                            <DropdownMenuItem>Share</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {currentFolderData.folders.length === 0 &&
            currentFolderData.files.length === 0 && (
              <div className="flex h-64 flex-col items-center justify-center">
                <div className="text-muted-foreground mb-2">
                  This folder is empty
                </div>
                <Button
                  onClick={handleUpload}
                  variant="outline"
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload files
                </Button>
              </div>
            )}
        </main>
      </div>
    </div>
  );
}
